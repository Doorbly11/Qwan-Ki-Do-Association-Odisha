import React, { useState } from 'react';
import {
  Compass,
  MapPin,
  School,
  Users,
  Award,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  PhoneCall,
  Mail,
  Send,
  ArrowRight,
  Sparkles,
  Building2,
  GraduationCap,
  HeartHandshake,
  Check,
  Filter,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useData } from '../context/DataContext';

interface DistrictInfo {
  name: string;
  odiaName: string;
  zone: 'Coastal' | 'Western' | 'Southern' | 'Central & Northern';
  status: 'Active Academy' | 'Satellite Club' | 'Open for Expansion';
  centresCount: number;
  highlight: string;
}

const ALL_30_DISTRICTS: DistrictInfo[] = [
  // Coastal Odisha (8)
  { name: 'Khordha (Bhubaneswar)', odiaName: 'ଖୋର୍ଦ୍ଧା', zone: 'Coastal', status: 'Active Academy', centresCount: 4, highlight: 'State Headquarters, Master Academy & 3 Branch Dojos' },
  { name: 'Cuttack', odiaName: 'କଟକ', zone: 'Coastal', status: 'Active Academy', centresCount: 2, highlight: 'Millennium City Dojo & Barabati Training Centre' },
  { name: 'Puri', odiaName: 'ପୁରୀ', zone: 'Coastal', status: 'Active Academy', centresCount: 1, highlight: 'Grand Road Academy & Beachside Conditioning' },
  { name: 'Balasore', odiaName: 'ବାଲେଶ୍ୱର', zone: 'Coastal', status: 'Active Academy', centresCount: 1, highlight: 'North Coast Youth Training Dojo' },
  { name: 'Bhadrak', odiaName: 'ଭଦ୍ରକ', zone: 'Coastal', status: 'Satellite Club', centresCount: 1, highlight: 'Weekly school batch & junior squad' },
  { name: 'Jajpur', odiaName: 'ଯାଜପୁର', zone: 'Coastal', status: 'Satellite Club', centresCount: 1, highlight: 'Industrial belt self-defence camps' },
  { name: 'Jagatsinghpur', odiaName: 'ଜଗତସିଂହପୁର', zone: 'Coastal', status: 'Satellite Club', centresCount: 1, highlight: 'Coastal youth fitness initiative' },
  { name: 'Kendrapara', odiaName: 'କେନ୍ଦ୍ରାପଡ଼ା', zone: 'Coastal', status: 'Open for Expansion', centresCount: 0, highlight: 'Open for school tie-ups & new instructor affiliation' },

  // Western Odisha (8)
  { name: 'Sambalpur', odiaName: 'ସମ୍ବଲପୁର', zone: 'Western', status: 'Active Academy', centresCount: 1, highlight: 'Western Odisha Zonal Training Hub' },
  { name: 'Sundargarh (Rourkela)', odiaName: 'ସୁନ୍ଦରଗଡ଼', zone: 'Western', status: 'Active Academy', centresCount: 2, highlight: 'Steel City Dojo & Tribal Youth Sports Outreach' },
  { name: 'Bargarh', odiaName: 'ବରଗଡ଼', zone: 'Western', status: 'Open for Expansion', centresCount: 0, highlight: 'High demand for school self-defence camps' },
  { name: 'Jharsuguda', odiaName: 'ଝାରସୁଗୁଡ଼ା', zone: 'Western', status: 'Open for Expansion', centresCount: 0, highlight: 'Open for corporate & school batch affiliations' },
  { name: 'Bolangir', odiaName: 'ବଲାଙ୍ଗୀର', zone: 'Western', status: 'Open for Expansion', centresCount: 0, highlight: 'Priority district for grassroots youth training' },
  { name: 'Subarnapur (Sonepur)', odiaName: 'ସୁବର୍ଣ୍ଣପୁର', zone: 'Western', status: 'Open for Expansion', centresCount: 0, highlight: 'Inviting local martial arts instructors & PT teachers' },
  { name: 'Nuapada', odiaName: 'ନୂଆପଡ଼ା', zone: 'Western', status: 'Open for Expansion', centresCount: 0, highlight: 'Rural youth talent identification initiative' },
  { name: 'Deogarh', odiaName: 'ଦେବଗଡ଼', zone: 'Western', status: 'Open for Expansion', centresCount: 0, highlight: 'School weekend workshops open for scheduling' },

  // Southern Odisha (7)
  { name: 'Ganjam (Berhampur)', odiaName: 'ଗଞ୍ଜାମ', zone: 'Southern', status: 'Active Academy', centresCount: 2, highlight: 'Southern Zone Hub & Silk City Dojos' },
  { name: 'Gajapati (Paralakhemundi)', odiaName: 'ଗଜପତି', zone: 'Southern', status: 'Open for Expansion', centresCount: 0, highlight: 'Border district youth empowerment camps' },
  { name: 'Koraput (Jeypore)', odiaName: 'କୋରାପୁଟ', zone: 'Southern', status: 'Open for Expansion', centresCount: 0, highlight: 'Priority tribal & collegiate training track' },
  { name: 'Rayagada', odiaName: 'ରାୟଗଡ଼ା', zone: 'Southern', status: 'Open for Expansion', centresCount: 0, highlight: 'School tie-up drives open for current academic year' },
  { name: 'Nabarangpur', odiaName: 'ନବରଙ୍ଗପୁର', zone: 'Southern', status: 'Open for Expansion', centresCount: 0, highlight: 'Inviting sports organizers & physical educators' },
  { name: 'Malkangiri', odiaName: 'ମାଲକାନଗିରି', zone: 'Southern', status: 'Open for Expansion', centresCount: 0, highlight: 'Youth sports and women self-defence focus' },
  { name: 'Kandhamal (Phulbani)', odiaName: 'କନ୍ଧମାଳ', zone: 'Southern', status: 'Open for Expansion', centresCount: 0, highlight: 'District sports hostel & school collaboration' },

  // Central & Northern Odisha (7)
  { name: 'Angul', odiaName: 'ଅନୁଗୋଳ', zone: 'Central & Northern', status: 'Active Academy', centresCount: 1, highlight: 'Central Industrial Corridor Training Center' },
  { name: 'Dhenkanal', odiaName: 'ଢେଙ୍କାନାଳ', zone: 'Central & Northern', status: 'Satellite Club', centresCount: 1, highlight: 'Heritage martial arts conditioning workshops' },
  { name: 'Mayurbhanj (Baripada)', odiaName: 'ମୟୂରଭଞ୍ଜ', zone: 'Central & Northern', status: 'Satellite Club', centresCount: 1, highlight: 'Similipal region youth & self-defence squad' },
  { name: 'Keonjhar', odiaName: 'କେନ୍ଦୁଝର', zone: 'Central & Northern', status: 'Open for Expansion', centresCount: 0, highlight: 'Mining belt school and college programmes' },
  { name: 'Kalahandi (Bhawanipatna)', odiaName: 'କଳାହାଣ୍ଡି', zone: 'Central & Northern', status: 'Open for Expansion', centresCount: 0, highlight: 'University & high school self-defence demand' },
  { name: 'Boudh', odiaName: 'ବୌଦ୍ଧ', zone: 'Central & Northern', status: 'Open for Expansion', centresCount: 0, highlight: 'Grassroots training camp registration open' },
  { name: 'Nayagarh', odiaName: 'ନୟାଗଡ଼', zone: 'Central & Northern', status: 'Open for Expansion', centresCount: 0, highlight: 'Historical Paika region youth academy initiative' },
];

