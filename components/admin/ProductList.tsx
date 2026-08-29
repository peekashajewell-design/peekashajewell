'use client';

import { Product } from '@/types';
import Image from 'next/image';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onRefresh: () => void;
}

export default function ProductList({ products, onEdit, onRefresh }: ProductListProps) {
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    console.log('=== DELETE STARTING ===');
    console.log('Product ID:', id);

    const token = sessionStorage.getItem('admin_token');
    console.log('Token from storage:', token);
    console.log('Token exists:', !!token);

    try {
      console.log('About to fetch:', `/api/products/${id}`);

      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Response received:', response.status);

      if (response.ok) {
        console.log('Delete SUCCESS - calling onRefresh');
        toast.success('Product deleted successfully!');
        onRefresh();
      } else {
        const errorData = await response.json();
        console.error('Delete FAILED:', response.status, errorData);
        toast.error(`Failed to delete: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Delete ERROR (exception):', error);
      toast.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    console.log('=== DELETE ENDING ===');
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No products yet. Add your first product!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {products.map((product) => (
        <div key={product.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
          <div className="relative w-24 h-24 flex-shrink-0">
            <Image
              src={product.images[0] || '/placeholder-product.jpg'}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <div className="flex-grow">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-sm text-gray-500 uppercase">{product.category}</p>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {product.description}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary-600">₹{product.price.toLocaleString()}</p>
                <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                {product.featured && (
                  <span className="inline-block mt-1 px-2 py-1 bg-gold-100 text-gold-700 text-xs rounded">
                    Featured
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <button
              onClick={() => onEdit(product)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
              title="Edit"
            >
              <FiEdit className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleDelete(product.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
              title="Delete"
            >
              <FiTrash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
