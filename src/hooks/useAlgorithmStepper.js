/**
 * STEP ENGINE — Core Brain
 *
 * useAlgorithmStepper(steps)
 *
 * Responsibilities:
 *  - Store steps
 *  - Track currentStepIndex
 *  - Auto-play via setInterval (speed controlled)
 *  - Expose: play, pause, nextStep, prevStep, reset, goTo
 */

import { useState, useEffect, useRef, useCallback } from 'react';

const DEFAULT_SPEED_MS = 500; // ms per step

export function useAlgorithmStepper(steps = []) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMs, setSpeedMs] = useState(DEFAULT_SPEED_MS);

  const intervalRef = useRef(null);

  // ── Derived state ─────────────────────────────────
  const currentStep = steps[currentIndex] ?? null;
  const totalSteps = steps.length;
  const isFirst = currentIndex === 0;
  const isLast = currentIndex >= totalSteps - 1;
  const isDone = currentStep?.type === 'done';

  // ── Auto-play interval ────────────────────────────
  const stopInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startInterval = useCallback(() => {
    stopInterval();
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, speedMs);
  }, [speedMs, steps.length, stopInterval]);

  // ── Controls ──────────────────────────────────────
  const reset = useCallback(() => {
    setIsPlaying(false);
    setCurrentIndex(0);
    stopInterval();
  }, [stopInterval]);

  const play = useCallback(() => {
    if (!isLast) setIsPlaying(true);
  }, [isLast]);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const nextStep = useCallback(() => {
    if (!isLast) setCurrentIndex((i) => i + 1);
  }, [isLast]);

  const prevStep = useCallback(() => {
    if (!isFirst) setCurrentIndex((i) => i - 1);
  }, [isFirst]);

  const goTo = useCallback(
    (index) => {
      if (index >= 0 && index < totalSteps) {
        setCurrentIndex(index);
      }
    },
    [totalSteps]
  );

  const changeSpeed = useCallback((ms) => {
    setSpeedMs(ms);
  }, []);

  // ── Side Effects ──────────────────────────────────
  // Start/stop interval based on isPlaying
  useEffect(() => {
    if (isPlaying && !isLast) {
      startInterval();
    } else {
      stopInterval();
    }
    return stopInterval;
  }, [isPlaying, isLast, startInterval, stopInterval]);

  // If we reach the last step, auto-stop
  useEffect(() => {
    if (isLast && isPlaying) {
      setIsPlaying(false);
    }
  }, [isLast, isPlaying]);

  // Reset when steps change (new algorithm / new array)
  useEffect(() => {
    reset();
  }, [steps, reset]);


  return {
    currentStep,
    currentIndex,
    totalSteps,
    isPlaying,
    isFirst,
    isLast,
    isDone,
    speedMs,
    play,
    pause,
    nextStep,
    prevStep,
    reset,
    goTo,
    changeSpeed,
  };
}
