/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FlowStep, ViewportMode, ViewMode, Course, BookingData, VoucherData } from './types';
import { COURSES } from './data/courses';
import { WireframeNavbar } from './components/common/WireframeNavbar';
import { FlowController } from './components/common/FlowController';
import { WireframeAnnotations } from './components/common/WireframeAnnotations';
import { LandingStep } from './components/steps/LandingStep';
import { LoginStep } from './components/steps/LoginStep';
import { SearchStep } from './components/steps/SearchStep';
import { BookStep } from './components/steps/BookStep';
import { VoucherStep } from './components/steps/VoucherStep';
import { LearnStep } from './components/steps/LearnStep';
import { StoryboardOverview } from './components/storyboard/StoryboardOverview';

export default function App() {
  // Core Journey State
  const [currentStep, setCurrentStep] = useState<FlowStep>('landing');
  const [viewportMode, setViewportMode] = useState<ViewportMode>('responsive');
  const [viewMode, setViewMode] = useState<ViewMode>('flow');
  const [showAnnotations, setShowAnnotations] = useState(false);

  // User & Progression State
  const [userEmail, setUserEmail] = useState('learner.alex@company.com');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course>(COURSES[0]);

  const [bookingData, setBookingData] = useState<BookingData>({
    courseId: COURSES[0].id,
    courseTitle: COURSES[0].title,
    cohortDate: COURSES[0].startDate,
    attendeeName: 'Alex Chen',
    attendeeEmail: 'learner.alex@company.com',
    organization: 'Technology Architecture Group',
    billingMethod: 'company_voucher',
    bookingReference: 'REG-2026-88421',
    issuedTimestamp: '2026-09-21T10:00:00Z',
    status: 'issued',
  });

  const [voucherData, setVoucherData] = useState<VoucherData>({
    voucherCode: 'VCH-2026-COHORT-88421',
    bookingRef: 'REG-2026-88421',
    courseTitle: COURSES[0].title,
    recipientEmail: 'learner.alex@company.com',
    issueDate: 'October 01, 2026',
    validUntil: 'October 31, 2026',
    discountValue: '100% Full Tuition Grant',
    status: 'sent',
  });

  // Step transition handlers
  const handleStepChange = (step: FlowStep) => {
    setCurrentStep(step);
    if (viewMode === 'storyboard') {
      setViewMode('flow');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (email: string) => {
    setUserEmail(email);
    setIsLoggedIn(true);
    setBookingData((prev) => ({
      ...prev,
      attendeeEmail: email,
      attendeeName: email.split('@')[0].replace('.', ' '),
    }));
    setVoucherData((prev) => ({
      ...prev,
      recipientEmail: email,
    }));
  };

  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
    setBookingData((prev) => ({
      ...prev,
      courseId: course.id,
      courseTitle: course.title,
      cohortDate: course.startDate,
    }));
    setVoucherData((prev) => ({
      ...prev,
      courseTitle: course.title,
    }));
  };

  const handleConfirmBooking = (data: BookingData) => {
    setBookingData(data);
    setVoucherData((prev) => ({
      ...prev,
      bookingRef: data.bookingReference,
      courseTitle: data.courseTitle,
      recipientEmail: data.attendeeEmail,
      status: 'sent',
    }));
  };

  const handleRedeemVoucher = (code: string) => {
    setVoucherData((prev) => ({
      ...prev,
      status: 'redeemed',
      activatedAt: new Date().toISOString(),
    }));
  };

  const handleResetJourney = () => {
    setCurrentStep('landing');
    setViewMode('flow');
    setViewportMode('responsive');
    setIsLoggedIn(false);
    setSelectedCourse(COURSES[0]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Viewport wrapper styles
  const viewportStyles = {
    responsive: 'w-full',
    desktop: 'max-w-[1200px] mx-auto border-x-2 border-neutral-400 shadow-2xl my-6 bg-white',
    tablet: 'max-w-[768px] mx-auto border-x-2 border-neutral-400 shadow-2xl my-6 bg-white',
    mobile: 'max-w-[390px] mx-auto border-2 border-neutral-500 rounded-2xl shadow-2xl my-6 overflow-hidden bg-white',
  }[viewportMode];

  return (
    <div className="min-h-screen bg-neutral-200 text-neutral-900 flex flex-col font-sans antialiased">
      {/* Persistent Flow Controller Banner */}
      <FlowController
        currentStep={currentStep}
        onSelectStep={handleStepChange}
        viewportMode={viewportMode}
        onSelectViewport={setViewportMode}
        viewMode={viewMode}
        onToggleViewMode={() => setViewMode(viewMode === 'flow' ? 'storyboard' : 'flow')}
        showAnnotations={showAnnotations}
        onToggleAnnotations={() => setShowAnnotations(!showAnnotations)}
        onResetFlow={handleResetJourney}
        bookingIssued={bookingData.status === 'issued'}
        voucherRedeemed={voucherData.status === 'redeemed'}
      />

      {/* Wireframe UX Annotations Drawer */}
      <WireframeAnnotations
        currentStep={currentStep}
        isOpen={showAnnotations}
        onClose={() => setShowAnnotations(false)}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 flex flex-col items-center w-full">
        {viewMode === 'storyboard' ? (
          <StoryboardOverview
            currentStep={currentStep}
            onSelectStep={handleStepChange}
            bookingIssued={bookingData.status === 'issued'}
            voucherRedeemed={voucherData.status === 'redeemed'}
          />
        ) : (
          <div className={`${viewportStyles} transition-all duration-300 flex flex-col flex-1 min-h-[85vh]`}>
            {/* Mobile frame header simulation when mobile mode is active */}
            {viewportMode === 'mobile' && (
              <div className="bg-neutral-900 text-white px-4 py-1 text-[10px] font-mono flex items-center justify-between">
                <span>9:41 AM</span>
                <span>[ Mobile 390px Viewport ]</span>
                <span>100% 🔋</span>
              </div>
            )}

            {/* Standard App Navigation Header */}
            <WireframeNavbar
              currentStep={currentStep}
              onNavigate={handleStepChange}
              isLoggedIn={isLoggedIn}
              userEmail={userEmail}
            />

            {/* Step-by-Step Screen Renderer */}
            <div className="flex-1 flex flex-col">
              {currentStep === 'landing' && (
                <LandingStep
                  onNavigate={handleStepChange}
                  onSelectCourse={handleSelectCourse}
                />
              )}

              {currentStep === 'login' && (
                <LoginStep
                  onLoginSuccess={handleLoginSuccess}
                  onNavigate={handleStepChange}
                  userEmail={userEmail}
                />
              )}

              {currentStep === 'search' && (
                <SearchStep
                  onSelectCourse={handleSelectCourse}
                  onNavigate={handleStepChange}
                  selectedCourseId={selectedCourse.id}
                />
              )}

              {currentStep === 'book' && (
                <BookStep
                  course={selectedCourse}
                  userEmail={userEmail}
                  bookingData={bookingData}
                  onConfirmBooking={handleConfirmBooking}
                  onNavigate={handleStepChange}
                />
              )}

              {currentStep === 'voucher' && (
                <VoucherStep
                  voucher={voucherData}
                  course={selectedCourse}
                  onRedeemVoucher={handleRedeemVoucher}
                  onNavigate={handleStepChange}
                />
              )}

              {currentStep === 'learn' && (
                <LearnStep
                  course={selectedCourse}
                  voucher={voucherData}
                  onNavigate={handleStepChange}
                  onResetJourney={handleResetJourney}
                />
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
