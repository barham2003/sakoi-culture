"use client";
import React, { LegacyRef, useEffect, useRef, useState } from "react";

import { Pause, Play, Rotate3D, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Audio({ audioFile }: { audioFile: string }) {
  const audioRef = useRef<null | HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    setIsPlaying(false);
    if (audioRef.current) audioRef.current.pause();
  }, [audioFile]);

  function handlePlay() {
    if (isPlaying) audioRef.current?.pause();
    else audioRef.current?.play();
    setIsPlaying(!isPlaying);
  }

  function handleRestart() {
    if (audioRef.current) audioRef.current.currentTime = 0;
  }

  return (
    <div className="m-3">
      <p className="mb-2 text-right text-base text-myblue">بیخوێنەوە</p>
      <div className="flex w-full gap-2">
        <Button onClick={handlePlay} type="button">
          {isPlaying ? <Pause /> : <Play />}
        </Button>
        <Button type="button" disabled={!isPlaying} onClick={handleRestart}>
          <RotateCcw />{" "}
        </Button>
      </div>
      <audio controls ref={audioRef} className="hidden">
        <source src={audioFile} type="audio/mp3" />
      </audio>
    </div>
  );
}
