"use client";


import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import Cookies from "js-cookie";
import { apiUrl } from "@/lib/api";

export default function AdminDashboard() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [resProducts, resCategories, resBrands] = await Promise.all([
        fetch(apiUrl(`/api/v1/products/`)),
        fetch(apiUrl(`/api/v1/categories/`)),
        fetch(apiUrl(`/api/v1/brands/`))
      ]);
      const dataProducts = await resProducts.json();
      const dataCategories = await resCategories.json();
      const dataBrands = await resBrands.json();
      
      setProducts(dataProducts);
      setCategories(dataCategories);
      setBrands(dataBrands);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteProduct = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    const token = Cookies.get("access_token");
    try {
      await fetch(apiUrl(`/api/v1/products/${slug}/`), {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Failed to delete product.");
    }
  };

  const handleUpdateCategoryOrder = async (slug: string, newOrder: number) => {
    const token = Cookies.get("access_token");
    try {
      await fetch(apiUrl(`/api/v1/categories/${slug}/`), {
        method: "PATCH",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ order: newOrder })
      });
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Failed to update category order.");
    }
  };

  const handleDeleteCategory = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    const token = Cookies.get("access_token");
    try {
      await fetch(apiUrl(`/api/v1/categories/${slug}/`), {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Failed to delete category.");
    }
  };

  const handleDeleteBrand = async (id: number) => {
    if (!confirm("Are you sure you want to delete this brand?")) return;
    const token = Cookies.get("access_token");
    try {
      await fetch(apiUrl(`/api/v1/brands/${id}/`), {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Failed to delete brand.");
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
    <div className="space-y-12">
      {/* Products Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-playfair font-bold text-[#222]">Products</h2>
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
                    <button onClick={() => handleDeleteProduct(product.slug)} className="text-red-500 hover:text-red-700">
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

      {/* Categories Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-playfair font-bold text-[#222]">Categories</h2>
        </div>
        <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200 text-xs uppercase tracking-widest text-neutral-500">
                <th className="p-4 font-bold">Category Name</th>
                <th className="p-4 font-bold text-center">Order</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(category => (
                <tr key={category.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="p-4 font-sans text-[#222] font-medium">{category.name}</td>
                  <td className="p-4 text-center">
                    <input 
                      type="number" 
                      defaultValue={category.order || 0}
                      className="w-16 border border-neutral-200 rounded px-2 py-1 text-center"
                      onBlur={(e) => handleUpdateCategoryOrder(category.slug, parseInt(e.target.value))}
                    />
                  </td>
                  <td className="p-4 flex justify-end gap-3">
                    <button onClick={() => handleDeleteCategory(category.slug)} className="text-red-500 hover:text-red-700">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan={2} className="p-8 text-center text-neutral-500">No categories found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Brands Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-playfair font-bold text-[#222]">Brands</h2>
        </div>
        <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200 text-xs uppercase tracking-widest text-neutral-500">
                <th className="p-4 font-bold">Brand Name</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {brands.map(brand => (
                <tr key={brand.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="p-4 font-sans text-[#222] font-medium">{brand.name}</td>
                  <td className="p-4 flex justify-end gap-3">
                    <button onClick={() => handleDeleteBrand(brand.id)} className="text-red-500 hover:text-red-700">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {brands.length === 0 && (
                <tr>
                  <td colSpan={2} className="p-8 text-center text-neutral-500">No brands found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
