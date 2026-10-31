import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { TrainingCentre } from '../types';
import { Search, MapPin, Phone, UserCheck, Calendar, ShieldCheck, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CentresDirectoryProps {
  onSelectCentreForEnquiry: (centreName: string) => void;
  onRequestDistrictExpansion: () => void;
}

export const CentresDirectory: React.FC<CentresDirectoryProps> = ({
  onSelectCentreForEnquiry,
  onRequestDistrictExpansion,
}) => {
  const { trainingCentres } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('all');

  const districts = ['all', ...Array.from(new Set(trainingCentres.map((c) => c.district)))];

  const filteredCentres = trainingCentres.filter((centre) => {

    const matchesSearch =
      centre.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      centre.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      centre.locality.toLowerCase().includes(searchTerm.toLowerCase()) ||
      centre.chiefInstructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      centre.district.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDistrict = selectedDistrict === 'all' || centre.district === selectedDistrict;

    const matchesAge =
      selectedAgeGroup === 'all' ||
      centre.ageGroups.some((ag) => ag.toLowerCase().includes(selectedAgeGroup.toLowerCase()));

    return matchesSearch && matchesDistrict && matchesAge;
  });

  return (
    <section id="centres" className="py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-12"
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-[#008A68] uppercase tracking-wider mb-2">
            <span>Approved Training Clubs</span>
            <span aria-hidden="true">·</span>
            <span>Odisha State Directory</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            Official Qwan Ki Do Training Centres
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Find official Qwan Ki Do clubs in your city or district. Every listed club is approved by our State
            Association, with licensed instructors, safety mats, and recognized belt examinations.
          </p>
        </motion.div>

        {/* Search & Filter Bar */}
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 sm:p-6 mb-10 space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by city (Bhubaneswar, Cuttack, Puri...), locality, or instructor name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-stone-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#008A68] focus:ring-1 focus:ring-[#008A68]"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Row: District & Age Group */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2 border-t border-stone-200/80">
            {/* District Pill Bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
              <span className="text-slate-400 font-medium whitespace-nowrap mr-1">District:</span>
              {districts.map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDistrict(d)}
                  className={`px-3 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    selectedDistrict === d
                      ? 'bg-[#008A68] text-white font-medium'
                      : 'bg-white text-slate-600 border border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  {d === 'all' ? 'All Districts' : d}
                </button>
              ))}
            </div>

            {/* Age Group Selector */}
            <div className="flex items-center gap-2 text-xs shrink-0">
              <span className="text-slate-400 font-medium whitespace-nowrap">Age Focus:</span>
              <select
                value={selectedAgeGroup}
                onChange={(e) => setSelectedAgeGroup(e.target.value)}
                className="bg-white border border-stone-300 rounded-md px-2.5 py-1 text-slate-700 focus:outline-none focus:border-[#008A68]"
              >
                <option value="all">All Ages (Children, Youth, Adults)</option>
                <option value="children">Children (5-12)</option>
                <option value="youth">Youth (13-17)</option>
                <option value="adults">Adults (18+)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Directory Cards Grid */}
        {filteredCentres.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredCentres.map((centre) => (
                <motion.div
                  key={centre.id}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.25 }}
                  whileHover={{ y: -3 }}
                  className="bg-white border border-stone-200 rounded-xl p-6 hover:border-stone-300 transition-shadow hover:shadow-md flex flex-col justify-between shadow-xs"
                >
                  <div>
                    {/* Top Bar of Card */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                          <span className="font-semibold text-[#008A68]">{centre.city}</span>
                          <span aria-hidden="true">·</span>
                          <span>{centre.district} District</span>
                        </div>
                        <h3 className="font-serif text-xl font-bold text-slate-900 leading-snug">
                          {centre.name}
                        </h3>
                      </div>

                      {/* Official Affiliation Badge */}
                      <div className="flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded text-[11px] font-medium shrink-0">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#008A68]" />
                        <span>Verified Dojo</span>
                      </div>
                    </div>

                    {/* Address */}
                    <p className="text-xs text-slate-600 mb-4 flex items-start gap-1.5 leading-relaxed">
                      <MapPin className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                      <span>{centre.address}</span>
                    </p>

                    {/* Instructor Credentials */}
                    <div className="p-3 bg-stone-50 rounded-lg border border-stone-200/80 mb-4 flex items-start gap-2.5">
                      <UserCheck className="w-4 h-4 text-[#008A68] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold text-slate-900">
                          {centre.chiefInstructor}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {centre.instructorRank}
                        </p>
                      </div>
                    </div>

                    {/* Schedule Snippet */}
                    <div className="space-y-1.5 mb-4">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        Weekly Training Schedule
                      </p>
                      <div className="divide-y divide-stone-100 text-xs text-slate-600">
                        {centre.schedule.map((item, idx) => (
                          <div key={idx} className="py-1.5 flex items-center justify-between">
                            <span className="font-medium text-slate-700">{item.days}:</span>
                            <span className="font-mono text-[11px] text-slate-500">{item.timings}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Age groups unboxed list */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-4 text-[11px] text-slate-600">
                      <span className="font-semibold text-slate-400">Batches:</span>
                      {centre.ageGroups.map((ag, i) => (
                        <span key={i} className="bg-stone-100 text-slate-700 px-2 py-0.5 rounded">
                          {ag}
                        </span>
                      ))}
                    </div>

                    {/* Facility Note */}
                    <p className="text-[11px] text-slate-500 italic mb-4">
                      {centre.facilityNotes}
                    </p>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <a
                      href={`tel:${centre.contactPhone}`}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 border border-stone-200 rounded-md hover:bg-stone-50 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#008A68]" />
                      <span>{centre.contactPhone}</span>
                    </a>

                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => onSelectCentreForEnquiry(centre.name)}
                      className="inline-flex items-center justify-center gap-1 px-4 py-2 text-xs font-semibold text-white bg-[#008A68] hover:bg-[#007256] rounded-md transition-colors whitespace-nowrap cursor-pointer shadow-xs"
                    >
                      <span>Book Free Trial Class</span>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Honest Empty State for districts not yet covered */
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-stone-50 border border-stone-200 rounded-xl p-8 text-center max-w-2xl mx-auto"
          >
            <MapPin className="w-8 h-8 text-stone-400 mx-auto mb-3" />
            <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">
              No Affiliated Training Centre Found for this Query
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
              We uphold strict certification standards and do not publish unverified or temporary training locations.
              If your district or town does not have an active centre listed, please let us know. We organize mobile weekend
              workshops and are expanding our instructor network across all 30 districts of Odisha.
            </p>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={onRequestDistrictExpansion}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#008A68] hover:bg-[#007256] rounded-md transition-colors cursor-pointer"
            >
              Request a Training Centre in Your District
            </motion.button>
          </motion.div>
        )}

        {/* Association Verification Guarantee */}
        <div className="mt-12 p-4 bg-stone-100/70 border border-stone-200 rounded-lg text-xs text-slate-600 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#008A68] shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-slate-800">Official Club Verification Notice:</p>
            <p className="mt-0.5">
              Only clubs with an official certificate from Qwan Ki Do Association Odisha can use our logo, hold valid belt exams, and enter students into state and national tournaments. You can always ask to see the instructor's teaching card.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
