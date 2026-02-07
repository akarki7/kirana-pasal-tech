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
  CreditCard,
  Smartphone,
  Banknote,
  Check,
  X,
  MessageSquare,
  Volume2,
} from 'lucide-react';
import { storage } from '@/lib/storage';
import { PaymentService, WhatsAppService, VoiceAlertService, BarcodeScannerService } from '@/lib/integrations';
import { Product, Order, OrderItem } from '@/types';

export default function POSSystem() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<'cash' | 'esewa' | 'khalti' | 'bank' | 'credit'>('cash');
  const [showPayment, setShowPayment] = useState(false);
  const [processing, setProcessing] = useState(false);
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
    const tax = subtotal * 0.13; // 13% VAT
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

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert('Cart is empty!');
      return;
    }

    setProcessing(true);

    try {
      // Process payment
      const { subtotal, tax, total } = calculateTotal();

      if (selectedPayment !== 'cash') {
        const paymentResult = await PaymentService.processPayment(
          total,
          selectedPayment as 'esewa' | 'khalti' | 'bank' | 'connectips'
        );

        if (!paymentResult.success) {
          alert(paymentResult.message);
          setProcessing(false);
          return;
        }

        // Play voice alert for digital payment
        VoiceAlertService.playAlert(
          VoiceAlertService.formatPaymentAlert(selectedPayment, total, 'nepali'),
          'nepali'
        );
      }

      // Create order
      const order: Order = {
        id: Date.now().toString(),
        items: cart,
        subtotal,
        tax,
        total,
        paymentMethod: selectedPayment,
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

      // Send WhatsApp confirmation if phone provided
      if (customerPhone) {
        const message = WhatsAppService.formatOrderConfirmation(order, customerPhone);
        await WhatsAppService.sendMessage(customerPhone, message, 'order_confirmation');
      }

      // Success!
      alert(`✅ Order completed!\nTotal: ₹${total.toFixed(2)}\nPayment: ${selectedPayment.toUpperCase()}`);

      // Reset
      setCart([]);
      setCustomerPhone('');
      setCustomerName('');
      setShowPayment(false);
      loadProducts();
    } catch (error) {
      alert('Error processing order. Please try again.');
      console.error(error);
    } finally {
      setProcessing(false);
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
                      onClick={() => setShowPayment(true)}
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

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full">
            <div className="p-6 border-b bg-gradient-to-r from-heritage-red to-heritage-gold text-white rounded-t-xl">
              <h2 className="text-2xl font-bold">Complete Payment</h2>
              <p className="text-white/90">भुक्तानी पूरा गर्नुहोस्</p>
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

              {/* Payment Method */}
              <div>
                <h3 className="font-bold text-lg mb-4">Select Payment Method</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { id: 'cash', icon: <Banknote size={32} />, label: 'Cash', color: 'bg-gray-100' },
                    { id: 'esewa', icon: <Smartphone size={32} />, label: 'eSewa', color: 'bg-esewa/10' },
                    { id: 'khalti', icon: <Smartphone size={32} />, label: 'Khalti', color: 'bg-khalti/10' },
                    { id: 'bank', icon: <CreditCard size={32} />, label: 'Bank Transfer', color: 'bg-blue-100' },
                    { id: 'credit', icon: <CreditCard size={32} />, label: 'Credit (उधारो)', color: 'bg-yellow-100' },
                  ].map(method => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedPayment(method.id as any)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedPayment === method.id
                          ? 'border-heritage-red bg-heritage-red/10'
                          : 'border-gray-200 hover:border-gray-300'
                      } ${method.color}`}
                    >
                      <div className="flex flex-col items-center space-y-2">
                        {method.icon}
                        <span className="font-semibold">{method.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Instructions */}
              {selectedPayment !== 'cash' && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Payment Instructions:</h4>
                  <p className="text-sm text-gray-700 whitespace-pre-line">
                    {PaymentService.getPaymentInstructions(selectedPayment, total)}
                  </p>
                </div>
              )}

              {/* Total */}
              <div className="bg-heritage-red/10 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">Total Amount:</span>
                  <span className="text-3xl font-bold text-heritage-red">₹{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={handleCheckout}
                  disabled={processing}
                  className="flex-1 bg-success hover:bg-green-700 disabled:bg-gray-400 text-white py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center"
                >
                  {processing ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <Check className="mr-2" size={24} />
                      Complete Order
                    </>
                  )}
                </button>
                <button
                  onClick={() => setShowPayment(false)}
                  disabled={processing}
                  className="px-8 bg-gray-200 hover:bg-gray-300 text-gray-700 py-4 rounded-lg font-bold transition-colors flex items-center justify-center"
                >
                  <X className="mr-2" size={24} />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
