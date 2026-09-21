import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Ticket, 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Building, 
  CreditCard, 
  Download, 
  ArrowLeft,
  FileText,
  AlertCircle
} from 'lucide-react';
import { Course, BookingData, FlowStep } from '../../types';

interface BookStepProps {
  course: Course;
  userEmail: string;
  bookingData: BookingData;
  onConfirmBooking: (data: BookingData) => void;
  onNavigate: (step: FlowStep) => void;
}

export const BookStep: React.FC<BookStepProps> = ({
  course,
  userEmail,
  bookingData,
  onConfirmBooking,
  onNavigate,
}) => {
  const [attendeeName, setAttendeeName] = useState(bookingData.attendeeName || 'Alex Chen');
  const [attendeeEmail, setAttendeeEmail] = useState(bookingData.attendeeEmail || userEmail || 'alex.chen@company.com');
  const [organization, setOrganization] = useState(bookingData.organization || 'Tech Strategy Group Ltd');
  const [billingMethod, setBillingMethod] = useState<'company_voucher' | 'credit_card' | 'invoice'>(
    bookingData.billingMethod || 'company_voucher'
  );
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isIssued, setIsIssued] = useState(bookingData.status === 'issued');

  const handleIssueBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: BookingData = {
      courseId: course.id,
      courseTitle: course.title,
      cohortDate: course.startDate,
      attendeeName,
      attendeeEmail,
      organization,
      billingMethod,
      bookingReference: bookingData.bookingReference || `REG-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      issuedTimestamp: new Date().toISOString(),
      status: 'issued',
    };
    setIsIssued(true);
    onConfirmBooking(updated);
  };

  return (
    <div className="w-full bg-neutral-100 min-h-[calc(100vh-140px)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Stage Header */}
        <div className="border border-neutral-300 bg-white p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="bg-neutral-900 text-white px-2 py-0.5 font-bold">WF-04</span>
            <span className="font-bold text-neutral-800">
              STAGE: BOOKING & SEAT ISSUANCE // CHECKOUT PROTOCOL
            </span>
          </div>
          <span className="text-neutral-500">
            Flow: [Search] ➔ [Book / Issued] ➔ [Dapat Kupon/Voucher Email]
          </span>
        </div>

        {isIssued ? (
          /* ========================================================================= */
          /* STATE B: BOOKING ISSUED CONFIRMATION                                     */
          /* ========================================================================= */
          <div className="border-2 border-neutral-900 bg-white p-6 sm:p-10 space-y-8 shadow-sm">
            {/* Success Banner */}
            <div className="border-2 border-neutral-800 bg-neutral-50 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-neutral-900 text-white">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <div className="font-mono text-xs text-neutral-500 uppercase tracking-wider">
                    [ TRANSACTION CONFIRMED & SEAT ISSUED ]
                  </div>
                  <h2 className="text-2xl font-bold font-sans text-neutral-950 mt-0.5">
                    Cohort Booking Successfully Issued!
                  </h2>
                  <p className="text-xs font-mono text-neutral-600 mt-1">
                    Your enrollment slot has been formally locked in the cohort roster.
                  </p>
                </div>
              </div>

              {/* Reference ID Pill */}
              <div className="border-2 border-neutral-800 bg-white p-3 font-mono text-center sm:text-right">
                <span className="text-[10px] text-neutral-500 block">BOOKING REFERENCE</span>
                <span className="text-base font-bold text-neutral-900">
                  {bookingData.bookingReference || 'REG-2026-88421'}
                </span>
                <span className="text-[10px] text-neutral-500 block mt-0.5">[STATUS: ISSUED]</span>
              </div>
            </div>

            {/* Crucial Next-Step Notice Banner (Pointing to Stage 5: Voucher Email) */}
            <div className="border-2 border-neutral-800 bg-neutral-100 p-5 space-y-3 font-mono">
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-900">
                <Mail className="w-4 h-4 text-neutral-800" />
                <span>NEXT STEP: RECEIVE YOUR EMAIL VOUCHER / COUPON PASS</span>
              </div>
              <p className="text-xs text-neutral-700 font-sans leading-relaxed">
                An automated email containing your official <strong className="font-mono">100% Tuition Voucher Pass & Classroom Access Key</strong> has just been generated and delivered to <strong>{attendeeEmail}</strong>.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  id="btn-goto-voucher-email"
                  onClick={() => onNavigate('voucher')}
                  className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-xs font-bold border border-neutral-900 flex items-center gap-2 transition-colors"
                >
                  <span>Open Email & Claim Voucher Pass</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => alert(`[Wireframe Sim]: Downloaded iCal invite for ${course.title} starting ${course.startDate}`)}
                  className="px-4 py-2.5 bg-white hover:bg-neutral-100 text-neutral-800 font-mono text-xs border border-neutral-400 flex items-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Download .ICS Calendar Pass</span>
                </button>
              </div>
            </div>

            {/* Issued Ticket Summary Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 font-mono text-xs">
              <div className="border border-neutral-300 p-4 space-y-3 bg-neutral-50">
                <div className="font-bold text-neutral-900 border-b border-neutral-200 pb-2">
                  [ COHORT DETAILS ]
                </div>
                <div className="space-y-1.5 text-neutral-700">
                  <div><strong>Course:</strong> {course.title} ({course.code})</div>
                  <div><strong>Start Date:</strong> {course.startDate}</div>
                  <div><strong>Schedule:</strong> {course.cohortSchedule}</div>
                  <div><strong>Instructor:</strong> {course.instructor.name}</div>
                  <div><strong>Format:</strong> {course.format} (Live interactive)</div>
                </div>
              </div>

              <div className="border border-neutral-300 p-4 space-y-3 bg-neutral-50">
                <div className="font-bold text-neutral-900 border-b border-neutral-200 pb-2">
                  [ ATTENDEE & VOUCHER BILLING ]
                </div>
                <div className="space-y-1.5 text-neutral-700">
                  <div><strong>Attendee:</strong> {attendeeName}</div>
                  <div><strong>Email:</strong> {attendeeEmail}</div>
                  <div><strong>Organization:</strong> {organization}</div>
                  <div><strong>Method:</strong> Company Tuition Voucher</div>
                  <div><strong>Tuition Status:</strong> $0.00 (100% Sponsor Voucher)</div>
                </div>
              </div>
            </div>

            {/* Bottom Back Button */}
            <div className="border-t border-neutral-200 pt-4 flex items-center justify-between text-xs font-mono">
              <button
                onClick={() => setIsIssued(false)}
                className="text-neutral-500 hover:text-neutral-900 underline"
              >
                ← Edit Attendee Information
              </button>
              <button
                onClick={() => onNavigate('search')}
                className="text-neutral-500 hover:text-neutral-900 underline"
              >
                Browse More Courses
              </button>
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* STATE A: BOOKING REGISTRATION & CHECKOUT FORM                            */
          /* ========================================================================= */
          <form onSubmit={handleIssueBooking} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Form Fields (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                {/* Attendee Details Card */}
                <div className="border-2 border-neutral-300 bg-white p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                    <span className="font-mono font-bold text-xs text-neutral-900 uppercase">
                      1. Attendee Registration Information
                    </span>
                    <span className="font-mono text-[10px] text-neutral-500">[SECTION: ATTENDEE]</span>
                  </div>

                  <div className="space-y-3 font-mono text-xs">
                    <div>
                      <label htmlFor="attendee-name" className="block font-bold text-neutral-700 text-[11px] mb-1">
                        Full Legal Name <span className="text-neutral-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="attendee-name"
                          type="text"
                          required
                          value={attendeeName}
                          onChange={(e) => setAttendeeName(e.target.value)}
                          placeholder="e.g. Alex Chen"
                          className="w-full px-3 py-2 bg-neutral-50 border border-neutral-400 text-neutral-900 text-xs focus:bg-white focus:border-neutral-900 focus:outline-none"
                        />
                        <User className="w-3.5 h-3.5 text-neutral-400 absolute right-3 top-2.5 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="attendee-email" className="block font-bold text-neutral-700 text-[11px] mb-1">
                        Voucher Delivery Email <span className="text-neutral-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="attendee-email"
                          type="email"
                          required
                          value={attendeeEmail}
                          onChange={(e) => setAttendeeEmail(e.target.value)}
                          placeholder="e.g. alex.chen@company.com"
                          className="w-full px-3 py-2 bg-neutral-50 border border-neutral-400 text-neutral-900 text-xs focus:bg-white focus:border-neutral-900 focus:outline-none"
                        />
                        <Mail className="w-3.5 h-3.5 text-neutral-400 absolute right-3 top-2.5 pointer-events-none" />
                      </div>
                      <p className="text-[10px] text-neutral-500 mt-1">
                        The voucher coupon code and classroom invite will be delivered to this inbox.
                      </p>
                    </div>

                    <div>
                      <label htmlFor="attendee-org" className="block font-bold text-neutral-700 text-[11px] mb-1">
                        Company or Department (Optional)
                      </label>
                      <div className="relative">
                        <input
                          id="attendee-org"
                          type="text"
                          value={organization}
                          onChange={(e) => setOrganization(e.target.value)}
                          placeholder="e.g. Tech Strategy Group Ltd"
                          className="w-full px-3 py-2 bg-neutral-50 border border-neutral-400 text-neutral-900 text-xs focus:bg-white focus:border-neutral-900 focus:outline-none"
                        />
                        <Building className="w-3.5 h-3.5 text-neutral-400 absolute right-3 top-2.5 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Billing / Voucher Redemption Selection Card */}
                <div className="border-2 border-neutral-300 bg-white p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                    <span className="font-mono font-bold text-xs text-neutral-900 uppercase">
                      2. Payment / Voucher Sponsorship Method
                    </span>
                    <span className="font-mono text-[10px] text-neutral-500">[SECTION: PAYMENT]</span>
                  </div>

                  <div className="space-y-2.5 font-mono text-xs">
                    <label
                      className={`flex items-start gap-3 p-3 border-2 cursor-pointer transition-colors ${
                        billingMethod === 'company_voucher'
                          ? 'border-neutral-900 bg-neutral-100'
                          : 'border-neutral-300 hover:border-neutral-500'
                      }`}
                    >
                      <input
                        type="radio"
                        name="billing"
                        checked={billingMethod === 'company_voucher'}
                        onChange={() => setBillingMethod('company_voucher')}
                        className="accent-neutral-900 mt-0.5"
                      />
                      <div className="space-y-0.5">
                        <div className="font-bold text-neutral-900 flex items-center gap-2">
                          <span>Company Learning Voucher / Coupon (Auto-Dispatched)</span>
                          <span className="bg-neutral-900 text-white text-[9px] px-1 py-0.2">Recommended</span>
                        </div>
                        <p className="text-[11px] text-neutral-600 font-sans">
                          A 100% corporate learning voucher pass will be generated and emailed to you for class entry.
                        </p>
                      </div>
                    </label>

                    <label
                      className={`flex items-start gap-3 p-3 border-2 cursor-pointer transition-colors ${
                        billingMethod === 'credit_card'
                          ? 'border-neutral-900 bg-neutral-100'
                          : 'border-neutral-300 hover:border-neutral-500'
                      }`}
                    >
                      <input
                        type="radio"
                        name="billing"
                        checked={billingMethod === 'credit_card'}
                        onChange={() => setBillingMethod('credit_card')}
                        className="accent-neutral-900 mt-0.5"
                      />
                      <div className="space-y-0.5">
                        <div className="font-bold text-neutral-900">Direct Credit / Debit Card</div>
                        <p className="text-[11px] text-neutral-600 font-sans">
                          Standard card checkout with instant electronic receipt and voucher confirmation.
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* Terms checkbox */}
                  <div className="pt-2 border-t border-neutral-200">
                    <label className="flex items-start gap-2 cursor-pointer text-xs font-mono">
                      <input
                        type="checkbox"
                        required
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="w-4 h-4 border-2 border-neutral-500 accent-neutral-900 mt-0.5"
                      />
                      <span className="text-neutral-700 text-[11px]">
                        I confirm attendance for the scheduled live sessions and agree to the cohort code of conduct.
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column: Order Summary (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="border-2 border-neutral-400 bg-white p-6 space-y-5 sticky top-24 shadow-sm">
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-2 font-mono">
                    <span className="font-bold text-xs text-neutral-900 uppercase">
                      [ RESERVATION SUMMARY ]
                    </span>
                    <span className="text-[10px] text-neutral-500">{course.code}</span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-mono bg-neutral-100 border border-neutral-300 px-2 py-0.5 text-neutral-700">
                      {course.category}
                    </span>
                    <h3 className="font-bold font-sans text-base text-neutral-900 leading-snug">
                      {course.title}
                    </h3>
                  </div>

                  <div className="p-3 bg-neutral-50 border border-neutral-300 space-y-2 font-mono text-xs text-neutral-700">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                      <span>Starts: {course.startDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{course.cohortSchedule}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Ticket className="w-3.5 h-3.5 text-neutral-500" />
                      <span>Seat: Reserved (1 of {course.seatsRemaining} available)</span>
                    </div>
                  </div>

                  {/* Financial calculation */}
                  <div className="space-y-2 pt-2 border-t border-neutral-300 font-mono text-xs">
                    <div className="flex justify-between text-neutral-600">
                      <span>Standard Tuition:</span>
                      <span>${course.tuition}.00</span>
                    </div>
                    <div className="flex justify-between text-neutral-800 font-bold">
                      <span>Company Voucher Grant:</span>
                      <span>-${course.tuition}.00</span>
                    </div>
                    <div className="flex justify-between text-base font-bold text-neutral-900 pt-2 border-t border-neutral-300">
                      <span>Total Due Today:</span>
                      <span>$0.00 USD</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    id="btn-confirm-booking"
                    type="submit"
                    className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-xs font-bold border-2 border-neutral-900 flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>Confirm Booking & Issue Seat →</span>
                  </button>

                  <div className="text-center font-mono text-[10px] text-neutral-500">
                    Next step triggers voucher pass dispatch to your email inbox.
                  </div>
                </div>
              </div>
            </div>

            {/* Back to search link */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate('search')}
                className="text-xs font-mono text-neutral-500 hover:text-neutral-900 underline flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Change Course Selection</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
