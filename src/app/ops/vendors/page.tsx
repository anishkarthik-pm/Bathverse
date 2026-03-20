"use client";
import { useState } from "react";
import { Search, Phone, Star, Briefcase, Shield, Plus } from "lucide-react";
import { Button, Input, EmptyState } from "@/components/ui";
import type { Vendor } from "@/types";
import { cn } from "@/lib/utils";

const MOCK_VENDORS: Vendor[] = [
  { id: "v1", name: "Prakash Tile Works", phone: "9876543210", zone: "Bandra / Khar", specializations: ["Tiling", "Waterproofing"], status: "active", qcScore: 4.7, onTimeRate: 94, activeJobs: 2, insuranceStatus: "valid", onboardingDate: "2023-06-15" },
  { id: "v2", name: "Modern Interiors Co.", phone: "9988776655", zone: "Powai / Andheri", specializations: ["Full Renovation", "Electrical"], status: "active", qcScore: 4.5, onTimeRate: 88, activeJobs: 1, insuranceStatus: "valid", onboardingDate: "2022-11-20" },
  { id: "v3", name: "Quality Build Pvt Ltd", phone: "9123456789", zone: "South Mumbai", specializations: ["Plumbing", "Tiling", "Fixtures"], status: "active", qcScore: 4.8, onTimeRate: 96, activeJobs: 3, insuranceStatus: "valid", onboardingDate: "2021-04-01" },
  { id: "v4", name: "Sunrise Contractors", phone: "9765432108", zone: "Thane", specializations: ["Tiling", "Waterproofing", "Painting"], status: "probation", qcScore: 3.8, onTimeRate: 72, activeJobs: 0, insuranceStatus: "expired", onboardingDate: "2024-01-10" },
  { id: "v5", name: "Elite Fit-out Solutions", phone: "9654321087", zone: "Navi Mumbai", specializations: ["Luxury Fixtures", "Electrical", "Carpentry"], status: "inactive", qcScore: 4.2, onTimeRate: 85, activeJobs: 0, insuranceStatus: "pending", onboardingDate: "2023-09-05" },
];

const STATUS_CONFIG = {
  active: { bg: "bg-teal-light", text: "text-teal", label: "Active" },
  inactive: { bg: "bg-light-gray", text: "text-gray", label: "Inactive" },
  probation: { bg: "bg-amber-light", text: "text-amber", label: "Probation" },
};

function VendorCard({ vendor }: { vendor: Vendor }) {
  const cfg = STATUS_CONFIG[vendor.status];
  return (
    <div className="bg-white rounded-xl border border-light-gray p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-medium text-slate">{vendor.name}</p>
          <p className="text-xs text-gray mt-0.5">{vendor.zone}</p>
        </div>
        <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", cfg.bg, cfg.text)}>{cfg.label}</span>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-2 mb-3 text-center">
        <div className="bg-light-gray rounded-lg p-2">
          <p className="text-sm font-medium text-slate flex items-center justify-center gap-0.5">
            <Star size={11} className="text-amber" />{vendor.qcScore}
          </p>
          <p className="text-xs text-gray">QC Score</p>
        </div>
        <div className="bg-light-gray rounded-lg p-2">
          <p className="text-sm font-medium text-slate">{vendor.onTimeRate}%</p>
          <p className="text-xs text-gray">On-Time</p>
        </div>
        <div className="bg-light-gray rounded-lg p-2">
          <p className="text-sm font-medium text-slate">{vendor.activeJobs}</p>
          <p className="text-xs text-gray">Active Jobs</p>
        </div>
      </div>

      {/* Specializations */}
      <div className="flex flex-wrap gap-1 mb-3">
        {vendor.specializations.map((s) => (
          <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-light-gray text-gray">{s}</span>
        ))}
      </div>

      {/* Insurance */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs">
          <Shield size={11} className={vendor.insuranceStatus === "valid" ? "text-teal" : "text-coral"} />
          <span className={vendor.insuranceStatus === "valid" ? "text-teal" : "text-coral"}>
            Insurance: {vendor.insuranceStatus}
          </span>
        </div>
        <a href={`tel:+91${vendor.phone}`} className="flex items-center gap-1 text-xs text-gray hover:text-slate">
          <Phone size={11} /> {vendor.phone}
        </a>
      </div>
    </div>
  );
}

export default function VendorsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | Vendor["status"]>("all");

  const filtered = MOCK_VENDORS.filter((v) => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) || v.zone.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || v.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-4 md:p-6 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-display text-slate">Vendors</h1>
          <p className="text-sm text-gray">{MOCK_VENDORS.filter((v) => v.status === "active").length} active contractors</p>
        </div>
        <Button size="sm" leftIcon={<Plus size={14} />}>Add Vendor</Button>
      </div>

      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Search vendors…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leftIcon={<Search size={14} />}
          className="flex-1"
        />
        {(["all", "active", "probation", "inactive"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={cn(
              "flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize",
              statusFilter === s ? "bg-coral text-white" : "bg-white border border-light-gray text-gray"
            )}
          >
            {s}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={Search} title="No vendors found" description="Try a different search" />
      ) : (
        <div className="grid md:grid-cols-2 gap-3">
          {filtered.map((v) => <VendorCard key={v.id} vendor={v} />)}
        </div>
      )}
    </div>
  );
}
