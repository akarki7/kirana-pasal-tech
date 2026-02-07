'use client';

import { useState, useEffect } from 'react';
import { X, Check, Clock, AlertCircle, Loader2, Smartphone } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { PaymentService } from '@/lib/integrations';

interface PaymentModalProps {
  amount: number;
  orderId: string;
  method: 'esewa' | 'khalti' | 'fonepay' | 'connectips';
  onSuccess: (transactionId: string) => void;
  onCancel: () => void;
}

export default function PaymentModal({ amount, orderId, method, onSuccess, onCancel }: PaymentModalProps) {
  const [step, setStep] = useState<'initiated' | 'scanning' | 'verifying' | 'success' | 'failed'>('initiated');
  const [paymentData, setPaymentData] = useState<any>(null);
  const [transactionId, setTransactionId] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedBank, setSelectedBank] = useState('');

  useEffect(() => {
    initiatePayment();
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const initiatePayment = async () => {
    let data;
    switch (method) {
      case 'esewa':
        data = await PaymentService.initiateEsewa(amount, orderId);
        break;
      case 'khalti':
        data = await PaymentService.initiateKhalti(amount, orderId);
        break;
      case 'fonepay':
        data = await PaymentService.initiateFonepay(amount, orderId);
        break;
      case 'connectips':
        data = await PaymentService.initiateConnectIPS(amount, orderId);
        break;
    }
    setPaymentData(data);
    setTimeLeft('expiresIn' in data ? data.expiresIn : 300);
    setTransactionId(
      ('transactionUuid' in data && data.transactionUuid) ||
      ('pidx' in data && data.pidx) ||
      ('prn' in data && data.prn) ||
      ('txnId' in data && data.txnId) ||
      ''
    );
  };

  const handlePayNow = async () => {
    if (method === 'connectips' && !selectedBank) {
      alert('Please select a bank');
      return;
    }

    setStep('scanning');

    // Simulate user scanning QR or entering payment in their app
    setTimeout(() => {
      setStep('verifying');
      verifyPayment();
    }, 3000);
  };

  const verifyPayment = async () => {
    const result = await PaymentService.verifyPayment(transactionId, method);

    if (result.success) {
      setStep('success');
      setTimeout(() => {
        onSuccess(transactionId);
      }, 2000);
    } else {
      setStep('failed');
      setErrorMessage(result.message);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getGatewayConfig = () => {
    switch (method) {
      case 'esewa':
        return {
          name: 'eSewa',
          color: 'bg-[#60BB46]',
          logo: '💚',
          instructions: [
            'Open your eSewa app',
            'Scan the QR code or enter Merchant ID',
            'Verify the amount',
            'Enter your PIN to complete payment',
          ],
        };
      case 'khalti':
        return {
          name: 'Khalti',
          color: 'bg-[#5D2E8E]',
          logo: '💜',
          instructions: [
            'Open your Khalti app',
            'Scan the QR code',
            'Confirm the amount',
            'Enter your PIN to pay',
          ],
        };
      case 'fonepay':
        return {
          name: 'Fonepay',
          color: 'bg-[#ED1C24]',
          logo: '🔴',
          instructions: [
            'Open Fonepay or your bank app',
            'Select "Scan and Pay"',
            'Scan the QR code below',
            'Confirm payment',
          ],
        };
      case 'connectips':
        return {
          name: 'ConnectIPS',
          color: 'bg-[#0066CC]',
          logo: '🔵',
          instructions: [
            'Select your bank below',
            'Login to your online banking',
            'Enter merchant ID: KIRANA_001',
            'Complete the payment',
          ],
        };
    }
  };

  const config = getGatewayConfig();

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-md w-full my-8 shadow-2xl overflow-hidden animate-fadeIn max-h-[90vh] flex flex-col">
        {/* Header - Fixed */}
        <div className={`${config.color} px-6 py-4 text-white relative flex-shrink-0`}>
          <button
            onClick={onCancel}
            className="absolute top-3 right-3 p-1.5 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
          <div className="flex items-center space-x-3 mb-3">
            <span className="text-3xl">{config.logo}</span>
            <div>
              <h2 className="text-xl font-bold">{config.name}</h2>
              <p className="text-white/90 text-sm">Secure Payment</p>
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
            <div className="text-xs text-white/80 mb-1">Amount to Pay</div>
            <div className="text-3xl font-bold">₹ {amount.toFixed(2)}</div>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === 'initiated' && (
            <div className="space-y-4">
              {/* Timer */}
              {timeLeft > 0 && (
                <div className="flex items-center justify-center space-x-2 text-gray-600 bg-gray-50 py-2 rounded-lg">
                  <Clock size={18} />
                  <span className="font-semibold">Time: {formatTime(timeLeft)}</span>
                </div>
              )}

              {/* QR Code */}
              {method !== 'connectips' && paymentData?.qrData && (
                <div className="flex justify-center py-2">
                  <div className="bg-white p-3 rounded-xl border-4 border-gray-200 shadow-lg">
                    <QRCodeSVG
                      value={paymentData.qrData}
                      size={200}
                      level="H"
                      includeMargin={true}
                    />
                  </div>
                </div>
              )}

              {/* ConnectIPS Bank Selection */}
              {method === 'connectips' && paymentData?.banks && (
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Select Your Bank:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {paymentData.banks.map((bank: any) => (
                      <button
                        key={bank.code}
                        onClick={() => setSelectedBank(bank.code)}
                        className={`p-3 rounded-lg border-2 transition-all text-sm ${
                          selectedBank === bank.code
                            ? 'border-tech-blue bg-blue-50 font-semibold'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {bank.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Transaction Details */}
              <div className="bg-gray-50 rounded-lg p-3 space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-semibold">#{orderId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Transaction ID:</span>
                  <span className="font-mono text-xs break-all text-right ml-2">{transactionId}</span>
                </div>
                {method === 'esewa' && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Merchant ID:</span>
                    <span className="font-semibold">{paymentData?.merchantId}</span>
                  </div>
                )}
              </div>

              {/* Instructions */}
              <div>
                <h3 className="font-bold mb-2 text-gray-900 text-sm">How to Pay:</h3>
                <ol className="space-y-2">
                  {config.instructions.map((instruction, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm">
                      <span className="flex-shrink-0 w-5 h-5 bg-heritage-red text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </span>
                      <span className="text-gray-700 pt-0.5">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Pay Button */}
              <button
                onClick={handlePayNow}
                className={`w-full ${config.color} text-white py-3 rounded-lg font-bold hover:opacity-90 transition-all transform hover:scale-[1.02] shadow-lg flex items-center justify-center space-x-2`}
              >
                <Smartphone size={20} />
                <span>I have paid ✓</span>
              </button>

              <p className="text-center text-xs text-gray-500">
                Click above after completing payment in your app
              </p>
            </div>
          )}

          {step === 'scanning' && (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="text-tech-blue animate-pulse" size={32} />
              </div>
              <h3 className="text-lg font-bold mb-2">Processing Payment...</h3>
              <p className="text-gray-600 mb-4 text-sm">Please wait while we confirm your payment</p>
              <div className="flex justify-center">
                <Loader2 className="animate-spin text-tech-blue" size={28} />
              </div>
            </div>
          )}

          {step === 'verifying' && (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="text-yellow-600 animate-pulse" size={32} />
              </div>
              <h3 className="text-lg font-bold mb-2">Verifying Payment...</h3>
              <p className="text-gray-600 mb-4 text-sm">Checking with {config.name} server</p>
              <div className="flex justify-center">
                <Loader2 className="animate-spin text-heritage-gold" size={28} />
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-6">
              <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <Check className="text-success" size={40} strokeWidth={3} />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-success">Payment Successful!</h3>
              <p className="text-gray-600 mb-4">Transaction completed successfully</p>
              <div className="bg-success/10 rounded-lg p-4">
                <div className="text-xs text-gray-600 mb-1">Transaction ID</div>
                <div className="font-mono font-bold text-success text-sm break-all">{transactionId}</div>
              </div>
            </div>
          )}

          {step === 'failed' && (
            <div className="text-center py-6">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="text-red-600" size={40} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-red-600">Payment Failed</h3>
              <p className="text-gray-600 mb-6 text-sm">{errorMessage}</p>
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setStep('initiated');
                    setErrorMessage('');
                  }}
                  className="flex-1 bg-heritage-red text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
                <button
                  onClick={onCancel}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer - Fixed */}
        {step === 'initiated' && (
          <div className="bg-gray-50 px-6 py-3 border-t flex-shrink-0">
            <div className="flex items-center justify-center space-x-2 text-xs text-gray-600">
              <span className="w-2 h-2 bg-success rounded-full"></span>
              <span>Secured by {config.name}</span>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
