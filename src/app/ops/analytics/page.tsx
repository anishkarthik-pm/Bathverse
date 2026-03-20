"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts";

const MONTHLY_REVENUE = [
  { month: "Jun", revenue: 840000 },
  { month: "Jul", revenue: 1120000 },
  { month: "Aug", revenue: 980000 },
  { month: "Sep", revenue: 1350000 },
  { month: "Oct", revenue: 1680000 },
  { month: "Nov", revenue: 1420000 },
];

const LEAD_SOURCES = [
  { source: "Website", count: 42 },
  { source: "WhatsApp", count: 28 },
  { source: "Referral", count: 18 },
  { source: "Instagram", count: 15 },
  { source: "Google", count: 11 },
];

const CONVERSION_TREND = [
  { week: "W1 Oct", rate: 24 },
  { week: "W2 Oct", rate: 28 },
  { week: "W3 Oct", rate: 22 },
  { week: "W4 Oct", rate: 31 },
  { week: "W1 Nov", rate: 29 },
  { week: "W2 Nov", rate: 35 },
];

function KPI({ label, value, sub, color = "text-slate" }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div className="bg-white rounded-xl border border-light-gray p-4">
      <p className="text-xs text-gray mb-1">{label}</p>
      <p className={`text-2xl font-display font-medium currency ${color}`}>{value}</p>
      {sub && <p className="text-xs text-gray mt-1">{sub}</p>}
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <div className="p-4 md:p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-xl font-display text-slate">Analytics</h1>
        <p className="text-sm text-gray">Nov 2024 · Mumbai region</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <KPI label="Revenue MTD" value="₹14.2L" sub="↑ 12% vs Oct" color="text-coral" />
        <KPI label="Active Jobs" value="8" sub="3 in execution" />
        <KPI label="Lead-to-Book" value="32%" sub="↑ 4pp vs Oct" color="text-teal" />
        <KPI label="Avg QC Score" value="91.4%" sub="↑ 2.1pp vs Oct" color="text-teal" />
      </div>

      {/* Revenue chart */}
      <div className="bg-white rounded-xl border border-light-gray p-4 mb-4">
        <p className="text-sm font-medium text-slate mb-4">Monthly Revenue</p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={MONTHLY_REVENUE} barSize={28}>
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#5F5E5A" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#5F5E5A" }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
            <Tooltip formatter={(v: number) => [`₹${(v / 100000).toFixed(1)}L`, "Revenue"]} />
            <Bar dataKey="revenue" fill="#C04828" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        {/* Lead sources */}
        <div className="bg-white rounded-xl border border-light-gray p-4">
          <p className="text-sm font-medium text-slate mb-4">Lead Sources</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={LEAD_SOURCES} layout="vertical" barSize={14}>
              <XAxis type="number" tick={{ fontSize: 10, fill: "#5F5E5A" }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="source" tick={{ fontSize: 11, fill: "#5F5E5A" }} axisLine={false} tickLine={false} width={70} />
              <Tooltip />
              <Bar dataKey="count" fill="#0F6E56" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Conversion trend */}
        <div className="bg-white rounded-xl border border-light-gray p-4">
          <p className="text-sm font-medium text-slate mb-4">Conversion Rate Trend</p>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={CONVERSION_TREND}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1EFE8" />
              <XAxis dataKey="week" tick={{ fontSize: 10, fill: "#5F5E5A" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#5F5E5A" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
              <Tooltip formatter={(v: number) => [`${v}%`, "Conversion"]} />
              <Line type="monotone" dataKey="rate" stroke="#C04828" strokeWidth={2} dot={{ fill: "#C04828", r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pipeline table */}
      <div className="bg-white rounded-xl border border-light-gray overflow-hidden">
        <div className="px-4 py-3 border-b border-light-gray">
          <p className="text-sm font-medium text-slate">Stage Pipeline</p>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-light-gray">
            <tr>
              <th className="text-left px-4 py-2.5 text-xs text-gray font-medium">Stage</th>
              <th className="text-right px-4 py-2.5 text-xs text-gray font-medium">Jobs</th>
              <th className="text-right px-4 py-2.5 text-xs text-gray font-medium">Value</th>
              <th className="text-right px-4 py-2.5 text-xs text-gray font-medium">Avg Days</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-light-gray">
            {[
              { stage: "New Lead", jobs: 5, value: "₹18.2L", avgDays: 1.2 },
              { stage: "Consultation Booked", jobs: 3, value: "₹12.4L", avgDays: 3.8 },
              { stage: "Brief Approved", jobs: 2, value: "₹8.6L", avgDays: 5.1 },
              { stage: "Design Sent", jobs: 4, value: "₹17.8L", avgDays: 4.3 },
              { stage: "In Execution", jobs: 8, value: "₹38.5L", avgDays: 32.6 },
              { stage: "QC Review", jobs: 2, value: "₹9.1L", avgDays: 2.4 },
            ].map(({ stage, jobs, value, avgDays }) => (
              <tr key={stage} className="hover:bg-warm-white">
                <td className="px-4 py-3 text-slate">{stage}</td>
                <td className="px-4 py-3 text-right currency font-medium text-slate">{jobs}</td>
                <td className="px-4 py-3 text-right currency text-slate">{value}</td>
                <td className="px-4 py-3 text-right text-gray">{avgDays}d</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
