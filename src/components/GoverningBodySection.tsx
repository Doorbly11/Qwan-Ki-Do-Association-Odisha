import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import {
  Shield,
  ShieldCheck,
  Award,
  Users,
  MapPin,
  Phone,
  Mail,
  Calendar,
  CheckCircle2,
  FileCheck,
  Scale,
  HeartPulse,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoverningMember } from '../types';

interface GoverningBodySectionProps {
  onContactSecretariat?: () => void;
}

export const GoverningBodySection: React.FC<GoverningBodySectionProps> = ({
  onContactSecretariat,
}) => {
  const { governingMembers, associationInfo } = useData();
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'executive' | 'technical' | 'district' | 'advisory'
  >('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMembers = governingMembers.filter((member) => {
    const matchesCategory =
      selectedCategory === 'all' || member.designationCategory === selectedCategory;
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (member.district && member.district.toLowerCase().includes(searchQuery.toLowerCase())) ||
      member.rankOrTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="governing" className="py-20 bg-stone-50 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold uppercase tracking-wider text-[#008A68] mb-4 shadow-2xs">
            <Shield className="w-3.5 h-3.5" />
            <span>State Association Leadership</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Governing Body & Leadership
          </h2>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Meet the dedicated team that runs Qwan Ki Do in Odisha. Our committee members, technical coaches,
            and district heads work together to keep training safe, conduct official belt tests, and support students across the state.
          </p>

          {/* Statutory Credential Badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-700">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-stone-200 shadow-2xs font-medium">
              <FileCheck className="w-3.5 h-3.5 text-[#008A68]" />
              <span>Regd. Societies Act XXI of 1860</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-stone-200 shadow-2xs font-medium">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>Affiliated to Qwan Ki Do Federation of India</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-stone-200 shadow-2xs font-medium">
              <Scale className="w-3.5 h-3.5 text-blue-600" />
              <span>Recognised by World Union of Qwan Ki Do</span>
            </span>
          </div>
        </div>

        {/* Filter Navigation Tabs & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-4 border-b border-stone-200">
          <div className="flex items-center flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Leadership' },
              { id: 'executive', label: 'Executive Council' },
              { id: 'technical', label: 'Technical & Refereeing' },
              { id: 'district', label: 'District Coordinators' },
              { id: 'advisory', label: 'Advisory & Medical' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id as typeof selectedCategory)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-[#008A68] text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search officer, role, or district..."
              className="w-full px-3.5 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008A68] focus:border-transparent placeholder-stone-400"
            />
          </div>
        </div>

        {/* Officers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <AnimatePresence mode="popLayout">
            {filteredMembers.map((member) => (
              <motion.div
                key={member.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-xl border border-stone-200 shadow-xs hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Member Photo Banner */}
                  <div className="relative aspect-[4/3] w-full bg-stone-100 overflow-hidden border-b border-stone-200">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={`Portrait of ${member.name}, ${member.role}`}
                        className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-stone-200 text-stone-400">
                        <Users className="w-12 h-12" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span
                        className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-xs ${
                          member.designationCategory === 'executive'
                            ? 'bg-emerald-600 text-white'
                            : member.designationCategory === 'technical'
                            ? 'bg-amber-600 text-white'
                            : member.designationCategory === 'district'
                            ? 'bg-blue-600 text-white'
                            : 'bg-purple-600 text-white'
                        }`}
                      >
                        {member.designationCategory}
                      </span>
                    </div>

                    {member.tenure && (
                      <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                        <Calendar className="w-3 h-3 text-amber-400" />
                        <span>{member.tenure}</span>
                      </div>
                    )}
                  </div>

                  <div className="p-5 sm:p-6">
                    {/* Name and Designation */}
                    <h3 className="font-serif text-lg font-bold text-slate-900 leading-snug">
                      {member.name}
                    </h3>

                    <p className="text-xs font-semibold text-[#008A68] mt-1 mb-2">
                      {member.role}
                    </p>

                  <div className="inline-block bg-stone-100 border border-stone-200 text-slate-700 text-[11px] font-medium px-2.5 py-1 rounded-md mb-3">
                    {member.rankOrTitle}
                  </div>

                  {/* District / Territory */}
                  {member.district && (
                    <div className="flex items-center gap-1.5 text-xs text-stone-600 mb-3">
                      <MapPin className="w-3.5 h-3.5 text-[#008A68] shrink-0" />
                      <span className="font-medium">{member.district}</span>
                    </div>
                  )}

                  {/* Bio */}
                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    {member.bio}
                  </p>
                </div>
              </div>

                {/* Card Contact Footer */}
                <div className="px-5 sm:px-6 py-3 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  {member.phone && (
                    <a
                      href={`tel:${member.phone}`}
                      className="inline-flex items-center gap-1.5 hover:text-[#008A68] transition-colors"
                      title="Direct Line"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#008A68]" />
                      <span>{member.phone}</span>
                    </a>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="inline-flex items-center gap-1 hover:text-[#008A68] transition-colors"
                      title="Email Office"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#008A68]" />
                      <span>Email</span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* 4 Pillars of Constitutional Governance */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 lg:p-10 shadow-xs mb-14">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-widest block mb-1">
              Odisha State Constitution
            </span>
            <h3 className="font-serif text-2xl font-bold text-slate-900">
              Constitutional Mandates & Operating Principles
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-[#008A68] flex items-center justify-center mb-3">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-sm font-bold text-slate-900 mb-1.5">
                Democratic Representation
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Quinquennial executive elections open to registered district delegates ensuring equal voice
                across coastal, southern, western, and northern Odisha.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-[#008A68] flex items-center justify-center mb-3">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-sm font-bold text-slate-900 mb-1.5">
                Technical Syllabus Rigour
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Exclusive authority to certify Dan ranks and instructor licenses under curriculum guidelines
                set by the World Union of Qwan Ki Do.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-[#008A68] flex items-center justify-center mb-3">
                <HeartPulse className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-sm font-bold text-slate-900 mb-1.5">
                Athlete Welfare & Safety
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Mandatory ringside medical surveillance, strict concussion return-to-play protocols, and
                stringent background verification for all dojo coaches.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-[#008A68] flex items-center justify-center mb-3">
                <Scale className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-sm font-bold text-slate-900 mb-1.5">
                Financial Transparency
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                All tournament admissions and affiliation fees are recorded, subjected to annual chartered
                accounting audits, and submitted to the Registrar of Societies.
              </p>
            </div>
          </div>
        </div>

        {/* Secretariat Callout Box */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-slate-800 border border-amber-500/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-8 h-8 text-amber-400" />
            </div>
            <div>
              <h4 className="font-serif text-lg sm:text-xl font-bold tracking-wide">
                Official State Secretariat — Odisha
              </h4>
              <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-xl">
                For official correspondence, district dojo affiliation petitions, referee clinics, and
                government sports council verifications.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-stone-400 mt-2">
                <span>HQ: {associationInfo.headquarters}</span>
                <span>·</span>
                <span>Phone: {associationInfo.contactPhone}</span>
                <span>·</span>
                <span>Email: {associationInfo.contactEmail}</span>
              </div>
            </div>
          </div>

          {onContactSecretariat && (
            <button
              onClick={onContactSecretariat}
              className="px-6 py-3 rounded-lg bg-[#008A68] hover:bg-[#007256] text-white text-xs sm:text-sm font-semibold transition-all shadow-md shrink-0 cursor-pointer flex items-center gap-2"
            >
              <span>Contact Secretariat</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
