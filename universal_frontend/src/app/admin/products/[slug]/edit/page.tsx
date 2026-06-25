"use client";


import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { use } from "react";
import Link from "next/link";
import { apiUrl } from "@/lib/api";

export default function EditProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingImages, setExistingImages] = useState<any[]>([]);
  
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
    Promise.all([
      fetch(apiUrl(`/api/v1/categories/`)).then(res => res.json()),
      fetch(apiUrl(`/api/v1/brands/`)).then(res => res.json()),
      fetch(apiUrl(`/api/v1/products/${slug}/`)).then(res => res.json())
    ]).then(([cats, brs, prod]) => {
      setCategories(cats);
      setBrands(brs);
      setFormData({
        name: prod.name || "",
        slug: prod.slug || "",
        description: prod.description || "",
        technical_specs: prod.technical_specs || "",
        dimensions: prod.dimensions || "",
        is_featured: prod.is_featured || false,
        category: prod.category ? prod.category.id || prod.category : "",
        brand: prod.brand ? prod.brand.id || prod.brand : ""
      });
      setExistingImages(prod.images || []);
      setLoading(false);
    });
  }, [slug]);

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
    
    const payload = {
        ...formData,
        category: formData.category || null,
        brand: formData.brand || null,
    };

    try {
      const res = await fetch(apiUrl(`/api/v1/products/${slug}/`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) {
        const err = await res.json();
        console.error(err);
        throw new Error("Failed to update product");
      }
      
      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append("image", imageFile);
        imageFormData.append("is_primary", "true");

        const imgRes = await fetch(apiUrl(`/api/v1/products/${slug}/upload_image/`), {
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
      alert("Error updating product.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl bg-white p-8 rounded-lg shadow-sm border border-neutral-200">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-playfair font-bold">Edit Product</h1>
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
          <select name="category" value={formData.category} onChange={handleChange} className="w-full border p-2 rounded">
            <option value="">Select Category...</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs uppercase text-neutral-500 font-bold mb-1">Brand</label>
          <select name="brand" value={formData.brand} onChange={handleChange} className="w-full border p-2 rounded">
            <option value="">Select Brand...</option>
            {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
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
          <label className="block text-xs uppercase text-neutral-500 font-bold mb-2">Product Images</label>
          {existingImages.length > 0 && (
            <div className="flex gap-4 mb-4">
              {existingImages.map((img: any) => (
                <div key={img.id} className="relative w-24 h-24 border rounded overflow-hidden">
                  <img src={img.image} alt="Product" className="object-cover w-full h-full" />
                </div>
              ))}
            </div>
          )}
          <input type="file" accept="image/*" onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setImageFile(e.target.files[0]);
            }
          }} className="w-full border p-2 rounded" />
          <p className="text-xs text-neutral-500 mt-1">Uploading a new image will set it as primary.</p>
        </div>
        <button type="submit" className="bg-[#222] text-white py-3 rounded uppercase text-xs tracking-widest font-bold hover:bg-black mt-4">Update Product</button>
      </form>
    </div>
  );
}
