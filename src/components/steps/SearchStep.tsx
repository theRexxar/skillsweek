import React, { useState, useMemo } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  ArrowRight, 
  Calendar, 
  Clock, 
  Users, 
  Check, 
  X, 
  BookOpen, 
  Tag, 
  Filter,
  Info
} from 'lucide-react';
import { WireframeBox } from '../common/WireframeBox';
import { COURSES } from '../../data/courses';
import { Course, FlowStep } from '../../types';

interface SearchStepProps {
  onSelectCourse: (course: Course) => void;
  onNavigate: (step: FlowStep) => void;
  selectedCourseId?: string;
}

export const SearchStep: React.FC<SearchStepProps> = ({
  onSelectCourse,
  onNavigate,
  selectedCourseId,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'upcoming' | 'tuition' | 'seats'>('upcoming');
  const [previewCourse, setPreviewCourse] = useState<Course | null>(null);

  const categories = ['All', 'Product Management', 'Software Engineering', 'Design & UX', 'Data Engineering'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = useMemo(() => {
    return COURSES.filter((course) => {
      const matchesQuery = 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
      const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;

      return matchesQuery && matchesCategory && matchesLevel;
    }).sort((a, b) => {
      if (sortBy === 'seats') return a.seatsRemaining - b.seatsRemaining;
      if (sortBy === 'tuition') return a.tuition - b.tuition;
      return 0; // default order
    });
  }, [searchQuery, selectedCategory, selectedLevel, sortBy]);

  const handleBook = (course: Course) => {
    onSelectCourse(course);
    onNavigate('book');
  };

  return (
    <div className="w-full bg-neutral-100 min-h-[calc(100vh-140px)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stage Header */}
        <div className="border border-neutral-300 bg-white p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="bg-neutral-900 text-white px-2 py-0.5 font-bold">WF-03</span>
            <span className="font-bold text-neutral-800">STAGE: SEARCH // COHORT CATALOG & FILTERING</span>
          </div>
          <span className="text-neutral-500">Flow: [Login] ➔ [Search & Discover] ➔ [Book / Issued]</span>
        </div>

        {/* Search & Control Strip */}
        <div className="border-2 border-neutral-300 bg-white p-4 sm:p-6 space-y-4 shadow-sm">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            {/* Main Search Input */}
            <div className="relative flex-1">
              <input
                id="search-query-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by topic, skill, framework, or instructor name..."
                className="w-full pl-9 pr-4 py-2.5 bg-neutral-50 border-2 border-neutral-400 text-xs font-mono text-neutral-900 focus:bg-white focus:border-neutral-900 focus:outline-none"
              />
              <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-3 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-neutral-400 hover:text-neutral-700 text-xs"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-neutral-500 whitespace-nowrap">Sort:</span>
              <select
                id="search-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2.5 bg-neutral-50 border-2 border-neutral-400 text-neutral-800 font-mono text-xs focus:outline-none focus:border-neutral-900"
              >
                <option value="upcoming">Start Date (Earliest)</option>
                <option value="seats">Seats Remaining (Urgent)</option>
                <option value="tuition">Tuition (Lowest)</option>
              </select>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="pt-2 border-t border-neutral-200 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono text-neutral-500 mr-2 flex items-center gap-1">
              <Filter className="w-3 h-3" />
              Categories:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                id={`filter-category-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs font-mono border transition-colors ${
                  selectedCategory === cat
                    ? 'bg-neutral-900 text-white border-neutral-900 font-bold'
                    : 'bg-neutral-100 text-neutral-700 border-neutral-300 hover:border-neutral-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Catalog Layout: Sidebar Filters + Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Facet Drawer / Sidebar (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="border border-neutral-300 bg-white p-4 space-y-5 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                <span className="font-bold text-neutral-900 uppercase">[ FILTER FACETS ]</span>
                <span className="text-[10px] text-neutral-500">4 Active</span>
              </div>

              {/* Level filter */}
              <div className="space-y-2">
                <label className="font-bold text-neutral-800 block text-[11px]">
                  EXPERIENCE LEVEL
                </label>
                <div className="space-y-1">
                  {levels.map((lvl) => (
                    <label
                      key={lvl}
                      className="flex items-center gap-2 cursor-pointer text-neutral-700 hover:text-neutral-900 text-[11px]"
                    >
                      <input
                        type="radio"
                        name="level"
                        checked={selectedLevel === lvl}
                        onChange={() => setSelectedLevel(lvl)}
                        className="accent-neutral-900"
                      />
                      <span>{lvl}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Format filter */}
              <div className="space-y-2 pt-2 border-t border-neutral-200">
                <label className="font-bold text-neutral-800 block text-[11px]">
                  DELIVERY FORMAT
                </label>
                <div className="space-y-1 text-[11px] text-neutral-700">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-neutral-900" />
                    <span>Live Cohort (Instructor-led)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-neutral-900" />
                    <span>Blended Workshop</span>
                  </label>
                </div>
              </div>

              {/* Voucher eligibility note */}
              <div className="space-y-2 pt-2 border-t border-neutral-200">
                <label className="font-bold text-neutral-800 block text-[11px]">
                  SPONSORSHIP & VOUCHER
                </label>
                <div className="p-2.5 bg-neutral-100 border border-neutral-300 text-[10px] text-neutral-600 leading-relaxed">
                  All courses in this catalog accept enterprise voucher codes and individual tuition discounts issued in Stage 5.
                </div>
              </div>
            </div>
          </div>

          {/* Right Results Grid (9 cols) */}
          <div className="lg:col-span-9 space-y-4">
            {/* Results count & status */}
            <div className="flex items-center justify-between text-xs font-mono px-1">
              <span className="text-neutral-600">
                Showing <strong className="text-neutral-900">{filteredCourses.length}</strong> available cohort courses
              </span>
              <span className="text-[11px] text-neutral-500">
                Click any course to preview syllabus or book seat
              </span>
            </div>

            {/* Courses List / Cards */}
            <div className="space-y-4">
              {filteredCourses.length === 0 ? (
                <div className="border-2 border-dashed border-neutral-300 bg-white p-12 text-center font-mono space-y-3">
                  <div className="text-neutral-400 text-sm">[ NO MATCHING COURSES FOUND ]</div>
                  <p className="text-xs text-neutral-500 max-w-md mx-auto">
                    Try clearing query filters or choosing another category above.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                      setSelectedLevel('All');
                    }}
                    className="px-4 py-2 bg-neutral-900 text-white text-xs font-bold"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                filteredCourses.map((course) => {
                  const isCurrentSelection = selectedCourseId === course.id;

                  return (
                    <div
                      key={course.id}
                      className={`border-2 bg-white transition-all ${
                        isCurrentSelection
                          ? 'border-neutral-900 ring-2 ring-neutral-800'
                          : 'border-neutral-300 hover:border-neutral-600'
                      }`}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-12">
                        {/* Course Thumbnail Wireframe (4 cols) */}
                        <div className="md:col-span-4 p-4 bg-neutral-50 border-b md:border-b-0 md:border-r border-neutral-200 flex flex-col justify-between">
                          <WireframeBox
                            aspectRatio="video"
                            label={`MEDIA: ${course.code}`}
                            sublabel={course.format}
                            className="bg-neutral-200"
                          />
                          <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-neutral-600">
                            <span>ID: {course.code}</span>
                            <span className="border border-neutral-400 px-1.5 py-0.2 bg-white text-neutral-800 font-semibold">
                              {course.level}
                            </span>
                          </div>
                        </div>

                        {/* Course Details (8 cols) */}
                        <div className="md:col-span-8 p-5 flex flex-col justify-between space-y-4">
                          <div className="space-y-2">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span className="text-[10px] font-mono bg-neutral-100 border border-neutral-300 px-2 py-0.5 text-neutral-700">
                                {course.category}
                              </span>
                              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-900">
                                <span className="w-2 h-2 rounded-full bg-neutral-800"></span>
                                <span>{course.seatsRemaining} seats left</span>
                              </div>
                            </div>

                            <h3 className="text-lg font-bold text-neutral-900 font-sans leading-snug">
                              {course.title}
                            </h3>

                            <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                              {course.summary}
                            </p>

                            {/* Schedule & Instructor Meta */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-neutral-200 text-xs font-mono text-neutral-600">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                                <span>Starts {course.startDate}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-3.5 h-3.5 text-neutral-400" />
                                <span>{course.cohortSchedule}</span>
                              </div>
                              <div className="flex items-center gap-2 sm:col-span-2">
                                <Users className="w-3.5 h-3.5 text-neutral-400" />
                                <span>Taught by {course.instructor.name} ({course.instructor.org})</span>
                              </div>
                            </div>
                          </div>

                          {/* Action Footer */}
                          <div className="pt-3 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3">
                            <div>
                              <span className="text-[10px] font-mono text-neutral-500 uppercase block">
                                Cohort Tuition
                              </span>
                              <div className="flex items-baseline gap-2">
                                <span className="text-lg font-bold font-mono text-neutral-900">
                                  ${course.tuition}
                                </span>
                                <span className="text-[11px] font-mono text-neutral-500">
                                  or 100% via Voucher
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                id={`search-preview-${course.id}`}
                                onClick={() => setPreviewCourse(course)}
                                className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-mono text-xs border border-neutral-400"
                              >
                                View Syllabus
                              </button>
                              <button
                                id={`search-select-${course.id}`}
                                onClick={() => handleBook(course)}
                                className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-xs font-bold border border-neutral-900 flex items-center gap-1.5"
                              >
                                <span>Book / Issue Seat</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Syllabus Preview Modal (Wireframe) */}
        {previewCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-white border-2 border-neutral-900 max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl font-mono">
              {/* Modal Header */}
              <div className="p-4 border-b-2 border-neutral-300 bg-neutral-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-neutral-500 block">[ SYLLABUS SPECIFICATION ]</span>
                  <h4 className="text-sm font-bold text-neutral-900">{previewCourse.title}</h4>
                </div>
                <button
                  id="modal-close-btn"
                  onClick={() => setPreviewCourse(null)}
                  className="p-1 border border-neutral-400 hover:bg-neutral-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-4 text-xs">
                <div className="p-3 bg-neutral-50 border border-neutral-300 space-y-1">
                  <div className="font-bold text-neutral-800">COHORT OVERVIEW</div>
                  <p className="text-neutral-600 font-sans text-xs">{previewCourse.summary}</p>
                </div>

                <div className="space-y-3">
                  <div className="font-bold text-neutral-900 uppercase">Curriculum Breakdown:</div>
                  {previewCourse.curriculum.map((mod) => (
                    <div key={mod.module} className="border border-neutral-300 p-3 space-y-2">
                      <div className="flex items-center justify-between text-neutral-800 font-bold">
                        <span>Module {mod.module}: {mod.title}</span>
                        <span className="text-[10px] bg-neutral-200 px-1.5 py-0.5">{mod.duration}</span>
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-neutral-600 text-[11px] font-sans">
                        {mod.lessons.map((lesson, li) => (
                          <li key={li}>{lesson}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t-2 border-neutral-300 bg-neutral-50 flex items-center justify-between">
                <button
                  onClick={() => setPreviewCourse(null)}
                  className="px-4 py-2 border border-neutral-400 text-xs font-mono"
                >
                  Close Preview
                </button>
                <button
                  id="modal-book-btn"
                  onClick={() => {
                    handleBook(previewCourse);
                    setPreviewCourse(null);
                  }}
                  className="px-5 py-2 bg-neutral-900 text-white text-xs font-bold font-mono flex items-center gap-2"
                >
                  <span>Proceed to Booking ({previewCourse.code})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
