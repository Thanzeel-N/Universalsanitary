"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Plus, Edit, Trash2, GripVertical, Layers, ShoppingBag, 
  Tag, Search, X, Check, Upload, Image as ImageIcon, Sparkles, ExternalLink 
} from "lucide-react";
import Cookies from "js-cookie";
import { apiUrl } from "@/lib/api";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableCategoryRow = ({ 
  category, 
  productCount, 
  onEdit, 
  onDelete 
}: { 
  category: any; 
  productCount: number;
  onEdit: (cat: any) => void; 
  onDelete: (slug: string) => void; 
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: category.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 20 : 1,
    position: isDragging ? "relative" as const : "static" as const,
  };

  const heroImage = category.hero_image || "/images/products/hero.webp";
  const hasCustomImage = Boolean(category.hero_image);

  return (
    <tr ref={setNodeRef} style={style} className={`border-b border-neutral-100 hover:bg-neutral-50/80 bg-white transition-colors ${isDragging ? "shadow-xl opacity-90 scale-[1.01]" : ""}`}>
      <td className="p-4 w-12 text-neutral-400">
        <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing hover:text-neutral-900 transition-colors touch-none outline-none p-1">
          <GripVertical size={18} />
        </button>
      </td>
      <td className="p-4 w-28">
        <div className="relative w-20 h-14 rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200 shadow-sm group">
          <img src={heroImage} alt={category.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          {!hasCustomImage && (
            <div className="absolute inset-x-0 bottom-0 bg-black/60 text-[9px] text-neutral-200 text-center py-0.5 font-sans font-semibold">
              Default
            </div>
          )}
        </div>
      </td>
      <td className="p-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-playfair font-bold text-base text-neutral-900">{category.name}</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 font-semibold border border-neutral-200">
              /{category.slug}
            </span>
          </div>
          <p className="text-xs text-neutral-500 line-clamp-1 mt-1 max-w-md">
            {category.description || "No description provided."}
          </p>
        </div>
      </td>
      <td className="p-4 text-center">
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/60">
          {productCount} item{productCount !== 1 ? "s" : ""}
        </span>
      </td>
      <td className="p-4 text-right">
        <div className="flex justify-end gap-2">
          <button 
            onClick={() => onEdit(category)} 
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors"
          >
            <Edit size={14} />
            <span>Edit & Hero</span>
          </button>
          <Link 
            href={`/categories/${category.slug}`} 
            target="_blank"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
            title="Preview Category"
          >
            <ExternalLink size={16} />
          </Link>
          <button 
            onClick={() => onDelete(category.slug)} 
            className="p-1.5 rounded-lg text-red-400 hover:text-red-700 hover:bg-red-50 transition-colors"
            title="Delete Category"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default function AdminDashboard() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Tabs and search states
  const [activeTab, setActiveTab] = useState<"categories" | "products" | "brands">("categories");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals state
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [editingBrand, setEditingBrand] = useState<any | null>(null);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddBrand, setShowAddBrand] = useState(false);

  // Form states for Category
  const [catFormName, setCatFormName] = useState("");
  const [catFormDesc, setCatFormDesc] = useState("");
  const [catFormImage, setCatFormImage] = useState<File | null>(null);
  const [catImagePreview, setCatImagePreview] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);

  // Form states for Brand
  const [brandFormName, setBrandFormName] = useState("");

  const openAddBrand = () => {
    setEditingBrand(null);
    setBrandFormName("");
    setShowAddBrand(true);
  };

  const openEditBrand = (brand: any) => {
    setEditingBrand(brand);
    setBrandFormName(brand.name || "");
    setShowAddBrand(true);
  };

  const closeBrandModals = () => {
    setEditingBrand(null);
    setShowAddBrand(false);
    setBrandFormName("");
    setIsSaving(false);
  };

  const fetchData = async () => {
    try {
      const [resProducts, resCategories, resBrands] = await Promise.all([
        fetch(apiUrl(`/api/v1/products/`)),
        fetch(apiUrl(`/api/v1/categories/`)),
        fetch(apiUrl(`/api/v1/brands/`))
      ]);
      const dataProducts = resProducts.ok ? await resProducts.json() : [];
      const dataCategories = resCategories.ok ? await resCategories.json() : [];
      const dataBrands = resBrands.ok ? await resBrands.json() : [];
      
      setProducts(dataProducts || []);
      setCategories(dataCategories || []);
      setBrands(dataBrands || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle opening Edit Category modal
  const openEditCategory = (cat: any) => {
    setEditingCategory(cat);
    setCatFormName(cat.name || "");
    setCatFormDesc(cat.description || "");
    setCatFormImage(null);
    setCatImagePreview(cat.hero_image || "/images/products/hero.webp");
  };

  const closeCategoryModals = () => {
    setEditingCategory(null);
    setShowAddCategory(false);
    setCatFormName("");
    setCatFormDesc("");
    setCatFormImage(null);
    setCatImagePreview("");
    setIsSaving(false);
  };

  // Handle Category Image File change
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCatFormImage(file);
      setCatImagePreview(URL.createObjectURL(file));
    }
  };

  // Save (Update or Create) Category with Hero Image via FormData
  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!catFormName.trim()) {
      alert("Category name is required.");
      return;
    }

    setIsSaving(true);
    const token = Cookies.get("access_token");
    const formData = new FormData();
    formData.append("name", catFormName.trim());
    formData.append("description", catFormDesc.trim());
    if (catFormImage) {
      formData.append("hero_image", catFormImage);
    }

    const isEditing = Boolean(editingCategory);
    const url = isEditing 
      ? apiUrl(`/api/v1/categories/${editingCategory.slug}/`) 
      : apiUrl(`/api/v1/categories/`);
    const method = isEditing ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Authorization": `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        console.error("Failed to save category:", errData);
        alert(`Error saving category: ${JSON.stringify(errData)}`);
        return;
      }

      await fetchData();
      closeCategoryModals();
    } catch (err) {
      console.error(err);
      alert("Network error while saving category.");
    } finally {
      setIsSaving(false);
    }
  };

  // Save (Update or Create) Brand
  const handleSaveBrand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandFormName.trim()) return;
    setIsSaving(true);
    const token = Cookies.get("access_token");
    const isEditing = Boolean(editingBrand);
    const url = isEditing
      ? apiUrl(`/api/v1/brands/${editingBrand.id}/`)
      : apiUrl(`/api/v1/brands/`);
    const method = isEditing ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name: brandFormName.trim() })
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        console.error("Failed to save brand:", errData);
        throw new Error("Failed to save brand");
      }
      await fetchData();
      closeBrandModals();
    } catch (err) {
      console.error(err);
      alert("Failed to save brand.");
    } finally {
      setIsSaving(false);
    }
  };

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

  const handleDeleteCategory = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this category? Any associated products may be affected.")) return;
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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = categories.findIndex((c) => c.id === active.id);
      const newIndex = categories.findIndex((c) => c.id === over.id);

      const newCategories = arrayMove(categories, oldIndex, newIndex);
      setCategories(newCategories); // Optimistic UI update

      const token = Cookies.get("access_token");
      try {
        await Promise.all(
          newCategories.map((cat, index) => {
            if (cat.order !== index) {
              cat.order = index;
              return fetch(apiUrl(`/api/v1/categories/${cat.slug}/`), {
                method: "PATCH",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ order: index }),
              });
            }
            return Promise.resolve();
          })
        );
      } catch (err) {
        console.error("Failed to update orders", err);
        alert("Failed to save the new order.");
        fetchData();
      }
    }
  };

  // Count helper functions
  const getCategoryProductCount = (catId: number) => {
    return products.filter((p: any) => {
      const cats = p.categories || [];
      return cats.some((c: any) => (c.id ?? c) === catId);
    }).length;
  };

  const getBrandProductCount = (brandId: number) => {
    return products.filter((p: any) => (p.brand?.id ?? p.brand) === brandId).length;
  };

  // Filter lists by search query
  const filteredProducts = products.filter(p => p.name?.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredCategories = categories.filter(c => c.name?.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredBrands = brands.filter(b => b.name?.toLowerCase().includes(searchQuery.toLowerCase()));

  if (loading) return (
    <div className="animate-pulse space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => <div key={i} className="h-28 bg-neutral-200 rounded-2xl"></div>)}
      </div>
      <div className="h-12 bg-neutral-200 rounded-xl w-80"></div>
      <div className="h-96 bg-neutral-200 rounded-2xl w-full"></div>
    </div>
  );

  return (
    <div className="space-y-8 pb-20 max-w-7xl mx-auto">
      {/* Dashboard Title & Overview Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-neutral-900 text-white p-6 md:p-8 rounded-2xl shadow-lg relative overflow-hidden border border-neutral-800">
        <div className="relative z-10">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1 block">Admin Control Panel</span>
          <h1 className="font-playfair text-2xl md:text-4xl font-bold">Store & Catalog Management</h1>
          <p className="text-sm text-neutral-300 mt-1 max-w-xl">
            Organize collections, upload custom hero banners for categories, and manage luxury products in real time.
          </p>
        </div>
        <div className="relative z-10 flex flex-wrap gap-2">
          <Link
            href="/admin/products/new"
            className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-md transition-all"
          >
            <Plus size={16} /> Add Product
          </Link>
          <button
            onClick={() => { setShowAddCategory(true); setCatImagePreview("/images/products/hero.webp"); }}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 transition-all"
          >
            <Plus size={16} /> Add Category
          </button>
          <button
            onClick={openAddBrand}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 transition-all"
          >
            <Plus size={16} /> Add Brand
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          onClick={() => { setActiveTab("categories"); setSearchQuery(""); }}
          className={`p-6 rounded-2xl border transition-all cursor-pointer flex items-center justify-between shadow-sm ${
            activeTab === "categories" ? "bg-white border-primary ring-2 ring-primary/20 shadow-md" : "bg-white border-neutral-200 hover:border-neutral-300"
          }`}
        >
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-neutral-400">Collections / Categories</span>
            <h3 className="font-playfair text-3xl font-bold text-neutral-900 mt-1">{categories.length}</h3>
            <span className="text-xs text-primary font-semibold mt-1 inline-block">Manage Hero Banners & Order &rarr;</span>
          </div>
          <div className={`p-4 rounded-2xl ${activeTab === "categories" ? "bg-primary/10 text-primary" : "bg-neutral-100 text-neutral-600"}`}>
            <Layers size={28} />
          </div>
        </div>

        <div 
          onClick={() => { setActiveTab("products"); setSearchQuery(""); }}
          className={`p-6 rounded-2xl border transition-all cursor-pointer flex items-center justify-between shadow-sm ${
            activeTab === "products" ? "bg-white border-primary ring-2 ring-primary/20 shadow-md" : "bg-white border-neutral-200 hover:border-neutral-300"
          }`}
        >
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-neutral-400">Total Products</span>
            <h3 className="font-playfair text-3xl font-bold text-neutral-900 mt-1">{products.length}</h3>
            <span className="text-xs text-primary font-semibold mt-1 inline-block">View & Edit Inventory &rarr;</span>
          </div>
          <div className={`p-4 rounded-2xl ${activeTab === "products" ? "bg-primary/10 text-primary" : "bg-neutral-100 text-neutral-600"}`}>
            <ShoppingBag size={28} />
          </div>
        </div>

        <div 
          onClick={() => { setActiveTab("brands"); setSearchQuery(""); }}
          className={`p-6 rounded-2xl border transition-all cursor-pointer flex items-center justify-between shadow-sm ${
            activeTab === "brands" ? "bg-white border-primary ring-2 ring-primary/20 shadow-md" : "bg-white border-neutral-200 hover:border-neutral-300"
          }`}
        >
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-neutral-400">Partner Brands</span>
            <h3 className="font-playfair text-3xl font-bold text-neutral-900 mt-1">{brands.length}</h3>
            <span className="text-xs text-primary font-semibold mt-1 inline-block">Manage Brands &rarr;</span>
          </div>
          <div className={`p-4 rounded-2xl ${activeTab === "brands" ? "bg-primary/10 text-primary" : "bg-neutral-100 text-neutral-600"}`}>
            <Tag size={28} />
          </div>
        </div>
      </div>

      {/* Tabs Bar & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-3 rounded-2xl border border-neutral-200 shadow-sm">
        <div className="flex gap-2 p-1 bg-neutral-100 rounded-xl overflow-x-auto">
          <button
            onClick={() => { setActiveTab("categories"); setSearchQuery(""); }}
            className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === "categories" ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            Categories & Hero Banners ({categories.length})
          </button>
          <button
            onClick={() => { setActiveTab("products"); setSearchQuery(""); }}
            className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === "products" ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            Products ({products.length})
          </button>
          <button
            onClick={() => { setActiveTab("brands"); setSearchQuery(""); }}
            className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === "brands" ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            Brands ({brands.length})
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl text-sm border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-neutral-50/50"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* TAB 1: CATEGORIES & HERO IMAGES */}
      {activeTab === "categories" && (
        <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-6 bg-neutral-50/80 border-b border-neutral-200 flex justify-between items-center">
            <div>
              <h2 className="font-playfair text-xl font-bold text-neutral-900">Category Hero Images & Order</h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Drag using the handle on the left to reorder categories. Click &quot;Edit &amp; Hero&quot; to upload a custom banner image for each collection.
              </p>
            </div>
            <button
              onClick={() => { setShowAddCategory(true); setCatImagePreview("/images/products/hero.webp"); }}
              className="bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 shadow transition-colors shrink-0"
            >
              <Plus size={15} /> Add Category
            </button>
          </div>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200 text-[11px] uppercase tracking-widest font-bold text-neutral-500">
                <th className="p-4 w-12 text-center">Ord</th>
                <th className="p-4 w-28">Hero Image</th>
                <th className="p-4">Category Name & Details</th>
                <th className="p-4 text-center">Products</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={filteredCategories.map((c) => c.id)} strategy={verticalListSortingStrategy}>
                <tbody>
                  {filteredCategories.map((category) => (
                    <SortableCategoryRow 
                      key={category.id} 
                      category={category} 
                      productCount={getCategoryProductCount(category.id)}
                      onEdit={openEditCategory}
                      onDelete={handleDeleteCategory} 
                    />
                  ))}
                  {filteredCategories.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-12 text-center text-neutral-500 font-playfair text-lg">
                        No categories match your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </SortableContext>
            </DndContext>
          </table>
        </div>
      )}

      {/* TAB 2: PRODUCTS */}
      {activeTab === "products" && (
        <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-6 bg-neutral-50/80 border-b border-neutral-200 flex justify-between items-center">
            <div>
              <h2 className="font-playfair text-xl font-bold text-neutral-900">Products Directory</h2>
              <p className="text-xs text-neutral-500 mt-0.5">Manage specs, technical descriptions, and images for all store products.</p>
            </div>
            <Link
              href="/admin/products/new"
              className="bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 shadow transition-colors shrink-0"
            >
              <Plus size={15} /> Add Product
            </Link>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200 text-[11px] uppercase tracking-widest font-bold text-neutral-500">
                <th className="p-4 w-20">Image</th>
                <th className="p-4">Product Title</th>
                <th className="p-4">Categories</th>
                <th className="p-4">Brand</th>
                <th className="p-4 text-center">Featured</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => {
                const primaryImg = product.images?.[0]?.image;
                return (
                  <tr key={product.id} className="border-b border-neutral-100 hover:bg-neutral-50/80 transition-colors">
                    <td className="p-4">
                      <div className="w-14 h-14 rounded-lg bg-neutral-100 border border-neutral-200 overflow-hidden flex items-center justify-center p-1.5">
                        {primaryImg ? (
                          <img src={primaryImg} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
                        ) : (
                          <ShoppingBag size={20} className="text-neutral-300" />
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-sans font-bold text-[#222] block">{product.name}</span>
                      <span className="text-[11px] text-neutral-400 font-mono">/{product.slug}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {(product.categories && product.categories.length > 0) ? product.categories.map((cat: any) => (
                          <span key={cat.id || cat} className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200/60">
                            {cat.name || "Unnamed"}
                          </span>
                        )) : (
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-400 border border-neutral-200">Unassigned</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-xs font-bold uppercase tracking-wider text-neutral-600">
                      {product.brand?.name || "None"}
                    </td>
                    <td className="p-4 text-center">
                      {product.is_featured ? (
                        <span className="inline-flex items-center text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded font-bold border border-green-200">
                          <Check size={12} className="mr-1" /> Featured
                        </span>
                      ) : (
                        <span className="text-neutral-300 text-xs">&mdash;</span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link 
                          href={`/products/${product.slug}`}
                          target="_blank"
                          className="p-2 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
                          title="Preview Product"
                        >
                          <ExternalLink size={16} />
                        </Link>
                        <Link 
                          href={`/admin/products/${product.slug}/edit`} 
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors"
                        >
                          <Edit size={14} /> Edit
                        </Link>
                        <button 
                          onClick={() => handleDeleteProduct(product.slug)} 
                          className="p-2 rounded-lg text-red-400 hover:text-red-700 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-neutral-500 font-playfair text-lg">No products found matching query.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 3: BRANDS */}
      {activeTab === "brands" && (
        <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-6 bg-neutral-50/80 border-b border-neutral-200 flex justify-between items-center">
            <div>
              <h2 className="font-playfair text-xl font-bold text-neutral-900">Partner Brands</h2>
              <p className="text-xs text-neutral-500 mt-0.5">Manage brand identifiers across product collections.</p>
            </div>
            <button
              onClick={openAddBrand}
              className="bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 shadow transition-colors shrink-0"
            >
              <Plus size={15} /> Add Brand
            </button>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200 text-[11px] uppercase tracking-widest font-bold text-neutral-500">
                <th className="p-4 font-bold">Brand Name</th>
                <th className="p-4 text-center">Associated Products</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBrands.map(brand => {
                const bCount = getBrandProductCount(brand.id);
                return (
                  <tr key={brand.id} className="border-b border-neutral-100 hover:bg-neutral-50/80 transition-colors">
                    <td className="p-4 font-playfair font-bold text-lg text-neutral-900">{brand.name}</td>
                    <td className="p-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-700">
                        {bCount} Product{bCount !== 1 ? "s" : ""}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEditBrand(brand)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors"
                        >
                          <Edit size={14} /> Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteBrand(brand.id)} 
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors"
                        >
                          <Trash2 size={15} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredBrands.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-12 text-center text-neutral-500 font-playfair text-lg">No brands found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL: EDIT / CREATE CATEGORY WITH HERO IMAGE */}
      {(editingCategory || showAddCategory) && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-neutral-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-neutral-900 text-white p-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon size={20} className="text-amber-400" />
                <h3 className="font-playfair font-bold text-xl">
                  {editingCategory ? `Edit Collection: ${editingCategory.name}` : "Create New Collection"}
                </h3>
              </div>
              <button onClick={closeCategoryModals} className="text-neutral-400 hover:text-white transition-colors">
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="p-6 space-y-6">
              {/* Hero Image Upload section */}
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold text-neutral-700 mb-2">
                  Category Hero Banner (Custom Image)
                </label>
                <div className="relative h-44 rounded-xl overflow-hidden bg-neutral-900 border-2 border-dashed border-neutral-300 group">
                  {catImagePreview ? (
                    <img src={catImagePreview} alt="Preview" className="w-full h-full object-cover brightness-90" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-neutral-400">
                      <Upload size={32} className="mb-2 stroke-[1.5]" />
                      <span className="text-xs font-semibold">No Hero Image Set (Using Default)</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-4">
                    <Upload size={28} className="mb-1" />
                    <span className="text-xs font-bold uppercase tracking-widest">Upload Custom Banner</span>
                    <span className="text-[10px] text-neutral-300 mt-1">Recommended aspect: 16:9 or 1920x1080</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                </div>
                <p className="text-[11px] text-neutral-500 mt-2">
                  Click on the box above to select and upload a unique custom hero image for this category.
                </p>
              </div>

              {/* Category Name */}
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold text-neutral-700 mb-2">
                  Category Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Designer Washbasins"
                  value={catFormName}
                  onChange={(e) => setCatFormName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm text-[#222] font-semibold focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                />
              </div>

              {/* Category Description */}
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold text-neutral-700 mb-2">
                  Collection Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Provide an engaging architectural description for this luxury collection..."
                  value={catFormDesc}
                  onChange={(e) => setCatFormDesc(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm text-[#222] focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all resize-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={closeCategoryModals}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-neutral-600 hover:bg-neutral-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 transition-all disabled:opacity-50"
                >
                  {isSaving ? "Saving Banner..." : "Save Collection"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT BRAND */}
      {(showAddBrand || editingBrand) && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-neutral-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-neutral-900 text-white p-6 flex items-center justify-between">
              <h3 className="font-playfair font-bold text-xl">
                {editingBrand ? `Edit Brand: ${editingBrand.name}` : "Add Partner Brand"}
              </h3>
              <button onClick={closeBrandModals} className="text-neutral-400 hover:text-white transition-colors">
                <X size={22} />
              </button>
            </div>
            <form onSubmit={handleSaveBrand} className="p-6 space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold text-neutral-700 mb-2">
                  Brand Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Grohe, Kohler, Jaquar"
                  value={brandFormName}
                  onChange={(e) => setBrandFormName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm text-[#222] font-semibold focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                />
              </div>
              <div className="flex items-center justify-end gap-3 pt-2 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={closeBrandModals}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-neutral-600 hover:bg-neutral-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-neutral-900 hover:bg-neutral-800 text-white shadow transition-all disabled:opacity-50"
                >
                  {isSaving ? (editingBrand ? "Updating..." : "Adding...") : (editingBrand ? "Update Brand" : "Add Brand")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
