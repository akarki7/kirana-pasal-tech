import { Order, WhatsAppMessage } from '@/types';

// Realistic Payment Gateway Integration
export class PaymentService {
  // Generate realistic transaction ID
  static generateTransactionId(gateway: string): string {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    const prefix = {
      esewa: 'ESW',
      khalti: 'KHL',
      fonepay: 'FNP',
      connectips: 'CIP',
    }[gateway] || 'TXN';

    return `${prefix}${timestamp.slice(-10)}${random}`;
  }

  // Generate realistic merchant reference
  static generateMerchantRef(): string {
    return `KIRANA${Date.now().toString().slice(-8)}`;
  }

  // eSewa Payment Flow
  static async initiateEsewa(amount: number, orderId: string) {
    return {
      success: true,
      paymentUrl: `https://esewa.com.np/epay/main`,
      merchantId: 'EPAYTEST',
      productId: orderId,
      totalAmount: amount.toFixed(2),
      transactionUuid: this.generateTransactionId('esewa'),
      qrData: `esewa://pay?merchantId=KIRANA_DIGITAL&amount=${amount}&orderId=${orderId}`,
      expiresIn: 300, // 5 minutes
    };
  }

  // Khalti Payment Flow
  static async initiateKhalti(amount: number, orderId: string) {
    return {
      success: true,
      pidx: this.generateTransactionId('khalti'),
      paymentUrl: 'https://khalti.com/payment/confirm',
      amount: amount * 100, // Khalti uses paisa
      mobile: '',
      productIdentity: orderId,
      productName: 'Kirana Purchase',
      qrData: `khalti://pay?amount=${amount}&merchant=KIRANA_DIGITAL&ref=${orderId}`,
      expiresIn: 600, // 10 minutes
    };
  }

  // Fonepay Payment Flow
  static async initiateFonepay(amount: number, orderId: string) {
    return {
      success: true,
      merchantId: 'M0001',
      prn: this.generateTransactionId('fonepay'),
      amount: amount.toFixed(2),
      orderId: orderId,
      qrData: `fonepay://pay?prn=${this.generateTransactionId('fonepay')}&amount=${amount}&merchant=KIRANA_DIGITAL`,
      expiresIn: 900, // 15 minutes
    };
  }

  // ConnectIPS Payment Flow
  static async initiateConnectIPS(amount: number, orderId: string) {
    return {
      success: true,
      merchantId: 'KIRANA_001',
      txnId: this.generateTransactionId('connectips'),
      amount: amount.toFixed(2),
      orderId: orderId,
      banks: [
        { code: 'NIBL', name: 'Nepal Investment Bank' },
        { code: 'NICA', name: 'NIC Asia Bank' },
        { code: 'SCB', name: 'Standard Chartered Bank' },
        { code: 'NBL', name: 'Nepal Bank Limited' },
        { code: 'HBL', name: 'Himalayan Bank' },
        { code: 'GBIME', name: 'Global IME Bank' },
      ],
    };
  }

  // Simulate payment verification with realistic flow
  static async verifyPayment(
    transactionId: string,
    gateway: 'esewa' | 'khalti' | 'fonepay' | 'connectips'
  ): Promise<{
    success: boolean;
    status: 'pending' | 'completed' | 'failed';
    transactionId: string;
    amount?: number;
    paidAt?: string;
    message: string;
  }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 95% success rate
    const isSuccess = Math.random() > 0.05;

    if (isSuccess) {
      return {
        success: true,
        status: 'completed',
        transactionId,
        paidAt: new Date().toISOString(),
        message: `Payment successful via ${gateway.toUpperCase()}`,
      };
    } else {
      return {
        success: false,
        status: 'failed',
        transactionId,
        message: 'Payment verification failed. Please try again.',
      };
    }
  }

  // Generate payment receipt
  static generateReceipt(order: Order, transactionId: string) {
    return {
      receiptNo: `RCP${Date.now().toString().slice(-10)}`,
      transactionId,
      orderId: order.id,
      date: new Date().toLocaleString('en-NP', { timeZone: 'Asia/Kathmandu' }),
      items: order.items,
      subtotal: order.subtotal,
      tax: order.tax,
      total: order.total,
      paymentMethod: order.paymentMethod.toUpperCase(),
      status: 'PAID',
    };
  }

  // Refund simulation
  static async refundPayment(transactionId: string, amount: number, gateway: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(`Refund initiated: ${transactionId} - ₹${amount} via ${gateway}`);
    return true;
  }
}

// WhatsApp Integration (Enhanced)
export class WhatsAppService {
  static async sendMessage(to: string, message: string, type: WhatsAppMessage['type']): Promise<WhatsAppMessage> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const whatsappMessage: WhatsAppMessage = {
      to,
      message,
      type,
      sentAt: new Date().toISOString(),
      status: 'sent',
    };

    setTimeout(() => {
      whatsappMessage.status = 'delivered';
    }, 2000);

    setTimeout(() => {
      whatsappMessage.status = 'read';
    }, 5000);

