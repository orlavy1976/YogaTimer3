import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TimerComponent = () => {
  const [running, setRunning] = useState(false);
  const [remainingTime, setRemainingTime] = useState(10);
  const [currentLoop, setCurrentLoop] = useState(1);
  const [totalLoops] = useState(3);
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (running) {
      console.log('Timer started');
      setCurrentLoop(1);
      setRemainingTime(10);
      runLoop();
    } else {
      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);
    }
    return () => {
      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);
    };
  }, [running]);

  const startTimer = () => {
    if (running) return;
    setRunning(true);
  };

  const runLoop = async () => {
    for (let i = currentLoop; i <= totalLoops; i++) {
      console.log(`Starting loop ${i}`, { remainingTime, running });
      if (!running) {
        console.log("not running");
        break;
      }
      setCurrentLoop(i);
      await new Promise((resolve) => {
        console.log("promise started", { running, remainingTime })
        setRemainingTime(10);
        intervalRef.current = setInterval(() => {
          setRemainingTime((prev) => {
            console.log('Remaining time:', prev);
            if (prev <= 1) {
              clearInterval(intervalRef.current);
              resolve();
              return 10; // Reset time for the next loop
            }
            return prev - 1;
          });
        }, 1000);

        timeoutRef.current = setTimeout(() => {
          console.log('timer timeout');
          clearInterval(intervalRef.current);
          resolve();
        }, 10000);
      });

      if (!running) {
        console.log('Timer stopped');
        break;
      }

      if (i < totalLoops) {
        setCurrentLoop((prev) => prev + 1);
      } else {
        console.log('Timer completed');
        setRunning(false);
      }
    }
  };

  const stopTimer = () => {
    console.log('stopping Timer', { remainingTime, running });

    setRunning(false);
    clearTimeout(timeoutRef.current);
    clearInterval(intervalRef.current);
    console.log('Timer stopped', { running });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Time: {remainingTime}s</Text>
      <Text style={styles.text}>Loop: {currentLoop}/{totalLoops}</Text>
      <Text style={styles.text}>Running: {running ? 'Running' : 'Stopped'}</Text>
      <Text style={styles.text}>current loop: {currentLoop}</Text>
      <Text style={styles.text}>remaining time: {remainingTime}</Text>
      <TouchableOpacity onPress={running ? stopTimer : startTimer} style={styles.button}>
        <Text style={styles.buttonText}>{running ? 'Stop' : 'Start'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 20,
    margin: 10,
  },
  button: {
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default TimerComponent;
