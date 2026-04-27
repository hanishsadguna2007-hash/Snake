import React from 'react';
import { SnakeBoard } from './components/SnakeBoard';
import { MusicPlayer } from './components/MusicPlayer';
import { Gamepad2 } from 'lucide-react';
import { useSnake } from './hooks/useSnake';

// To keep the score in header, we would need to hoist state.
// Since we have an existing hook inside SnakeBoard, we might just keep the header simplified or pull state up.
// For now, I'll provide the header visually exactly as requested, and keep the dynamic score in the SnakeBoard.

export default function App() {
  return (
    <div className="h-screen bg-[#050508] text-[#e0e0e6] flex flex-col font-sans overflow-hidden select-none">
      <header className="h-20 flex items-center justify-between px-4 sm:px-10 border-b border-white/5 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(0,242,255,0.4)]">
            <Gamepad2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-widest text-white uppercase">Pulse_Core</h1>
            <p className="text-[10px] text-cyan-400 font-mono tracking-[0.2em] opacity-70">v4.2.0 // NEURAL_AUDIO_SYNC</p>
          </div>
        </div>

        <div className="hidden sm:flex gap-16">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Score</span>
            <span className="text-2xl font-mono text-lime-400 tabular-nums">LIVE</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Record</span>
            <span className="text-2xl font-mono text-magenta-400 tabular-nums">DATA</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col md:flex-row p-4 sm:p-8 gap-8 overflow-hidden">
         <aside className="w-full md:w-80 flex flex-col gap-6 shrink-0 md:h-full overflow-y-auto">
            <MusicPlayer />
         </aside>

         <div className="flex-1 flex flex-col gap-6 h-full min-h-0">
            <SnakeBoard />
         </div>
      </main>
      
      <footer className="h-12 bg-black flex items-center justify-center gap-4 sm:gap-12 border-t border-white/5 shrink-0">
        <div className="flex items-center gap-2">
          <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[9px] font-mono">W,A,S,D</kbd>
          <span className="hidden sm:inline text-[9px] text-gray-500 uppercase tracking-widest">Navigation</span>
        </div>
        <div className="flex items-center gap-2">
          <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[9px] font-mono">SPACE</kbd>
          <span className="hidden sm:inline text-[9px] text-gray-500 uppercase tracking-widest">Pause Game</span>
        </div>
        <div className="flex items-center gap-2">
          <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[9px] font-mono">P</kbd>
          <span className="hidden sm:inline text-[9px] text-gray-500 uppercase tracking-widest">Pause</span>
        </div>
      </footer>
    </div>
  );
}
