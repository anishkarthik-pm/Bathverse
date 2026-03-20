"use client";
import { useState } from "react";
import { Search, Phone, Clock, ChevronRight, Plus, Filter } from "lucide-react";
import { Button, Input, StatusChip, EmptyState } from "@/components/ui";
import type { Lead } from "@/types";
import { cn } from "@/lib/utils";

const MOCK_LEADS: Lead[] = [
  { id: "l1", customerId: "c1", customerName: "Rahul Mehta", phone: "9876543210", source: "website", bathroomSize: "medium", budgetMin: 250000, budgetMax: 350000, status: "new", createdAt: "2024-11-18", slaDeadline: "2024-11-20", estimateRange: { min: 220000, max: 320000 } },
  { id: "l2", customerId: "c2", customerName: "Sunita Rao", phone: "9988776655", source: "whatsapp", bathroomSize: "large", budgetMin: 400000, budgetMax: 600000, status: "contacted", assignedTo: "ops1", createdAt: "2024-11-17", slaDeadline: "2024-11-19", estimateRange: { min: 380000, max: 520000 } },
  { id: "l3", customerId: "c3", customerName: "Kiran Patel", phone: "9123456789", source: "referral", bathroomSize: "small", budgetMin: 120000, budgetMax: 180000, status: "qualified", assignedTo: "ops1", createdAt: "2024-11-15", slaDeadline: "2024-11-17", estimateRange: { min: 110000, max: 160000 } },
  { id: "l4", customerId: "c4", customerName: "Ananya Singh", phone: "9765432108", source: "instagram", bathroomSize: "medium", budgetMin: 300000, budgetMax: 450000, status: "booked", assignedTo: "ops2", createdAt: "2024-11-12", slaDeadline: "2024-11-14", estimateRange: { min: 280000, max: 420000 } },
  { id: "l5", customerId: "c5", customerName: "Deepak Joshi", phone: "9654321087", source: "google", bathroomSize: "large", budgetMin: 550000, budgetMax: 800000, status: "new", createdAt: "2024-11-18", slaDeadline: "2024-11-20" },
];

const STATUS_COLORS: Record<Lead["status"], string> = {
  new: "bg-blue-light text-blue",
  contacted: "bg-amber-light text-amber",
  qualified: "bg-teal-light text-teal",
  booked: "bg-teal-light text-teal",
  archived: "bg-light-gray text-gray",
};

const SOURCE_LABELS: Record<Lead["source"], string> = {
  website: "Website",
  whatsapp: "WhatsApp",
  referral: "Referral",
  instagram: "Instagram",
  google: "Google",
};

function LeadCard({ lead }: { lead: Lead }) {
  const isOverSla = new Date(lead.slaDeadline) < new Date();
  return (
    <div className="bg-white rounded-xl border border-light-gray p-4 hover:shadow-sm transition-shadow cursor-pointer">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="font-medium text-slate">{lead.customerName}</p>
          <p className="text-xs text-gray flex items-center gap-1 mt-0.5">
            <Phone size={11} /> {lead.phone} · {SOURCE_LABELS[lead.source]}
          </p>
        </div>
        <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full capitalize", STATUS_COLORS[lead.status])}>
          {lead.status}
        </span>
      </div>
      <div className="flex items-center justify-between text-xs text-gray">
        <span>
          {lead.bathroomSize.charAt(0).toUpperCase() + lead.bathroomSize.slice(1)} bathroom ·{" "}
          ₹{(lead.budgetMin / 100000).toFixed(1)}–{(lead.budgetMax / 100000).toFixed(1)}L
        </span>
        <span className={cn("flex items-center gap-1", isOverSla && lead.status !== "booked" && lead.status !== "archived" ? "text-coral" : "text-gray")}>
          <Clock size={11} />
          SLA: {lead.slaDeadline}
        </span>
      </div>
      {lead.estimateRange && (
        <p className="text-xs text-gray mt-1">
          Estimate: ₹{(lead.estimateRange.min / 1000).toFixed(0)}k – ₹{(lead.estimateRange.max / 1000).toFixed(0)}k
        </p>
      )}
    </div>
  );
}

export default function LeadsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<Lead["status"] | "all">("all");

  const filtered = MOCK_LEADS.filter((l) => {
    const matchSearch = l.customerName.toLowerCase().includes(search.toLowerCase()) || l.phone.includes(search);
    const matchStatus = statusFilter === "all" || l.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const counts = MOCK_LEADS.reduce((acc, l) => {
    acc[l.status] = (acc[l.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="p-4 md:p-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-display text-slate">Leads</h1>
          <p className="text-sm text-gray">{MOCK_LEADS.length} total · {counts.new || 0} new</p>
        </div>
        <Button size="sm" leftIcon={<Plus size={14} />}>Add Lead</Button>
      </div>

      {/* KPI bar */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {[
          { label: "New", value: counts.new || 0, color: "text-blue" },
          { label: "Contacted", value: counts.contacted || 0, color: "text-amber" },
          { label: "Qualified", value: counts.qualified || 0, color: "text-teal" },
          { label: "Booked", value: counts.booked || 0, color: "text-teal" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-xl border border-light-gray p-3 text-center">
            <p className={cn("text-xl font-medium currency", color)}>{value}</p>
            <p className="text-xs text-gray">{label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Search leads…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leftIcon={<Search size={14} />}
          className="flex-1"
        />
        <div className="flex gap-1">
          {(["all", "new", "contacted", "qualified", "booked"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize",
                statusFilter === s ? "bg-coral text-white" : "bg-white border border-light-gray text-gray hover:text-slate"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Lead list */}
      {filtered.length === 0 ? (
        <EmptyState icon={Search} title="No leads found" description="Try a different search or filter" />
      ) : (
        <div className="space-y-2">
          {filtered.map((l) => <LeadCard key={l.id} lead={l} />)}
        </div>
      )}
    </div>
  );
}
