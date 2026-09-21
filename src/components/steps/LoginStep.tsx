import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  ArrowRight, 
  Shield, 
  CheckCircle, 
  Eye, 
  EyeOff, 
  KeyRound,
  Sparkles
} from 'lucide-react';
import { WireframeBox } from '../common/WireframeBox';
import { FlowStep } from '../../types';

interface LoginStepProps {
  onLoginSuccess: (email: string) => void;
  onNavigate: (step: FlowStep) => void;
  userEmail: string;
}

export const LoginStep: React.FC<LoginStepProps> = ({
  onLoginSuccess,
  onNavigate,
  userEmail,
}) => {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState(userEmail || 'learner@company.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess(email);
    onNavigate('search');
  };

  const handleQuickDemo = () => {
    setEmail('learner.alex@techgroup.io');
    setPassword('demo-learner-key-2026');
    onLoginSuccess('learner.alex@techgroup.io');
    onNavigate('search');
  };

  return (
    <div className="w-full bg-neutral-100 min-h-[calc(100vh-140px)] py-8 md:py-14 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Stage Header */}
        <div className="border border-neutral-300 bg-white p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="bg-neutral-900 text-white px-2 py-0.5 font-bold">WF-02</span>
            <span className="font-bold text-neutral-800">STAGE: LOGIN // LEARNER IDENTIFICATION</span>
          </div>
          <span className="text-neutral-500">Flow: [Landing] ➔ [Login] ➔ [Search]</span>
        </div>

        {/* Auth Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 border-2 border-neutral-400 bg-white shadow-sm overflow-hidden">
          {/* Left / Info Column (4 cols) */}
          <div className="md:col-span-5 bg-neutral-50 border-b md:border-b-0 md:border-r border-neutral-300 p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-block font-mono text-[11px] bg-neutral-200 border border-neutral-400 px-2 py-0.5 text-neutral-700">
                [ AUTH CONTEXT ]
              </div>
              <h2 className="text-xl font-bold text-neutral-900 font-sans">
                Access Your Learning Journey
              </h2>
              <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                Logging in ties your course booking, email voucher pass, and classroom attendance history to your corporate or personal profile.
              </p>

              {/* Wireframe checklist of auth states */}
              <div className="pt-2 space-y-2 text-xs font-mono text-neutral-700">
                <div className="flex items-start gap-2">
                  <div className="w-4 h-4 border border-neutral-500 flex items-center justify-center text-[10px] bg-neutral-200">
                    ✓
                  </div>
                  <span>Instant seat reservation</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-4 h-4 border border-neutral-500 flex items-center justify-center text-[10px] bg-neutral-200">
                    ✓
                  </div>
                  <span>Direct email voucher delivery</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-4 h-4 border border-neutral-500 flex items-center justify-center text-[10px] bg-neutral-200">
                    ✓
                  </div>
                  <span>Live session workspace access</span>
                </div>
              </div>
            </div>

            {/* Quick Demo Autofill helper */}
            <div className="border-2 border-dashed border-neutral-400 p-3 bg-neutral-100 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono font-bold text-neutral-800">
                <span>[ FAST-TRACK ACTION ]</span>
                <span className="text-[10px] text-neutral-500">1-Click</span>
              </div>
              <p className="text-[11px] text-neutral-600 font-sans">
                Simulate standard learner credentials to immediately advance to Course Search.
              </p>
              <button
                id="login-quick-demo-btn"
                type="button"
                onClick={handleQuickDemo}
                className="w-full py-2 bg-neutral-800 hover:bg-neutral-900 text-white font-mono text-xs font-bold border border-neutral-900 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Autofill & Continue to Search →</span>
              </button>
            </div>
          </div>

          {/* Right / Form Column (7 cols) */}
          <div className="md:col-span-7 p-6 sm:p-8 space-y-6">
            {/* Tab switch */}
            <div className="flex border-b-2 border-neutral-300 text-xs font-mono">
              <button
                id="tab-signin"
                type="button"
                onClick={() => setActiveTab('signin')}
                className={`pb-2.5 px-4 font-bold border-b-2 transition-colors ${
                  activeTab === 'signin'
                    ? 'border-neutral-900 text-neutral-900 -mb-0.5'
                    : 'border-transparent text-neutral-400 hover:text-neutral-700'
                }`}
              >
                1. Sign In (Existing User)
              </button>
              <button
                id="tab-signup"
                type="button"
                onClick={() => setActiveTab('signup')}
                className={`pb-2.5 px-4 font-bold border-b-2 transition-colors ${
                  activeTab === 'signup'
                    ? 'border-neutral-900 text-neutral-900 -mb-0.5'
                    : 'border-transparent text-neutral-400 hover:text-neutral-700'
                }`}
              >
                2. Register New Account
              </button>
            </div>

            {/* Wireframe Form */}
            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              {/* Email field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="login-email" className="font-bold text-neutral-800 uppercase text-[11px]">
                    Work or Personal Email <span className="text-neutral-500">*</span>
                  </label>
                  <span className="text-[10px] text-neutral-400">[FIELD_TYPE: EMAIL]</span>
                </div>
                <div className="relative">
                  <input
                    id="login-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. name@company.com"
                    className="w-full px-3 py-2.5 bg-neutral-50 border-2 border-neutral-400 text-neutral-900 text-xs font-mono focus:bg-white focus:border-neutral-900 focus:outline-none"
                  />
                  <Mail className="w-4 h-4 text-neutral-400 absolute right-3 top-3 pointer-events-none" />
                </div>
                <p className="text-[10px] text-neutral-500">
                  Your official cohort voucher coupon will be issued to this email address.
                </p>
              </div>

              {/* Password field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="login-password" className="font-bold text-neutral-800 uppercase text-[11px]">
                    Password <span className="text-neutral-500">*</span>
                  </label>
                  <span className="text-[10px] text-neutral-400">[FIELD_TYPE: PASSWORD]</span>
                </div>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3 py-2.5 bg-neutral-50 border-2 border-neutral-400 text-neutral-900 text-xs font-mono focus:bg-white focus:border-neutral-900 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-neutral-500 hover:text-neutral-800"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember & forgot */}
              <div className="flex items-center justify-between text-[11px] pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    id="login-remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 border-2 border-neutral-400 accent-neutral-800"
                  />
                  <span className="text-neutral-700">Remember on this device</span>
                </label>
                <a href="#forgot" onClick={(e) => e.preventDefault()} className="underline text-neutral-500 hover:text-neutral-900">
                  Forgot Password?
                </a>
              </div>

              {/* Primary Submit Button */}
              <div className="pt-2">
                <button
                  id="login-submit-btn"
                  type="submit"
                  className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-xs font-bold border-2 border-neutral-900 flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Sign In & Proceed to Course Search</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="relative flex items-center justify-center pt-2">
              <div className="border-t border-neutral-300 w-full"></div>
              <span className="bg-white px-3 font-mono text-[10px] text-neutral-500 uppercase tracking-wider relative">
                Or SSO Integration
              </span>
            </div>

            {/* SSO Wireframe Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
              <button
                id="login-sso-google"
                type="button"
                onClick={handleQuickDemo}
                className="py-2.5 px-3 border-2 border-neutral-300 hover:border-neutral-600 bg-neutral-50 hover:bg-neutral-100 flex items-center justify-center gap-2 text-neutral-800 text-[11px]"
              >
                <KeyRound className="w-3.5 h-3.5 text-neutral-500" />
                <span>Google Workspace</span>
              </button>
              <button
                id="login-sso-saml"
                type="button"
                onClick={handleQuickDemo}
                className="py-2.5 px-3 border-2 border-neutral-300 hover:border-neutral-600 bg-neutral-50 hover:bg-neutral-100 flex items-center justify-center gap-2 text-neutral-800 text-[11px]"
              >
                <Shield className="w-3.5 h-3.5 text-neutral-500" />
                <span>Corporate SAML SSO</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stage Specs Footnote */}
        <div className="border border-neutral-300 bg-white p-3 font-mono text-[11px] text-neutral-500 flex items-center justify-between">
          <span>[UI_SPEC: AUTH FORM] Required inputs: Email + Password • Return target: Search Catalog</span>
          <button
            onClick={() => onNavigate('landing')}
            className="underline hover:text-neutral-900"
          >
            ← Back to Landing
          </button>
        </div>
      </div>
    </div>
  );
};
