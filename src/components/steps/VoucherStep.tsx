import React, { useState } from 'react';
import { 
  Mail, 
  Ticket, 
  Copy, 
  Check, 
  ArrowRight, 
  ExternalLink, 
  Calendar, 
  QrCode, 
  ShieldCheck,
  Sparkles,
  Inbox,
  Clock,
  Printer,
  Share2
} from 'lucide-react';
import { WireframeBox } from '../common/WireframeBox';
import { VoucherData, Course, FlowStep } from '../../types';

interface VoucherStepProps {
  voucher: VoucherData;
  course: Course;
  onRedeemVoucher: (code: string) => void;
  onNavigate: (step: FlowStep) => void;
}

export const VoucherStep: React.FC<VoucherStepProps> = ({
  voucher,
  course,
  onRedeemVoucher,
  onNavigate,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(voucher.voucherCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleJoinClass = () => {
    onRedeemVoucher(voucher.voucherCode);
    onNavigate('learn');
  };

  return (
    <div className="w-full bg-neutral-100 min-h-[calc(100vh-140px)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Stage Header */}
        <div className="border border-neutral-300 bg-white p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="bg-neutral-900 text-white px-2 py-0.5 font-bold">WF-05</span>
            <span className="font-bold text-neutral-800">
              STAGE: DAPAT KUPON / VOUCHER (EMAIL NOTIFICATION)
            </span>
          </div>
          <span className="text-neutral-500">
            Flow: [Book / Issued] ➔ [Receive Email Voucher] ➔ [Ikut Belajar]
          </span>
        </div>

        {/* Email Client Shell Simulation */}
        <div className="border-2 border-neutral-800 bg-white shadow-md overflow-hidden">
          {/* Email Client Header Bar */}
          <div className="bg-neutral-900 text-neutral-200 px-4 py-3 flex items-center justify-between font-mono text-xs border-b border-neutral-700">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-600"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-600"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-600"></span>
              </div>
              <span className="ml-2 font-bold text-white flex items-center gap-1.5">
                <Inbox className="w-3.5 h-3.5" />
                Learner Inbox Simulator • Message #4092
              </span>
            </div>
            <div className="flex items-center gap-3 text-neutral-400 text-[11px]">
              <span className="hidden sm:inline">Delivered to: {voucher.recipientEmail}</span>
              <span className="bg-neutral-800 px-2 py-0.5 border border-neutral-700 text-neutral-300">
                100% Legit Voucher
              </span>
            </div>
          </div>

          {/* Email Headers Area */}
          <div className="border-b border-neutral-300 bg-neutral-50 p-4 sm:p-5 space-y-2 font-mono text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <h2 className="text-base font-bold text-neutral-900 font-sans">
                Subject: [Confirmed] Your Admission Voucher & Cohort Access Pass ({voucher.voucherCode})
              </h2>
              <span className="text-neutral-500 text-[11px] flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Just now (Automated Dispatch)
              </span>
            </div>

            <div className="space-y-1 text-neutral-600 text-[11px] pt-1">
              <div>
                <strong className="text-neutral-800">From:</strong> LearnHub Admissions & Registrations &lt;admissions@learnhub.internal&gt;
              </div>
              <div>
                <strong className="text-neutral-800">To:</strong> {voucher.recipientEmail}
              </div>
              <div>
                <strong className="text-neutral-800">Booking Reference:</strong> {voucher.bookingRef}
              </div>
            </div>
          </div>

          {/* Email Body: The Voucher Document */}
          <div className="p-6 sm:p-10 space-y-8 font-sans">
            {/* Greeting & Context */}
            <div className="space-y-3">
              <div className="inline-block font-mono text-[10px] bg-neutral-200 border border-neutral-400 px-2 py-0.5 text-neutral-800 uppercase">
                Official Voucher Delivery • Issue Date: {voucher.issueDate}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900">
                Congratulations! Your Cohort Pass is Ready to Use.
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed max-w-2xl">
                Your reservation for <strong>{course.title} ({course.code})</strong> has been verified. Below is your unique learning voucher pass and activation key. Use this voucher to unlock full classroom access, curriculum assets, and join live office hours.
              </p>
            </div>

            {/* ========================================================================= */}
            {/* THE WIREFRAME VOUCHER CARD                                                */}
            {/* ========================================================================= */}
            <div className="border-2 border-dashed border-neutral-800 bg-neutral-50 p-6 sm:p-8 relative">
              {/* Wireframe Tag */}
              <div className="absolute top-0 right-0 transform translate-y-[-50%] mr-4 bg-neutral-900 text-white font-mono text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                [ OFFICIAL TUITION VOUCHER ]
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Left: Code, Value & Details (8 cols) */}
                <div className="md:col-span-8 space-y-4 font-mono">
                  <div>
                    <span className="text-[10px] text-neutral-500 uppercase tracking-wider block">
                      COUPON / VOUCHER CODE
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="px-4 py-2.5 bg-white border-2 border-neutral-800 text-lg sm:text-xl font-bold tracking-widest text-neutral-950 font-mono select-all">
                        {voucher.voucherCode}
                      </div>
                      <button
                        id="btn-copy-voucher-code"
                        type="button"
                        onClick={handleCopy}
                        className="p-2.5 border-2 border-neutral-800 bg-white hover:bg-neutral-100 text-neutral-800"
                        title="Copy voucher code"
                      >
                        {copied ? <Check className="w-5 h-5 text-neutral-900" /> : <Copy className="w-5 h-5" />}
                      </button>
                    </div>
                    {copied && (
                      <span className="text-[11px] text-neutral-800 font-bold mt-1 inline-block">
                        ✓ Copied to clipboard!
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-neutral-300 text-xs">
                    <div>
                      <span className="text-[10px] text-neutral-500 uppercase block">Voucher Value</span>
                      <strong className="text-neutral-900 text-sm font-bold">
                        {voucher.discountValue}
                      </strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-500 uppercase block">Valid Until</span>
                      <strong className="text-neutral-900">{voucher.validUntil}</strong>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="text-[10px] text-neutral-500 uppercase block">Enrolled Course</span>
                      <span className="text-neutral-900 font-bold">{course.title}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Barcode / QR Wireframe Box (4 cols) */}
                <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-neutral-300 pt-4 md:pt-0 md:pl-6 text-center space-y-2 font-mono">
                  <WireframeBox
                    aspectRatio="square"
                    label="QR CODE VOUCHER"
                    sublabel={voucher.voucherCode}
                    className="w-32 h-32 mx-auto bg-white"
                  >
                    <QrCode className="w-16 h-16 text-neutral-800 mb-1" />
                    <span className="text-[9px] font-mono font-bold text-neutral-700">
                      [ SCAN TO ENTER ]
                    </span>
                  </WireframeBox>
                  <div className="text-[10px] text-neutral-500">
                    PASS REF: {voucher.bookingRef}
                  </div>
                </div>
              </div>
            </div>

            {/* Step-by-Step Instructions & Main Join Action */}
            <div className="space-y-4 pt-2">
              <div className="p-4 bg-neutral-100 border border-neutral-300 space-y-2 text-xs font-mono">
                <div className="font-bold text-neutral-900 uppercase">
                  How to use this voucher:
                </div>
                <ol className="list-decimal list-inside space-y-1 text-neutral-700 text-[11px] font-sans">
                  <li>Your voucher status is active and verified for the upcoming cohort.</li>
                  <li>Click <strong>"Redeem Voucher & Enter Live Classroom"</strong> below to launch your learning workspace.</li>
                  <li>In the workspace, you can join the live instructor stage, inspect the syllabus, and participate in discussion.</li>
                </ol>
              </div>

              {/* THE HERO ACTION: TRANSITION TO STAGE 6 (IKUT BELAJAR) */}
              <div className="p-6 bg-neutral-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="font-mono text-xs text-neutral-400 uppercase tracking-wider">
                    Stage 6 Transition: Ikut Belajar
                  </div>
                  <div className="font-sans font-bold text-base text-white">
                    Ready to participate in class right now?
                  </div>
                </div>

                <button
                  id="btn-redeem-and-join-class"
                  type="button"
                  onClick={handleJoinClass}
                  className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-neutral-200 text-neutral-950 font-mono text-xs font-bold flex items-center justify-center gap-2 border border-white transition-colors"
                >
                  <span>Redeem Voucher & Enter Classroom →</span>
                </button>
              </div>
            </div>

            {/* Email Footer Spec */}
            <div className="pt-6 border-t border-neutral-300 text-neutral-500 font-mono text-[11px] space-y-1">
              <div>LearnHub Learning Systems Inc. • Admissions & Voucher Fulfillment Office</div>
              <div>This message was automatically generated as part of your cohort registration workflow.</div>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="flex items-center justify-between text-xs font-mono text-neutral-600">
          <button
            onClick={() => onNavigate('book')}
            className="underline hover:text-neutral-900"
          >
            ← Back to Booking Summary
          </button>
          <span className="text-neutral-400">Step 5 of 6 in Journey</span>
        </div>
      </div>
    </div>
  );
};
