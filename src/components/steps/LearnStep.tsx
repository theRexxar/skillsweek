import React, { useState } from 'react';
import { 
  Video, 
  Mic, 
  MicOff, 
  VideoOff, 
  Hand, 
  Share2, 
  MessageSquare, 
  Users, 
  FileText, 
  CheckCircle2, 
  ArrowLeft, 
  Download, 
  Send,
  Sparkles,
  ExternalLink,
  Volume2
} from 'lucide-react';
import { WireframeBox } from '../common/WireframeBox';
import { Course, VoucherData, ClassroomState, FlowStep } from '../../types';

interface LearnStepProps {
  course: Course;
  voucher: VoucherData;
  onNavigate: (step: FlowStep) => void;
  onResetJourney: () => void;
}

export const LearnStep: React.FC<LearnStepProps> = ({
  course,
  voucher,
  onNavigate,
  onResetJourney,
}) => {
  const [isMicOn, setIsMicOn] = useState(false);
  const [isCamOn, setIsCamOn] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [activeTab, setActiveTab] = useState<'notes' | 'exercise' | 'syllabus'>('notes');
  const [sidebarTab, setSidebarTab] = useState<'chat' | 'roster' | 'downloads'>('chat');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: '1',
      sender: course.instructor.name,
      role: 'Instructor',
      time: '10:05',
      text: 'Welcome to today’s live cohort session! Please pull up the system architecture diagram in tab 2.',
    },
    {
      id: '2',
      sender: 'Karin Tanaka',
      role: 'Teaching Assistant',
      time: '10:12',
      text: 'All learner voucher codes have been verified and attendance is confirmed.',
    },
    {
      id: '3',
      sender: 'David K.',
      role: 'Student',
      time: '10:18',
      text: 'Question regarding edge-case fallbacks when client connection drops?',
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setChatMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: 'You (Learner)',
        role: 'You',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: chatInput,
      },
    ]);
    setChatInput('');
  };

  return (
    <div className="w-full bg-neutral-100 min-h-[calc(100vh-140px)] py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-5">
        {/* Stage Header */}
        <div className="border border-neutral-300 bg-white p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="bg-neutral-900 text-white px-2 py-0.5 font-bold">WF-06</span>
            <span className="font-bold text-neutral-800">
              STAGE: IKUT BELAJAR // LIVE LEARNING WORKSPACE & CLASSROOM
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-neutral-200 text-neutral-800 px-2 py-0.5 border border-neutral-400 font-bold">
              [VOUCHER: {voucher.voucherCode} ACTIVE]
            </span>
            <span className="text-neutral-500 hidden md:inline">Final Stage of Journey</span>
          </div>
        </div>

        {/* Live Session Classroom Top Banner */}
        <div className="border-2 border-neutral-800 bg-white p-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-neutral-900 text-white text-xs font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              <span>LIVE SESSION</span>
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-neutral-950 font-sans leading-tight">
                {course.title} • Module 1 Sprint
              </h1>
              <div className="text-xs font-mono text-neutral-600 flex items-center gap-2">
                <span>Instructor: {course.instructor.name}</span>
                <span>•</span>
                <span>28 Students Active</span>
              </div>
            </div>
          </div>

          {/* Quick Roster Indicator */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-neutral-500 text-[11px] hidden sm:inline">Voucher Applied:</span>
            <span className="border border-neutral-400 bg-neutral-100 px-2 py-1 font-bold text-neutral-800">
              100% Tuition Waived
            </span>
          </div>
        </div>

        {/* Main Classroom Workspace: Grid 8 cols stage + 4 cols sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Video Stage & Interactive Workbench (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Live Video Stage Screen */}
            <div className="border-2 border-neutral-900 bg-neutral-950 text-white overflow-hidden shadow-sm">
              <div className="relative aspect-video flex items-center justify-center bg-neutral-900">
                {/* Wireframe stream placeholder graphic */}
                <svg
                  className="absolute inset-0 h-full w-full stroke-neutral-800 stroke-[1] pointer-events-none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="0" y1="0" x2="100%" y2="100%" />
                  <line x1="100%" y1="0" x2="0" y2="100%" />
                </svg>

                {/* Central Stage Speaker Box */}
                <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center space-y-3">
                  <div className="w-16 h-16 border-2 border-neutral-600 bg-neutral-800 flex items-center justify-center text-neutral-300">
                    <Video className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-200">
                      [ INSTRUCTOR BROADCAST: {course.instructor.name} ]
                    </div>
                    <div className="text-[11px] text-neutral-400 font-mono mt-0.5">
                      Screen Sharing: "System Boundaries, Data Flow & Prompt Pipeline"
                    </div>
                  </div>

                  {/* Simulated audio waveform indicator */}
                  <div className="flex items-center gap-1 pt-1">
                    <Volume2 className="w-3.5 h-3.5 text-neutral-400 mr-1" />
                    <span className="w-1 h-3 bg-neutral-400 animate-pulse"></span>
                    <span className="w-1 h-5 bg-neutral-200 animate-pulse"></span>
                    <span className="w-1 h-2 bg-neutral-500"></span>
                    <span className="w-1 h-6 bg-neutral-300 animate-pulse"></span>
                    <span className="w-1 h-4 bg-neutral-400"></span>
                  </div>
                </div>

                {/* Top-right student cam pip */}
                <div className="absolute top-3 right-3 w-28 h-20 border-2 border-neutral-700 bg-neutral-800 flex flex-col items-center justify-center p-1 text-[9px] font-mono text-neutral-400">
                  <span>[ YOUR CAM ]</span>
                  <span>{isCamOn ? 'LIVE' : 'MUTED'}</span>
                </div>
              </div>

              {/* Classroom Control Console Bar */}
              <div className="bg-neutral-900 border-t border-neutral-800 p-3 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <button
                    id="btn-mic-toggle"
                    onClick={() => setIsMicOn(!isMicOn)}
                    className={`px-3 py-1.5 border flex items-center gap-1.5 text-xs ${
                      isMicOn
                        ? 'bg-white text-neutral-950 border-white font-bold'
                        : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:border-neutral-500'
                    }`}
                  >
                    {isMicOn ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
                    <span>{isMicOn ? 'Mic On' : 'Muted'}</span>
                  </button>

                  <button
                    id="btn-cam-toggle"
                    onClick={() => setIsCamOn(!isCamOn)}
                    className={`px-3 py-1.5 border flex items-center gap-1.5 text-xs ${
                      isCamOn
                        ? 'bg-white text-neutral-950 border-white font-bold'
                        : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:border-neutral-500'
                    }`}
                  >
                    {isCamOn ? <Video className="w-3.5 h-3.5" /> : <VideoOff className="w-3.5 h-3.5" />}
                    <span>{isCamOn ? 'Cam On' : 'Cam Off'}</span>
                  </button>

                  <button
                    id="btn-hand-toggle"
                    onClick={() => setIsHandRaised(!isHandRaised)}
                    className={`px-3 py-1.5 border flex items-center gap-1.5 text-xs ${
                      isHandRaised
                        ? 'bg-neutral-100 text-neutral-950 border-white font-bold'
                        : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:border-neutral-500'
                    }`}
                  >
                    <Hand className="w-3.5 h-3.5" />
                    <span>{isHandRaised ? 'Hand Raised ✋' : 'Raise Hand'}</span>
                  </button>
                </div>

                <div className="text-[11px] text-neutral-400">
                  Session Duration: 42m / 120m
                </div>
              </div>
            </div>

            {/* Stage Workbench Tabs */}
            <div className="border-2 border-neutral-300 bg-white p-5 space-y-4">
              <div className="flex border-b-2 border-neutral-300 font-mono text-xs">
                <button
                  id="tab-lesson-notes"
                  onClick={() => setActiveTab('notes')}
                  className={`pb-2.5 px-4 font-bold border-b-2 transition-colors ${
                    activeTab === 'notes'
                      ? 'border-neutral-900 text-neutral-900 -mb-0.5'
                      : 'border-transparent text-neutral-400 hover:text-neutral-700'
                  }`}
                >
                  Lesson Notes & Summary
                </button>
                <button
                  id="tab-exercise"
                  onClick={() => setActiveTab('exercise')}
                  className={`pb-2.5 px-4 font-bold border-b-2 transition-colors ${
                    activeTab === 'exercise'
                      ? 'border-neutral-900 text-neutral-900 -mb-0.5'
                      : 'border-transparent text-neutral-400 hover:text-neutral-700'
                  }`}
                >
                  Interactive Lab Sprint
                </button>
                <button
                  id="tab-syllabus"
                  onClick={() => setActiveTab('syllabus')}
                  className={`pb-2.5 px-4 font-bold border-b-2 transition-colors ${
                    activeTab === 'syllabus'
                      ? 'border-neutral-900 text-neutral-900 -mb-0.5'
                      : 'border-transparent text-neutral-400 hover:text-neutral-700'
                  }`}
                >
                  Cohort Syllabus & Roadmap
                </button>
              </div>

              {/* Tab Content 1: Notes */}
              {activeTab === 'notes' && (
                <div className="space-y-3 font-sans text-xs text-neutral-700 leading-relaxed">
                  <div className="p-3 bg-neutral-50 border border-neutral-300 font-mono text-[11px] space-y-1">
                    <span className="font-bold text-neutral-900 block">[ LIVE TOPIC ]</span>
                    <p>
                      Module 1: Problem scoping, latency boundaries, and evaluation metrics for agentic loops.
                    </p>
                  </div>
                  <p>
                    Key Takeaway: Rather than treating the model output as a monolithic response, decompose the user intent into discrete state transitions. Each node must have explicit fallback guards when certainty scores fall below threshold.
                  </p>
                  <div className="border border-neutral-300 p-3 bg-neutral-100 font-mono text-[11px] space-y-1">
                    <div className="font-bold text-neutral-900">Assigned Reading:</div>
                    <div>• Architecture Blueprint v2.4 (PDF attached in Roster tab)</div>
                    <div>• Evaluating Token Budget vs Latency SLA (Week 1 Spec)</div>
                  </div>
                </div>
              )}

              {/* Tab Content 2: Exercise */}
              {activeTab === 'exercise' && (
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 bg-neutral-50 border border-neutral-300 space-y-2">
                    <span className="font-bold text-neutral-900">[ LAB EXERCISE #01 ]</span>
                    <p className="font-sans text-neutral-700 text-xs">
                      Deconstruct a search-to-booking user funnel and identify all failure states where vouchers need automated verification.
                    </p>
                    <div className="p-2 bg-white border border-neutral-300 text-[11px] text-neutral-600">
                      Starter Code: <code>git clone repo:learnhub-lab-sprint-01.git</code>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab Content 3: Syllabus */}
              {activeTab === 'syllabus' && (
                <div className="space-y-3 font-mono text-xs">
                  {course.curriculum.map((mod, idx) => (
                    <div
                      key={mod.module}
                      className={`border p-3 space-y-1 ${
                        idx === 0
                          ? 'border-neutral-900 bg-neutral-50'
                          : 'border-neutral-300 bg-white opacity-70'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-neutral-900">
                        <span>Module {mod.module}: {mod.title}</span>
                        <span className="text-[10px] bg-neutral-200 px-1.5 py-0.5">
                          {idx === 0 ? 'CURRENT LIVE' : 'UPCOMING'}
                        </span>
                      </div>
                      <div className="text-[11px] text-neutral-600 font-sans">
                        Duration: {mod.duration}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Interactive Chat & Cohort Tools (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="border-2 border-neutral-400 bg-white flex flex-col h-[600px] shadow-sm">
              {/* Sidebar Header Tabs */}
              <div className="flex border-b border-neutral-300 font-mono text-xs bg-neutral-100">
                <button
                  id="tab-sidebar-chat"
                  onClick={() => setSidebarTab('chat')}
                  className={`flex-1 py-2.5 px-2 text-center font-bold border-b-2 transition-colors ${
                    sidebarTab === 'chat'
                      ? 'border-neutral-900 bg-white text-neutral-900'
                      : 'border-transparent text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  Live Chat ({chatMessages.length})
                </button>
                <button
                  id="tab-sidebar-roster"
                  onClick={() => setSidebarTab('roster')}
                  className={`flex-1 py-2.5 px-2 text-center font-bold border-b-2 transition-colors ${
                    sidebarTab === 'roster'
                      ? 'border-neutral-900 bg-white text-neutral-900'
                      : 'border-transparent text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  Roster (28)
                </button>
                <button
                  id="tab-sidebar-downloads"
                  onClick={() => setSidebarTab('downloads')}
                  className={`flex-1 py-2.5 px-2 text-center font-bold border-b-2 transition-colors ${
                    sidebarTab === 'downloads'
                      ? 'border-neutral-900 bg-white text-neutral-900'
                      : 'border-transparent text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  Assets
                </button>
              </div>

              {/* Chat View */}
              {sidebarTab === 'chat' && (
                <div className="flex-1 flex flex-col justify-between p-3 overflow-hidden">
                  <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs font-mono">
                    {chatMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`p-2.5 border ${
                          msg.role === 'Instructor'
                            ? 'bg-neutral-100 border-neutral-400'
                            : msg.role === 'You'
                            ? 'bg-neutral-50 border-neutral-900 ml-3'
                            : 'bg-white border-neutral-200'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px] text-neutral-500 mb-1">
                          <span className="font-bold text-neutral-900">{msg.sender}</span>
                          <span>{msg.time}</span>
                        </div>
                        <p className="font-sans text-neutral-800 text-[11px] leading-relaxed">
                          {msg.text}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Chat Input Form */}
                  <form onSubmit={handleSendMessage} className="mt-2 pt-2 border-t border-neutral-200 flex gap-1.5">
                    <input
                      id="input-chat-message"
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask instructor or comment..."
                      className="flex-1 px-2.5 py-2 bg-neutral-50 border border-neutral-400 text-xs font-mono text-neutral-900 focus:bg-white focus:border-neutral-900 focus:outline-none"
                    />
                    <button
                      id="btn-send-chat"
                      type="submit"
                      className="px-3 py-2 bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-xs border border-neutral-900"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              )}

              {/* Roster View */}
              {sidebarTab === 'roster' && (
                <div className="flex-1 p-3 overflow-y-auto space-y-2 text-xs font-mono">
                  <div className="text-[10px] text-neutral-500 uppercase tracking-wider mb-2">
                    Cohort Participants Online
                  </div>
                  {[
                    { name: course.instructor.name, role: 'Lead Instructor', status: 'Speaking' },
                    { name: 'Karin Tanaka', role: 'TA / Host', status: 'Online' },
                    { name: 'Alex Chen (You)', role: 'Enrolled Learner', status: 'Active (Voucher Pass)' },
                    { name: 'Liam O’Connor', role: 'Student', status: 'Online' },
                    { name: 'Sarah Jenkins', role: 'Student', status: 'Online' },
                    { name: 'Mateo Rossi', role: 'Student', status: 'Online' },
                  ].map((p, idx) => (
                    <div key={idx} className="p-2 border border-neutral-200 bg-neutral-50 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-neutral-900 text-[11px]">{p.name}</div>
                        <div className="text-[10px] text-neutral-500">{p.role}</div>
                      </div>
                      <span className="text-[9px] bg-neutral-200 px-1 py-0.2 border border-neutral-300">
                        {p.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Downloads / Assets View */}
              {sidebarTab === 'downloads' && (
                <div className="flex-1 p-3 overflow-y-auto space-y-3 text-xs font-mono">
                  <div className="text-[10px] text-neutral-500 uppercase tracking-wider mb-1">
                    Downloadable Cohort Materials
                  </div>
                  <div className="border border-neutral-300 p-3 bg-neutral-50 space-y-2">
                    <div className="font-bold text-neutral-900">Module 1 Slides.pdf</div>
                    <div className="text-[10px] text-neutral-500">2.4 MB • Updated 10m ago</div>
                    <button
                      type="button"
                      onClick={() => alert('[Wireframe Action]: Downloading Module 1 Slides PDF')}
                      className="w-full py-1.5 bg-white border border-neutral-400 hover:border-neutral-900 text-[11px] font-bold flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                  <div className="border border-neutral-300 p-3 bg-neutral-50 space-y-2">
                    <div className="font-bold text-neutral-900">Exercise Starter Kit.zip</div>
                    <div className="text-[10px] text-neutral-500">14.1 MB • Repository Boilerplate</div>
                    <button
                      type="button"
                      onClick={() => alert('[Wireframe Action]: Downloading Starter Kit ZIP')}
                      className="w-full py-1.5 bg-white border border-neutral-400 hover:border-neutral-900 text-[11px] font-bold flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download Archive</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Reset / Loop Back Card */}
            <div className="border border-neutral-300 bg-white p-4 space-y-3 font-mono text-xs">
              <div className="font-bold text-neutral-900 uppercase">
                [ JOURNEY RESTART & TEST ]
              </div>
              <p className="text-neutral-600 font-sans text-xs">
                You have reached the end of the 6-step wireframe flow. You can replay the journey or switch to the Storyboard map overview.
              </p>
              <div className="flex flex-col gap-2 pt-1">
                <button
                  id="btn-replay-journey"
                  onClick={onResetJourney}
                  className="w-full py-2 bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-xs font-bold border border-neutral-900"
                >
                  Restart Flow from Landing Page ↺
                </button>
                <button
                  onClick={() => onNavigate('voucher')}
                  className="w-full py-1.5 bg-white hover:bg-neutral-100 text-neutral-700 font-mono text-xs border border-neutral-300"
                >
                  ← Back to Email Voucher View
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
