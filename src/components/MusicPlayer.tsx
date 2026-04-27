import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';

export const TRACKS = [
  { id: 1, title: 'Neon Pulse', artist: 'Synth-Wave AI', genre: 'Synthwave', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 2, title: 'Circuit Breaker', artist: 'Glitch-Hop AI', genre: 'Glitch Hop', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: 3, title: 'Atmospheric Void', artist: 'Dark-Ambient AI', genre: 'Ambient', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
];

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const track = TRACKS[currentTrackIdx];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => {
           console.warn("Autoplay prevented or error", e);
           setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentTrackIdx, isPlaying]);

  useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;
    
    const handleEnded = () => nextTrack();
    const handleTimeUpdate = () => {
      setProgress(audioEl.currentTime);
      setDuration(audioEl.duration || 0);
    };

    audioEl.addEventListener('ended', handleEnded);
    audioEl.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      audioEl.removeEventListener('ended', handleEnded);
      audioEl.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [currentTrackIdx]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const nextTrack = () => setCurrentTrackIdx((prev) => (prev + 1) % TRACKS.length);
  const prevTrack = () => setCurrentTrackIdx((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);

  return (
    <>
      <div className="glass rounded-2xl p-6 flex flex-col shrink-0">
        <div className="relative aspect-square rounded-xl overflow-hidden mb-6 group">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-pink-600 opacity-80" />
          <div className="absolute inset-0 flex items-center justify-center">
             <div className={`w-32 h-32 border-4 border-white/20 rounded-full flex items-center justify-center ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`}>
                <div className="w-24 h-24 border-2 border-white/10 rounded-full"></div>
             </div>
          </div>
          <div className="absolute bottom-4 left-4 inline-flex">
            <span className="px-2 py-1 bg-black/40 backdrop-blur-md rounded text-[9px] font-bold uppercase tracking-widest text-cyan-400">
              Now Playing
            </span>
          </div>

          <audio ref={audioRef} src={track.url} preload="auto" />
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-white mb-1 truncate drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">{track.title}</h2>
          <p className="text-sm text-gray-400 truncate">{track.artist}</p>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-2">
            <button onClick={prevTrack} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
              <SkipBack className="w-5 h-5 fill-current" />
            </button>
            <button 
              onClick={togglePlay}
              className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
            </button>
            <button onClick={nextTrack} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
              <SkipForward className="w-5 h-5 fill-current" />
            </button>
          </div>
          
          <div className="space-y-1">
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden cursor-pointer" onClick={(e) => {
               if(audioRef.current && duration) {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pos = (e.clientX - rect.left) / rect.width;
                  audioRef.current.currentTime = pos * duration;
               }
            }}>
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_10px_#00f2ff] transition-all duration-100 ease-linear" 
                style={{ width: `${duration ? (progress / duration) * 100 : 0}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-gray-500 font-mono">
              <span>{formatTime(progress)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2 px-1 opacity-50 hover:opacity-100 transition-opacity">
            <Volume2 className="w-3 h-3 text-white" />
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 glass rounded-2xl p-4 sm:p-6 overflow-hidden flex flex-col min-h-[200px]">
        <h3 className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500 mb-4 shrink-0">Playlist Data</h3>
        <div className="space-y-4 overflow-y-auto pr-2">
          {TRACKS.map((t, i) => (
            <div onClick={() => setCurrentTrackIdx(i)} key={t.id} className={`flex items-center gap-4 group cursor-pointer transition-opacity ${currentTrackIdx === i ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}>
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold shrink-0">
                {(i + 1).toString().padStart(2, '0')}
              </div>
              <div className={`flex-1 overflow-hidden ${currentTrackIdx === i ? 'border-b border-white/5 pb-2' : ''}`}>
                <div className="text-sm font-semibold truncate">{t.title}</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-tighter truncate">{t.artist}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
