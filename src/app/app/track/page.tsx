"use client";
import { Camera, CheckCircle, Clock, AlertCircle, ChevronRight, Phone } from "lucide-react";
import { StatusChip, ProgressBar, Card } from "@/components/ui";
import { useAppStore } from "@/lib/store";
import type { Job, Milestone } from "@/types";

// Mock data for demo
const MOCK_JOB: Job = {
  id: "j1",
  customerId: "u1",
  customerName: "Priya Sharma",
  address: "A-203, Maple Heights, Bandra West, Mumbai",
  stage: "in_execution",
  value: 385000,
  startDate: "2024-11-01",
  expectedCompletion: "2024-12-15",
  vendorName: "Prakash Tile Works",
  bathroomSqft: 48,
  style: "minimal",
  createdAt: "2024-10-15",
  milestones: [
    { id: "m1", jobId: "j1", name: "Demolition", status: "approved", targetDate: "2024-11-05", actualDate: "2024-11-04", photos: [], order: 1 },
    { id: "m2", jobId: "j1", name: "Waterproofing", status: "approved", targetDate: "2024-11-10", actualDate: "2024-11-09", photos: [], order: 2 },
    { id: "m3", jobId: "j1", name: "Plumbing Rough-In", status: "approved", targetDate: "2024-11-15", actualDate: "2024-11-15", photos: [], qcScore: 94, order: 3 },
    { id: "m4", jobId: "j1", name: "Tiling - Floor", status: "submitted", targetDate: "2024-11-22", photos: [], qcScore: 87, order: 4 },
    { id: "m5", jobId: "j1", name: "Tiling - Walls", status: "in_progress", targetDate: "2024-11-28", photos: [], order: 5 },
    { id: "m6", jobId: "j1", name: "Fixtures & Fittings", status: "pending", targetDate: "2024-12-05", photos: [], order: 6 },
    { id: "m7", jobId: "j1", name: "Electrical & Lighting", status: "pending", targetDate: "2024-12-10", photos: [], order: 7 },
    { id: "m8", jobId: "j1", name: "Final QC & Handover", status: "pending", targetDate: "2024-12-15", photos: [], order: 8 },
  ],
};

const PAYMENT_SCHEDULE = [
  { label: "Booking Advance (20%)", amount: 77000, status: "paid" as const, date: "15 Oct 2024" },
  { label: "Post-Waterproofing (30%)", amount: 115500, status: "paid" as const, date: "10 Nov 2024" },
  { label: "Mid-Execution (30%)", amount: 115500, status: "pending" as const, date: "Due: 25 Nov 2024" },
  { label: "Final Handover (20%)", amount: 77000, status: "pending" as const, date: "Due: 15 Dec 2024" },
];

const MILESTONE_STATUS_MAP = {
  pending: { icon: Clock, color: "text-gray", bg: "bg-light-gray", label: "Upcoming" },
  in_progress: { icon: Clock, color: "text-amber", bg: "bg-amber-light", label: "In Progress" },
  submitted: { icon: AlertCircle, color: "text-blue", bg: "bg-blue-light", label: "Under QC" },
  qc_pass: { icon: CheckCircle, color: "text-teal", bg: "bg-teal-light", label: "QC Passed" },
  qc_fail: { icon: AlertCircle, color: "text-coral", bg: "bg-coral-light", label: "QC Failed" },
  approved: { icon: CheckCircle, color: "text-teal", bg: "bg-teal-light", label: "Approved" },
};

