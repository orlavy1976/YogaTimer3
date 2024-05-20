import { Audio } from 'expo-av';
import { useEffect, useRef, useState } from 'react';

const useExerciseTimer = (timers, running, setRunning, repeatCount) => {
  const [remainingTime, setRemainingTime] = useState(timers[0]?.duration || 0);
  const [currentLoop, setCurrentLoop] = useState(1);
  const [currentRepeat, setCurrentRepeat] = useState(1);
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (running) {
      setCurrentLoop(1);
      setCurrentRepeat(1);
      setRemainingTime(timers[0]?.duration || 0);
      runExercise();
    } else {
      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);
    }
    return () => {
      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);
    };
  }, [running]);

  useEffect(() => {
    if (!timerRef.current) return;
    const { loop: timerLoop } = timerRef.current;
    if (timerLoop > 1 && currentLoop === timerLoop && remainingTime <= 2) {
      if (remainingTime === 0) {
        return;
      }
      playSound(require('../assets/bell.wav'));
    }
  }, [remainingTime]);

  const playSound = async (soundFile) => {
    try {
      const { sound } = await Audio.Sound.createAsync(soundFile);
      await sound.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const runExercise = async () => {
    for (let repeat = 1; repeat <= repeatCount; repeat++) {
      setCurrentRepeat(repeat);

      for (let timer of timers) {
        timerRef.current = timer;
        for (let i = 1; i <= timer.loop; i++) {
          if (!running) return;
          setRemainingTime(timer.duration);

          if (timer.soundAtStart) {
            await playSound(require('../assets/bell.wav'));
          }

          await new Promise((resolve) => {
            intervalRef.current = setInterval(() => {
              setRemainingTime((prev) => {
                if (prev <= 1) {
                  clearInterval(intervalRef.current);
                  resolve();
                  return 0;
                }

                return prev - 1;
              });
            }, 1000);

            timeoutRef.current = setTimeout(async () => {
              clearInterval(intervalRef.current);
              if (timer.soundAtEnd || (timer.loop > 1 && i === timer.loop)) {
                await playSound(require('../assets/bell.wav'));
              }
              resolve();
            }, timer.duration * 1000);
          });

          if (!running) return;

          setCurrentLoop((prev) => prev + 1);
        }
        setCurrentLoop(1);
      }
    }
    setRunning(false);
    setCurrentRepeat(1);
    setTimeout(() => {
      timerRef.current = null;
    }, 5000);
  };

  return {
    remainingTime,
    currentLoop,
    currentRepeat,
    timerRef,
  };
};

export default useExerciseTimer;
