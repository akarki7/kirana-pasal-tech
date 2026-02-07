'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, AlertTriangle, TrendingUp, Package, ShoppingCart, DollarSign, Users, Brain, MessageSquare } from 'lucide-react';
import { storage } from '@/lib/storage';
import { AIService } from '@/lib/ai-service';
import { WhatsAppService } from '@/lib/integrations';
import { Product, Order, SalesPrediction } from '@/types';

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [predictions, setPredictions] = useState<SalesPrediction[]>([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<'products' | 'analytics' | 'ai'>('products');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const loadedProducts = storage.getProducts();
    const loadedOrders = storage.getOrders();
    setProducts(loadedProducts);
    setOrders(loadedOrders);

    // Generate AI predictions
    const aiPredictions = AIService.predictDemand(loadedProducts, loadedOrders);
    setPredictions(aiPredictions);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      storage.deleteProduct(id);
      loadData();
    }
  };

  const handleSendReorderAlert = async (prediction: SalesPrediction) => {
    const product = products.find(p => p.id === prediction.productId);
    if (!product) return;

    const message = WhatsAppService.formatReorderSuggestion(
      product.name,
      prediction.recommendedOrder,
      product.supplier
    );

    alert(`WhatsApp message would be sent to supplier:\n\n${message}`);
  };

  // Calculate dashboard stats
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const lowStockCount = products.filter(p => p.stock <= p.minStock).length;
  const bestSellers = AIService.getBestSellers(orders, 5);
  const criticalAlerts = storage.getAlerts().filter(a => a.severity === 'critical' || a.severity === 'out');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">प्रशासकीय ड्यासबोर्ड</p>
            </div>
            <div className="flex gap-3">
              <Link href="/pos" className="bg-heritage-red text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                Open POS
              </Link>
              <Link href="/" className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                Back to Site
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-heritage-red">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900">₹{totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="text-heritage-red" size={40} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-tech-blue">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Products</p>
                <p className="text-3xl font-bold text-gray-900">{products.length}</p>
              </div>
              <Package className="text-tech-blue" size={40} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-success">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900">{orders.length}</p>
              </div>
              <ShoppingCart className="text-success" size={40} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-alert">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Low Stock Items</p>
                <p className="text-3xl font-bold text-gray-900">{lowStockCount}</p>
              </div>
              <AlertTriangle className="text-alert" size={40} />
            </div>
          </div>
        </div>

        {/* Critical Alerts */}
        {criticalAlerts.length > 0 && (
          <div className="bg-red-50 border-l-4 border-heritage-red p-4 mb-8 rounded-lg">
            <div className="flex items-start">
              <AlertTriangle className="text-heritage-red mt-1 mr-3" size={24} />
              <div className="flex-1">
                <h3 className="font-bold text-red-900 mb-2">Critical Stock Alerts!</h3>
                <ul className="space-y-1">
                  {criticalAlerts.map(alert => (
                    <li key={alert.id} className="text-red-800">
                      • {alert.productName} - Only {alert.currentStock} units left!
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex space-x-4 mb-6 border-b">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'products'
                ? 'border-b-2 border-heritage-red text-heritage-red'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Package className="inline mr-2" size={20} />
            Products Management
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'analytics'
                ? 'border-b-2 border-heritage-red text-heritage-red'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <TrendingUp className="inline mr-2" size={20} />
            Analytics
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'ai'
                ? 'border-b-2 border-heritage-red text-heritage-red'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Brain className="inline mr-2" size={20} />
            AI Insights
          </button>
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Product Inventory</h2>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setShowAddProduct(true);
                }}
                className="bg-heritage-red text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center"
              >
                <Plus className="mr-2" size={20} />
                Add New Product
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Product</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Price</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Stock</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {products.map(product => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-semibold text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-600">{product.nameNepali}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{product.category}</td>
                      <td className="px-6 py-4 font-semibold text-gray-900">₹{product.price}</td>
                      <td className="px-6 py-4">
                        <span className="font-semibold">{product.stock} {product.unit}</span>
                      </td>
                      <td className="px-6 py-4">
                        {product.stock === 0 ? (
                          <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                            Out of Stock
                          </span>
                        ) : product.stock <= product.minStock ? (
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                            Low Stock
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                            In Stock
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setEditingProduct(product);
                              setShowAddProduct(true);
                            }}
                            className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-4">Best Selling Products</h3>
              <div className="space-y-3">
                {bestSellers.map((item, index) => (
                  <div key={item.productId} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-heritage-red text-white rounded-full flex items-center justify-center font-bold">
                        #{index + 1}
                      </div>
                      <div>
                        <div className="font-semibold">{item.name}</div>
                        <div className="text-sm text-gray-600">{item.quantity} units sold</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-success">₹{item.revenue.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Revenue</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-4">Revenue by Payment Method</h3>
                <div className="space-y-3">
                  {['cash', 'esewa', 'khalti', 'bank'].map(method => {
                    const methodOrders = orders.filter(o => o.paymentMethod === method);
                    const revenue = methodOrders.reduce((sum, o) => sum + o.total, 0);
                    return (
                      <div key={method} className="flex justify-between items-center">
                        <span className="font-semibold capitalize">{method}</span>
                        <span className="text-gray-900 font-bold">₹{revenue.toLocaleString()}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Average Order Value</span>
                    <span className="font-bold">₹{orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Items Sold</span>
                    <span className="font-bold">
                      {orders.reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0), 0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Products Below Min Stock</span>
                    <span className="font-bold text-alert">{lowStockCount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Insights Tab */}
        {activeTab === 'ai' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-tech-purple to-purple-600 p-6 rounded-xl text-white">
              <div className="flex items-center space-x-3 mb-2">
                <Brain size={32} />
                <h3 className="text-2xl font-bold">AI-Powered Insights</h3>
              </div>
              <p>Smart predictions based on your sales patterns and inventory levels</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {predictions.slice(0, 6).map(prediction => {
                const urgency = prediction.currentStock / (prediction.predictedDemand || 1);
                const isUrgent = urgency < 0.5;

                return (
                  <div
                    key={prediction.productId}
                    className={`bg-white p-6 rounded-xl shadow-md border-l-4 ${
                      isUrgent ? 'border-red-500' : 'border-yellow-500'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold text-lg">{prediction.productName}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm text-gray-600">Confidence:</span>
                          <span className="font-semibold text-success">{prediction.confidence}%</span>
                        </div>
                      </div>
                      {isUrgent && <AlertTriangle className="text-red-500" size={24} />}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-600">Current Stock</div>
                        <div className="text-xl font-bold">{prediction.currentStock}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Predicted Demand</div>
                        <div className="text-xl font-bold text-tech-blue">{prediction.predictedDemand}</div>
                      </div>
                    </div>

                    {prediction.recommendedOrder > 0 && (
                      <div className="bg-heritage-red/10 p-3 rounded-lg mb-4">
                        <div className="text-sm text-gray-700">Recommended Order</div>
                        <div className="text-2xl font-bold text-heritage-red">{prediction.recommendedOrder} units</div>
                      </div>
                    )}

                    <div className="space-y-2 mb-4">
                      {prediction.reasoning.map((reason, idx) => (
                        <div key={idx} className="text-sm text-gray-600 flex items-start">
                          <span className="mr-2">•</span>
                          <span>{reason}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => handleSendReorderAlert(prediction)}
                      className="w-full bg-success hover:bg-green-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
                    >
                      <MessageSquare className="mr-2" size={18} />
                      Send WhatsApp Alert
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Product Modal */}
      {showAddProduct && (
        <ProductModal
          product={editingProduct}
          onClose={() => {
            setShowAddProduct(false);
            setEditingProduct(null);
          }}
          onSave={() => {
            setShowAddProduct(false);
            setEditingProduct(null);
            loadData();
          }}
        />
      )}
    </div>
  );
}

// Product Modal Component
function ProductModal({
  product,
  onClose,
  onSave,
}: {
  product: Product | null;
  onClose: () => void;
  onSave: () => void;
}) {
  const [formData, setFormData] = useState<Partial<Product>>(
    product || {
      name: '',
      nameNepali: '',
      category: '',
      price: 0,
      stock: 0,
      unit: 'kg',
      minStock: 10,
      maxStock: 100,
      supplier: '',
      barcode: '',
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (product) {
      storage.updateProduct(product.id, formData);
    } else {
      const newProduct: Product = {
        ...formData as Product,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      storage.addProduct(newProduct);
    }

    onSave();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold">{product ? 'Edit Product' : 'Add New Product'}</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Product Name (English) *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-heritage-red"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Product Name (Nepali)</label>
              <input
                type="text"
                value={formData.nameNepali}
                onChange={e => setFormData({ ...formData, nameNepali: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-heritage-red"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Category *</label>
              <select
                required
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-heritage-red"
              >
                <option value="">Select Category</option>
                <option value="Grains">Grains</option>
                <option value="Oils">Oils</option>
                <option value="Groceries">Groceries</option>
                <option value="Beverages">Beverages</option>
                <option value="Dairy">Dairy</option>
                <option value="Snacks">Snacks</option>
                <option value="Personal Care">Personal Care</option>
                <option value="Household">Household</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Price (₹) *</label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-heritage-red"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Current Stock *</label>
              <input
                type="number"
                required
                min="0"
                value={formData.stock}
                onChange={e => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-heritage-red"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Unit *</label>
              <select
                required
                value={formData.unit}
                onChange={e => setFormData({ ...formData, unit: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-heritage-red"
              >
                <option value="kg">Kilogram (kg)</option>
                <option value="liter">Liter</option>
                <option value="piece">Piece</option>
                <option value="packet">Packet</option>
                <option value="bottle">Bottle</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Minimum Stock *</label>
              <input
                type="number"
                required
                min="0"
                value={formData.minStock}
                onChange={e => setFormData({ ...formData, minStock: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-heritage-red"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Maximum Stock *</label>
              <input
                type="number"
                required
                min="0"
                value={formData.maxStock}
                onChange={e => setFormData({ ...formData, maxStock: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-heritage-red"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Supplier</label>
              <input
                type="text"
                value={formData.supplier}
                onChange={e => setFormData({ ...formData, supplier: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-heritage-red"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Barcode</label>
              <input
                type="text"
                value={formData.barcode}
                onChange={e => setFormData({ ...formData, barcode: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-heritage-red"
                placeholder="13-digit barcode"
              />
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-heritage-red text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              {product ? 'Update Product' : 'Add Product'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
