import React from 'react';
import { useData } from '../context/DataContext';
import { Shield, Phone, Mail, MapPin, ExternalLink, ArrowUp, Lock } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenAdminGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdminGuide }) => {
  const { associationInfo } = useData();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-stone-300 border-t border-stone-800">
      {/* Top Footer Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Identity & Crest */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-950 flex items-center justify-center border border-emerald-700/50 shrink-0">
                <Shield className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <span className="font-serif text-lg font-bold text-white tracking-tight block">
                  {associationInfo.name || 'Qwan Ki Do Association Odisha'}
                </span>
                <span className="text-[11px] text-emerald-400">
                  Quán Khí Đạo · Sino-Vietnamese Martial Arts
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-md">
              The authorized state governing body for the practice, development, and official certification of
              traditional Qwan Ki Do martial arts across Odisha. Affiliated with the Qwan Ki Do Federation of India
              and the World Union of Qwan Ki Do.
            </p>

            <div className="pt-2 text-xs text-stone-400 space-y-1.5">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#008A68] shrink-0" />
                <span>State HQ: {associationInfo.headquarters}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#008A68] shrink-0" />
                <a href={`tel:${associationInfo.contactPhone}`} className="hover:text-white transition-colors">
                  {associationInfo.contactPhone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#008A68] shrink-0" />
                <a href={`mailto:${associationInfo.contactEmail}`} className="hover:text-white transition-colors">
                  {associationInfo.contactEmail}
                </a>
              </p>
            </div>
          </div>


          {/* Col 2: Navigation Mirror */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-stone-200">
              Navigation
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  About Qwan Ki Do
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('governing')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-emerald-400 font-medium"
                >
                  Governing Body & Leadership
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('programmes')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Training Programmes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('journey')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  6-Stage Training Journey
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('belts')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Belt & Rank Explorer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('rules')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Rules & Dojo Etiquette
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('benefits')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Benefits of Training
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Odisha Dojos */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-stone-200">
              Odisha Centres
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('centres')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Bhubaneswar State HQ Dojo
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('centres')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Cuttack Barabati Centre
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('centres')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Puri Coastal Academy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('centres')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Rourkela Steel City Club
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('centres')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Berhampur Martial Arts Centre
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('centres')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Sambalpur & Balasore Dojos
                </button>
              </li>
              <li className="pt-1.5 border-t border-stone-800">
                <button
                  onClick={() => onNavigate('expansion')}
                  className="text-amber-400 hover:text-amber-300 font-semibold transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>Mission All-Odisha (30 Districts) &rarr;</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Governance & Legal */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-stone-200">
              Governance & Policies
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('instructors')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Instructor Accreditation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('events')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Championship Calendar
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('news')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  News & Achievements
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-amber-300 font-medium"
                >
                  Photo & Event Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('enquiry')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  School Affiliation Request
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('rules')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Dojo Safety & Ethics Code
                </button>
              </li>
              <li>
                <a
                  href="https://qwankidoodisha.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <span>Official Domain</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-stone-800/80 bg-slate-950/80 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div className="flex items-center gap-2 flex-wrap">
            <span>
              © {new Date().getFullYear()} Qwan Ki Do Association Odisha. All rights reserved. Registered under the Societies Registration Act XXI of 1860.
            </span>
            <button
              onClick={onOpenAdminGuide}
              title="Official Administration Gate"
              aria-label="Official Administration Gate"
              className="text-stone-700 hover:text-stone-400 transition-colors p-0.5 rounded cursor-pointer shrink-0"
            >
              <Lock className="w-2.5 h-2.5" />
            </button>
          </div>

          <div className="flex items-center gap-6">
            <span>Sino-Vietnamese Traditional Martial Art</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-stone-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
