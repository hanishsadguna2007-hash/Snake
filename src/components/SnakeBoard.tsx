import React from 'react';
import { useSnake } from '../hooks/useSnake';
import { Ghost, Trophy, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

export function SnakeBoard() {
  const { snake, food, gameOver, isPaused, score, highScore, resetGame, changeDirection, GRID_SIZE } = useSnake();

  const CELL_SIZE = 100 / GRID_SIZE; // Use percentage for responsive scaling

  return (
    <div className="flex-1 flex flex-col gap-6 min-h-0">
      
      {/* Dynamic Score UI (replacing the static one in header for functionality) */}
      <div className="flex md:hidden w-full justify-between items-end border-b border-white/5 pb-2 shrink-0">
         <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none">Score</span>
            <span className="text-xl font-mono text-lime-400 tabular-nums leading-none">
               {score.toString().padStart(6, '0')}
            </span>
         </div>
         <div className="flex flex-col items-end">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest flex items-center gap-1 leading-none">
               Record
            </span>
            <span className="text-xl font-mono text-magenta-400 tabular-nums leading-none">
               {highScore.toString().padStart(6, '0')}
            </span>
         </div>
      </div>

      <div className="flex-1 glass rounded-3xl relative overflow-hidden flex flex-col items-center justify-center">
        {/* Game Grid Background */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        
        <div className="relative w-[500px] max-w-[90vw] aspect-square bg-black/40 rounded-xl neon-border border border-cyan-500/30 overflow-hidden z-10 mx-auto">

          {/* Simulated Snake UI over the logic */}
          <div className="absolute w-full h-full">
            <div
              className="absolute bg-magenta-500 rounded-full food"
              style={{
                width: `${CELL_SIZE}%`, height: `${CELL_SIZE}%`,
                left: `${food.x * CELL_SIZE}%`, top: `${food.y * CELL_SIZE}%`,
              }}
            />
            
            {snake.map((segment, idx) => {
              const isHead = idx === 0;
              return (
                <div
                  key={`${segment.x}-${segment.y}-${idx}`}
                  className={`absolute pointer-events-none ${isHead ? 'bg-cyan-400 z-10 snake-body' : 'bg-cyan-400/80'}`}
                  style={{
                    width: `${CELL_SIZE}%`, height: `${CELL_SIZE}%`,
                    left: `${segment.x * CELL_SIZE}%`, top: `${segment.y * CELL_SIZE}%`,
                    borderRadius: '2px',
                    opacity: isHead ? 1 : Math.max(0.2, 1 - (idx * 0.05)),
                  }}
                />
              );
            })}
          </div>

          <div className="absolute bottom-4 right-4 text-[9px] font-mono text-cyan-500/50 uppercase tracking-widest hidden sm:block pointer-events-none">
            X: {snake[0]?.x.toString().padStart(2, '0')} // Y: {snake[0]?.y.toString().padStart(2, '0')}
          </div>

          {gameOver && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-20">
              <Ghost className="text-magenta-500 w-12 h-12 mb-4 animate-bounce filter drop-shadow-[0_0_15px_#d946ef]" />
              <h2 className="text-2xl font-black text-white/90 mb-6 uppercase tracking-[0.2em]">System failure</h2>
              <button 
                onClick={resetGame}
                className="px-6 py-2 bg-transparent neon-border border border-cyan-400 text-cyan-400 text-sm font-bold uppercase tracking-widest hover:bg-cyan-400/20 transition-all cursor-pointer active:scale-95 rounded"
              >
                Reboot Sequence
              </button>
            </div>
          )}
          
          {isPaused && !gameOver && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center z-20">
              <div className="bg-black/80 border border-white/10 px-6 py-2 rounded-full">
                <span className="text-[10px] font-bold tracking-[0.3em] text-white/70">SEQUENCE_PAUSED</span>
              </div>
            </div>
          )}
        </div>

        <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 z-10">
          <span className="text-[10px] font-bold tracking-[0.3em] text-lime-400/70">
            {gameOver ? 'OFFLINE' : (isPaused ? 'STANDBY' : 'BPM_SYNC: ACTIVE')}
          </span>
        </div>
      </div>

      {/* Visualizer Footer */}
      <div className="h-24 glass rounded-2xl flex items-center px-4 sm:px-8 gap-4 overflow-hidden shrink-0 hidden md:flex">
        <div className="text-[10px] font-bold text-gray-500 uppercase rotate-180 shrink-0" style={{ writingMode: 'vertical-rl' }}>Freq</div>
        <div className="flex-1 flex items-end justify-between h-12 gap-1 px-2 pointer-events-none">
          <div className="w-1.5 bg-cyan-500/40 h-4 rounded-full"></div>
          <div className="w-1.5 bg-cyan-500/40 h-8 rounded-full"></div>
          <div className="w-1.5 bg-cyan-500/40 h-10 rounded-full"></div>
          <div className="w-1.5 bg-cyan-500 h-12 shadow-[0_0_10px_#06b6d4] rounded-full"></div>
          <div className="w-1.5 bg-cyan-500 h-9 shadow-[0_0_10px_#06b6d4] rounded-full"></div>
          <div className="w-1.5 bg-magenta-500 h-11 shadow-[0_0_10px_#d946ef] rounded-full"></div>
          <div className="w-1.5 bg-magenta-500 h-6 shadow-[0_0_10px_#d946ef] rounded-full"></div>
          <div className="w-1.5 bg-white h-12 rounded-full transform scale-y-110 ease-in-out transition-transform"></div>
          <div className="w-1.5 bg-white h-8 rounded-full"></div>
          <div className="w-1.5 bg-white/30 h-4 rounded-full"></div>
          <div className="w-1.5 bg-white/30 h-7 rounded-full"></div>
          <div className="w-1.5 bg-white/30 h-10 rounded-full transition-transform"></div>
          <div className="w-1.5 bg-cyan-500/40 h-6 rounded-full"></div>
          <div className="w-1.5 bg-cyan-500/40 h-9 rounded-full"></div>
          <div className="w-1.5 bg-cyan-500/40 h-4 rounded-full"></div>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <div className="text-[9px] font-mono text-cyan-400">60.00 FPS</div>
          <div className="text-[9px] font-mono text-magenta-400">128.0 BPM</div>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-3 gap-2 md:hidden w-48 mx-auto relative z-30 shrink-0">
         <div />
         <button onClick={() => changeDirection({x:0, y:-1})} className="aspect-square glass rounded-xl border border-white/10 flex items-center justify-center active:bg-cyan-500/20 active:shadow-[0_0_15px_rgba(0,242,255,0.4)] transition-all touch-manipulation">
            <ArrowUp className="w-6 h-6 text-cyan-400" />
         </button>
         <div />
         <button onClick={() => changeDirection({x:-1, y:0})} className="aspect-square glass rounded-xl border border-white/10 flex items-center justify-center active:bg-cyan-500/20 active:shadow-[0_0_15px_rgba(0,242,255,0.4)] transition-all touch-manipulation">
            <ArrowLeft className="w-6 h-6 text-cyan-400" />
         </button>
         <button onClick={() => changeDirection({x:0, y:1})} className="aspect-square glass rounded-xl border border-white/10 flex items-center justify-center active:bg-cyan-500/20 active:shadow-[0_0_15px_rgba(0,242,255,0.4)] transition-all touch-manipulation">
            <ArrowDown className="w-6 h-6 text-cyan-400" />
         </button>
         <button onClick={() => changeDirection({x:1, y:0})} className="aspect-square glass rounded-xl border border-white/10 flex items-center justify-center active:bg-cyan-500/20 active:shadow-[0_0_15px_rgba(0,242,255,0.4)] transition-all touch-manipulation">
            <ArrowRight className="w-6 h-6 text-cyan-400" />
         </button>
      </div>
    </div>
  );
}
