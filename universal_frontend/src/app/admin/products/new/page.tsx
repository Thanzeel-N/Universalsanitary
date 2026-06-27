"use client";


import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";
import { apiUrl } from "@/lib/api";

export default function NewProductPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    technical_specs: "",
    dimensions: "",
    is_featured: false,
    category: "",
    brand: ""
  });
  
  const router = useRouter();

  useEffect(() => {
    fetch(apiUrl(`/api/v1/categories/`)).then(res => res.json()).then(setCategories);
    fetch(apiUrl(`/api/v1/brands/`)).then(res => res.json()).then(setBrands);
  }, []);

  const handleAddCategory = async () => {
    const name = prompt("Enter new category name:");
    if (!name) return;
    const token = Cookies.get("access_token");
    try {
      const res = await fetch(apiUrl(`/api/v1/categories/`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name })
      });
      if (!res.ok) throw new Error("Failed to create category");
      const newCat = await res.json();
      setCategories(prev => [...prev, newCat]);
      setFormData(prev => ({ ...prev, category: newCat.id }));
    } catch (err) {
      console.error(err);
      alert("Failed to create category. Please make sure you are logged in.");
    }
  };

  const handleAddBrand = async () => {
    const name = prompt("Enter new brand name:");
    if (!name) return;
    const token = Cookies.get("access_token");
    try {
      const res = await fetch(apiUrl(`/api/v1/brands/`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name })
      });
      if (!res.ok) throw new Error("Failed to create brand");
      const newBrand = await res.json();
      setBrands(prev => [...prev, newBrand]);
      setFormData(prev => ({ ...prev, brand: newBrand.id }));
    } catch (err) {
      console.error(err);
      alert("Failed to create brand. Please make sure you are logged in.");
    }
  };

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const token = Cookies.get("access_token");
    
    // Convert empty strings to null for foreign keys if necessary
    const payload = {
        ...formData,
        category: formData.category || null,
        brand: formData.brand || null,
    };

    try {
      const res = await fetch(apiUrl(`/api/v1/products/`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) {
        const err = await res.json();
        console.error(err);
        throw new Error("Failed to create product");
      }
      
      const createdProduct = await res.json();

      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append("image", imageFile);
        imageFormData.append("is_primary", "true");

        const imgRes = await fetch(apiUrl(`/api/v1/products/${createdProduct.slug}/upload_image/`), {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`
          },
          body: imageFormData
        });

        if (!imgRes.ok) {
          console.error("Failed to upload image");
        }
      }
      
      router.push("/admin");
    } catch (err) {
      console.error(err);
      alert("Error saving product. Check console.");
    }
  };

  return (
    <div className="max-w-2xl bg-white p-8 rounded-lg shadow-sm border border-neutral-200">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-playfair font-bold">Add New Product</h1>
        <Link href="/admin" className="text-sm font-bold tracking-widest uppercase text-neutral-400 hover:text-[#222]">Back</Link>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="block text-xs uppercase text-neutral-500 font-bold mb-1">Name</label>
          <input required name="name" value={formData.name} onChange={handleChange} className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-xs uppercase text-neutral-500 font-bold mb-1">Slug</label>
          <input required name="slug" value={formData.slug} onChange={handleChange} className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-xs uppercase text-neutral-500 font-bold mb-1">Category</label>
          <div className="flex gap-2">
            <select name="category" value={formData.category} onChange={handleChange} className="flex-1 border p-2 rounded">
              <option value="">Select Category...</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <button type="button" onClick={handleAddCategory} className="bg-neutral-100 text-[#222] border px-4 py-2 rounded hover:bg-neutral-200 transition-colors text-sm font-bold">
              + New
            </button>
          </div>
        </div>
        <div>
          <label className="block text-xs uppercase text-neutral-500 font-bold mb-1">Brand</label>
          <div className="flex gap-2">
            <select name="brand" value={formData.brand} onChange={handleChange} className="flex-1 border p-2 rounded">
              <option value="">Select Brand...</option>
              {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
            <button type="button" onClick={handleAddBrand} className="bg-neutral-100 text-[#222] border px-4 py-2 rounded hover:bg-neutral-200 transition-colors text-sm font-bold">
              + New
            </button>
          </div>
        </div>
        <div>
          <label className="block text-xs uppercase text-neutral-500 font-bold mb-1">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border p-2 rounded" rows={4} />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" name="is_featured" checked={formData.is_featured} onChange={handleChange} />
          <label className="text-sm font-bold text-[#222]">Is Featured?</label>
        </div>
        <div>
          <label className="block text-xs uppercase text-neutral-500 font-bold mb-1">Product Image</label>
          <input type="file" accept="image/*" onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setImageFile(e.target.files[0]);
            }
          }} className="w-full border p-2 rounded" />
        </div>
        <button type="submit" className="bg-[#222] text-white py-3 rounded uppercase text-xs tracking-widest font-bold hover:bg-black mt-4">Save Product</button>
      </form>
    </div>
  );
}
