import React, { useState } from 'react';
import { Award, ShieldCheck, CheckCircle2, AlertTriangle, FileCheck, Send, Check } from 'lucide-react';

export const InstructorCertification: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    email: '',
    district: 'Khordha',
    currentRank: '1st Đẳng (Huyền Đai)',
    yearsOfPractice: '',
    existingQualifications: '',
    proposedCentreLocation: '',
    documentName: '',
    consentPolicy: false,
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, documentName: file.name }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formData.fullName.trim()) {
      setFormError('Please enter your full legal name.');
      return;
    }
    if (!formData.contactNumber.trim() || formData.contactNumber.length < 10) {
      setFormError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (!formData.yearsOfPractice || Number(formData.yearsOfPractice) < 3) {
      setFormError('Applicant must possess at least 3 years of verified practice.');
      return;
    }
    if (!formData.consentPolicy) {
      setFormError('You must agree to the association vetting and safeguarding policy.');
      return;
    }

    // Success state
    setFormSubmitted(true);
  };

  return (
    <section id="instructors" className="py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#008A68] uppercase tracking-wider mb-2">
            <span>Teacher Training & Standards</span>
            <span aria-hidden="true">·</span>
            <span>Accredited Teaching</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            Become a Certified Qwan Ki Do Instructor
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            In Qwan Ki Do, teaching students is an important responsibility.
            Holding a Black Belt shows your personal skill, but running classes requires a teaching license to ensure every child and adult learns safely.
          </p>
        </div>

        {/* Warning banner about rank vs teaching authorization */}
        <div className="mb-12 p-5 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-amber-900 leading-relaxed">
            <p className="font-bold">IMPORTANT NOTE ON TEACHING:</p>
            <p className="mt-1">
              Holding a Black Belt does <strong>NOT</strong> mean you can automatically open a school or teach students on your own.
              Instructors must complete our official teacher training course, pass child safety and basic first aid checks, and receive an annual Teaching License from the State Technical Committee.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Requirements & Syllabus */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-serif text-xl font-bold text-slate-900">
              Instructor Licensing Requirements
            </h3>

            <div className="space-y-4">
              <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#008A68] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-900">
                    1. Recognized Black Belt
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Must hold an officially registered 1st Đẳng Black Belt or higher, recognized by the national federation and World Union, with active regular practice.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#008A68] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-900">
                    2. Child Safety & Good Conduct
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Complete our child safety workshop, pass identity checks, and promise to follow kind, positive, and non-violent teaching methods.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#008A68] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-900">
                    3. Basic First Aid & Injury Care
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Know basic first aid, CPR, sprain care, and heat exhaustion safety to keep students healthy and protected during training.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#008A68] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-900">
                    4. Annual License Renewal
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Licenses are renewed every year. Instructors attend an annual state refresher workshop to keep teaching quality high and uniform across Odisha.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-stone-100 rounded-lg text-xs text-slate-600">
              <span className="font-semibold text-slate-800">Important Rule:</span> Opening an unapproved club or printing fake certificates using the name of Qwan Ki Do Association Odisha is strictly against association rules and will result in permanent disqualification.
            </div>
          </div>

          {/* Right Column: Instructor Candidacy Application Form */}
          <div className="lg:col-span-6 bg-stone-50 border border-stone-200 rounded-xl p-6 sm:p-8 shadow-xs">
            {formSubmitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-[#008A68] rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-slate-900">
                  Application Received
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.fullName}</strong>. Your candidacy dossier has been logged under reference{' '}
                  <span className="font-mono font-semibold text-slate-800">
                    QKD-INS-{(Math.random() * 8999 + 1000).toFixed(0)}
                  </span>
                  . The State Technical Committee will review your records and contact you regarding the next examination clinic.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({
                      fullName: '',
                      contactNumber: '',
                      email: '',
                      district: 'Khordha',
                      currentRank: '1st Đẳng (Huyền Đai)',
                      yearsOfPractice: '',
                      existingQualifications: '',
                      proposedCentreLocation: '',
                      documentName: '',
                      consentPolicy: false,
                    });
                  }}
                  className="mt-4 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-stone-300 rounded hover:bg-stone-50 cursor-pointer"
                >
                  Submit Another Application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="font-serif text-lg font-bold text-slate-900 mb-1">
                    Apply for an Instructor License
                  </h3>
                  <p className="text-xs text-slate-500">
                    All applications are reviewed by our State Technical Committee.
                  </p>
                </div>

                {formError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md">
                    {formError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Debabrata Mohapatra"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-stone-300 rounded-md text-slate-900 focus:outline-none focus:border-[#008A68]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mobile Number (+91) *
                    </label>
                    <input
                      type="tel"
                      name="contactNumber"
                      required
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      placeholder="e.g. 9861000000"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-stone-300 rounded-md text-slate-900 focus:outline-none focus:border-[#008A68]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. instructor@domain.com"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-stone-300 rounded-md text-slate-900 focus:outline-none focus:border-[#008A68]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      District in Odisha *
                    </label>
                    <select
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-md text-slate-900 focus:outline-none focus:border-[#008A68]"
                    >
                      <option value="Khordha">Khordha (Bhubaneswar)</option>
                      <option value="Cuttack">Cuttack</option>
                      <option value="Puri">Puri</option>
                      <option value="Sundargarh">Sundargarh (Rourkela)</option>
                      <option value="Ganjam">Ganjam (Berhampur)</option>
                      <option value="Sambalpur">Sambalpur</option>
                      <option value="Balasore">Balasore</option>
                      <option value="Other">Other District</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Current Rank *
                    </label>
                    <select
                      name="currentRank"
                      value={formData.currentRank}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-md text-slate-900 focus:outline-none focus:border-[#008A68]"
                    >
                      <option value="Blue Sash (Lam Đai)">Blue Sash (Lam Đai)</option>
                      <option value="1st Đẳng (Huyền Đai)">1st Đẳng (Huyền Đai)</option>
                      <option value="2nd Đẳng">2nd Đẳng</option>
                      <option value="3rd Đẳng or Above">3rd Đẳng or Above</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Years of Practice *
                    </label>
                    <input
                      type="number"
                      name="yearsOfPractice"
                      required
                      min="3"
                      max="50"
                      value={formData.yearsOfPractice}
                      onChange={handleInputChange}
                      placeholder="e.g. 5"
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-md text-slate-900 focus:outline-none focus:border-[#008A68]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Existing Qualifications / Certifications
                  </label>
                  <textarea
                    name="existingQualifications"
                    rows={2}
                    value={formData.existingQualifications}
                    onChange={handleInputChange}
                    placeholder="List existing martial certificates, first-aid credentials, referee course, or degrees..."
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-md text-slate-900 focus:outline-none focus:border-[#008A68]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Proposed Training Centre / Dojo Location
                  </label>
                  <input
                    type="text"
                    name="proposedCentreLocation"
                    value={formData.proposedCentreLocation}
                    onChange={handleInputChange}
                    placeholder="e.g. High School Indoor Hall, District Sports Complex, or Private Facility"
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-md text-slate-900 focus:outline-none focus:border-[#008A68]"
                  />
                </div>

                {/* File attachment simulator */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Attach Rank Certificate or ID (PDF/JPG)
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-stone-300 rounded text-xs font-medium text-slate-700 hover:bg-stone-100 cursor-pointer">
                      <FileCheck className="w-3.5 h-3.5 text-[#008A68]" />
                      <span>{formData.documentName ? 'Change File' : 'Browse File'}</span>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                    <span className="text-xs text-slate-500 truncate max-w-xs">
                      {formData.documentName || 'No document selected'}
                    </span>
                  </div>
                </div>

                {/* Consent Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      name="consentPolicy"
                      checked={formData.consentPolicy}
                      onChange={handleInputChange}
                      className="mt-0.5 rounded text-[#008A68] focus:ring-[#008A68]"
                    />
                    <span>
                      I confirm that my belt certificates are genuine. I agree to child safety checks and understand that teaching permission is granted by the State Association.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-white bg-[#008A68] hover:bg-[#007256] rounded-md transition-colors shadow-xs cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Instructor Candidacy Application</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* GRAPHIC DESIGN: Official Accredited Instructor Certificate Specimen       */}
        {/* ========================================================================= */}
        <div className="mt-14 bg-gradient-to-b from-[#FFFDF9] via-[#FAF6ED] to-[#F5EFE0] border-2 border-amber-300/80 rounded-2xl p-6 sm:p-10 shadow-md relative overflow-hidden">
          {/* Subtle Guilloche Watermark Pattern */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(180, 83, 9, 0.15) 1px, transparent 1px)`,
              backgroundSize: '16px 16px',
            }}
          />

          {/* Certificate Inner Double Border */}
          <div className="relative z-10 border-2 border-amber-400/60 p-6 sm:p-8 rounded-xl bg-white/90">
            {/* Corner Filigree Vector Accents */}
            <div className="absolute top-2 left-2 text-amber-600/60 font-serif text-lg leading-none">❖</div>
            <div className="absolute top-2 right-2 text-amber-600/60 font-serif text-lg leading-none">❖</div>
            <div className="absolute bottom-2 left-2 text-amber-600/60 font-serif text-lg leading-none">❖</div>
            <div className="absolute bottom-2 right-2 text-amber-600/60 font-serif text-lg leading-none">❖</div>

            {/* Certificate Top Header */}
            <div className="text-center max-w-2xl mx-auto mb-6">
              <span className="text-[11px] font-mono tracking-widest text-amber-800 uppercase font-bold block mb-1">
                Official Credential Specimen · Qwan Ki Do Association Odisha
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 tracking-wide uppercase">
                Official Instructor Teaching License
              </h3>
              <p className="text-xs font-serif italic text-stone-600 mt-1">
                Văn Bằng Huấn Luyện Viên Võ Thuật Qwan Ki Do Odisha
              </p>
            </div>

            {/* Specimen Badge & Content */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-6 py-4 border-y border-amber-200/80">
              <div className="md:col-span-8 space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  This official document confirms that the instructor has passed state teaching examinations, completed child safety checks, and is authorized to run a Qwan Ki Do training club in the State of Odisha.
                </p>
                <div className="flex flex-wrap gap-4 pt-2 text-xs font-mono text-stone-600">
                  <span><strong>Serial:</strong> QKD-OD-2025-LIC</span>
                  <span><strong>Affiliation:</strong> W.U.Q.K.D & Q.K.D.F.I</span>
                  <span><strong>State Reg:</strong> 22194/1981</span>
                </div>
              </div>

              {/* Graphic Vector Gold Wax Seal with Ribbon */}
              <div className="md:col-span-4 flex flex-col items-center justify-center">
                <div className="relative">
                  {/* Silk Ribbons */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-2 pointer-events-none">
                    <div className="w-4 h-9 bg-[#008A68] transform -rotate-12 rounded-b shadow-xs" />
                    <div className="w-4 h-9 bg-amber-600 transform rotate-12 rounded-b shadow-xs" />
                  </div>

                  {/* Wax Seal Circle */}
                  <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 p-1 shadow-md flex items-center justify-center border border-amber-200">
                    <div className="w-full h-full rounded-full border border-amber-200/80 flex flex-col items-center justify-center text-center p-1 bg-gradient-to-br from-amber-600 to-amber-800 text-amber-100">
                      <span className="text-[8px] font-mono font-bold tracking-widest uppercase">OFFICIAL</span>
                      <Award className="w-5 h-5 text-amber-200 my-0.5" />
                      <span className="text-[7px] font-mono tracking-wider uppercase">SEAL</span>
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-stone-500 mt-5">
                  State Verification Seal
                </span>
              </div>
            </div>

            {/* Bottom Signatures & Red Seal Graphic */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 items-end text-center">
              <div>
                <div className="h-9 flex items-center justify-center">
                  <span className="font-serif italic text-sm text-slate-800 font-semibold underline decoration-stone-300">
                    A. K. Biswal
                  </span>
                </div>
                <div className="border-t border-stone-300 pt-1 text-[11px] text-stone-600">
                  <p className="font-semibold text-slate-800">General Secretary</p>
                  <p className="text-[10px] text-stone-500">Qwan Ki Do Assoc. Odisha</p>
                </div>
              </div>

              <div className="hidden sm:flex flex-col items-center justify-center">
                {/* Traditional Red Square Chop / Seal Stamp */}
                <div className="w-12 h-12 border-2 border-red-700 text-red-700 rounded-sm flex items-center justify-center p-1 opacity-80 rotate-2">
                  <span className="text-[8px] font-serif font-bold text-center leading-tight">
                    ODISHA<br />QKD
                  </span>
                </div>
                <span className="text-[9px] font-mono text-stone-400 mt-1">Official Chapa</span>
              </div>

              <div>
                <div className="h-9 flex items-center justify-center">
                  <span className="font-serif italic text-sm text-slate-800 font-semibold underline decoration-stone-300">
                    Technical Board
                  </span>
                </div>
                <div className="border-t border-stone-300 pt-1 text-[11px] text-stone-600">
                  <p className="font-semibold text-slate-800">Technical Director</p>
                  <p className="text-[10px] text-stone-500">State Examination Panel</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
