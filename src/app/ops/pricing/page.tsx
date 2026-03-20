"use client";
import { useState } from "react";
import { Search, Plus, Edit2, Package } from "lucide-react";
import { Button, Input, EmptyState, StatusChip } from "@/components/ui";
import type { SKU } from "@/types";
import { cn } from "@/lib/utils";

const MOCK_SKUS: SKU[] = [
  { id: "s1", name: "Carrara White Matt Tile 600×1200mm", category: "tiles", style: "minimal", finish: "matte", price: 180, unit: "sqft", brand: "Asian Granito", countryOfOrigin: "India", dimensions: "600×1200mm", material: "Porcelain", imageUrl: "", status: "active" },
  { id: "s2", name: "Terrazzo Natural Tile 600×600mm", category: "tiles", style: "natural", finish: "polished", price: 240, unit: "sqft", brand: "Kajaria", countryOfOrigin: "India", dimensions: "600×600mm", material: "Cement composite", imageUrl: "", status: "active" },
  { id: "s3", name: "Matte Black Shower Mixer", category: "fittings", style: "minimal", finish: "matte black", price: 18500, unit: "set", brand: "Jaquar", countryOfOrigin: "India", imageUrl: "", status: "active" },
  { id: "s4", name: "Freestanding Oval Basin", category: "sanitaryware", style: "japandi", finish: "gloss white", price: 22000, unit: "piece", brand: "Duravit", countryOfOrigin: "Germany", imageUrl: "", status: "active" },
  { id: "s5", name: "Gold Towel Rail 60cm", category: "accessories", style: "classic", finish: "brushed gold", price: 4800, unit: "piece", brand: "Kerovit", countryOfOrigin: "India", imageUrl: "", status: "active" },
  { id: "s6", name: "Geometric Hex Tile 100×100mm", category: "tiles", style: "geometric", finish: "matte", price: 320, unit: "sqft", brand: "Somany", countryOfOrigin: "India", dimensions: "100×100mm hex", material: "Ceramic", imageUrl: "", status: "active" },
  { id: "s7", name: "Rain Shower Head 300mm", category: "fixtures", style: "minimal", finish: "chrome", price: 12500, unit: "piece", brand: "Grohe", countryOfOrigin: "Germany", imageUrl: "", status: "pending" },
  { id: "s8", name: "Walnut Vanity 900mm", category: "fixtures", style: "natural", finish: "natural walnut", price: 38000, unit: "piece", brand: "BathIQ Bespoke", countryOfOrigin: "India", imageUrl: "", status: "active" },
];

const CATEGORIES = ["All", "tiles", "fixtures", "fittings", "accessories", "sanitaryware"];

export default function PricingPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [editId, setEditId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState("");

  const filtered = MOCK_SKUS.filter((s) => {
    const matchCat = category === "All" || s.category === category;
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.brand.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="p-4 md:p-6 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-display text-slate">Pricing & SKUs</h1>
          <p className="text-sm text-gray">{MOCK_SKUS.length} SKUs · {MOCK_SKUS.filter((s) => s.status === "active").length} active</p>
        </div>
        <Button size="sm" leftIcon={<Plus size={14} />}>Add SKU</Button>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={cn(
              "flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
              category === c ? "bg-coral text-white" : "bg-white border border-light-gray text-gray"
            )}
          >
            {c === "All" ? "All" : c.charAt(0).toUpperCase() + c.slice(1)}
          </button>
        ))}
      </div>

      <Input
        placeholder="Search SKUs…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        leftIcon={<Search size={14} />}
        className="mb-4"
      />

      {filtered.length === 0 ? (
        <EmptyState icon={Package} title="No SKUs found" description="Try a different search" />
      ) : (
        <div className="bg-white rounded-xl border border-light-gray overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-light-gray">
              <tr>
                <th className="text-left px-4 py-2.5 text-xs text-gray font-medium">Name</th>
                <th className="text-left px-4 py-2.5 text-xs text-gray font-medium hidden md:table-cell">Category</th>
                <th className="text-left px-4 py-2.5 text-xs text-gray font-medium hidden md:table-cell">Brand</th>
                <th className="text-right px-4 py-2.5 text-xs text-gray font-medium">Price</th>
                <th className="text-center px-4 py-2.5 text-xs text-gray font-medium">Status</th>
                <th className="px-4 py-2.5 text-xs text-gray font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-gray">
              {filtered.map((sku) => (
                <tr key={sku.id} className="hover:bg-warm-white transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate">{sku.name}</p>
                    <p className="text-xs text-gray md:hidden">{sku.brand} · {sku.category}</p>
                  </td>
                  <td className="px-4 py-3 text-gray capitalize hidden md:table-cell">{sku.category}</td>
                  <td className="px-4 py-3 text-gray hidden md:table-cell">{sku.brand}</td>
                  <td className="px-4 py-3 text-right">
                    {editId === sku.id ? (
                      <div className="flex items-center justify-end gap-1">
                        <span className="text-gray">₹</span>
                        <input
                          type="number"
                          value={editPrice}
                          onChange={(e) => setEditPrice(e.target.value)}
                          className="w-20 text-right border border-coral rounded px-1 py-0.5 text-sm focus:outline-none"
                          autoFocus
                        />
                        <button onClick={() => setEditId(null)} className="text-xs text-teal ml-1">Save</button>
                      </div>
                    ) : (
                      <span className="font-medium currency text-slate">₹{sku.price.toLocaleString("en-IN")}<span className="text-xs text-gray">/{sku.unit}</span></span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <StatusChip status={sku.status as any} label={sku.status} size="sm" />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => { setEditId(sku.id); setEditPrice(String(sku.price)); }}
                      className="text-gray hover:text-coral transition-colors"
                    >
                      <Edit2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
