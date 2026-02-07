'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Search,
  Scan,
  Smartphone,
  Banknote,
  CreditCard,
} from 'lucide-react';
import { storage } from '@/lib/storage';
import { WhatsAppService, VoiceAlertService, BarcodeScannerService } from '@/lib/integrations';
import { Product, Order, OrderItem } from '@/types';
import PaymentModal from '@/components/PaymentModal';

export default function POSSystem() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<'cash' | 'esewa' | 'khalti' | 'fonepay' | 'connectips' | 'credit'>('cash');
  const [showPaymentSelection, setShowPaymentSelection] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerName, setCustomerName] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    setProducts(storage.getProducts());
  };

  const filteredProducts = products.filter(
    p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.nameNepali.includes(searchQuery) ||
      p.barcode?.includes(searchQuery)
  );

  const addToCart = (product: Product) => {
    if (product.stock <= 0) {
      alert(`${product.name} is out of stock!`);
      return;
    }

    const existingItem = cart.find(item => item.productId === product.id);

    if (existingItem) {
      if (existingItem.quantity >= product.stock) {
        alert('Not enough stock available!');
        return;
      }
      setCart(
        cart.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          productId: product.id,
          productName: product.name,
          quantity: 1,
          price: product.price,
          total: product.price,
        },
      ]);
    }
  };

  const updateQuantity = (productId: string, change: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    setCart(
      cart
        .map(item => {
          if (item.productId === productId) {
            const newQuantity = item.quantity + change;
            if (newQuantity <= 0) return null;
            if (newQuantity > product.stock) {
              alert('Not enough stock!');
              return item;
            }
            return {
              ...item,
              quantity: newQuantity,
              total: newQuantity * item.price,
            };
          }
          return item;
        })
        .filter((item): item is OrderItem => item !== null)
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.productId !== productId));
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.13;
    return { subtotal, tax, total: subtotal + tax };
  };

  const handleScanBarcode = async () => {
    const barcode = await BarcodeScannerService.scan();
    if (barcode) {
      const product = products.find(p => p.barcode === barcode);
      if (product) {
        addToCart(product);
        alert(`Added: ${product.name}`);
      } else {
        alert('Product not found!');
      }
    }
  };

  const handleProceedToPayment = () => {
    if (cart.length === 0) {
      alert('Cart is empty!');
      return;
    }
    setShowPaymentSelection(true);
  };

  const handlePaymentMethodSelected = (method: typeof selectedPayment) => {
    setSelectedPayment(method);

    if (method === 'cash' || method === 'credit') {
      // Direct checkout for cash and credit
      completeOrder(method);
    } else {
      // Show payment modal for digital payments
      setShowPaymentSelection(false);
      setShowPaymentModal(true);
    }
  };

  const handlePaymentSuccess = async (transactionId: string) => {
    setShowPaymentModal(false);
    await completeOrder(selectedPayment, transactionId);
  };

  const completeOrder = async (paymentMethod: typeof selectedPayment, transactionId?: string) => {
    try {
      const { subtotal, tax, total } = calculateTotal();

      // Create order
      const order: Order = {
        id: Date.now().toString(),
        items: cart,
        subtotal,
        tax,
        total,
        paymentMethod,
        paymentStatus: 'completed',
        customerName: customerName || undefined,
        customerPhone: customerPhone || undefined,
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
      };

      // Save order
      storage.addOrder(order);

      // Update product stock
      cart.forEach(item => {
        const product = products.find(p => p.id === item.productId);
        if (product) {
          storage.updateProduct(product.id, {
            stock: product.stock - item.quantity,
          });
        }
      });

      // Play voice alert for digital payments
      if (paymentMethod !== 'cash' && paymentMethod !== 'credit') {
        VoiceAlertService.playAlert(
          VoiceAlertService.formatPaymentAlert(paymentMethod, total, 'nepali'),
          'nepali'
        );
      }

      // Send WhatsApp confirmation if phone provided
      if (customerPhone) {
        const message = WhatsAppService.formatOrderConfirmation(order, customerPhone, transactionId);
        await WhatsAppService.sendMessage(customerPhone, message, 'order_confirmation');
        console.log('📱 WhatsApp Receipt:', message);
      }

      // Success!
      alert(
        `✅ Order completed successfully!\n\n` +
        `Order ID: #${order.id}\n` +
        `Total: ₹${total.toFixed(2)}\n` +
        `Payment: ${paymentMethod.toUpperCase()}` +
        (transactionId ? `\nTransaction ID: ${transactionId}` : '') +
        (customerPhone ? '\n\n📱 Receipt sent via WhatsApp' : '')
      );

      // Reset
      setCart([]);
      setCustomerPhone('');
      setCustomerName('');
      setShowPaymentSelection(false);
      setShowPaymentModal(false);
      loadProducts();
    } catch (error) {
      alert('Error processing order. Please try again.');
      console.error(error);
    }
  };

  const { subtotal, tax, total } = calculateTotal();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-heritage-red">POS System</h1>
              <p className="text-gray-600">बिक्री प्रणाली</p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/admin"
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Admin Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Products Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search Bar */}
            <div className="bg-white p-4 rounded-xl shadow-md">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search products... (Name, Nepali, Barcode)"
                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-heritage-red text-lg"
                  />
                </div>
                <button
                  onClick={handleScanBarcode}
                  className="bg-tech-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center"
                >
                  <Scan className="mr-2" size={20} />
                  Scan
                </button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filteredProducts.map(product => (
                <button
                  key={product.id}
                  onClick={() => addToCart(product)}
                  disabled={product.stock === 0}
                  className={`bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all text-left ${
                    product.stock === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:border-2 hover:border-heritage-red'
                  }`}
                >
                  <div className="font-bold text-lg mb-1">{product.name}</div>
                  <div className="text-sm text-gray-600 mb-2">{product.nameNepali}</div>
                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold text-heritage-red">₹{product.price}</div>
                    <div
                      className={`text-sm font-semibold ${
                        product.stock === 0
                          ? 'text-red-600'
                          : product.stock <= product.minStock
                          ? 'text-yellow-600'
                          : 'text-green-600'
                      }`}
                    >
                      {product.stock} {product.unit}
                    </div>
                  </div>
                  {product.stock === 0 && (
                    <div className="mt-2 bg-red-100 text-red-800 text-xs font-semibold py-1 px-2 rounded text-center">
                      OUT OF STOCK
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Cart Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg sticky top-24">
              <div className="p-6 border-b bg-heritage-red text-white rounded-t-xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold flex items-center">
                    <ShoppingCart className="mr-2" size={28} />
                    Cart
                  </h2>
                  <span className="text-2xl font-bold">{cart.length}</span>
                </div>
              </div>

              <div className="p-6 max-h-96 overflow-y-auto">
                {cart.length === 0 ? (
                  <div className="text-center text-gray-500 py-12">
                    <ShoppingCart size={48} className="mx-auto mb-4 opacity-30" />
                    <p>Cart is empty</p>
                    <p className="text-sm">कार्ट खाली छ</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cart.map(item => (
                      <div key={item.productId} className="border-b pb-3">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <div className="font-semibold">{item.productName}</div>
                            <div className="text-sm text-gray-600">₹{item.price} each</div>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.productId)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.productId, -1)}
                              className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="w-12 text-center font-bold text-lg">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.productId, 1)}
                              className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <div className="font-bold text-lg">₹{item.total.toFixed(2)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <>
                  <div className="p-6 border-t space-y-2">
                    <div className="flex justify-between text-gray-700">
                      <span>Subtotal</span>
                      <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Tax (13%)</span>
                      <span className="font-semibold">₹{tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-heritage-red pt-2 border-t">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="p-6 border-t">
                    <button
                      onClick={handleProceedToPayment}
                      className="w-full bg-success hover:bg-green-700 text-white py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center"
                    >
                      <CreditCard className="mr-2" size={24} />
                      Proceed to Payment
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method Selection Modal */}
      {showPaymentSelection && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full">
            <div className="p-6 border-b bg-gradient-to-r from-heritage-red to-heritage-gold text-white rounded-t-xl">
              <h2 className="text-2xl font-bold">Select Payment Method</h2>
              <p className="text-white/90">भुक्तानी विधि छान्नुहोस्</p>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Details */}
              <div className="space-y-4">
                <h3 className="font-bold text-lg">Customer Details (Optional)</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    placeholder="Customer Name"
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-heritage-red"
                  />
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={e => setCustomerPhone(e.target.value)}
                    placeholder="Phone (for WhatsApp receipt)"
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-heritage-red"
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <h3 className="font-bold text-lg mb-4">Choose Payment Method</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => handlePaymentMethodSelected('cash')}
                    className="p-6 rounded-xl border-2 border-gray-200 hover:border-heritage-red hover:bg-gray-50 transition-all group"
                  >
                    <Banknote className="mx-auto mb-3 text-gray-700 group-hover:text-heritage-red" size={40} />
                    <div className="font-semibold">Cash</div>
                    <div className="text-sm text-gray-600">नगद</div>
                  </button>

                  <button
                    onClick={() => handlePaymentMethodSelected('esewa')}
                    className="p-6 rounded-xl border-2 border-gray-200 hover:border-[#60BB46] hover:bg-green-50 transition-all group"
                  >
                    <div className="text-4xl mb-3">💚</div>
                    <div className="font-semibold">eSewa</div>
                    <div className="text-sm text-gray-600">Digital Wallet</div>
                  </button>

                  <button
                    onClick={() => handlePaymentMethodSelected('khalti')}
                    className="p-6 rounded-xl border-2 border-gray-200 hover:border-[#5D2E8E] hover:bg-purple-50 transition-all group"
                  >
                    <div className="text-4xl mb-3">💜</div>
                    <div className="font-semibold">Khalti</div>
                    <div className="text-sm text-gray-600">Digital Wallet</div>
                  </button>

                  <button
                    onClick={() => handlePaymentMethodSelected('fonepay')}
                    className="p-6 rounded-xl border-2 border-gray-200 hover:border-[#ED1C24] hover:bg-red-50 transition-all group"
                  >
                    <div className="text-4xl mb-3">🔴</div>
                    <div className="font-semibold">Fonepay</div>
                    <div className="text-sm text-gray-600">QR Payment</div>
                  </button>

                  <button
                    onClick={() => handlePaymentMethodSelected('connectips')}
                    className="p-6 rounded-xl border-2 border-gray-200 hover:border-[#0066CC] hover:bg-blue-50 transition-all group"
                  >
                    <Smartphone className="mx-auto mb-3 text-gray-700 group-hover:text-blue-600" size={40} />
                    <div className="font-semibold">ConnectIPS</div>
                    <div className="text-sm text-gray-600">Bank Transfer</div>
                  </button>

                  <button
                    onClick={() => handlePaymentMethodSelected('credit')}
                    className="p-6 rounded-xl border-2 border-gray-200 hover:border-heritage-gold hover:bg-yellow-50 transition-all group"
                  >
                    <CreditCard className="mx-auto mb-3 text-gray-700 group-hover:text-heritage-gold" size={40} />
                    <div className="font-semibold">Credit</div>
                    <div className="text-sm text-gray-600">उधारो</div>
                  </button>
                </div>
              </div>

              {/* Total */}
              <div className="bg-heritage-red/10 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">Total Amount:</span>
                  <span className="text-3xl font-bold text-heritage-red">₹{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Cancel Button */}
              <button
                onClick={() => setShowPaymentSelection(false)}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-bold transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Realistic Payment Modal */}
      {showPaymentModal && (
        <PaymentModal
          amount={total}
          orderId={Date.now().toString()}
          method={selectedPayment as 'esewa' | 'khalti' | 'fonepay' | 'connectips'}
          onSuccess={handlePaymentSuccess}
          onCancel={() => {
            setShowPaymentModal(false);
            setShowPaymentSelection(true);
          }}
        />
      )}
    </div>
  );
}
