export type JobStage =
  | "new_lead"
  | "consultation_booked"
  | "brief_approved"
  | "design_sent"
  | "quote_approved"
  | "in_execution"
  | "qc_review"
  | "handover"
  | "completed"
  | "on_hold"
  | "cancelled";

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  createdAt: string;
}

export interface Lead {
  id: string;
  customerId: string;
  customerName: string;
  phone: string;
  source: "website" | "whatsapp" | "referral" | "instagram" | "google";
  bathroomSize: "small" | "medium" | "large";
  budgetMin: number;
  budgetMax: number;
  status: "new" | "contacted" | "qualified" | "booked" | "archived";
  assignedTo?: string;
  createdAt: string;
  slaDeadline: string;
  estimateRange?: { min: number; max: number };
}

export interface Job {
  id: string;
  customerId: string;
  customerName: string;
  address: string;
  stage: JobStage;
  value: number;
  startDate: string;
  expectedCompletion: string;
  vendorId?: string;
  vendorName?: string;
  assignedOpsId?: string;
  milestones: Milestone[];
  bathroomSqft: number;
  style?: string;
  createdAt: string;
}

export interface Milestone {
  id: string;
  jobId: string;
  name: string;
  status: "pending" | "in_progress" | "submitted" | "qc_pass" | "qc_fail" | "approved";
  targetDate: string;
  actualDate?: string;
  photos: string[];
  opsNote?: string;
  qcScore?: number;
  order: number;
}

export interface SKU {
  id: string;
  name: string;
  category: "tiles" | "fixtures" | "fittings" | "accessories" | "sanitaryware";
  style: "minimal" | "natural" | "geometric" | "classic" | "japandi" | "maximalist";
  finish: string;
  price: number;
  unit: string;
  brand: string;
  countryOfOrigin: string;
  dimensions?: string;
  material?: string;
  imageUrl: string;
  status: "active" | "pending" | "inactive";
}

export interface Vendor {
  id: string;
  name: string;
  phone: string;
  zone: string;
  specializations: string[];
  status: "active" | "inactive" | "probation";
  qcScore: number;
  onTimeRate: number;
  activeJobs: number;
  insuranceStatus: "valid" | "expired" | "pending";
  onboardingDate: string;
}

export interface QuoteLineItem {
  id: string;
  category: string;
  item: string;
  qty: number;
  unit: string;
  unitPrice: number;
  total: number;
  skuId?: string;
}

export interface Quote {
  id: string;
  jobId: string;
  lineItems: QuoteLineItem[];
  subtotal: number;
  platformFee: number;
  gst: number;
  total: number;
  status: "draft" | "sent" | "approved" | "expired";
  validUntil: string;
  paymentSchedule: {
    percent: number;
    amount: number;
    trigger: string;
    status: "pending" | "paid";
  }[];
}

export interface QCReport {
  id: string;
  jobId: string;
  milestoneId: string;
  milestoneName: string;
  overallScore: number;
  status: "pending" | "pass" | "flag" | "fail";
  criteria: {
    name: string;
    score: number;
    observation: string;
    photoUrl?: string;
  }[];
  reviewedBy?: string;
  reviewedAt?: string;
  annotations?: {
    photoUrl: string;
    x: number;
    y: number;
    width: number;
    height: number;
    comment: string;
  }[];
}

export interface StyleProfile {
  name: string;
  description: string;
  tags: string[];
  recommendedSKUs: SKU[];
  colorPalette: string[];
}

export interface DesignConcept {
  id: string;
  jobId: string;
  name: string;
  styleTag: string;
  colorPalette: string[];
  renderUrls: { day: string; night: string };
  customerReaction?: "love" | "not_quite" | null;
  selected: boolean;
}

export interface HandoverReport {
  id: string;
  jobId: string;
  projectSummary: {
    startDate: string;
    endDate: string;
    scopeTags: string[];
    contractor: string;
    totalPaid: number;
  };
  beforeAfterPairs: { area: string; before: string; after: string }[];
  warrantyCards: {
    item: string;
    type: "manufacturer" | "workmanship";
    duration: string;
    validUntil: string;
  }[];
  qcSummary: {
    milestonesCompleted: number;
    snagsResolved: number;
    overallScore: number;
  };
  signedBy?: string;
  signedAt?: string;
  pdfUrl?: string;
}
