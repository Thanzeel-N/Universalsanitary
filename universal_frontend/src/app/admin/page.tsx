"use client";


import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import Cookies from "js-cookie";
import { apiUrl } from "@/lib/api";

export default function AdminDashboard() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await fetch(apiUrl(`/api/v1/products/`));
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    
    const token = Cookies.get("access_token");
    try {
      await fetch(apiUrl(`/api/v1/products/${slug}/`), {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to delete product.");
    }
  };

  if (loading) return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div className="h-8 bg-neutral-200 rounded w-48 animate-pulse"></div>
        <div className="h-10 bg-neutral-200 rounded w-32 animate-pulse"></div>
      </div>
      <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
        <div className="w-full text-left border-collapse">
          <div className="bg-neutral-50 border-b border-neutral-200 flex justify-between p-4">
            <div className="h-4 bg-neutral-200 rounded w-32 animate-pulse"></div>
            <div className="h-4 bg-neutral-200 rounded w-16 animate-pulse"></div>
          </div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border-b border-neutral-100 p-4 flex justify-between items-center">
              <div className="h-4 bg-neutral-200 rounded w-64 animate-pulse"></div>
              <div className="flex gap-3">
                <div className="h-4 w-4 bg-neutral-200 rounded animate-pulse"></div>
                <div className="h-4 w-4 bg-neutral-200 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-playfair font-bold text-[#222]">Products</h1>
        <Link 
          href="/admin/products/new" 
          className="bg-[#2a2f35] text-white px-4 py-2 flex items-center gap-2 text-sm uppercase tracking-widest font-bold hover:bg-black transition-colors rounded"
        >
          <Plus size={16} /> Add Product
        </Link>
      </div>

      <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200 text-xs uppercase tracking-widest text-neutral-500">
              <th className="p-4 font-bold">Product Name</th>
              <th className="p-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                <td className="p-4 font-sans text-[#222] font-medium">{product.name}</td>
                <td className="p-4 flex justify-end gap-3">
                  <Link href={`/admin/products/${product.slug}/edit`} className="text-blue-500 hover:text-blue-700">
                    <Edit size={18} />
                  </Link>
                  <button onClick={() => handleDelete(product.slug)} className="text-red-500 hover:text-red-700">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={2} className="p-8 text-center text-neutral-500">No products found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
