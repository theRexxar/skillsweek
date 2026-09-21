import React, { useState } from 'react';
import { Menu, X, Search, Bell, User, BookOpen } from 'lucide-react';
import { FlowStep } from '../../types';

interface WireframeNavbarProps {
  currentStep: FlowStep;
  onNavigate: (step: FlowStep) => void;
  isLoggedIn?: boolean;
  userEmail?: string;
}

export const WireframeNavbar: React.FC<WireframeNavbarProps> = ({
  currentStep,
  onNavigate,
  isLoggedIn = false,
  userEmail = 'learner@company.com',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b-2 border-neutral-300 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand Wireframe */}
          <div className="flex items-center gap-6">
            <button
              id="nav-brand-logo"
              onClick={() => onNavigate('landing')}
              className="flex items-center gap-2 group text-left"
            >
              <div className="w-8 h-8 border-2 border-neutral-800 bg-neutral-900 text-white flex items-center justify-center font-mono font-bold text-sm">
                LH
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-sm font-bold tracking-tight text-neutral-900 flex items-center gap-1.5">
                  LEARN.HUB
                  <span className="text-[10px] bg-neutral-200 text-neutral-700 px-1 py-0.2 border border-neutral-400 font-mono uppercase">
                    v0.9-wf
                  </span>
                </span>
                <span className="text-[10px] text-neutral-500 font-mono -mt-0.5">
                  Cohort Learning Platform
                </span>
              </div>
            </button>

            {/* Main Nav Links (Desktop) */}
            <nav className="hidden md:flex items-center space-x-1">
              <button
                id="nav-link-landing"
                onClick={() => onNavigate('landing')}
                className={`px-3 py-1.5 text-xs font-mono font-medium border ${
                  currentStep === 'landing'
                    ? 'border-neutral-900 bg-neutral-100 text-neutral-900 font-bold'
                    : 'border-transparent text-neutral-600 hover:text-neutral-900 hover:border-neutral-300'
                }`}
              >
                /landing
              </button>
              <button
                id="nav-link-search"
                onClick={() => onNavigate('search')}
                className={`px-3 py-1.5 text-xs font-mono font-medium border ${
                  currentStep === 'search'
                    ? 'border-neutral-900 bg-neutral-100 text-neutral-900 font-bold'
                    : 'border-transparent text-neutral-600 hover:text-neutral-900 hover:border-neutral-300'
                }`}
              >
                /courses-catalog
              </button>
              <button
                id="nav-link-voucher"
                onClick={() => onNavigate('voucher')}
                className={`px-3 py-1.5 text-xs font-mono font-medium border ${
                  currentStep === 'voucher'
                    ? 'border-neutral-900 bg-neutral-100 text-neutral-900 font-bold'
                    : 'border-transparent text-neutral-600 hover:text-neutral-900 hover:border-neutral-300'
                }`}
              >
                /email-voucher
              </button>
              <button
                id="nav-link-classroom"
                onClick={() => onNavigate('learn')}
                className={`px-3 py-1.5 text-xs font-mono font-medium border ${
                  currentStep === 'learn'
                    ? 'border-neutral-900 bg-neutral-100 text-neutral-900 font-bold'
                    : 'border-transparent text-neutral-600 hover:text-neutral-900 hover:border-neutral-300'
                }`}
              >
                /live-classroom
              </button>
            </nav>
          </div>

          {/* Right Action Area */}
          <div className="hidden md:flex items-center gap-3">
            <button
              id="nav-search-button"
              onClick={() => onNavigate('search')}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-neutral-500 bg-neutral-50 border border-neutral-300 hover:border-neutral-500 transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search courses...</span>
              <kbd className="text-[9px] bg-neutral-200 border border-neutral-300 px-1 py-0.5 rounded text-neutral-600">
                ⌘K
              </kbd>
            </button>

            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <button
                  id="nav-notifications-btn"
                  onClick={() => onNavigate('voucher')}
                  title="Voucher Email Notification"
                  className="relative p-1.5 border border-neutral-300 hover:bg-neutral-100 text-neutral-700"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-neutral-900 rounded-full border border-white" />
                </button>
                <button
                  id="nav-profile-btn"
                  onClick={() => onNavigate('learn')}
                  className="flex items-center gap-2 pl-2 pr-3 py-1 border border-neutral-800 bg-neutral-100 hover:bg-neutral-200 text-xs font-mono"
                >
                  <div className="w-5 h-5 bg-neutral-900 text-white rounded-full flex items-center justify-center text-[10px]">
                    <User className="w-3 h-3" />
                  </div>
                  <span className="truncate max-w-[120px]">{userEmail.split('@')[0]}</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  id="nav-login-btn"
                  onClick={() => onNavigate('login')}
                  className="px-3 py-1.5 text-xs font-mono font-medium text-neutral-700 hover:text-neutral-900 border border-neutral-300 hover:border-neutral-500"
                >
                  Sign In
                </button>
                <button
                  id="nav-get-started-btn"
                  onClick={() => onNavigate('search')}
                  className="px-3.5 py-1.5 text-xs font-mono font-bold text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-900"
                >
                  Start Flow →
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-neutral-400 text-neutral-700"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-300 bg-white p-4 space-y-2">
          <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider mb-2">
            Wireframe Page Routes
          </div>
          <button
            onClick={() => {
              onNavigate('landing');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-xs font-mono border border-neutral-200 hover:bg-neutral-100 flex items-center justify-between"
          >
            <span>1. Landing Page</span>
            <span className="text-[10px] text-neutral-400">[WF-01]</span>
          </button>
          <button
            onClick={() => {
              onNavigate('login');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-xs font-mono border border-neutral-200 hover:bg-neutral-100 flex items-center justify-between"
          >
            <span>2. Login & Authentication</span>
            <span className="text-[10px] text-neutral-400">[WF-02]</span>
          </button>
          <button
            onClick={() => {
              onNavigate('search');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-xs font-mono border border-neutral-200 hover:bg-neutral-100 flex items-center justify-between"
          >
            <span>3. Search & Course Catalog</span>
            <span className="text-[10px] text-neutral-400">[WF-03]</span>
          </button>
          <button
            onClick={() => {
              onNavigate('book');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-xs font-mono border border-neutral-200 hover:bg-neutral-100 flex items-center justify-between"
          >
            <span>4. Book & Issued Reference</span>
            <span className="text-[10px] text-neutral-400">[WF-04]</span>
          </button>
          <button
            onClick={() => {
              onNavigate('voucher');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-xs font-mono border border-neutral-200 hover:bg-neutral-100 flex items-center justify-between"
          >
            <span>5. Email Voucher Pass</span>
            <span className="text-[10px] text-neutral-400">[WF-05]</span>
          </button>
          <button
            onClick={() => {
              onNavigate('learn');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-xs font-mono border border-neutral-200 hover:bg-neutral-100 flex items-center justify-between"
          >
            <span>6. Join Learning Workspace</span>
            <span className="text-[10px] text-neutral-400">[WF-06]</span>
          </button>
        </div>
      )}
    </header>
  );
};
