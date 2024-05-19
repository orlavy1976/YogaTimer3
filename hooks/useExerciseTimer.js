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
        for (let i = currentLoop; i <= timer.loop; i++) {
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
              if (timer.soundAtEnd) {
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
    timerRef.current = null;
  };

  return {
    remainingTime,
    currentLoop,
    currentRepeat,
    timerRef,
  };
};

export default useExerciseTimer;