interface OdishaExpansionSectionProps {
  onRequestExpansion?: (districtName?: string) => void;
}

export const OdishaExpansionSection: React.FC<OdishaExpansionSectionProps> = ({
  onRequestExpansion,
}) => {
  const { addEnquiry } = useData();
  const [selectedZone, setSelectedZone] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [activeDistrictForForm, setActiveDistrictForForm] = useState<string>('Bargarh');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [formType, setFormType] = useState<
    'School / College Curriculum' | 'Girls Self-Defence Camp' | 'Start a New Dojo' | 'Rural / Panchayat Sports Camp'
  >('School / College Curriculum');

  const [formData, setFormData] = useState({
    institutionName: '',
    coordinatorName: '',
    designation: 'Principal / Headmaster',
    district: 'Bargarh',
    blockOrTown: '',
    phone: '',
    email: '',
    estimatedStudents: '100 - 250 students',
    preferredTiming: 'Morning PE Hours (7:00 AM - 9:00 AM)',
    additionalNotes: '',
    consent: true,
  });

  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [formError, setFormError] = useState<string>('');

  const filteredDistricts = ALL_30_DISTRICTS.filter((d) => {
    const matchesZone = selectedZone === 'All' || d.zone === selectedZone;
    const matchesStatus =
      selectedStatus === 'All' ||
      (selectedStatus === 'Active' && d.status !== 'Open for Expansion') ||
      (selectedStatus === 'Open' && d.status === 'Open for Expansion');
    return matchesZone && matchesStatus;
  });

  const activeCount = ALL_30_DISTRICTS.filter((d) => d.status !== 'Open for Expansion').length;
  const openCount = ALL_30_DISTRICTS.filter((d) => d.status === 'Open for Expansion').length;

  const handleOpenFormWithDistrict = (districtName: string) => {
    // Strip parenthetical text for clean select matching
    const baseName = districtName.split(' ')[0].replace('(', '');
    setActiveDistrictForForm(districtName);
    setFormData((prev) => ({
      ...prev,
      district: baseName,
    }));
    setIsModalOpen(true);
    setSubmittedRef(null);
    setFormError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formData.institutionName.trim()) {
      setFormError('Please enter your school, college, or club name.');
      return;
    }
    if (!formData.coordinatorName.trim()) {
      setFormError('Please enter the contact person name.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setFormError('Please provide a valid 10-digit mobile number for our state expansion officer.');
      return;
    }

    const details = `[STATE EXPANSION APPLICATION]
Type: ${formType}
Institution/Club: ${formData.institutionName}
Coordinator: ${formData.coordinatorName} (${formData.designation})
District: ${formData.district} | Town/Block: ${formData.blockOrTown || 'Main Town'}
Estimated Participants: ${formData.estimatedStudents}
Preferred Timing: ${formData.preferredTiming}
Notes: ${formData.additionalNotes || 'Standard State Curriculum'}`;

    const ref = addEnquiry({
      type: 'affiliation',
      name: formData.coordinatorName,
      contactNumber: formData.phone,
      email: formData.email || undefined,
      district: formData.district,
      details,
    });

    setSubmittedRef(ref);
  };

  return (
    <section id="expansion" className="py-20 bg-[#FAF7F2] border-b border-amber-200/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================================= */}
        {/* SECTION HEADER: Culturally grounded, light Odia aesthetic, simple English */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-semibold tracking-wide mb-3">
            <Compass className="w-4 h-4 text-amber-700" />
            <span>MISSION ALL-ODISHA · ରାଜ୍ୟସ୍ତରୀୟ ପ୍ରସାର ଅଭିଯାନ</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            Expanding Martial Arts & Youth Discipline Across All 30 Districts
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed">
            Qwan Ki Do Association of Odisha is working to bring martial arts, women’s self-defense,
            and good health to every school, college, town, and village across our state. We warmly invite school principals,
            physical education teachers, and sports coaches to partner with us.
          </p>

          {/* Quick Stat Bar */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
            <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-2xs text-center">
              <span className="block text-2xl font-bold text-[#008A68]">30</span>
              <span className="text-xs text-slate-600 font-medium">Districts Covered</span>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-2xs text-center">
              <span className="block text-2xl font-bold text-amber-700">{activeCount}</span>
              <span className="text-xs text-slate-600 font-medium">Active Training Hubs</span>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-2xs text-center">
              <span className="block text-2xl font-bold text-rose-700">{openCount}</span>
              <span className="text-xs text-slate-600 font-medium">Open for New Tie-Ups</span>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-2xs text-center">
              <span className="block text-2xl font-bold text-slate-900">100%</span>
              <span className="text-xs text-slate-600 font-medium">Govt. Recognized Syllabi</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4 EXPANSION TRACKS / PATHWAYS                                             */}
        {/* ========================================================================= */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-xs font-bold text-[#008A68] uppercase tracking-wider">
              HOW TO BRING TRAINING TO YOUR TOWN OR INSTITUTION
            </h3>
            <p className="font-serif text-2xl font-bold text-slate-900 mt-1">
              4 Ways to Partner With the State Association
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Track 1: Schools & Colleges */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 text-[#008A68] flex items-center justify-center mb-4">
                  <School className="w-6 h-6" />
                </div>
                <div className="text-xs font-semibold text-[#008A68] uppercase tracking-wider mb-1">
                  Education Partners
                </div>
                <h4 className="font-serif text-lg font-bold text-slate-900 mb-2">
                  School & College Curriculum
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Bring martial arts into physical education (P.E.) classes or after-school clubs. We provide certified instructors, safe practice, and official belt exams.
                </p>
                <ul className="space-y-1.5 text-xs text-slate-700 mb-6">
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#008A68] shrink-0" />
                    <span>No equipment cost for schools</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#008A68] shrink-0" />
                    <span>Improves student concentration</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#008A68] shrink-0" />
                    <span>Annual State Tournament pathway</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => {
                  setFormType('School / College Curriculum');
                  setIsModalOpen(true);
                  setSubmittedRef(null);
                }}
                className="w-full py-2.5 px-3 bg-stone-50 hover:bg-emerald-50 text-[#008A68] font-semibold text-xs rounded-xl border border-stone-200 hover:border-emerald-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Request School Tie-Up</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Track 2: Women's Safety Camps */}
            <div className="bg-white rounded-2xl p-6 border border-rose-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center justify-center mb-4">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="text-xs font-semibold text-rose-700 uppercase tracking-wider mb-1">
                  Mission Sahasika
                </div>
                <h4 className="font-serif text-lg font-bold text-slate-900 mb-2">
                  Girls & Women Self-Defense Camps
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Practical 3-day or 7-day workshops at girls' schools, colleges, hostels, workplaces, and self-help groups across Odisha to teach real-life safety skills.
                </p>
                <ul className="space-y-1.5 text-xs text-slate-700 mb-6">
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    <span>Practical release & escape moves</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    <span>Confidence & vocal self-defense</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    <span>Official certificate for participants</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => {
                  setFormType('Girls Self-Defence Camp');
                  setIsModalOpen(true);
                  setSubmittedRef(null);
                }}
                className="w-full py-2.5 px-3 bg-stone-50 hover:bg-rose-50 text-rose-800 font-semibold text-xs rounded-xl border border-stone-200 hover:border-rose-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Book 3-Day Workshop</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Track 3: Start a New Dojo / Club Affiliation */}
            <div className="bg-white rounded-2xl p-6 border border-amber-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6" />
                </div>
                <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-1">
                  Instructors & Clubs
                </div>
                <h4 className="font-serif text-lg font-bold text-slate-900 mb-2">
                  Start an Affiliated Dojo
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  For black belts, martial arts coaches, and fitness trainers who want to open an official Qwan Ki Do training club in their town with state backing.
                </p>
                <ul className="space-y-1.5 text-xs text-slate-700 mb-6">
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Fast-track bridge certification</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Master visits for belt gradings</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Exclusive district territorial rights</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => {
                  setFormType('Start a New Dojo');
                  setIsModalOpen(true);
                  setSubmittedRef(null);
                }}
                className="w-full py-2.5 px-3 bg-stone-50 hover:bg-amber-50 text-amber-900 font-semibold text-xs rounded-xl border border-stone-200 hover:border-amber-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Apply as Instructor</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Track 4: Rural & Panchayat Camps */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-stone-100 border border-stone-300 text-slate-700 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Village & Community
                </div>
                <h4 className="font-serif text-lg font-bold text-slate-900 mb-2">
                  Rural & Panchayat Youth Camps
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Weekend sports camps in village grounds and local sports complexes. We provide subsidized training uniforms, gear, and discover talented young athletes.
                </p>
                <ul className="space-y-1.5 text-xs text-slate-700 mb-6">
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                    <span>Open to all rural youth (boys & girls)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                    <span>Physical fitness & mental stamina</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                    <span>Subsidized fees for village clubs</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => {
                  setFormType('Rural / Panchayat Sports Camp');
                  setIsModalOpen(true);
                  setSubmittedRef(null);
                }}
                className="w-full py-2.5 px-3 bg-stone-50 hover:bg-stone-100 text-slate-800 font-semibold text-xs rounded-xl border border-stone-200 hover:border-stone-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Organize Panchayat Camp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE 30 DISTRICT EXPANSION DIRECTORY & STATUS MAP                   */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-stone-200 shadow-sm">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 pb-6 border-b border-stone-200">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#008A68] uppercase tracking-wider mb-2">
                <MapPin className="w-4 h-4" />
                <span>Odisha 30 Districts Expansion Tracker</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                Check Expansion Status in Your District
              </h3>
              <p className="text-sm text-slate-600 mt-1 max-w-xl">
                Click on any district to request a training camp, invite our certified master team to your school, or apply to open a new dojo.
              </p>
            </div>

            {/* Filter buttons: Zones & Status */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs">
                {(['All', 'Coastal', 'Western', 'Southern', 'Central & Northern'] as const).map((zone) => (
                  <button
                    key={zone}
                    onClick={() => setSelectedZone(zone)}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                      selectedZone === zone
                        ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {zone}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs">
                {(['All', 'Active', 'Open'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                      selectedStatus === status
                        ? 'bg-[#008A68] text-white shadow-2xs font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {status === 'All' ? 'All Status' : status === 'Active' ? 'Active Branches' : 'Expansion Target'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* District Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredDistricts.map((district) => {
              const isActive = district.status === 'Active Academy';
              const isSatellite = district.status === 'Satellite Club';
              const isOpen = district.status === 'Open for Expansion';

              return (
                <div
                  key={district.name}
                  className={`p-4 rounded-xl border transition-all hover:shadow-sm flex flex-col justify-between ${
                    isActive
                      ? 'bg-emerald-50/40 border-emerald-200'
                      : isSatellite
                      ? 'bg-amber-50/40 border-amber-200'
                      : 'bg-stone-50/60 border-stone-200 hover:border-amber-300'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <div className="font-serif font-bold text-slate-900 text-base leading-snug">
                          {district.name}
                        </div>
                        <div className="text-xs text-amber-900/70 font-medium font-sans">
                          {district.odiaName}
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                          isActive
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : isSatellite
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : 'bg-slate-200 text-slate-700 border border-slate-300'
                        }`}
                      >
                        {district.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed mb-3">
                      {district.highlight}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">
                      {district.centresCount > 0 ? `${district.centresCount} Active Centre(s)` : 'New Branch Needed'}
                    </span>
                    <button
                      onClick={() => handleOpenFormWithDistrict(district.name)}
                      className={`text-xs font-semibold px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                        isOpen
                          ? 'bg-amber-600 hover:bg-amber-700 text-white'
                          : 'bg-[#008A68] hover:bg-[#007256] text-white'
                      }`}
                    >
                      {isOpen ? 'Apply Here' : 'Join Training'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Note & Support Guarantee */}
          <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-amber-50/80 via-white to-emerald-50/80 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Full Association Support for New District Dojos
                </h4>
                <p className="text-xs text-slate-600">
                  We supply standardized training syllabus books, technical grading examiners, competition flags, and coach mentorship.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setFormType('Start a New Dojo');
                setIsModalOpen(true);
                setSubmittedRef(null);
              }}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs whitespace-nowrap shadow-xs transition-colors cursor-pointer"
            >
              Open a Dojo in Your Town
            </button>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* EXPANSION APPLICATION MODAL                                               */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-stone-200 shadow-2xl relative my-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center cursor-pointer"
                aria-label="Close dialog"
              >
                ✕
              </button>

              {submittedRef ? (
                /* Success View */
                <div className="text-center py-6">
                  <div className="w-14 h-14 bg-emerald-100 text-[#008A68] rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-300">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">
                    Expansion Application Received!
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto mb-4">
                    Thank you. Our State Technical Director and District Expansion Coordinator will review your proposal and get in touch within 24 hours.
                  </p>
                  <div className="inline-block bg-stone-50 border border-stone-200 rounded-xl px-5 py-3 mb-6">
                    <span className="text-xs text-slate-500 block">Official Application Reference ID</span>
                    <span className="font-mono text-base font-bold text-[#008A68]">{submittedRef}</span>
                  </div>

                  <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl text-left text-xs text-slate-700 mb-6">
                    <div className="font-bold text-amber-900 mb-1">State Secretariat Expansion Helpline:</div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <span className="flex items-center gap-1.5 font-medium">
                        <PhoneCall className="w-3.5 h-3.5 text-amber-800" />
                        +91 94370 12345 / 98610 54321
                      </span>
                      <span className="flex items-center gap-1.5 font-medium">
                        <Mail className="w-3.5 h-3.5 text-amber-800" />
                        expansion@qwankido-odisha.org
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2.5 bg-[#008A68] text-white text-xs font-semibold rounded-xl hover:bg-[#007256] transition-colors cursor-pointer"
                  >
                    Done / Return to Website
                  </button>
                </div>
              ) : (
                /* Form View */
                <div>
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#008A68] uppercase tracking-wider mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>All-Odisha Expansion Registration</span>
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-slate-900">
                      Bring Qwan Ki Do to Your School, College or Town
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Fill out this quick form. The State Technical Committee will evaluate and assist with certified coaches, equipment advice, and syllabus guidelines.
                    </p>
                  </div>

                  {formError && (
                    <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 font-medium">
                      {formError}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Select Expansion Model */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        Expansion Category *
                      </label>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {(
                          [
                            'School / College Curriculum',
                            'Girls Self-Defence Camp',
                            'Start a New Dojo',
                            'Rural / Panchayat Sports Camp',
                          ] as const
                        ).map((cat) => (
                          <button
                            type="button"
                            key={cat}
                            onClick={() => setFormType(cat)}
                            className={`p-2.5 rounded-xl border text-left font-medium transition-all cursor-pointer ${
                              formType === cat
                                ? 'bg-[#008A68] text-white border-[#008A68] shadow-xs'
                                : 'bg-stone-50 border-stone-200 text-slate-700 hover:bg-stone-100'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Institution Name & Coordinator Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">
                          School / College / Club Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.institutionName}
                          onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                          placeholder="e.g. Saraswati Vidya Mandir / Town Youth Club"
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#008A68] focus:border-[#008A68] bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">
                          Coordinator / Contact Person *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.coordinatorName}
                          onChange={(e) => setFormData({ ...formData, coordinatorName: e.target.value })}
                          placeholder="Your Name"
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#008A68] focus:border-[#008A68] bg-white"
                        />
                      </div>
                    </div>

                    {/* Designation & District */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">
                          Your Role / Designation
                        </label>
                        <select
                          value={formData.designation}
                          onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#008A68] focus:border-[#008A68] bg-white"
                        >
                          <option>Principal / Headmaster</option>
                          <option>Physical Education Teacher (PET)</option>
                          <option>Martial Arts Instructor / Coach</option>
                          <option>College Sports Secretary</option>
                          <option>Youth Club Organizer</option>
                          <option>Parent / Student Representative</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">
                          District in Odisha *
                        </label>
                        <select
                          value={formData.district}
                          onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#008A68] focus:border-[#008A68] bg-white font-medium"
                        >
                          {ALL_30_DISTRICTS.map((d) => {
                            const cleanName = d.name.split(' ')[0].replace('(', '');
                            return (
                              <option key={d.name} value={cleanName}>
                                {d.name} ({d.odiaName})
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>

                    {/* Town/Block & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">
                          Town / Block / Location
                        </label>
                        <input
                          type="text"
                          value={formData.blockOrTown}
                          onChange={(e) => setFormData({ ...formData, blockOrTown: e.target.value })}
                          placeholder="e.g. Bargarh Town / Padmapur Block"
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#008A68] focus:border-[#008A68] bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">
                          Mobile Number (for WhatsApp & Call) *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="10-digit mobile number"
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#008A68] focus:border-[#008A68] bg-white"
                        />
                      </div>
                    </div>

                    {/* Participant Estimate & Preferred Timings */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">
                          Estimated Participants
                        </label>
                        <select
                          value={formData.estimatedStudents}
                          onChange={(e) => setFormData({ ...formData, estimatedStudents: e.target.value })}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#008A68] focus:border-[#008A68] bg-white"
                        >
                          <option>25 - 50 participants</option>
                          <option>50 - 100 participants</option>
                          <option>100 - 250 participants</option>
                          <option>250+ full institution</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">
                          Preferred Schedule
                        </label>
                        <input
                          type="text"
                          value={formData.preferredTiming}
                          onChange={(e) => setFormData({ ...formData, preferredTiming: e.target.value })}
                          placeholder="e.g. Weekend morning / 3-day special camp"
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#008A68] focus:border-[#008A68] bg-white"
                        />
                      </div>
                    </div>

                    {/* Notes / Special requirements */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Any Specific Requirements or Hall / Playground Details
                      </label>
                      <textarea
                        rows={2}
                        value={formData.additionalNotes}
                        onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                        placeholder="Tell us about your space (school ground, indoor hall), preferred start month, or any questions..."
                        className="w-full text-xs px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#008A68] focus:border-[#008A68] bg-white"
                      />
                    </div>

                    {/* Consent checkbox */}
                    <div className="flex items-start gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="consent-check"
                        checked={formData.consent}
                        onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                        className="mt-0.5 rounded text-[#008A68] focus:ring-[#008A68]"
                      />
                      <label htmlFor="consent-check" className="text-[11px] text-slate-600 leading-snug">
                        I confirm that this enquiry is for introducing official Qwan Ki Do training or workshops in our district/institution under the state association guidelines.
                      </label>
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center justify-end gap-3 pt-3">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2.5 text-xs text-slate-600 hover:text-slate-800 font-medium rounded-xl border border-stone-200 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 text-xs font-bold text-white bg-[#008A68] hover:bg-[#007256] rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Expansion Proposal</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
