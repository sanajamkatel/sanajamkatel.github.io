import React, { useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';

type VideoPlayerProps = {
  src: string;
  containerClassName?: string;
  videoClassName?: string;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  containerClassName = '',
  videoClassName = 'max-h-[70vh]'
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <div className={`relative bg-black flex items-center justify-center ${containerClassName}`}>
      <video
        ref={videoRef}
        src={src}
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        className={`w-auto h-auto max-w-full ${videoClassName}`}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={isPlaying ? 'Pause video' : 'Play video'}
        className="absolute inset-0 flex items-center justify-center group"
      >
        <span
          className={`bg-white/90 text-gray-900 rounded-full p-4 shadow-lg transition-opacity duration-200 ${
            isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
          }`}
        >
          {isPlaying ? (
            <Pause size={28} fill="currentColor" />
          ) : (
            <Play size={28} fill="currentColor" className="ml-0.5" />
          )}
        </span>
      </button>
    </div>
  );
};

export default VideoPlayer;
