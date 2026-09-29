import React, { useState, useEffect } from 'react';
import { ArrowRight, Clock, Menu, X, Shield, Activity, Cpu, Layers } from 'lucide-react';
import { HeroShader } from './HeroShader';
import { SketchfabViewer } from './SketchfabViewer';
import { EngineSketchfabViewer } from './EngineSketchfabViewer';
import { ActiveScreen } from '../../types';

interface AxionLandingPageProps {
  onNavigateToScreen: (screen: ActiveScreen) => void;
}

export function AxionLandingPage({ onNavigateToScreen }: AxionLandingPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeString, setTimeString] = useState('');

  // Live London time (HH:MM format) updating every second
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = now.toLocaleTimeString('en-GB', {
          timeZone: 'Europe/London',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });
        setTimeString(formatted);
      } catch (e) {
        const now = new Date();
        const hours = String(now.getUTCHours()).padStart(2, '0');
        const minutes = String(now.getUTCMinutes()).padStart(2, '0');
        setTimeString(`${hours}:${minutes}`);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#EFEFEF] text-gray-900 font-sans selection:bg-[#F26522] selection:text-white">
      {/* ========================================================================= */}
      {/* SECTION 1: HERO (Full viewport height)                                    */}
      {/* ========================================================================= */}
      <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#EFEFEF]">
        {/* Full-screen animated shader overlay using shaders/react */}
        <HeroShader />

        {/* ----------------------------------------------------------------------- */}
        {/* Navigation (z-20, relative)                                             */}
        {/* ----------------------------------------------------------------------- */}
        <header className="relative z-20 w-full max-w-[1440px] mx-auto p-2 sm:p-3">
          <nav className="bg-white rounded-full p-[5px] flex items-center justify-between shadow-sm">
            {/* LEFT: Logo + Nav Links */}
            <div className="flex items-center gap-6">
              {/* Dark circle logo with "AX" */}
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-900 rounded-full flex items-center justify-center shrink-0 cursor-pointer hover:bg-black transition-colors"
                title="Axion Studio / AERIS TWIN"
              >
                <span className="text-[10px] sm:text-[11px] font-bold tracking-tight text-white select-none">
                  AX
                </span>
              </button>

              {/* Desktop Nav Links */}
              <div className="hidden md:flex items-center gap-6">
                <a
                  href="#projects"
                  className="text-[14px] text-gray-900 hover:text-gray-500 transition-colors duration-300"
                >
                  Projects
                </a>
                <a
                  href="#studio"
                  className="text-[14px] text-gray-900 hover:text-gray-500 transition-colors duration-300"
                >
                  Studio
                </a>
                <a
                  href="#3d-uav"
                  className="text-[14px] text-gray-900 hover:text-gray-500 transition-colors duration-300"
                >
                  3D Airframe
                </a>
                <button
                  onClick={() => onNavigateToScreen('telemetry-cockpit')}
                  className="text-[14px] text-gray-900 hover:text-gray-500 transition-colors duration-300 flex items-center gap-1.5"
                >
                  <Activity size={14} className="text-[#F26522]" />
                  Twin Cockpit
                </button>
                <a
                  href="#connect"
                  className="text-[14px] text-gray-900 hover:text-gray-500 transition-colors duration-300"
                >
                  Connect
                </a>
              </div>
            </div>

            {/* RIGHT: Status + Live Clock + Strategy CTA */}
            <div className="hidden md:flex items-center gap-5 sm:gap-6">
              {/* Project Availability text (hidden below lg) */}
              <span className="text-[13px] text-gray-600 hidden lg:inline-block">
                Taking on projects for Q1 2026
              </span>

              {/* Live London Time */}
              <div className="flex items-center gap-1.5 text-[13px] text-gray-600 select-none">
                <Clock size={14} className="text-gray-500" />
                <span>{timeString ? `${timeString} in London` : 'Loading...'}</span>
              </div>

              {/* "Book a strategy call" CTA button with HOVER TEXT ROLL animation */}
              <button
                onClick={() => onNavigateToScreen('telemetry-cockpit')}
                className="bg-gray-900 text-white text-[13px] font-medium rounded-full pl-5 pr-2 py-2 flex items-center gap-3 group transition-colors duration-300 hover:bg-black cursor-pointer shadow-sm"
              >
                {/* Pixel-perfect Text Roll Container */}
                <div className="relative overflow-hidden h-[18px] leading-[18px]">
                  <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2">
                    <span className="h-[18px] leading-[18px] block whitespace-nowrap">
                      Book a strategy call
                    </span>
                    <span className="h-[18px] leading-[18px] block whitespace-nowrap">
                      Book a strategy call
                    </span>
                  </div>
                </div>

                {/* White circle with rotating arrow */}
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-gray-900 transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45 shrink-0">
                  <ArrowRight size={14} />
                </div>
              </button>
            </div>

            {/* MOBILE MENU TOGGLE */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="bg-gray-900 text-white rounded-full p-2.5 flex items-center justify-center cursor-pointer hover:bg-black transition-colors"
                aria-label="Open mobile menu"
              >
                <Menu size={18} />
              </button>
            </div>
          </nav>
        </header>

        {/* ----------------------------------------------------------------------- */}
        {/* Mobile Menu Overlay                                                     */}
        {/* ----------------------------------------------------------------------- */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex flex-col justify-end">
            {/* Black/60 backdrop */}
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Sliding White Bottom Sheet */}
            <div className="relative bg-white rounded-2xl mx-3 mb-3 p-6 sm:p-8 z-10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-2xl">
              <div className="flex items-center justify-between pb-5 border-b border-gray-100">
                {/* Time badge */}
                <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                  <Clock size={13} />
                  <span>{timeString ? `${timeString} in London` : 'Live London Time'}</span>
                </div>
                {/* Close Button */}
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-gray-900 text-white rounded-full p-2 hover:bg-black transition-colors"
                  aria-label="Close mobile menu"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Large Nav Links */}
              <div className="py-6 flex flex-col gap-4 text-[28px] sm:text-[32px] font-medium text-gray-900">
                <a
                  href="#projects"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-gray-500 transition-colors"
                >
                  Projects
                </a>
                <a
                  href="#studio"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-gray-500 transition-colors"
                >
                  Studio
                </a>
                <a
                  href="#3d-uav"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-gray-500 transition-colors"
                >
                  3D Airframe
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigateToScreen('telemetry-cockpit');
                  }}
                  className="text-left hover:text-gray-500 transition-colors flex items-center gap-3"
                >
                  Twin Cockpit
                  <span className="text-xs bg-[#F26522] text-white px-2 py-0.5 rounded font-mono font-normal">
                    5 Hz Live
                  </span>
                </button>
                <a
                  href="#connect"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-gray-500 transition-colors"
                >
                  Connect
                </a>
              </div>

              {/* "Start a project" CTA Button */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateToScreen('telemetry-cockpit');
                }}
                className="w-full bg-[#F26522] text-white text-[15px] font-medium rounded-full py-3.5 px-6 flex items-center justify-between group shadow-lg"
              >
                <span>Start a project / Launch Twin</span>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#F26522]">
                  <ArrowRight size={16} />
                </div>
              </button>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* Hero Content (z-20)                                                     */}
        {/* ----------------------------------------------------------------------- */}
        <div className="relative z-20 flex-1 flex flex-col justify-end w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pb-14 sm:pb-16 lg:pb-20">
          {/* Defense Badge + Studio Label */}
          <div className="flex flex-wrap items-center gap-2.5 mb-5 sm:mb-8">
            <span className="text-[13px] sm:text-[14px] font-medium tracking-wide text-gray-900">
              Axion Studio
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-[12px] font-mono bg-white/90 backdrop-blur-sm border border-gray-300 text-gray-800 px-2.5 py-0.5 rounded-full shadow-xs">
              AERIS-TWIN 3.0 • SIH 2026 Problem ID: SIH26054
            </span>
          </div>

          {/* Headline h1: matching exact clamp sizing and line breaks */}
          <h1 className="text-[clamp(1.75rem,7vw,4.2rem)] sm:text-[clamp(2.5rem,5vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 max-w-5xl">
            We craft digital experiences
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            for brands ready to dominate
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            their category online.
          </h1>

          {/* Subtext introducing the defense engineering project */}
          <p className="mt-4 sm:mt-6 text-[15px] sm:text-[17px] text-gray-700 max-w-3xl leading-relaxed">
            Physics-Informed Digital Twin intelligence for MALE UAV aero-piston engines (Rotax 914/915 iS). 
            Replacing fixed FADEC alarm latency with 5–15 min forward prognostic horizons, personalized engine DNA, 
            and automated counterfactual mission recovery trims.
          </p>

          {/* CTA Row (mt-8 sm:mt-12) */}
          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
            {/* Orange Button with Pixel-Perfect Text-Roll Animation */}
            <button
              onClick={() => onNavigateToScreen('telemetry-cockpit')}
              className="bg-[#F26522] hover:bg-[#e05a1a] text-white text-[13px] sm:text-[14px] font-medium rounded-full pl-5 sm:pl-6 pr-2 py-2 flex items-center gap-3 group transition-colors duration-300 shadow-md cursor-pointer"
            >
              <div className="relative overflow-hidden h-[18px] leading-[18px]">
                <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2">
                  <span className="h-[18px] leading-[18px] block whitespace-nowrap">
                    Start a project
                  </span>
                  <span className="h-[18px] leading-[18px] block whitespace-nowrap">
                    Start a project
                  </span>
                </div>
              </div>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center text-[#F26522] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45 shrink-0">
                <ArrowRight size={16} />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: ABOUT (White background)                                       */}
      {/* ========================================================================= */}
      <section id="studio" className="bg-white pt-16 sm:pt-20 lg:pt-32 pb-12 sm:pb-16 lg:pb-24 overflow-hidden">
        <div className="max-w-[1440px] mx-auto">
          {/* Badge Row */}
          <div className="px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-900 text-white text-[11px] sm:text-[12px] font-semibold flex items-center justify-center shrink-0">
              1
            </div>
            <div className="text-[12px] sm:text-[13px] font-medium border border-gray-200 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-gray-800">
              Introducing AERIS TWIN
            </div>
          </div>

          {/* Heading h2 */}
          <h2 className="text-[clamp(1.5rem,4vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 mb-12 sm:mb-16 lg:mb-28 px-5 sm:px-8 lg:px-12 max-w-5xl">
            Strategy-led creatives, delivering
            <br />
            results in digital and beyond.
          </h2>

          {/* Content Area - Responsive Stack */}
          {/* MOBILE/TABLET (lg:hidden) */}
          <div className="lg:hidden px-5 sm:px-8 flex flex-col gap-6">
            <p className="text-[15px] sm:text-[17px] leading-[1.6] font-medium text-gray-900">
              Through research, creative thinking and iteration we help growing brands realize their digital full potential.
            </p>

            <button
              onClick={() => onNavigateToScreen('predictive-prognostics')}
              className="w-fit bg-[#F26522] hover:bg-[#e05a1a] text-white text-[13px] sm:text-[14px] font-medium rounded-full pl-5 pr-2 py-2 flex items-center gap-3 group transition-colors duration-300 shadow-sm"
            >
              <div className="relative overflow-hidden h-[18px] leading-[18px]">
                <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2">
                  <span className="h-[18px] leading-[18px] block whitespace-nowrap">
                    About our studio
                  </span>
                  <span className="h-[18px] leading-[18px] block whitespace-nowrap">
                    About our studio
                  </span>
                </div>
              </div>
              <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#F26522] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45 shrink-0">
                <ArrowRight size={15} />
              </div>
            </button>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mt-4">
              <div className="w-full sm:w-[45%]">
                <EngineSketchfabViewer />
              </div>
              <img
                src="/assets/defense_hangar_drone.jpg"
                alt="Defense Propulsion Engineers with MALE UAV in Hangar"
                className="w-full sm:w-[55%] aspect-[900/600] rounded-xl sm:rounded-2xl object-cover shadow-sm"
              />
            </div>
          </div>

          {/* DESKTOP (hidden lg:grid) */}
          <div className="hidden lg:grid grid-cols-[28%_1fr_46%] items-end gap-6 xl:gap-8 px-5 sm:px-8 lg:px-12">
            {/* Left Column: 3D Aircraft Engine Model Embed */}
            <div className="self-end w-full">
              <EngineSketchfabViewer />
            </div>

            {/* Center Column: Paragraph with line breaks + Orange Button */}
            <div className="self-start flex flex-col justify-end pl-2">
              <p className="text-[16px] xl:text-[18px] leading-[1.65] font-medium text-gray-900 whitespace-nowrap mb-8">
                Through research, creative thinking and iteration
                <br />
                we help growing brands realize their
                <br />
                digital full potential.
              </p>

              <button
                onClick={() => onNavigateToScreen('predictive-prognostics')}
                className="w-fit bg-[#F26522] hover:bg-[#e05a1a] text-white text-[14px] font-medium rounded-full pl-6 pr-2 py-2 flex items-center gap-3 group transition-colors duration-300 shadow-sm cursor-pointer"
              >
                <div className="relative overflow-hidden h-[18px] leading-[18px]">
                  <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2">
                    <span className="h-[18px] leading-[18px] block whitespace-nowrap">
                      About our studio
                    </span>
                    <span className="h-[18px] leading-[18px] block whitespace-nowrap">
                      About our studio
                    </span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#F26522] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45 shrink-0">
                  <ArrowRight size={16} />
                </div>
              </button>
            </div>

            {/* Right Column: Large image */}
            <div className="self-end">
              <img
                src="/assets/defense_hangar_drone.jpg"
                alt="Defense Propulsion Engineers with MALE UAV in Hangar"
                className="w-full aspect-[3/2] rounded-2xl object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3D AIRFRAME SECTION: Integrated Sketchfab UAV Elang Hitam Viewer          */}
      {/* ========================================================================= */}
      <section id="3d-uav" className="bg-[#F8F9FA] py-16 sm:py-20 lg:py-24 border-y border-gray-200/80">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F26522]"></span>
                <span className="text-xs font-mono uppercase tracking-wider text-[#F26522] font-semibold">
                  AERIS-TWIN Interactive Airframe Asset
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-gray-900">
                MALE UAV 3D Digital Twin
              </h2>
            </div>
            <p className="text-gray-600 text-sm max-w-md">
              Inspect the airframe topology, propulsion integration, and real-time telemetry sensor junctions in full 3D interactive space.
            </p>
          </div>

          {/* Interactive Sketchfab 3D Embed */}
          <SketchfabViewer onOpenCockpit={() => onNavigateToScreen('digital-twin-3d')} />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: CASE STUDIES (Light gray background #F5F5F5)                    */}
      {/* ========================================================================= */}
      <section id="projects" className="bg-[#F5F5F5] pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-28">
        <div className="max-w-[1440px] mx-auto">
          {/* Badge Row */}
          <div className="px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-900 text-white text-[11px] sm:text-[12px] font-semibold flex items-center justify-center shrink-0">
              2
            </div>
            <div className="text-[12px] sm:text-[13px] font-medium border border-gray-300 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-gray-800">
              Featured client work
            </div>
          </div>

          {/* Heading h2: matching hero clamp sizing */}
          <h2 className="text-[clamp(1.75rem,7vw,4.2rem)] sm:text-[clamp(2.5rem,5vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 mb-10 sm:mb-14 lg:mb-16 px-5 sm:px-8 lg:px-12">
            Our projects
          </h2>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-7 px-5 sm:px-8 lg:px-12">
            {/* ------------------------------------------------------------------- */}
            {/* Card 1: AERIS-TWIN Propulsion Telemetry Cockpit                     */}
            {/* ------------------------------------------------------------------- */}
            <div 
              onClick={() => onNavigateToScreen('telemetry-cockpit')}
              className="flex flex-col group cursor-pointer"
            >
              {/* Video container: aspect-[329/246], rounded-2xl, overflow-hidden, bg-[#1a1d2e] */}
              <div className="relative aspect-[329/246] rounded-2xl overflow-hidden bg-[#1a1d2e] shadow-sm hover:shadow-xl transition-shadow duration-500">
                <video
                  src="/assets/video_engine_twin.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />

                {/* Hover button: White circle that expands to w-[148px] on group-hover */}
                <div className="absolute bottom-4 left-4 z-10">
                  <div className="h-9 w-9 bg-white rounded-full flex items-center overflow-hidden transition-all duration-300 ease-in-out group-hover:w-[148px] px-2.5 shadow-md">
                    {/* Link icon drawn manually with two arc paths */}
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-[14px] h-[14px] text-gray-900 shrink-0 transition-transform duration-300 -rotate-45 group-hover:rotate-0"
                    >
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>

                    {/* "Learn more" text with delay */}
                    <span className="text-[13px] font-medium text-gray-900 whitespace-nowrap pl-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 select-none">
                      Learn more
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-[13px] sm:text-[14px] text-gray-600 mt-4 leading-relaxed">
                Real-time 5 Hz CAN bus streaming, CHT/EGT 4-cylinder thermal telemetry, and multi-tier digital twin diagnostics
              </p>

              {/* Title */}
              <h3 className="text-[14px] sm:text-[15px] font-semibold text-gray-900 mt-1">
                AERIS-TWIN • Propulsion Telemetry Cockpit
              </h3>
            </div>

            {/* ------------------------------------------------------------------- */}
            {/* Card 2: Tactical Sortie • Flight Mission & Prognostics             */}
            {/* ------------------------------------------------------------------- */}
            <div 
              onClick={() => onNavigateToScreen('predictive-prognostics')}
              className="flex flex-col group cursor-pointer"
            >
              {/* Video container: aspect-square, rounded-2xl, overflow-hidden, bg-[#6b6b6b] */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#6b6b6b] shadow-sm hover:shadow-xl transition-shadow duration-500">
                <video
                  src="/assets/video_uav_mission.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />

                {/* Hover button: DARK circle that expands to w-[168px] on group-hover */}
                <div className="absolute bottom-4 left-4 z-10">
                  <div className="h-9 w-9 bg-gray-900 rounded-full flex items-center overflow-hidden transition-all duration-300 ease-in-out group-hover:w-[168px] px-2.5 shadow-md">
                    <ArrowRight
                      size={14}
                      className="text-white shrink-0 transition-transform duration-300 -rotate-45 group-hover:rotate-0"
                    />

                    {/* "View case study" text */}
                    <span className="text-[13px] font-medium text-white whitespace-nowrap pl-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 select-none">
                      View case study
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-[13px] sm:text-[14px] text-gray-600 mt-4 leading-relaxed">
                Autonomous high-altitude flight patrol, dynamic Pareto recovery trims (-800m step), and Monte Carlo prognostic RUL forecasting
              </p>

              {/* Title */}
              <h3 className="text-[14px] sm:text-[15px] font-semibold text-gray-900 mt-1">
                Tactical Sortie • Flight Mission & Prognostics
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FOOTER & CONNECT SECTION                                                  */}
      {/* ========================================================================= */}
      <footer id="connect" className="bg-white border-t border-gray-200 py-12 sm:py-16">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white text-xs font-bold">
              AX
            </div>
            <div>
              <span className="font-semibold text-sm block text-gray-900">Axion Studio • AERIS-TWIN</span>
              <span className="text-xs text-gray-500">SIH 2026 Defense AI Propulsion Digital Twin</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-gray-600">
            <span>Rotax 914 / 915 iS Engine Profile</span>
            <span>•</span>
            <span>DO-178C Software Architecture</span>
            <span>•</span>
            <span>TensorRT INT8 &lt; 2W Edge Pipeline</span>
          </div>

          <button
            onClick={() => onNavigateToScreen('telemetry-cockpit')}
            className="px-5 py-2.5 bg-gray-900 hover:bg-black text-white text-xs font-medium rounded-full flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span>Launch Live Defense Cockpit</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </footer>
    </div>
  );
}
