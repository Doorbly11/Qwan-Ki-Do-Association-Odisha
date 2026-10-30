import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { AssociationEvent } from '../types';
import { Calendar, MapPin, Clock, Trophy, Download, Send, Check, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const EventsSection: React.FC = () => {
  const { associationEvents } = useData();
  const [filterType, setFilterType] = useState<string>('all');
  const [registeringEvent, setRegisteringEvent] = useState<AssociationEvent | null>(null);
  const [registrationSubmitted, setRegistrationSubmitted] = useState(false);
  const [regForm, setRegForm] = useState({
    athleteName: '',
    dob: '',
    district: 'Khordha',
    currentRank: 'White Sash (Beginner)',
    centreName: 'State Headquarters Dojo — Bhubaneswar',
    phone: '',
    category: 'Forms & Sparring',
  });

  const filteredEvents = associationEvents.filter((e) => {
    if (filterType === 'all') return true;
    if (filterType === 'upcoming') return e.status === 'upcoming';
    return e.type === filterType || (e as any).category === filterType;
  });


  const handleDownloadCircular = (event: AssociationEvent) => {
    const textContent =
      `OFFICIAL NOTIFICATION & CIRCULAR\n` +
      `QWAN KI DO ASSOCIATION ODISHA\n` +
      `-----------------------------------------\n` +
      `EVENT: ${event.title}\n` +
      `TYPE: ${event.type.toUpperCase()}\n` +
      `DATE: ${event.date}\n` +
      `VENUE: ${event.venue}\n` +
      `DISTRICT: ${event.district}\n` +
      `REGISTRATION DEADLINE: ${event.registrationDeadline}\n\n` +
      `ELIGIBILITY PREREQUISITES:\n${event.eligibility}\n\n` +
      `RULES & DIVISIONS:\n${event.rulesSummary}\n\n` +
      `CONTACT / CONVENOR:\n${event.contactPerson} (${event.contactPhone})\n\n` +
      `Issued under authority of State Technical Director, Qwan Ki Do Association Odisha.\n` +
      `Website: https://qwankidoodisha.com/`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${event.id}_official_circular.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regForm.athleteName || !regForm.phone) return;
    setRegistrationSubmitted(true);
  };

  return (
    <section id="events" className="py-20 bg-[#FAF9F6] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#008A68] uppercase tracking-wider mb-2">
            <span>State Calendar & Tournaments</span>
            <span aria-hidden="true">·</span>
            <span>2026 - 2027</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            Events, Championships & Gradings
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Stay updated with state-sanctioned championships, centralized belt grading convocations, technical clinics,
            and referee seminars organized under the authority of Qwan Ki Do Association Odisha.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              filterType === 'all'
                ? 'bg-[#008A68] text-white'
                : 'bg-white text-slate-700 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            All Events ({associationEvents.length})
          </button>
          <button
            onClick={() => setFilterType('upcoming')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              filterType === 'upcoming'
                ? 'bg-[#008A68] text-white'
                : 'bg-white text-slate-700 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            Upcoming Only
          </button>
          <button
            onClick={() => setFilterType('championship')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              filterType === 'championship'
                ? 'bg-[#008A68] text-white'
                : 'bg-white text-slate-700 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            State Championships
          </button>
          <button
            onClick={() => setFilterType('grading')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              filterType === 'grading'
                ? 'bg-[#008A68] text-white'
                : 'bg-white text-slate-700 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            Belt Gradings
          </button>
          <button
            onClick={() => setFilterType('seminar')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              filterType === 'seminar'
                ? 'bg-[#008A68] text-white'
                : 'bg-white text-slate-700 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            Technical Clinics
          </button>
          <button
            onClick={() => setFilterType('completed')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              filterType === 'completed'
                ? 'bg-[#008A68] text-white'
                : 'bg-white text-slate-700 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            Past Results Archive
          </button>
        </div>

        {/* Event Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-white border border-stone-200 rounded-xl p-6 sm:p-7 flex flex-col justify-between hover:border-stone-300 transition-all shadow-2xs"
            >
              <div>
                {/* Status & Type Bar */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#008A68]">
                    {evt.type.replace('_', ' ')}
                  </span>
                  <span
                    className={`text-[11px] font-medium px-2 py-0.5 rounded ${
                      evt.status === 'upcoming'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-stone-100 text-slate-600'
                    }`}
                  >
                    {evt.status === 'upcoming' ? 'Upcoming & Open' : 'Concluded'}
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mb-3 leading-snug">
                  {evt.title}
                </h3>

                {/* Metadata List (Unboxed clean text) */}
                <div className="space-y-2 text-xs sm:text-sm text-slate-600 mb-5">
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#008A68] shrink-0" />
                    <span className="font-medium text-slate-900">{evt.date}</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                    <span>{evt.venue} ({evt.district} District)</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Registration Deadline: <strong>{evt.registrationDeadline}</strong></span>
                  </p>
                </div>

                {/* Eligibility & Rules */}
                <div className="p-3.5 bg-stone-50 border border-stone-200/80 rounded-lg text-xs space-y-2 mb-4">
                  <p>
                    <span className="font-semibold text-slate-800">Eligibility:</span> {evt.eligibility}
                  </p>
                  <p className="text-slate-600">
                    <span className="font-semibold text-slate-800">Details:</span> {evt.rulesSummary}
                  </p>
                  {evt.resultsSummary && (
                    <p className="pt-2 border-t border-stone-200 text-emerald-900 font-medium">
                      🏆 {evt.resultsSummary}
                    </p>
                  )}
                </div>

                <p className="text-[11px] text-slate-500 mb-4">
                  Official Inquiries: {evt.contactPerson} ({evt.contactPhone})
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => handleDownloadCircular(evt)}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-700 hover:text-slate-900 underline underline-offset-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#008A68]" />
                  <span>Download Circular</span>
                </button>

                {evt.status === 'upcoming' ? (
                  <button
                    onClick={() => {
                      setRegisteringEvent(evt);
                      setRegistrationSubmitted(false);
                    }}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#008A68] hover:bg-[#007256] rounded-md transition-colors cursor-pointer shadow-2xs"
                  >
                    Register Athlete / Student
                  </button>
                ) : (
                  <span className="text-xs text-slate-400">Archive Record</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Event Registration */}
        <AnimatePresence>
          {registeringEvent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white rounded-xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative"
              >
                <button
                  onClick={() => setRegisteringEvent(null)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 p-1 rounded cursor-pointer"
                  aria-label="Close"
                >
                  ✕
                </button>

                {registrationSubmitted ? (
                  <div className="text-center py-6 space-y-3">
                    <div className="w-12 h-12 bg-emerald-100 text-[#008A68] rounded-full flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6" />
                    </div>
                    <h4 className="font-serif text-xl font-bold text-slate-900">
                      Registration Logged
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Athlete registration for <strong>{regForm.athleteName}</strong> has been provisionally recorded for{' '}
                      <em>{registeringEvent.title}</em>. Your Chief Instructor will review the entry.
                    </p>
                    <button
                      onClick={() => setRegisteringEvent(null)}
                      className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-[#008A68] rounded cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleRegistrationSubmit} className="space-y-4">
                    <div>
                      <span className="text-xs font-semibold text-[#008A68] uppercase">
                        Event Registration
                      </span>
                      <h3 className="font-serif text-xl font-bold text-slate-900 mt-0.5">
                        {registeringEvent.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Venue: {registeringEvent.venue} · Date: {registeringEvent.date}
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Athlete / Participant Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={regForm.athleteName}
                        onChange={(e) => setRegForm({ ...regForm, athleteName: e.target.value })}
                        placeholder="e.g. Ananya Pattnaik"
                        className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded text-slate-900 focus:outline-none focus:border-[#008A68]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Contact Mobile *
                        </label>
                        <input
                          type="tel"
                          required
                          value={regForm.phone}
                          onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                          placeholder="10-digit mobile"
                          className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded text-slate-900 focus:outline-none focus:border-[#008A68]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Current Rank *
                        </label>
                        <select
                          value={regForm.currentRank}
                          onChange={(e) => setRegForm({ ...regForm, currentRank: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded text-slate-900 focus:outline-none focus:border-[#008A68]"
                        >
                          <option value="White Sash (Beginner)">White Sash</option>
                          <option value="1st Cấp (Yellow Stripe)">1st Cấp</option>
                          <option value="2nd Cấp">2nd Cấp</option>
                          <option value="3rd Cấp">3rd Cấp</option>
                          <option value="4th Cấp">4th Cấp</option>
                          <option value="Blue Sash">Blue Sash</option>
                          <option value="Black Belt 1st Đẳng">Black Belt 1st Đẳng</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Affiliated Training Centre / Dojo
                      </label>
                      <input
                        type="text"
                        value={regForm.centreName}
                        onChange={(e) => setRegForm({ ...regForm, centreName: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded text-slate-900 focus:outline-none focus:border-[#008A68]"
                      />
                    </div>

                    <div className="pt-2 border-t border-stone-200 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setRegisteringEvent(null)}
                        className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="px-5 py-2 text-xs font-semibold text-white bg-[#008A68] hover:bg-[#007256] rounded transition-colors cursor-pointer"
                      >
                        Confirm Registration
                      </motion.button>
                    </div>
                  </form>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
