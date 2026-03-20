"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, MapPin, User, Calendar } from "lucide-react";
import { Input, StatusChip, EmptyState, ProgressBar } from "@/components/ui";
import type { Job, JobStage } from "@/types";
import { cn } from "@/lib/utils";

const MOCK_JOBS: Job[] = [
  {
    id: "j1", customerId: "u1", customerName: "Priya Sharma", address: "A-203, Maple Heights, Bandra West", stage: "in_execution",
    value: 385000, startDate: "2024-11-01", expectedCompletion: "2024-12-15", vendorName: "Prakash Tile Works",
    bathroomSqft: 48, style: "minimal", createdAt: "2024-10-15",
    milestones: Array.from({ length: 8 }, (_, i) => ({
      id: `m${i + 1}`, jobId: "j1", name: `M${i + 1}`, status: i < 3 ? "approved" : i === 3 ? "in_progress" : "pending",
      targetDate: "2024-12-15", photos: [], order: i + 1,
    })),
  },
  {
    id: "j2", customerId: "u2", customerName: "Rahul Mehta", address: "B-402, Palm Court, Powai", stage: "design_sent",
    value: 520000, startDate: "2024-11-10", expectedCompletion: "2025-01-10", vendorName: "Modern Interiors Co.",
    bathroomSqft: 62, style: "japandi", createdAt: "2024-11-01",
    milestones: [],
  },
  {
    id: "j3", customerId: "u3", customerName: "Sunita Rao", address: "C-15, Green Valley, Andheri East", stage: "qc_review",
    value: 290000, startDate: "2024-10-01", expectedCompletion: "2024-11-20", vendorName: "Quality Build Pvt Ltd",
    bathroomSqft: 38, style: "classic", createdAt: "2024-09-25",
    milestones: Array.from({ length: 8 }, (_, i) => ({
      id: `m${i + 1}`, jobId: "j3", name: `M${i + 1}`, status: i < 7 ? "approved" : "submitted",
      targetDate: "2024-11-20", photos: [], order: i + 1,
    })),
  },
];

const STAGE_LABELS: Record<JobStage, string> = {
  new_lead: "New Lead",
  consultation_booked: "Consultation",
  brief_approved: "Brief Approved",
  design_sent: "Design Sent",
  quote_approved: "Quote Approved",
  in_execution: "In Execution",
  qc_review: "QC Review",
  handover: "Handover",
  completed: "Completed",
  on_hold: "On Hold",
  cancelled: "Cancelled",
};

const STAGE_STATUS: Record<JobStage, "active" | "pending" | "qc_pass" | "qc_fail" | "in_execution" | "info"> = {
  new_lead: "pending",
  consultation_booked: "pending",
  brief_approved: "info",
  design_sent: "info",
  quote_approved: "info",
  in_execution: "in_execution",
  qc_review: "pending",
  handover: "active",
  completed: "qc_pass",
  on_hold: "qc_fail",
  cancelled: "qc_fail",
};

function JobCard({ job }: { job: Job }) {
  const done = job.milestones.filter((m) => m.status === "approved").length;
  const pct = job.milestones.length ? Math.round((done / job.milestones.length) * 100) : 0;

  return (
    <Link href={`/ops/jobs/${job.id}`} className="block bg-white rounded-xl border border-light-gray p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="font-medium text-slate">{job.customerName}</p>
          <p className="text-xs text-gray flex items-center gap-1 mt-0.5">
            <MapPin size={11} /> {job.address}
          </p>
        </div>
        <StatusChip status={STAGE_STATUS[job.stage] as any} label={STAGE_LABELS[job.stage]} size="sm" />
      </div>

      {job.milestones.length > 0 && (
        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray mb-1">
            <span>{done}/{job.milestones.length} milestones</span>
            <span>{pct}%</span>
          </div>
          <ProgressBar value={pct} size="sm" />
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-gray">
        <span className="flex items-center gap-1">
          <User size={11} /> {job.vendorName}
        </span>
        <span className="flex items-center gap-1">
          <Calendar size={11} /> Due: {job.expectedCompletion}
        </span>
        <span className="text-slate font-medium currency">₹{(job.value / 1000).toFixed(0)}k</span>
      </div>
    </Link>
  );
}

const ALL_STAGES: JobStage[] = ["in_execution", "qc_review", "design_sent", "quote_approved", "completed"];

export default function JobsPage() {
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState<JobStage | "all">("all");

  const filtered = MOCK_JOBS.filter((j) => {
    const matchSearch = j.customerName.toLowerCase().includes(search.toLowerCase()) || j.address.toLowerCase().includes(search.toLowerCase());
    const matchStage = stageFilter === "all" || j.stage === stageFilter;
    return matchSearch && matchStage;
  });

  const totalValue = MOCK_JOBS.reduce((sum, j) => sum + j.value, 0);

  return (
    <div className="p-4 md:p-6 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-display text-slate">Jobs</h1>
          <p className="text-sm text-gray">{MOCK_JOBS.length} active · ₹{(totalValue / 100000).toFixed(1)}L pipeline</p>
        </div>
      </div>

      {/* Stage KPIs */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { label: "In Execution", count: MOCK_JOBS.filter((j) => j.stage === "in_execution").length, color: "text-coral" },
          { label: "QC Review", count: MOCK_JOBS.filter((j) => j.stage === "qc_review").length, color: "text-amber" },
          { label: "Completed", count: MOCK_JOBS.filter((j) => j.stage === "completed").length, color: "text-teal" },
        ].map(({ label, count, color }) => (
          <div key={label} className="bg-white rounded-xl border border-light-gray p-3 text-center">
            <p className={cn("text-xl font-medium currency", color)}>{count}</p>
            <p className="text-xs text-gray">{label}</p>
          </div>
        ))}
      </div>

      <Input
        placeholder="Search jobs…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        leftIcon={<Search size={14} />}
        className="mb-4"
      />

      {filtered.length === 0 ? (
        <EmptyState icon={Search} title="No jobs found" description="Try a different search" />
      ) : (
        <div className="space-y-3">
          {filtered.map((j) => <JobCard key={j.id} job={j} />)}
        </div>
      )}
    </div>
  );
}
