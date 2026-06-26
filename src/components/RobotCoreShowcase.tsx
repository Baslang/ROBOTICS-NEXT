import React, { useState, useEffect } from 'react';
import { ROBOTS_DATA, Robot } from '../data/robots';
import { 
  Play, 
  Pause, 
  Activity, 
  Database, 
  Cpu, 
  ChevronRight, 
  Check, 
  Sparkles, 
  RotateCw, 
  Sliders, 
  X, 
  Info,
  Terminal,
  Layers
} from 'lucide-react';

interface RobotCoreShowcaseProps {
  isSpotlight: boolean;
  textColor: string;
  subtitleColor: string;
  cardGlassClass: string;
  layoutMode: string;
}

export default function RobotCoreShowcase({
  isSpotlight,
  textColor,
  subtitleColor,
  cardGlassClass,
  layoutMode
}: RobotCoreShowcaseProps) {
  const [selectedRobot, setSelectedRobot] = useState<Robot | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [diagnosticSignals, setDiagnosticSignals] = useState<string[]>([]);
  const [isRunningDiagnostics, setIsRunningDiagnostics] = useState<boolean>(false);
  const [filters, setFilters] = useState<string>('ALL');

  // Generate simulated dynamic log lines for the diagnostic HUD modal
  useEffect(() => {
    if (!isRunningDiagnostics || !selectedRobot) return;

    setDiagnosticSignals([`[INIT] Bootloader node connection started for protocol ${selectedRobot.id.toUpperCase()}`]);
    
    const logs = [
      `[SYS] Checking active structural links... OK`,
      `[PWR] Battery cells operating at nominal temperature: 34.2°C`,
      `[ACTUATOR] Testing range of motion on ${selectedRobot.specs.actuators}... Complete`,
      `[NEURAL] Mapping spatial coordinates via LiDAR array... OK`,
      `[TORQUE] Verifying peak joint resistance limit: ${selectedRobot.specs.torque}... OK`,
      `[COMMS] Linking node with Zug Switzerland main validator core... Synchronized`,
      `[SUCCESS] Diagnostics completed with 100% telemetry consensus.`
    ];

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < logs.length) {
        setDiagnosticSignals(prev => [...prev, logs[currentLogIndex]]);
        currentLogIndex++;
      } else {
        setIsRunningDiagnostics(false);
        clearInterval(interval);
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [isRunningDiagnostics, selectedRobot]);

  const handleRunDiagnostics = () => {
    setIsRunningDiagnostics(true);
    setDiagnosticSignals([]);
  };

  const getFilteredRobots = () => {
    if (filters === 'ALL') return ROBOTS_DATA;
    return ROBOTS_DATA.filter(robot => robot.tag.includes(filters));
  };

  const categoryTags = ['ALL', 'FACTORY', 'RESEARCH', 'MOBILITY', 'LOGISTICS', 'PRECISION', 'MEDICAL'];

  return (
    <div className="w-full flex flex-col gap-10 mt-12">
      
      {/* 1. Category Filters HUD & Interactive Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 w-full">
        <div className="flex flex-col items-start gap-1">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400">
            SOVEREIGN HUMANOID INDEX
          </span>
          <h3 className={`text-xl font-light tracking-tight ${textColor === 'text-[#FF3838]' ? 'text-white' : textColor}`}>
            Sovereign Mechanical Hardware Core
          </h3>
        </div>

        {/* Categories Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categoryTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilters(tag)}
              className={`text-[10px] font-mono py-1.5 px-3.5 rounded-lg border transition-all cursor-pointer ${
                filters === tag
                  ? isSpotlight 
                    ? 'bg-[#FF3838] text-white border-[#FF3838] font-bold shadow-lg shadow-[#FF3838]/20'
                    : 'bg-white text-black border-white font-bold shadow-md'
                  : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Global Video Loop Controller */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-2 py-1.5 px-4 rounded-lg text-xs font-medium border cursor-pointer transition-all ${
              isPlaying
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-md shadow-emerald-500/5'
                : 'bg-white/10 text-gray-200 border-white/10 hover:bg-white/20'
            }`}
          >
            {isPlaying ? (
              <>
                <Play className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
                <span className="font-mono">LOOPS RUNNING (10S)</span>
              </>
            ) : (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span className="font-mono">LOOPS PAUSED</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. Responsive Grid of Beautiful Portrait Robot Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 xl:gap-8 w-full">
        {getFilteredRobots().map((robot) => {
          const isHovered = hoveredId === robot.id;
          return (
            <div
              key={robot.id}
              onClick={() => {
                setSelectedRobot(robot);
                setIsRunningDiagnostics(false);
                setDiagnosticSignals([]);
              }}
              onMouseEnter={() => setHoveredId(robot.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`rounded-2xl border flex flex-col justify-between group overflow-hidden transition-all duration-500 cursor-pointer relative h-[525px] ${cardGlassClass} hover:-translate-y-2`}
              style={{
                boxShadow: isHovered && isSpotlight 
                  ? '0 20px 40px -15px rgba(255, 56, 56, 0.25)' 
                  : isHovered 
                    ? '0 20px 40px -15px rgba(0, 0, 0, 0.3)' 
                    : 'none',
                    borderColor: isHovered && isSpotlight ? '#FF3838/40' : undefined
              }}
            >
              {/* Image Frame - 75% Height of the Card (Approx 394px of 525px) */}
              <div className="relative w-full h-[394px] bg-black/60 overflow-hidden border-b border-white/10">
                {/* 10-Second Video Loop Simulation with kenburns scale/rotate transformations */}
                <div 
                  className={`w-full h-full transition-transform duration-1000 ${
                    isPlaying 
                      ? 'animate-[kenburns_10s_ease-in-out_infinite]' 
                      : 'scale-100'
                  }`}
                  style={{
                    transformOrigin: 'center center'
                  }}
                >
                  <img
                    src={robot.image}
                    alt={robot.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 select-none"
                  />
                </div>

                {/* Ambient Subtle Cyber Overlay */}
                {isPlaying && (
                  <>
                    {/* Glowing holographic sweep bar */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#FF3838]/0 via-[#FF3838]/20 to-[#FF3838]/0 h-[10%] w-full animate-[scan_3s_linear_infinite] opacity-30 pointer-events-none" />
                    
                    {/* Ambient scanline matrix */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_95%,_rgba(255,56,56,0.05)_95%)] bg-[size:100%_4px] pointer-events-none opacity-30" />
                  </>
                )}

                {/* Adaptive HUD Corner Brackets */}
                <span className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/20 group-hover:border-white/50 transition-colors" />
                <span className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/20 group-hover:border-white/50 transition-colors" />
                <span className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/20 group-hover:border-white/50 transition-colors" />
                <span className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/20 group-hover:border-white/50 transition-colors" />

                {/* Laser square focusing reticle (Animates over target areas) */}
                {isHovered && isPlaying && (
                  <div className="absolute w-12 h-12 border border-[#FF3838]/40 rounded-lg top-[30%] left-[40%] animate-ping pointer-events-none" />
                )}
              </div>

              {/* Specifications Sub-Drawer - 25% Remaining Height (Approx 131px) */}
              <div className="p-4 h-[131px] flex flex-col justify-between relative bg-black/20 group-hover:bg-black/40 transition-colors duration-300">
                <div>
                  {/* Name & Short Version */}
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h2 className="text-sm font-bold tracking-tight text-white group-hover:text-[#FF3838] transition-colors duration-300 line-clamp-1 uppercase">
                      {robot.name}
                    </h2>
                    <span className="text-[8px] font-mono font-bold text-gray-400 block uppercase pt-0.5">
                      {robot.id.toUpperCase()}
                    </span>
                  </div>

                  {/* Purpose & Tag */}
                  <div className="flex items-center gap-1.5 flex-wrap mb-1">
                    <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-cyan-400 bg-white/5 py-0.5 px-1.5 rounded border border-white/10">
                      {robot.tag.split(' // ')[0]}
                    </span>
                    <span className="text-[9px] font-bold text-amber-500/95 line-clamp-1">
                      {robot.purpose}
                    </span>
                  </div>

                  {/* Description Snip in H3 as requested */}
                  <h3 className="text-[11px] font-bold text-gray-100 leading-relaxed line-clamp-2">
                    {robot.description}
                  </h3>
                </div>

                {/* Subtle detail trigger on bottom */}
                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-gray-400 group-hover:text-white transition-colors">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    ONLINE
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                    VIEW DETAILS <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Immersive Tactical Hologram Diagnostics Modal */}
      {selectedRobot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-lg transition-all duration-300 animate-[fadein_0.2s_ease-out]">
          <div 
            className="w-full max-w-5xl rounded-3xl border border-white/15 bg-neutral-900/40 relative shadow-2xl p-6 md:p-8 flex flex-col md:grid md:grid-cols-12 gap-8 min-h-[550px] overflow-y-auto"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 10%, rgba(255, 56, 56, 0.08) 0%, transparent 70%)`
            }}
          >
            {/* Exit Button */}
            <button
              onClick={() => setSelectedRobot(null)}
              className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white border border-white/10 transition-all cursor-pointer z-50"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column: Huge 10s Simulated Live Screen */}
            <div className="md:col-span-5 flex flex-col gap-4">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-black/70 shadow-2xl">
                <img
                  src={selectedRobot.image}
                  alt={selectedRobot.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-85 animate-[kenburns_10s_ease-in-out_infinite]"
                />
                
                {/* HUD Grid Overlay */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25">
                  <defs>
                    <pattern id="modal-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="red" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#modal-grid)" />
                </svg>

                {/* Looping scanner bars */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF3838]/25 to-transparent h-[15%] w-full animate-[scan_4s_linear_infinite] pointer-events-none" />

                {/* Live Diagnostic stats overlay */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/75 backdrop-blur-md border border-white/15 flex justify-between items-center text-[10px] font-mono text-gray-400">
                  <div className="flex flex-col">
                    <span className="text-[8px] text-gray-500">FRAME RATIO</span>
                    <span className="text-white">1080P // 120 FPS</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-[8px] text-gray-500">LATENCY GATEWAY</span>
                    <span className="text-emerald-400">0.05 ms OK</span>
                  </div>
                </div>
              </div>

              {/* Audio spectrum stream simulator to visualize loop stream */}
              <div className="p-4 rounded-xl border border-white/15 bg-black/30 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-mono text-gray-400">ACOUSTIC DAMPING SYMMETRY</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                </div>
                <div className="flex items-end justify-between h-8 px-1">
                  {Array.from({ length: 28 }).map((_, i) => {
                    const h = isPlaying ? Math.floor(Math.sin((i + Date.now()/300)) * 12 + 16) : 4;
                    return (
                      <span 
                        key={i} 
                        className="w-1 rounded-full bg-[#FF3838] transition-all duration-300" 
                        style={{ height: `${h}px` }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Spec Sheets, Custom Calibration Controls & Research */}
            <div className="md:col-span-7 flex flex-col justify-between gap-6">
              
              {/* Product Header */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="bg-[#FF3838]/10 text-[#FF3838] border border-[#FF3838]/20 text-[10px] py-0.5 px-3 rounded-full font-mono uppercase">
                    {selectedRobot.tag}
                  </span>
                  <span className="text-xs font-mono text-gray-400">
                    HARDWARE SERIAL: {selectedRobot.id.toUpperCase()}-VX9
                  </span>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-light text-white tracking-tight leading-snug">
                  {selectedRobot.name}
                </h2>
                
                <div className="text-sm font-mono text-amber-400 font-semibold uppercase tracking-wider">
                  Operational Purpose: {selectedRobot.purpose}
                </div>
              </div>

              {/* Description */}
              <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                <span className="text-[9px] font-mono text-gray-400 block mb-1 uppercase tracking-wider">PRODUCT OVERVIEW DESCRIPTION</span>
                <p className="text-sm font-light leading-relaxed text-gray-100">
                  {selectedRobot.description}
                </p>
              </div>

              {/* Specs Table */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3.5 rounded-lg border border-white/5 bg-black/20">
                  <span className="text-[8px] font-mono text-gray-500 block mb-0.5 uppercase">PEAK JOINT TORQUE</span>
                  <span className="text-sm font-mono font-medium text-white">{selectedRobot.specs.torque}</span>
                </div>
                <div className="p-3.5 rounded-lg border border-white/5 bg-black/20">
                  <span className="text-[8px] font-mono text-gray-500 block mb-0.5 uppercase">OPERATIONAL RUNTIME</span>
                  <span className="text-sm font-mono font-medium text-white">{selectedRobot.specs.battery}</span>
                </div>
                <div className="p-3.5 rounded-lg border border-white/5 bg-black/20">
                  <span className="text-[8px] font-mono text-gray-500 block mb-0.5 uppercase">KINEMATIC DEGREES OF FREEDOM</span>
                  <span className="text-sm font-mono font-medium text-white">{selectedRobot.specs.actuators}</span>
                </div>
                <div className="p-3.5 rounded-lg border border-white/5 bg-black/20">
                  <span className="text-[8px] font-mono text-gray-500 block mb-0.5 uppercase">HEIGHT / NET WEIGHT</span>
                  <span className="text-sm font-mono font-medium text-white">{selectedRobot.specs.heightWeight}</span>
                </div>
              </div>

              {/* Active Terminal / Live Calibration diagnostics */}
              <div className="p-4 rounded-xl border border-white/10 bg-black/60 relative overflow-hidden">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[10px] font-mono text-gray-400">
                  <span className="flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5 text-cyan-400" /> SYSTEM CONSOLE SHELL</span>
                  <span>NODE: ACTIVE_SYS</span>
                </div>

                <div 
                  className="font-mono text-xs space-y-1 max-h-[100px] overflow-y-auto overflow-x-hidden text-emerald-400 font-light select-none cursor-text scrollbar-thin"
                  style={{ textShadow: "0 0 2px rgba(16, 185, 129, 0.4)" }}
                >
                  {diagnosticSignals.length === 0 ? (
                    <span className="text-gray-500 block">Console offline. Trigger node calibration below to connect core modules.</span>
                  ) : (
                    diagnosticSignals.map((line, idx) => (
                      <div key={idx} className="leading-relaxed whitespace-pre-wrap">{line}</div>
                    ))
                  )}
                  {isRunningDiagnostics && (
                    <span className="animate-pulse inline-block w-20 h-3 bg-emerald-400/50 align-middle ml-1" />
                  )}
                </div>

                {/* Term and Calibration CTA */}
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={handleRunDiagnostics}
                    disabled={isRunningDiagnostics}
                    className="py-2 px-5 rounded-lg text-xs font-mono font-semibold text-black bg-cyan-400 hover:bg-cyan-300 disabled:bg-gray-700 disabled:text-gray-400 transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-cyan-400/10"
                  >
                    <RotateCw className={`w-3.5 h-3.5 ${isRunningDiagnostics ? 'animate-spin' : ''}`} />
                    {isRunningDiagnostics ? "RUNNING TELEMETRY CALIBRATION..." : "RUN FULL TELEMETRY TEST"}
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
