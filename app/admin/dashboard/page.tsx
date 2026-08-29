'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiPackage, FiShoppingBag, FiPlus, FiLogOut, FiHome, FiDownload } from 'react-icons/fi';
import { Product, Order } from '@/types';
import ProductForm from '@/components/admin/ProductForm';
import ProductList from '@/components/admin/ProductList';
import OrderList from '@/components/admin/OrderList';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem('admin_token');
    // Validate the token matches the correct password
    if (!token || token !== 'shreyariji1234123') {
      sessionStorage.removeItem('admin_token');
      router.push('/admin');
      return;
    }
    setIsAuthenticated(true);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = sessionStorage.getItem('admin_token');

      // Add cache busting to force fresh data from database
      const timestamp = new Date().getTime();
      const productsRes = await fetch(`/api/products?_=${timestamp}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      const productsData = await productsRes.json();
      setProducts(productsData);

      const ordersRes = await fetch(`/api/orders?_=${timestamp}`, {
        cache: 'no-store',
        headers: {
          Authorization: `Bearer ${token}`,
          'Cache-Control': 'no-cache',
        },
      });
      if (ordersRes.ok) {
        const ordersData = await ordersRes.json();
        setOrders(ordersData);
      }
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_token');
    router.push('/admin');
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleProductSaved = () => {
    setShowProductForm(false);
    setEditingProduct(null);
    fetchData();
    toast.success('Product saved successfully!');
  };

  const handleBackup = async () => {
    try {
      const token = sessionStorage.getItem('admin_token');
      const response = await fetch('/api/backup', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const backup = await response.json();
        const dataStr = JSON.stringify(backup, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `peekasha-backup-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
        toast.success('Backup downloaded successfully!');
      } else {
        toast.error('Failed to create backup');
      }
    } catch (error) {
      toast.error('Backup failed');
    }
  };

  // Don't render dashboard until authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500">Checking authentication...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm relative z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-display font-bold text-primary-600">
              Admin Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <button
                onClick={handleBackup}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-green-50 hover:bg-green-100 hover:text-green-700 rounded-lg transition-all cursor-pointer font-medium"
                title="Download backup of all products and orders"
              >
                <FiDownload className="w-5 h-5" />
                <span>Backup Data</span>
              </button>
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-primary-100 hover:text-primary-700 rounded-lg transition-all cursor-pointer font-medium"
              >
                <FiHome className="w-5 h-5" />
                <span>View Site</span>
              </a>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-red-100 hover:text-red-700 rounded-lg transition-all cursor-pointer font-medium"
              >
                <FiLogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">Total Products</p>
                <p className="text-3xl font-bold text-gray-900">{products.length}</p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <FiPackage className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900">{orders.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FiShoppingBag className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-4 px-4 font-semibold transition-colors ${
              activeTab === 'products'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-4 px-4 font-semibold transition-colors ${
              activeTab === 'orders'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Orders
          </button>
        </div>

        {/* Content */}
        <div className="card p-6">
          {activeTab === 'products' ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Manage Products</h2>
                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setShowProductForm(true);
                  }}
                  className="btn-primary flex items-center space-x-2"
                >
                  <FiPlus className="w-5 h-5" />
                  <span>Add Product</span>
                </button>
              </div>

              {showProductForm ? (
                <ProductForm
                  product={editingProduct}
                  onSave={handleProductSaved}
                  onCancel={() => {
                    setShowProductForm(false);
                    setEditingProduct(null);
                  }}
                />
              ) : (
                <ProductList
                  products={products}
                  onEdit={handleEditProduct}
                  onRefresh={fetchData}
                />
              )}
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold mb-6">Orders</h2>
              <OrderList orders={orders} onRefresh={fetchData} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
