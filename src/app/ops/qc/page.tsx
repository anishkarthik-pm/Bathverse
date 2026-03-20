"use client";
import { useState } from "react";
import { CheckCircle, XCircle, AlertCircle, Clock, Camera, ChevronRight } from "lucide-react";
import { Button, Card, StatusChip, EmptyState } from "@/components/ui";
import type { QCReport } from "@/types";
import { cn } from "@/lib/utils";

const MOCK_QC_REPORTS: QCReport[] = [
  {
    id: "qc1", jobId: "j1", milestoneId: "m4", milestoneName: "Tiling - Floor",
    overallScore: 87, status: "flag",
    criteria: [
      { name: "Levelness", score: 92, observation: "Slight dip near shower drain – within 2mm tolerance" },
      { name: "Grout Consistency", score: 78, observation: "Grout line width uneven in corner section – requires repointing" },
      { name: "Tile Alignment", score: 90, observation: "Good alignment overall" },
      { name: "Substrate Adhesion", score: 88, observation: "Hollow tiles detected in 2 spots near far wall" },
    ],
    reviewedBy: "Ops Team",
  },
  {
    id: "qc2", jobId: "j3", milestoneId: "m8", milestoneName: "Final QC – Sunita Rao",
    overallScore: 95, status: "pass",
    criteria: [
      { name: "Waterproofing", score: 98, observation: "Full membrane coverage, 72hr water test passed" },
      { name: "Tiling Quality", score: 94, observation: "Excellent finish throughout" },
      { name: "Fixtures & Fittings", score: 96, observation: "All fittings correctly torqued and sealed" },
      { name: "Electrical", score: 92, observation: "All switches and exhaust working" },
    ],
    reviewedBy: "Senior QC",
    reviewedAt: "2024-11-18",
  },
  {
    id: "qc3", jobId: "j2", milestoneId: "m3", milestoneName: "Waterproofing – Rahul Mehta",
    overallScore: 0, status: "pending",
    criteria: [],
  },
];

const STATUS_CONFIG = {
  pending: { icon: Clock, color: "text-gray", bg: "bg-light-gray", label: "Awaiting Review" },
  pass: { icon: CheckCircle, color: "text-teal", bg: "bg-teal-light", label: "QC Passed" },
  flag: { icon: AlertCircle, color: "text-amber", bg: "bg-amber-light", label: "Flag – Rework" },
  fail: { icon: XCircle, color: "text-coral", bg: "bg-coral-light", label: "QC Failed" },
};

function ScoreBar({ score }: { score: number }) {
  const color = score >= 90 ? "bg-teal" : score >= 70 ? "bg-amber" : "bg-coral";
  return (
    <div className="h-1.5 bg-light-gray rounded-full overflow-hidden">
      <div className={cn("h-full rounded-full transition-all", color)} style={{ width: `${score}%` }} />
    </div>
  );
}

function QCCard({ report, onReview }: { report: QCReport; onReview: (r: QCReport) => void }) {
  const cfg = STATUS_CONFIG[report.status];
  const Icon = cfg.icon;
  return (
    <div className="bg-white rounded-xl border border-light-gray p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-medium text-slate">{report.milestoneName}</p>
          <p className="text-xs text-gray mt-0.5">Job #{report.jobId}</p>
        </div>
        <span className={cn("flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full", cfg.bg, cfg.color)}>
          <Icon size={11} /> {cfg.label}
        </span>
      </div>

      {report.status !== "pending" && (
        <div className="mb-3">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray">Overall Score</span>
            <span className={cn("font-medium", report.overallScore >= 90 ? "text-teal" : report.overallScore >= 70 ? "text-amber" : "text-coral")}>
              {report.overallScore}%
            </span>
          </div>
          <ScoreBar score={report.overallScore} />
        </div>
      )}

      {report.criteria.slice(0, 2).map((c) => (
        <div key={c.name} className="flex justify-between text-xs py-1.5 border-t border-light-gray">
          <span className="text-gray">{c.name}</span>
          <span className={cn("font-medium", c.score >= 90 ? "text-teal" : c.score >= 70 ? "text-amber" : "text-coral")}>{c.score}%</span>
        </div>
      ))}
      {report.criteria.length > 2 && (
        <p className="text-xs text-gray mt-1">+{report.criteria.length - 2} more criteria</p>
      )}

      <Button variant="outline" size="sm" className="w-full mt-3" onClick={() => onReview(report)}>
        {report.status === "pending" ? "Start QC Review" : "View Full Report"} <ChevronRight size={14} className="ml-1" />
      </Button>
    </div>
  );
}

export default function QCPage() {
  const [selected, setSelected] = useState<QCReport | null>(null);

  const pending = MOCK_QC_REPORTS.filter((r) => r.status === "pending");
  const flagged = MOCK_QC_REPORTS.filter((r) => r.status === "flag");
  const passed = MOCK_QC_REPORTS.filter((r) => r.status === "pass");

  return (
    <div className="p-4 md:p-6 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-xl font-display text-slate">QC Reviews</h1>
        <p className="text-sm text-gray">{pending.length} pending · {flagged.length} flagged · {passed.length} passed</p>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        <div className="bg-white rounded-xl border border-light-gray p-3 text-center">
          <p className="text-xl font-medium text-gray currency">{pending.length}</p>
          <p className="text-xs text-gray">Pending</p>
        </div>
        <div className="bg-amber-light rounded-xl p-3 text-center">
          <p className="text-xl font-medium text-amber currency">{flagged.length}</p>
          <p className="text-xs text-amber">Flagged</p>
        </div>
        <div className="bg-teal-light rounded-xl p-3 text-center">
          <p className="text-xl font-medium text-teal currency">{passed.length}</p>
          <p className="text-xs text-teal">Passed</p>
        </div>
      </div>

      {/* Pending first */}
      {pending.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-gray uppercase tracking-wider mb-3">Awaiting Review</p>
          <div className="space-y-3">
            {pending.map((r) => <QCCard key={r.id} report={r} onReview={setSelected} />)}
          </div>
        </div>
      )}

      {flagged.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-amber uppercase tracking-wider mb-3">Flagged – Rework Required</p>
          <div className="space-y-3">
            {flagged.map((r) => <QCCard key={r.id} report={r} onReview={setSelected} />)}
          </div>
        </div>
      )}

      {passed.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-teal uppercase tracking-wider mb-3">Recently Passed</p>
          <div className="space-y-3">
            {passed.map((r) => <QCCard key={r.id} report={r} onReview={setSelected} />)}
          </div>
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end" onClick={() => setSelected(null)}>
          <div className="bg-white w-full rounded-t-2xl max-h-[85vh] overflow-y-auto p-5" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <h2 className="font-display text-lg text-slate">{selected.milestoneName}</h2>
              <button onClick={() => setSelected(null)} className="text-gray text-sm">✕</button>
            </div>
            <div className="space-y-3">
              {selected.criteria.map((c) => (
                <div key={c.name} className="border border-light-gray rounded-xl p-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-slate">{c.name}</span>
                    <span className={cn("text-sm font-medium", c.score >= 90 ? "text-teal" : c.score >= 70 ? "text-amber" : "text-coral")}>{c.score}%</span>
                  </div>
                  <ScoreBar score={c.score} />
                  <p className="text-xs text-gray mt-2">{c.observation}</p>
                </div>
              ))}
            </div>
            {selected.status === "pending" && (
              <div className="mt-4 flex gap-3">
                <Button variant="outline" className="flex-1 border-coral text-coral">Flag for Rework</Button>
                <Button className="flex-1">Approve ✓</Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