function MilestoneRow({ m, index }: { m: Milestone; index: number }) {
  const cfg = MILESTONE_STATUS_MAP[m.status];
  const Icon = cfg.icon;
  return (
    <div className="flex gap-3 py-3">
      <div className="flex flex-col items-center">
        <div className={`w-7 h-7 rounded-full ${cfg.bg} flex items-center justify-center flex-shrink-0`}>
          <Icon size={14} className={cfg.color} />
        </div>
        {index < MOCK_JOB.milestones.length - 1 && <div className="w-0.5 flex-1 bg-light-gray mt-1" />}
      </div>
      <div className="flex-1 pb-1">
        <div className="flex items-center justify-between mb-0.5">
          <p className="text-sm font-medium text-slate">{m.name}</p>
          {m.qcScore && (
            <span className={`text-xs font-medium ${m.qcScore >= 90 ? "text-teal" : m.qcScore >= 70 ? "text-amber" : "text-coral"}`}>
              QC {m.qcScore}%
            </span>
          )}
        </div>
        <p className="text-xs text-gray">
          {m.actualDate ? `Completed ${m.actualDate}` : `Target: ${m.targetDate}`}
        </p>
        <p className={`text-xs font-medium mt-0.5 ${cfg.color}`}>{cfg.label}</p>
      </div>
    </div>
  );
}

export default function TrackPage() {
  const user = useAppStore((s) => s.user);
  const done = MOCK_JOB.milestones.filter((m) => m.status === "approved").length;
  const pct = Math.round((done / MOCK_JOB.milestones.length) * 100);

  return (
    <div className="max-w-md mx-auto px-4">
      {/* Header */}
      <header className="pt-6 pb-4">
        <p className="text-xs text-gray">Hello, {user?.name}</p>
        <h1 className="font-display text-xl text-slate">Your Project</h1>
      </header>

      {/* Progress card */}
      <Card className="p-4 mb-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-xs text-gray mb-0.5">Overall Progress</p>
            <p className="font-medium text-slate">{pct}% Complete</p>
          </div>
          <StatusChip status="in_execution" label="In Execution" />
        </div>
        <ProgressBar value={pct} className="mb-2" />
        <div className="flex justify-between text-xs text-gray">
          <span>Started: 1 Nov 2024</span>
          <span>Due: 15 Dec 2024</span>
        </div>
      </Card>

      {/* Contractor */}
      <Card className="p-4 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray mb-0.5">Your Contractor</p>
            <p className="text-sm font-medium text-slate">{MOCK_JOB.vendorName}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-xs text-amber">★★★★½</span>
              <span className="text-xs text-gray">4.7 · 48 jobs</span>
            </div>
          </div>
          <a href="tel:+919876543210" className="w-10 h-10 rounded-full bg-teal-light flex items-center justify-center">
            <Phone size={16} className="text-teal" />
          </a>
        </div>
      </Card>

      {/* Milestones */}
      <div className="mb-4">
        <p className="text-xs text-gray uppercase tracking-wider mb-3">Milestone Tracker</p>
        <div className="bg-white rounded-xl border border-light-gray px-4">
          {MOCK_JOB.milestones.map((m, i) => (
            <MilestoneRow key={m.id} m={m} index={i} />
          ))}
        </div>
      </div>

      {/* Payment */}
      <div className="mb-4">
        <p className="text-xs text-gray uppercase tracking-wider mb-3">Payment Schedule</p>
        <div className="space-y-2">
          {PAYMENT_SCHEDULE.map((p) => (
            <div key={p.label} className="bg-white rounded-xl border border-light-gray p-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate">{p.label}</p>
                <p className="text-xs text-gray mt-0.5">{p.date}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium currency text-slate">₹{p.amount.toLocaleString("en-IN")}</p>
                <span className={`text-xs font-medium ${p.status === "paid" ? "text-teal" : "text-amber"}`}>
                  {p.status === "paid" ? "Paid ✓" : "Pending"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Photo gallery placeholder */}
      <div className="mb-8">
        <p className="text-xs text-gray uppercase tracking-wider mb-3">Site Photos</p>
        <div className="bg-light-gray rounded-xl h-32 flex flex-col items-center justify-center gap-2">
          <Camera size={24} className="text-gray" />
          <p className="text-sm text-gray">Photos will appear as milestones are submitted</p>
        </div>
      </div>
    </div>
  );
}
