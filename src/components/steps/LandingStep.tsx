import React from 'react';
import { 
  ArrowRight, 
  Search, 
  BookOpen, 
  Award, 
  Users, 
  Clock, 
  CheckSquare, 
  ShieldCheck,
  Mail
} from 'lucide-react';
import { WireframeBox } from '../common/WireframeBox';
import { COURSES } from '../../data/courses';
import { Course, FlowStep } from '../../types';

interface LandingStepProps {
  onNavigate: (step: FlowStep) => void;
  onSelectCourse: (course: Course) => void;
}

export const LandingStep: React.FC<LandingStepProps> = ({
  onNavigate,
  onSelectCourse,
}) => {
  return (
    <div className="w-full bg-white text-neutral-900">
      {/* Wireframe Stage Tag */}
      <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-2 text-xs font-mono text-neutral-600 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="bg-neutral-800 text-white px-1.5 py-0.5 text-[10px] font-bold">WF-01</span>
          <span>STAGE: LANDING // ENTRY PORTAL</span>
        </div>
        <span className="hidden sm:inline text-neutral-500">[LAYOUT: 12-COL DESKTOP / STACKED MOBILE]</span>
      </div>

      {/* Hero Section */}
      <section className="border-b border-neutral-300 py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Text & CTA Hierarchy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-neutral-100 border border-neutral-300 text-neutral-700 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-neutral-600"></span>
              <span>COHORT ENROLLMENT CYCLE • AUTUMN 2026</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-950 font-sans leading-tight">
              Master Practical Engineering & Product Strategy with Live Cohorts.
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-sans max-w-2xl">
              An interactive learning journey designed for modern practitioners. Discover high-impact courses, reserve your seat with company vouchers, and participate in instructor-led live sessions.
            </p>

            {/* Wireframe CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="hero-cta-search"
                onClick={() => onNavigate('search')}
                className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-xs font-bold border-2 border-neutral-900 flex items-center gap-2 transition-colors"
              >
                <span>Browse Course Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-cta-login"
                onClick={() => onNavigate('login')}
                className="px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-mono text-xs font-semibold border-2 border-neutral-400 transition-colors"
              >
                Existing Learner Sign In
              </button>
            </div>

            {/* Micro-specs / trust badges */}
            <div className="pt-4 border-t border-neutral-200 flex flex-wrap items-center gap-6 text-xs text-neutral-500 font-mono">
              <span className="flex items-center gap-1.5">
                <CheckSquare className="w-3.5 h-3.5 text-neutral-700" />
                Voucher & Coupon Eligible
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-neutral-700" />
                Max 30 Seats / Cohort
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-neutral-700" />
                Accredited Certificate
              </span>
            </div>
          </div>

          {/* Right: Wireframe Visual / Video Preview Box */}
          <div className="lg:col-span-5">
            <div className="border-2 border-neutral-800 p-2 bg-neutral-50 shadow-sm">
              <div className="flex items-center justify-between pb-2 px-1 text-[11px] font-mono text-neutral-500 border-b border-neutral-300">
                <span>[ HERO MEDIA CONTAINER ]</span>
                <span>16:9 • WIREFRAME</span>
              </div>
              <div className="pt-2">
                <WireframeBox
                  aspectRatio="video"
                  label="COHORT CLASSROOM PREVIEW"
                  sublabel="Instructor stage • Live Q&A • Collaborative notes"
                  className="bg-neutral-200 min-h-[240px]"
                >
                  <div className="w-12 h-12 rounded-full border-2 border-neutral-700 bg-white/80 flex items-center justify-center text-neutral-800 mb-2">
                    <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-12 border-l-neutral-800 ml-1"></div>
                  </div>
                  <span className="font-mono text-xs font-bold text-neutral-800">
                    [ Interactive Live Demo Preview ]
                  </span>
                  <span className="font-mono text-[10px] text-neutral-600 mt-1">
                    Click "Browse Catalog" to start the enrollment flow
                  </span>
                </WireframeBox>
              </div>
              <div className="mt-2 text-center text-[10px] font-mono text-neutral-500">
                FIG. 1.0 — Stage 1 Hero Media Frame
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Row */}
      <section className="border-b border-neutral-300 bg-neutral-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="border border-neutral-300 bg-white p-4 text-center">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-neutral-900">4.9 / 5.0</div>
            <div className="text-xs font-mono text-neutral-500 mt-1 uppercase tracking-wide">
              Cohort Evaluation
            </div>
          </div>
          <div className="border border-neutral-300 bg-white p-4 text-center">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-neutral-900">96.4%</div>
            <div className="text-xs font-mono text-neutral-500 mt-1 uppercase tracking-wide">
              Course Completion
            </div>
          </div>
          <div className="border border-neutral-300 bg-white p-4 text-center">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-neutral-900">12,500+</div>
            <div className="text-xs font-mono text-neutral-500 mt-1 uppercase tracking-wide">
              Engineers & PMs Trained
            </div>
          </div>
          <div className="border border-neutral-300 bg-white p-4 text-center">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-neutral-900">100%</div>
            <div className="text-xs font-mono text-neutral-500 mt-1 uppercase tracking-wide">
              Voucher Sponsorship Support
            </div>
          </div>
        </div>
      </section>

      {/* The 6-Stage Learning Journey Flow Explainer */}
      <section className="border-b border-neutral-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
                [ USER ARCHITECTURE FLOW ]
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 mt-1">
                How Your Learning Journey Progresses
              </h2>
            </div>
            <p className="text-xs font-mono text-neutral-500 max-w-md">
              From discovering your track to redeeming your email voucher and attending live sessions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            {[
              { num: '01', title: 'Landing', note: 'Discover curriculum & review dates' },
              { num: '02', title: 'Sign In', note: 'Authenticate learner credentials' },
              { num: '03', title: 'Search & Pick', note: 'Filter tracks & check remaining seats' },
              { num: '04', title: 'Book / Issue', note: 'Reserve seat & generate ref order' },
              { num: '05', title: 'Email Voucher', note: 'Receive voucher pass in inbox' },
              { num: '06', title: 'Join Class', note: 'Redeem code & enter live room' },
            ].map((st, i) => (
              <div
                key={st.num}
                className="border border-neutral-300 bg-neutral-50 p-3.5 space-y-2 relative hover:border-neutral-800 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-neutral-900 bg-neutral-200 px-1.5 py-0.5 border border-neutral-400">
                    STEP {st.num}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">→</span>
                </div>
                <div className="font-mono text-xs font-bold text-neutral-900 pt-1">
                  {st.title}
                </div>
                <div className="text-[11px] text-neutral-600 font-sans leading-tight">
                  {st.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tracks Catalog Preview */}
      <section className="border-b border-neutral-300 py-12 px-4 sm:px-6 lg:px-8 bg-neutral-50">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
                [ FEATURED CATALOG CARDS ]
              </span>
              <h2 className="text-2xl font-bold text-neutral-950 mt-1">
                Upcoming Cohort Sessions
              </h2>
            </div>
            <button
              onClick={() => onNavigate('search')}
              className="text-xs font-mono font-bold text-neutral-900 hover:underline flex items-center gap-1"
            >
              <span>View All 24 Courses</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COURSES.slice(0, 3).map((course) => (
              <div
                key={course.id}
                className="border-2 border-neutral-300 bg-white hover:border-neutral-800 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Wireframe Thumbnail Header */}
                  <div className="p-3 border-b border-neutral-300 bg-neutral-100">
                    <WireframeBox
                      aspectRatio="banner"
                      label={`CARD PREVIEW: ${course.code}`}
                      className="bg-neutral-200"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-5 space-y-4">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="border border-neutral-400 px-2 py-0.5 bg-neutral-100 text-neutral-800">
                        {course.category}
                      </span>
                      <span className="text-neutral-600 font-semibold">
                        {course.seatsRemaining} seats left
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-neutral-900 leading-snug">
                        {course.title}
                      </h3>
                      <p className="text-xs text-neutral-600 mt-2 line-clamp-2 leading-relaxed">
                        {course.summary}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-neutral-200 space-y-1.5 text-xs font-mono text-neutral-600">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-neutral-400" />
                        <span>{course.durationWeeks} Weeks • {course.cohortSchedule}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-neutral-400" />
                        <span>By {course.instructor.name}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-4 bg-neutral-50 border-t border-neutral-300 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-neutral-500 uppercase block">Tuition</span>
                    <span className="font-mono text-base font-bold text-neutral-900">${course.tuition}</span>
                  </div>
                  <button
                    id={`landing-enroll-${course.id}`}
                    onClick={() => {
                      onSelectCourse(course);
                      onNavigate('book');
                    }}
                    className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-xs font-bold border border-neutral-900"
                  >
                    Select & Book →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Wireframe */}
      <footer className="border-t-2 border-neutral-300 py-10 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 font-mono text-xs text-neutral-600">
          <div>
            <div className="font-bold text-neutral-900 text-sm">LEARN.HUB WIREFRAME SPECIFICATION</div>
            <div className="text-[11px] text-neutral-500 mt-0.5">
              Flow Stage 1 of 6 • Minimal Grayscale Architecture Prototype
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button onClick={() => onNavigate('login')} className="hover:text-neutral-950 underline">
              2. Login
            </button>
            <button onClick={() => onNavigate('search')} className="hover:text-neutral-950 underline">
              3. Search
            </button>
            <button onClick={() => onNavigate('book')} className="hover:text-neutral-950 underline">
              4. Book / Issued
            </button>
            <button onClick={() => onNavigate('voucher')} className="hover:text-neutral-950 underline">
              5. Email Voucher
            </button>
            <button onClick={() => onNavigate('learn')} className="hover:text-neutral-950 underline">
              6. Classroom
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
