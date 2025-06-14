"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

const MOTIVATION_GIF = "/assets/motivation.gif";

const MotivationOverlay = () => {
  const [visible, setVisible] = useState(false);
  const keysPressed = useRef<Record<string, boolean>>({});
  const showTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = true;
      if (keysPressed.current.m && keysPressed.current.o) {
        showTimeout.current ??= setTimeout(() => {
          if (keysPressed.current.m && keysPressed.current.o) {
            setVisible(true);
          }
          showTimeout.current = null;
        }, 500);
      }
      if (e.key === "Escape") {
        setVisible(false);
        if (showTimeout.current) {
          clearTimeout(showTimeout.current);
          showTimeout.current = null;
        }
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = false;
      if (!keysPressed.current.m || !keysPressed.current.o) {
        setVisible(false);
        if (showTimeout.current) {
          clearTimeout(showTimeout.current);
          showTimeout.current = null;
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="bg-opacity-80 fixed inset-0 z-50 flex items-center justify-center bg-black">
      <Image
        src={MOTIVATION_GIF}
        alt="Motivation"
        fill
        className="h-full w-full border-4 border-black object-cover shadow-2xl"
        priority
      />
    </div>
  );
};

export default MotivationOverlay;
