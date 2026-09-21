export type FlowStep = 'landing' | 'login' | 'search' | 'book' | 'voucher' | 'learn';

export type ViewportMode = 'responsive' | 'desktop' | 'tablet' | 'mobile';

export type ViewMode = 'flow' | 'storyboard';

export interface StepMeta {
  id: FlowStep;
  code: string;
  title: string;
  originalLabel: string;
  description: string;
  uxFocus: string;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  durationWeeks: number;
  totalHours: number;
  format: 'Live Cohort' | 'Blended Workshop';
  cohortSchedule: string;
  startDate: string;
  seatsTotal: number;
  seatsRemaining: number;
  instructor: {
    name: string;
    role: string;
    org: string;
  };
  tuition: number;
  summary: string;
  curriculum: {
    module: number;
    title: string;
    duration: string;
    lessons: string[];
  }[];
}

export interface BookingData {
  courseId: string;
  courseTitle: string;
  cohortDate: string;
  attendeeName: string;
  attendeeEmail: string;
  organization: string;
  billingMethod: 'company_voucher' | 'credit_card' | 'invoice';
  bookingReference: string;
  issuedTimestamp: string;
  status: 'pending' | 'issued' | 'confirmed';
}

export interface VoucherData {
  voucherCode: string;
  bookingRef: string;
  courseTitle: string;
  recipientEmail: string;
  issueDate: string;
  validUntil: string;
  discountValue: string;
  status: 'sent' | 'redeemed';
  activatedAt?: string;
}

export interface ClassroomState {
  isLive: boolean;
  activeModuleIndex: number;
  activeLessonIndex: number;
  isHandRaised: boolean;
  activeTab: 'stream' | 'syllabus' | 'resources' | 'discussion';
  chatMessages: {
    id: string;
    sender: string;
    role: 'Instructor' | 'Teaching Assistant' | 'Student' | 'You';
    time: string;
    text: string;
  }[];
}
