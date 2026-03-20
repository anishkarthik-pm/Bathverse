"use client";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle, Clock, AlertCircle, Phone, MapPin, Camera } from "lucide-react";
import { Button, Card, ProgressBar, StatusChip } from "@/components/ui";
import type { Milestone } from "@/types";

const MILESTONES: Milestone[] = [
  { id: "m1", jobId: "j1", name: "Demolition", status: "approved", targetDate: "2024-11-05", actualDate: "2024-11-04", photos: [], qcScore: 96, order: 1 },
  { id: "m2", jobId: "j1", name: "Waterproofing", status: "approved", targetDate: "2024-11-10", actualDate: "2024-11-09", photos: [], qcScore: 91, order: 2 },
  { id: "m3", jobId: "j1", name: "Plumbing Rough-In", status: "approved", targetDate: "2024-11-15", actualDate: "2024-11-15", photos: [], qcScore: 94, order: 3 },
  { id: "m4", jobId: "j1", name: "Tiling - Floor", status: "submitted", targetDate: "2024-11-22", photos: [], qcScore: 87, order: 4 },
  { id: "m5", jobId: "j1", name: "Tiling - Walls", status: "in_progress", targetDate: "2024-11-28", photos: [], order: 5 },
  { id: "m6", jobId: "j1", name: "Fixtures & Fittings", status: "pending", targetDate: "2024-12-05", photos: [], order: 6 },
  { id: "m7", jobId: "j1", name: "Electrical & Lighting", status: "pending", targetDate: "2024-12-10", photos: [], order: 7 },
  { id: "m8", jobId: "j1", name: "Final QC & Handover", status: "pending", targetDate: "2024-12-15", photos: [], order: 8 },
];

const STATUS_ICON = {
  pending: Clock,
  in_progress: Clock,
  submitted: AlertCircle,
  qc_pass: CheckCircle,
  qc_fail: AlertCircle,
  approved: CheckCircle,
};
const STATUS_COLOR = {
  pending: "text-gray",
  in_progress: "text-amber",
  submitted: "text-blue",
  qc_pass: "text-teal",
  qc_fail: "text-coral",
  approved: "text-teal",
};

export default function JobDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const done = MILESTONES.filter((m) => m.status === "approved").length;
  const pct = Math.round((done / MILESTONES.length) * 100);

  return (
    <div className="p-4 md:p-6 max-w-2xl">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-gray mb-4 hover:text-slate">
        <ArrowLeft size={16} /> Back to Jobs
      </button>

      {/* Job Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h1 className="font-display text-xl text-slate">Priya Sharma</h1>
          <p className="text-sm text-gray flex items-center gap-1 mt-0.5">
            <MapPin size={12} /> A-203, Maple Heights, Bandra West
          </p>
        </div>
        <StatusChip status="in_execution" label="In Execution" />
      </div>

      {/* Progress */}
      <Card className="p-4 mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray">Progress</span>
          <span className="font-medium text-slate">{pct}% ({done}/{MILESTONES.length} milestones)</span>
        </div>
        <ProgressBar value={pct} />
        <div className="grid grid-cols-3 gap-3 mt-4 text-center text-xs">
          <div><p className="font-medium text-slate currency">₹3,85,000</p><p className="text-gray">Job Value</p></div>
          <div><p className="font-medium text-slate">1 Nov 2024</p><p className="text-gray">Start Date</p></div>
          <div><p className="font-medium text-slate">15 Dec 2024</p><p className="text-gray">Due Date</p></div>
        </div>
      </Card>

      {/* Contractor */}
      <Card className="p-4 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray mb-0.5">Assigned Contractor</p>
            <p className="font-medium text-slate">Prakash Tile Works</p>
            <p className="text-xs text-gray mt-0.5">Zone: Bandra · QC Score: 4.7</p>
          </div>
          <a href="tel:+919876543210" className="w-9 h-9 rounded-full bg-teal-light flex items-center justify-center">
            <Phone size={15} className="text-teal" />
          </a>
        </div>
      </Card>

      {/* Milestones */}
      <div className="mb-4">
        <p className="text-xs text-gray uppercase tracking-wider mb-3">Milestones</p>
        <div className="bg-white rounded-xl border border-light-gray divide-y divide-light-gray">
          {MILESTONES.map((m) => {
            const Icon = STATUS_ICON[m.status];
            const color = STATUS_COLOR[m.status];
            return (
              <div key={m.id} className="px-4 py-3 flex items-center gap-3">
                <Icon size={16} className={color} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate">{m.name}</p>
                  <p className="text-xs text-gray">{m.actualDate ? `Done: ${m.actualDate}` : `Target: ${m.targetDate}`}</p>
                </div>
                <div className="text-right">
                  {m.qcScore ? (
                    <span className={`text-xs font-medium ${m.qcScore >= 90 ? "text-teal" : m.qcScore >= 70 ? "text-amber" : "text-coral"}`}>
                      {m.qcScore}%
                    </span>
                  ) : (
                    <span className={`text-xs capitalize ${color}`}>{m.status.replace("_", " ")}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1" leftIcon={<Camera size={15} />}>
          View Photos
        </Button>
        <Button className="flex-1">
          QC Review →
        </Button>
      </div>
    </div>
  );
}
