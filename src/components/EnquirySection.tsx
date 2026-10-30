import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, School, User, PhoneCall, ShieldCheck, MapPin } from 'lucide-react';
import { useData } from '../context/DataContext';
import { motion, AnimatePresence } from 'motion/react';

interface EnquirySectionProps {
  initialCentre?: string;
  initialProgramme?: string;
}

export const EnquirySection: React.FC<EnquirySectionProps> = ({
  initialCentre,
  initialProgramme,
}) => {
  const { trainingCentres, addEnquiry } = useData();
  const [enquiryType, setEnquiryType] = useState<'student' | 'affiliation'>('student');
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [referenceId, setReferenceId] = useState('');

  // Student form state
  const [studentForm, setStudentForm] = useState({
    name: '',
    ageGroup: 'Children (5-12)',
    district: 'Khordha',
    locality: '',
    mobile: '',
    email: '',
    experience: 'No prior martial arts experience',
    preferredCentre: initialCentre || 'State Headquarters Dojo — Bhubaneswar',
    preferredProgramme: initialProgramme || "Children's Martial Arts",
    message: '',
    consent: false,
  });

  // Affiliation form state
  const [affiliationForm, setAffiliationForm] = useState({
    institutionName: '',
    institutionType: 'School / College',
    contactPerson: '',
    district: 'Khordha',
    mobile: '',
    email: '',
    approxStudents: '50-100 students',
    message: '',
    consent: false,
  });

  useEffect(() => {
    if (initialCentre) {
      setStudentForm((prev) => ({ ...prev, preferredCentre: initialCentre }));
    }
  }, [initialCentre]);

  useEffect(() => {
    if (initialProgramme) {
      setStudentForm((prev) => ({ ...prev, preferredProgramme: initialProgramme }));
    }
  }, [initialProgramme]);

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!studentForm.name.trim()) {
      setErrorMessage('Please provide your name or parent’s name.');
      return;
    }
    if (!studentForm.mobile.trim() || studentForm.mobile.length < 10) {
      setErrorMessage('Please provide a valid 10-digit mobile number for class scheduling.');
      return;
    }
    if (!studentForm.consent) {
      setErrorMessage('Please accept the association’s privacy and safety guidelines.');
      return;
    }

    const details = `Age: ${studentForm.ageGroup} · Dojo: ${studentForm.preferredCentre} · Programme: ${studentForm.preferredProgramme} · Locality: ${studentForm.locality || 'Not specified'} · Exp: ${studentForm.experience} · Notes: ${studentForm.message || 'None'}`;
    const newRefId = addEnquiry({
      type: 'student',
      name: studentForm.name,
      contactNumber: studentForm.mobile,
      email: studentForm.email || undefined,
      district: studentForm.district,
      details,
    });

    setReferenceId(newRefId);
    setSubmitted(true);
  };

  const handleAffiliationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!affiliationForm.institutionName.trim() || !affiliationForm.contactPerson.trim()) {
      setErrorMessage('Please fill in institution and coordinator details.');
      return;
    }
    if (!affiliationForm.mobile.trim() || affiliationForm.mobile.length < 10) {
      setErrorMessage('Please provide a valid 10-digit contact mobile number.');
      return;
    }
    if (!affiliationForm.consent) {
      setErrorMessage('Please accept the affiliation terms.');
      return;
    }

    const details = `Institution: ${affiliationForm.institutionName} (${affiliationForm.institutionType}) · Contact Person: ${affiliationForm.contactPerson} · Est. Students: ${affiliationForm.approxStudents} · Notes: ${affiliationForm.message || 'None'}`;
    const newRefId = addEnquiry({
      type: 'affiliation',
      name: `${affiliationForm.institutionName} (${affiliationForm.contactPerson})`,
      contactNumber: affiliationForm.mobile,
      email: affiliationForm.email || undefined,
      district: affiliationForm.district,
      details,
    });

    setReferenceId(newRefId);
    setSubmitted(true);
  };


  return (
    <section id="enquiry" className="py-20 bg-[#FAF9F6] border-b border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#008A68] uppercase tracking-wider mb-2">
            <span>Admissions & Official Inquiries</span>
            <span aria-hidden="true">·</span>
            <span>Odisha State</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            Begin Your Martial Arts Journey
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Book a complimentary trial class at your nearest affiliated dojo, or inquire about introducing accredited Qwan Ki Do training at your school or academy.
          </p>
        </div>

        {/* Tab Toggle: Student vs Institutional Affiliation */}
        <div className="flex items-center justify-center mb-8">
          <div className="inline-flex p-1 bg-stone-200/70 rounded-lg">
            <button
              onClick={() => {
                setEnquiryType('student');
                setSubmitted(false);
                setErrorMessage('');
              }}
              className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors cursor-pointer ${
                enquiryType === 'student'
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-4 h-4 text-[#008A68]" />
              <span>Student / Parent Class Enquiry</span>
            </button>

            <button
              onClick={() => {
                setEnquiryType('affiliation');
                setSubmitted(false);
                setErrorMessage('');
              }}
              className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors cursor-pointer ${
                enquiryType === 'affiliation'
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <School className="w-4 h-4 text-[#008A68]" />
              <span>School / Institute Affiliation</span>
            </button>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-10 shadow-xs min-h-[400px]">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="submitted"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="text-center py-10 space-y-4"
              >
                <div className="w-16 h-16 bg-emerald-100 text-[#008A68] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-slate-900">
                  Enquiry Successfully Registered
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Your enquiry reference is{' '}
                  <strong className="font-mono text-slate-900">{referenceId}</strong>.
                  The Chief Instructor of your selected training centre in Odisha will contact you via WhatsApp / phone within 24–48 hours to confirm batch timings and arrange your orientation visit.
                </p>
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg max-w-md mx-auto text-xs text-slate-600 text-left space-y-1">
                  <p><strong>Next Step:</strong> Prepare loose comfortable athletic clothing for your trial class.</p>
                  <p><strong>Location:</strong> {studentForm.preferredCentre}</p>
                  <p><strong>Direct Helpline:</strong> +91 94370 21548</p>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-5 py-2 text-xs font-semibold text-slate-700 bg-white border border-stone-300 rounded hover:bg-stone-50 cursor-pointer"
                >
                  Submit Another Enquiry
                </button>
              </motion.div>
            ) : enquiryType === 'student' ? (
              /* Student & Parent Admission Form */
              <motion.form
                key="student-form"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleStudentSubmit}
                className="space-y-4"
              >
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Student or Parent Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={studentForm.name}
                    onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                    placeholder="e.g. Ramesh Nayak"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-md text-slate-900 focus:outline-none focus:border-[#008A68]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Age Group *
                  </label>
                  <select
                    value={studentForm.ageGroup}
                    onChange={(e) => setStudentForm({ ...studentForm, ageGroup: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-md text-slate-900 focus:outline-none focus:border-[#008A68]"
                  >
                    <option value="Children (5-12)">Children (Ages 5 - 12)</option>
                    <option value="Youth & Teens (13-17)">Youth & Teenagers (Ages 13 - 17)</option>
                    <option value="Adults (18+)">Adult Beginners (Ages 18+)</option>
                    <option value="Women Self-Defense">Women’s Self-Defense & Fitness</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile Number (WhatsApp Preferred) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={studentForm.mobile}
                    onChange={(e) => setStudentForm({ ...studentForm, mobile: e.target.value })}
                    placeholder="e.g. 9437000000"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-md text-slate-900 focus:outline-none focus:border-[#008A68]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={studentForm.email}
                    onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                    placeholder="e.g. name@domain.com"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-md text-slate-900 focus:outline-none focus:border-[#008A68]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    District in Odisha *
                  </label>
                  <select
                    value={studentForm.district}
                    onChange={(e) => setStudentForm({ ...studentForm, district: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-md text-slate-900 focus:outline-none focus:border-[#008A68]"
                  >
                    <option value="Khordha">Khordha (Bhubaneswar)</option>
                    <option value="Cuttack">Cuttack</option>
                    <option value="Puri">Puri</option>
                    <option value="Sundargarh">Sundargarh (Rourkela)</option>
                    <option value="Ganjam">Ganjam (Berhampur)</option>
                    <option value="Sambalpur">Sambalpur</option>
                    <option value="Balasore">Balasore</option>
                    <option value="Other">Other District (Request Centre)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Locality / Town
                  </label>
                  <input
                    type="text"
                    value={studentForm.locality}
                    onChange={(e) => setStudentForm({ ...studentForm, locality: e.target.value })}
                    placeholder="e.g. Saheed Nagar, CDA, VIP Road..."
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-md text-slate-900 focus:outline-none focus:border-[#008A68]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Affiliated Training Centre
                  </label>
                  <select
                    value={studentForm.preferredCentre}
                    onChange={(e) => setStudentForm({ ...studentForm, preferredCentre: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-md text-slate-900 focus:outline-none focus:border-[#008A68]"
                  >
                    {trainingCentres.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name} ({c.city})
                      </option>
                    ))}
                    <option value="Nearest Available Centre">Assign Nearest Centre Automatically</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Prior Martial Arts Experience
                  </label>
                  <select
                    value={studentForm.experience}
                    onChange={(e) => setStudentForm({ ...studentForm, experience: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-md text-slate-900 focus:outline-none focus:border-[#008A68]"
                  >
                    <option value="No prior martial arts experience">Complete Beginner (No prior experience)</option>
                    <option value="Former Qwan Ki Do student">Former Qwan Ki Do Student</option>
                    <option value="Other martial art (Karate, Taekwondo, Kungfu)">Trained in other style (Karate, Taekwondo, etc.)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Questions or Health Considerations (Optional)
                </label>
                <textarea
                  rows={2}
                  value={studentForm.message}
                  onChange={(e) => setStudentForm({ ...studentForm, message: e.target.value })}
                  placeholder="Share any questions regarding trial class scheduling, existing joint issues, or sibling admissions..."
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-md text-slate-900 focus:outline-none focus:border-[#008A68]"
                />
              </div>

              {/* Consent */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={studentForm.consent}
                    onChange={(e) => setStudentForm({ ...studentForm, consent: e.target.checked })}
                    className="mt-0.5 rounded text-[#008A68] focus:ring-[#008A68]"
                  />
                  <span>
                    I consent to Qwan Ki Do Association Odisha contacting me regarding class scheduling and agree to abide by the association's dojo safety code.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-3 text-xs sm:text-sm font-semibold text-white bg-[#008A68] hover:bg-[#007256] rounded-md transition-colors shadow-2xs cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Student Admission Enquiry</span>
              </button>
            </motion.form>
          ) : (
            /* School & Institutional Affiliation Form */
            <motion.form
              key="affiliation-form"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleAffiliationSubmit}
              className="space-y-4"
            >
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Institution / Academy Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={affiliationForm.institutionName}
                    onChange={(e) => setAffiliationForm({ ...affiliationForm, institutionName: e.target.value })}
                    placeholder="e.g. DAV Public School, KIIT Enclave..."
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-md text-slate-900 focus:outline-none focus:border-[#008A68]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Institution Type
                  </label>
                  <select
                    value={affiliationForm.institutionType}
                    onChange={(e) => setAffiliationForm({ ...affiliationForm, institutionType: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-md text-slate-900 focus:outline-none focus:border-[#008A68]"
                  >
                    <option value="School / College">Primary / Secondary School</option>
                    <option value="College / University">College / University Campus</option>
                    <option value="Private Sports Academy">Sports Academy / Fitness Centre</option>
                    <option value="Corporate / Organization">Corporate Wellness Program</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Coordinator / Principal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={affiliationForm.contactPerson}
                    onChange={(e) => setAffiliationForm({ ...affiliationForm, contactPerson: e.target.value })}
                    placeholder="e.g. Principal / Sports Officer"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-md text-slate-900 focus:outline-none focus:border-[#008A68]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Official Mobile *
                  </label>
                  <input
                    type="tel"
                    required
                    value={affiliationForm.mobile}
                    onChange={(e) => setAffiliationForm({ ...affiliationForm, mobile: e.target.value })}
                    placeholder="10-digit mobile"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-md text-slate-900 focus:outline-none focus:border-[#008A68]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Official Email
                  </label>
                  <input
                    type="email"
                    value={affiliationForm.email}
                    onChange={(e) => setAffiliationForm({ ...affiliationForm, email: e.target.value })}
                    placeholder="admin@school.ac.in"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-md text-slate-900 focus:outline-none focus:border-[#008A68]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    District in Odisha
                  </label>
                  <select
                    value={affiliationForm.district}
                    onChange={(e) => setAffiliationForm({ ...affiliationForm, district: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-md text-slate-900 focus:outline-none focus:border-[#008A68]"
                  >
                    <option value="Khordha">Khordha</option>
                    <option value="Cuttack">Cuttack</option>
                    <option value="Puri">Puri</option>
                    <option value="Sundargarh">Sundargarh</option>
                    <option value="Ganjam">Ganjam</option>
                    <option value="Sambalpur">Sambalpur</option>
                    <option value="Balasore">Balasore</option>
                    <option value="All Districts">Any Other District in Odisha</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Estimated Student Strength
                  </label>
                  <select
                    value={affiliationForm.approxStudents}
                    onChange={(e) => setAffiliationForm({ ...affiliationForm, approxStudents: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-md text-slate-900 focus:outline-none focus:border-[#008A68]"
                  >
                    <option value="30-50 students">30 - 50 students</option>
                    <option value="50-100 students">50 - 100 students</option>
                    <option value="100-250 students">100 - 250 students</option>
                    <option value="250+ students">250+ students (Campus-wide)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Proposed Venue & Program Objectives
                </label>
                <textarea
                  rows={2}
                  value={affiliationForm.message}
                  onChange={(e) => setAffiliationForm({ ...affiliationForm, message: e.target.value })}
                  placeholder="Provide details about indoor sports infrastructure, preferred after-school or curriculum hours..."
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-md text-slate-900 focus:outline-none focus:border-[#008A68]"
                />
              </div>

              <div className="pt-1">
                <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={affiliationForm.consent}
                    onChange={(e) => setAffiliationForm({ ...affiliationForm, consent: e.target.checked })}
                    className="mt-0.5 rounded text-[#008A68] focus:ring-[#008A68]"
                  />
                  <span>
                    We request an official affiliation feasibility visit from the State Technical Committee of Qwan Ki Do Association Odisha.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-3 text-xs sm:text-sm font-semibold text-white bg-[#008A68] hover:bg-[#007256] rounded-md transition-colors shadow-2xs cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Institutional Affiliation Request</span>
              </button>
            </motion.form>
          )}
        </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
