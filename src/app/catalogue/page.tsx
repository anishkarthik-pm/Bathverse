"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, Heart, ArrowLeft } from "lucide-react";
import { Button, Input, StatusChip, EmptyState } from "@/components/ui";
import { useAppStore } from "@/lib/store";
import type { SKU } from "@/types";
import { cn } from "@/lib/utils";

const MOCK_SKUS: SKU[] = [
  { id: "s1", name: "Carrara White Matt Tile", category: "tiles", style: "minimal", finish: "matte", price: 180, unit: "sqft", brand: "Asian Granito", countryOfOrigin: "India", dimensions: "600×1200mm", material: "Porcelain", imageUrl: "https://placehold.co/400x300/f1efe8/5f5e5a?text=Tile", status: "active" },
  { id: "s2", name: "Terrazzo Natural Tile", category: "tiles", style: "natural", finish: "polished", price: 240, unit: "sqft", brand: "Kajaria", countryOfOrigin: "India", dimensions: "600×600mm", material: "Cement composite", imageUrl: "https://placehold.co/400x300/f1efe8/5f5e5a?text=Tile", status: "active" },
  { id: "s3", name: "Matte Black Shower Mixer", category: "fittings", style: "minimal", finish: "matte black", price: 18500, unit: "set", brand: "Jaquar", countryOfOrigin: "India", imageUrl: "https://placehold.co/400x300/f1efe8/5f5e5a?text=Fitting", status: "active" },
  { id: "s4", name: "Freestanding Oval Basin", category: "sanitaryware", style: "japandi", finish: "gloss white", price: 22000, unit: "piece", brand: "Duravit", countryOfOrigin: "Germany", imageUrl: "https://placehold.co/400x300/f1efe8/5f5e5a?text=Basin", status: "active" },
  { id: "s5", name: "Gold Towel Rail 60cm", category: "accessories", style: "classic", finish: "brushed gold", price: 4800, unit: "piece", brand: "Kerovit", countryOfOrigin: "India", imageUrl: "https://placehold.co/400x300/f1efe8/5f5e5a?text=Accessory", status: "active" },
  { id: "s6", name: "Geometric Hex Tile", category: "tiles", style: "geometric", finish: "matte", price: 320, unit: "sqft", brand: "Somany", countryOfOrigin: "India", dimensions: "100×100mm hex", material: "Ceramic", imageUrl: "https://placehold.co/400x300/f1efe8/5f5e5a?text=Tile", status: "active" },
  { id: "s7", name: "Rain Shower Head 300mm", category: "fixtures", style: "minimal", finish: "chrome", price: 12500, unit: "piece", brand: "Grohe", countryOfOrigin: "Germany", imageUrl: "https://placehold.co/400x300/f1efe8/5f5e5a?text=Fixture", status: "active" },
  { id: "s8", name: "Walnut Vanity 900mm", category: "fixtures", style: "natural", finish: "natural walnut", price: 38000, unit: "piece", brand: "BathIQ Bespoke", countryOfOrigin: "India", imageUrl: "https://placehold.co/400x300/f1efe8/5f5e5a?text=Vanity", status: "active" },
];

const CATEGORIES = ["All", "tiles", "fixtures", "fittings", "accessories", "sanitaryware"];
const STYLES = ["All", "minimal", "natural", "geometric", "classic", "japandi", "maximalist"];

function SKUCard({ sku }: { sku: SKU }) {
  const { wishlist, toggleWishlist } = useAppStore();
  const inWishlist = wishlist.includes(sku.id);
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-light-gray">
      <div className="relative">
        <img src={sku.imageUrl} alt={sku.name} className="w-full h-40 object-cover" />
        <button
          onClick={() => toggleWishlist(sku.id)}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm"
        >
          <Heart size={15} className={inWishlist ? "fill-coral text-coral" : "text-gray"} />
        </button>
      </div>
      <div className="p-3">
        <p className="text-xs text-gray capitalize mb-0.5">{sku.brand} · {sku.style}</p>
        <p className="text-sm font-medium text-slate leading-snug mb-2">{sku.name}</p>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-coral currency">
            ₹{sku.price.toLocaleString("en-IN")} <span className="text-xs text-gray font-normal">/{sku.unit}</span>
          </p>
          <StatusChip status="active" label={sku.finish} size="sm" />
        </div>
      </div>
    </div>
  );
}

export default function CataloguePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [style, setStyle] = useState("All");

  const filtered = MOCK_SKUS.filter((s) => {
    const matchCat = category === "All" || s.category === category;
    const matchStyle = style === "All" || s.style === style;
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.brand.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchStyle && matchSearch;
  });

  return (
    <div className="min-h-screen bg-warm-white max-w-md mx-auto">
      <header className="sticky top-0 z-40 bg-warm-white/95 backdrop-blur border-b border-mid-gray/30 px-4">
        <div className="h-14 flex items-center gap-3">
          <Link href="/home" className="p-2 -ml-2 rounded-full hover:bg-light-gray">
            <ArrowLeft size={18} className="text-slate" />
          </Link>
          <span className="flex-1 font-display text-slate">Material Catalogue</span>
        </div>
        <div className="pb-3">
          <Input
            placeholder="Search tiles, fixtures, brands…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search size={15} />}
          />
        </div>
      </header>

      <div className="px-4 py-3">
        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-2 scrollbar-hide">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                "flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                category === c ? "bg-coral text-white" : "bg-light-gray text-gray hover:text-slate"
              )}
            >
              {c === "All" ? "All" : c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>

        {/* Style filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {STYLES.map((s) => (
            <button
              key={s}
              onClick={() => setStyle(s)}
              className={cn(
                "flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors border",
                style === s ? "border-coral text-coral bg-coral-light" : "border-mid-gray text-gray hover:text-slate"
              )}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pb-24">
        {filtered.length === 0 ? (
          <EmptyState icon={Search} title="No items found" description="Try adjusting your filters" />
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((sku) => (
              <SKUCard key={sku.id} sku={sku} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
