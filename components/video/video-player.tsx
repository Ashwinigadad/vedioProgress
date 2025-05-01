"use client";

import { useState, useRef, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Volume2, VolumeX, Maximize, SkipForward, SkipBack } from "lucide-react";
import { cn } from '@/lib/utils';
import { formatTime } from '@/lib/format';
import { updateWatchedIntervals } from '@/lib/progress';
import { motion } from 'framer-motion';

interface VideoPlayerProps {
  videoUrl: string;
  lastPosition: number;
  lectureId: string;
}

export function VideoPlayer({ videoUrl, lastPosition, lectureId }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [seekStart, setSeekStart] = useState<number | null>(null);
  const [currentInterval, setCurrentInterval] = useState<{ start: number, end: number } | null>(null);
  const controlsTimeout = useRef<NodeJS.Timeout | null>(null);
  
  // Set up initial video position
  useEffect(() => {
    if (videoRef.current && lastPosition > 0) {
      videoRef.current.currentTime = lastPosition;
      setCurrentTime(lastPosition);
    }
  }, [lastPosition]);
  
  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);
  
  // Auto-hide controls
  useEffect(() => {
    if (isPlaying) {
      if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current);
      }
      
      controlsTimeout.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
    
    return () => {
      if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current);
      }
    };
  }, [isPlaying, showControls]);
  
  // Progress tracking
  useEffect(() => {
    let trackingInterval: NodeJS.Timeout | null = null;
    
    if (isPlaying && currentInterval) {
      trackingInterval = setInterval(() => {
        if (videoRef.current) {
          const time = Math.floor(videoRef.current.currentTime);
          setCurrentTime(time);
        }
      }, 1000);
    }
    
    return () => {
      if (trackingInterval) {
        clearInterval(trackingInterval);
      }
    };
  }, [isPlaying, currentInterval]);
  
  // Handle video events
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(Math.floor(videoRef.current.duration));
    }
  };
  
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        // End the current interval tracking
        if (currentInterval && seekStart !== null) {
          const endTime = Math.floor(videoRef.current.currentTime);
          updateWatchedIntervals(
            lectureId,
            currentInterval.start,
            endTime
          );
          setCurrentInterval(null);
        }
      } else {
        videoRef.current.play();
        // Start new interval tracking
        const startTime = Math.floor(videoRef.current.currentTime);
        setSeekStart(startTime);
        setCurrentInterval({ start: startTime, end: startTime });
      }
      setIsPlaying(!isPlaying);
      setShowControls(true);
    }
  };
  
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const time = Math.floor(videoRef.current.currentTime);
      setCurrentTime(time);
      
      // Update the current tracking interval
      if (isPlaying && currentInterval && seekStart !== null) {
        setCurrentInterval({ start: seekStart, end: time });
      }
    }
  };
  
  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      const newTime = value[0];
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      
      // End previous interval if any
      if (currentInterval && seekStart !== null) {
        updateWatchedIntervals(
          lectureId,
          currentInterval.start,
          currentInterval.end
        );
      }
      
      // Start new interval
      setSeekStart(newTime);
      setCurrentInterval({ start: newTime, end: newTime });
    }
  };
  
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };
  
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      
      if (isMuted) {
        // Restore previous volume
        videoRef.current.volume = volume === 0 ? 1 : volume;
        setVolume(volume === 0 ? 1 : volume);
      } else {
        // Set volume to 0 but remember the previous value
        videoRef.current.volume = 0;
      }
    }
  };
  
  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };
  
  const skipBackward = () => {
    if (videoRef.current) {
      const newTime = Math.max(0, currentTime - 10);
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      
      // End previous interval if any
      if (currentInterval && seekStart !== null) {
        updateWatchedIntervals(
          lectureId,
          currentInterval.start,
          currentInterval.end
        );
      }
      
      // Start new interval
      setSeekStart(newTime);
      setCurrentInterval({ start: newTime, end: newTime });
    }
  };
  
  const skipForward = () => {
    if (videoRef.current) {
      const newTime = Math.min(duration, currentTime + 10);
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      
      // End previous interval if any
      if (currentInterval && seekStart !== null) {
        updateWatchedIntervals(
          lectureId,
          currentInterval.start,
          currentInterval.end
        );
      }
      
      // Start new interval
      setSeekStart(newTime);
      setCurrentInterval({ start: newTime, end: newTime });
    }
  };
  
  const handleVideoEnded = () => {
    setIsPlaying(false);
    setShowControls(true);
    
    // End the current interval tracking
    if (currentInterval && seekStart !== null) {
      updateWatchedIntervals(
        lectureId,
        currentInterval.start,
        duration
      );
      setCurrentInterval(null);
    }
  };
  
  return (
    <Card
      ref={containerRef}
      className={cn(
        "relative group overflow-hidden rounded-md",
        isFullscreen ? "fixed inset-0 z-50 rounded-none" : "w-full aspect-video"
      )}
      onMouseMove={() => {
        setShowControls(true);
        if (controlsTimeout.current) {
          clearTimeout(controlsTimeout.current);
        }
        if (isPlaying) {
          controlsTimeout.current = setTimeout(() => {
            setShowControls(false);
          }, 3000);
        }
      }}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full"
        onClick={togglePlay}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnded}
      />
      
      <motion.div
        className={cn(
          "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4",
          "transition-opacity duration-300"
        )}
        initial={false}
        animate={{ opacity: showControls ? 1 : 0 }}
      >
        <Slider
          value={[currentTime]}
          min={0}
          max={duration}
          step={1}
          onValueChange={handleSeek}
          className="mb-4"
        />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlay}
              className="text-white hover:bg-white/20"
            >
              {isPlaying ? <Pause /> : <Play />}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={skipBackward}
              className="text-white hover:bg-white/20"
            >
              <SkipBack />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={skipForward}
              className="text-white hover:bg-white/20"
            >
              <SkipForward />
            </Button>
            
            <span className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="hidden sm:flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMute}
                className="text-white hover:bg-white/20"
              >
                {isMuted ? <VolumeX /> : <Volume2 />}
              </Button>
              
              <Slider
                value={[isMuted ? 0 : volume]}
                min={0}
                max={1}
                step={0.01}
                onValueChange={handleVolumeChange}
                className="w-20"
              />
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              className="text-white hover:bg-white/20"
            >
              <Maximize />
            </Button>
          </div>
        </div>
      </motion.div>
    </Card>
  );
}