    console.log('📱 WhatsApp Message Sent:', whatsappMessage);
    return whatsappMessage;
  }

  static formatOrderConfirmation(order: Order, customerPhone: string, transactionId?: string): string {
    const items = order.items.map(item =>
      `• ${item.productName} x${item.quantity} - ₹${item.total.toFixed(2)}`
    ).join('\n');

    let message = `🛒 *Order Confirmation*

*Kirana Digital Store*
Order ID: #${order.id}

📦 *Items:*
${items}

💰 *Payment Details:*
Subtotal: ₹${order.subtotal.toFixed(2)}
Tax (13%): ₹${order.tax.toFixed(2)}
*Total: ₹${order.total.toFixed(2)}*

Payment Method: ${order.paymentMethod.toUpperCase()}`;

    if (transactionId) {
      message += `\nTransaction ID: ${transactionId}`;
    }

    message += `\n\nDate: ${new Date().toLocaleString('en-NP')}

Thank you for your purchase!
धन्यवाद!

- किराना डिजिटल
📞 +977 1-234-5678`;

    return message;
  }

  static formatPaymentReceipt(
    orderId: string,
    amount: number,
    transactionId: string,
    gateway: string
  ): string {
    return `💳 *Payment Receipt*

*Kirana Digital*

Order ID: ${orderId}
Amount Paid: ₹${amount.toFixed(2)}
Payment Method: ${gateway.toUpperCase()}
Transaction ID: ${transactionId}

Date: ${new Date().toLocaleString('en-NP')}
Status: ✅ PAID

Thank you!
धन्यवाद!`;
  }

  static formatStockAlert(productName: string, currentStock: number): string {
    return `⚠️ *Stock Alert*

${productName}
Current Stock: ${currentStock} units

कृपया अर्डर दिनुहोस्।
Please reorder soon.

- Kirana Digital AI`;
  }

  static formatPaymentReminder(customerName: string, amount: number): string {
    return `💳 *Payment Reminder*

Dear ${customerName},

Outstanding Amount: ₹${amount}

कृपया भुक्तानी गर्नुहोस्।
Please make payment at your earliest convenience.

Thank you!
- किराना डिजिटल`;
  }

  static formatReorderSuggestion(productName: string, quantity: number, supplierPhone?: string): string {
    let message = `📦 *Smart Reorder Suggestion*

Product: ${productName}
Recommended Order: ${quantity} units

📊 Based on AI sales prediction

Current stock is running low. Reorder recommended to avoid stockout.`;

    if (supplierPhone) {
      message += `\n\n📞 Supplier Contact: ${supplierPhone}`;
    }

    message += '\n\n- Kirana Digital AI';
    return message;
  }
}

// Voice Alert Service
export class VoiceAlertService {
  static playAlert(message: string, language: 'nepali' | 'english' = 'nepali'): void {
    console.log(`🔊 Voice Alert (${language}):`, message);

    // Browser notification
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification('Payment Received', {
          body: message,
          icon: '/logo.png',
          badge: '/badge.png'
        });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification('Payment Received', { body: message });
          }
        });
      }
    }

    // Visual alert in UI
    if (typeof window !== 'undefined') {
      const alertDiv = document.createElement('div');
      alertDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #60BB46 0%, #2ECC71 100%);
        color: white;
        padding: 20px 30px;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        z-index: 10000;
        font-size: 18px;
        font-weight: bold;
        animation: slideIn 0.3s ease-out;
      `;
      alertDiv.innerHTML = `🔊 ${message}`;
      document.body.appendChild(alertDiv);

      setTimeout(() => {
        alertDiv.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => document.body.removeChild(alertDiv), 300);
      }, 5000);
    }
  }

  static formatPaymentAlert(method: string, amount: number, language: 'nepali' | 'english' = 'nepali'): string {
    if (language === 'nepali') {
      return `${method} बाट रु ${amount.toFixed(2)} भुक्तानी प्राप्त भयो`;
    } else {
      return `Payment of Rs ${amount.toFixed(2)} received via ${method}`;
    }
  }

  static formatStockAlert(productName: string, stock: number, language: 'nepali' | 'english' = 'nepali'): string {
    if (language === 'nepali') {
      return `सावधान! ${productName} को स्टक कम छ। बाँकी: ${stock}`;
    } else {
      return `Alert! ${productName} stock is low. Remaining: ${stock}`;
    }
  }
}

// Barcode Scanner Service
export class BarcodeScannerService {
  static async scan(): Promise<string | null> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const sampleBarcodes = ['8901234567890', '8901234567891'];
    return sampleBarcodes[Math.floor(Math.random() * sampleBarcodes.length)];
  }

  static isValidBarcode(code: string): boolean {
    return /^\d{13}$/.test(code);
  }

  static async scanWithCamera(): Promise<string | null> {
    // In real implementation, would use getUserMedia API
    console.log('📷 Camera scanning simulation...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    return this.scan();
  }
}
