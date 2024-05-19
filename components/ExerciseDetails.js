// ExerciseDetails.js
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ImageBackground, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import Icon from 'react-native-vector-icons/Ionicons';
import TimerItem from '../components/TimerItem';
import { GlobalContext } from '../context/GlobalProvider';
import useExerciseTimer from '../hooks/useExerciseTimer';
import colors from '../styles/colors';
import AddButton from './AddButton';
import Button from './Button';
import { styles } from './ExerciseDetailsStyles';
import StepperInput from './StepperInput';

const ExerciseDetails = ({ route, navigation }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const { exerciseId: routeExerciseId } = route.params || {};
  const [exerciseId, setExerciseId] = useState(routeExerciseId);
  const exercise = state.exercises.find((ex) => ex.id === exerciseId) || { name: '', timers: [] };
  const [name, setName] = useState(exercise.name);
  const [timers, setTimers] = useState(exercise.timers);
  const [repeatCount, setRepeatCount] = useState(exercise.repeatCount || 1);
  const [running, setRunning] = useState(false);
  const previousTimersRef = useRef(timers);
  const { remainingTime, currentLoop, currentRepeat, timerRef } = useExerciseTimer(timers, running, setRunning, repeatCount);

  useEffect(() => {
    const updatedExercise = state.exercises.find((ex) => ex.id === exerciseId);
    if (updatedExercise) {
      setTimers(updatedExercise.timers);
    }
  }, [state.exercises, exerciseId]);

  useEffect(() => {
    if (JSON.stringify(previousTimersRef.current) !== JSON.stringify(timers)) {
      const newTimers = timers.map((timer, index) => ({ ...timer, order: index }));
      dispatch({ type: 'EDIT_EXERCISE', payload: { ...exercise, timers: newTimers } });
      previousTimersRef.current = timers;
    }
  }, [timers, exercise]);

  const saveExercise = () => {
    const newExercise = { id: exerciseId || Date.now(), name, timers, repeatCount };
    if (exerciseId) {
      dispatch({ type: 'EDIT_EXERCISE', payload: newExercise });
    } else {
      dispatch({ type: 'ADD_EXERCISE', payload: newExercise });
    }
    setExerciseId(newExercise.id);
    Keyboard.dismiss();
  };

  const startExercise = () => {
    if (running) return;
    setRunning(true);
  };

  const stopExercise = () => {
    setRunning(false);
  };

  const renderItem = ({ item, drag }) => (
    <TimerItem
      item={item}
      timers={timers}
      remainingTime={remainingTime}
      currentLoop={currentLoop}
      running={running}
      timerRef={timerRef}
      exerciseId={exerciseId}
      navigation={navigation}
      setTimers={setTimers}
      dispatch={dispatch}
      drag={drag}
    />
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/background.jpg')}
        imageStyle={styles.backgroundImageOpacity}
        style={styles.background}>
        <View style={styles.innerContainer}>
          <Text style={styles.header}>{exercise.name}</Text>
          <View>
            <TouchableOpacity style={[styles.runButton, !timers.length && styles.runButtonDisabled]} onPress={running ? stopExercise : startExercise}>
              {!running ?
                <>
                  <Icon name="play-outline" size={24} color="#fff" />
                  <Text style={styles.buttonText}>Start</Text>
                </> :
                <>
                  <Icon name="stop-outline" size={24} color="#fff" />
                  <Text style={styles.buttonText}>{`Stop ${currentRepeat} / ${repeatCount}`}</Text>
                </>
              }
            </TouchableOpacity>
          </View>
          <View style={styles.inputsContainer}>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={(text) => {
                setName(text);
                const updatedExercise = { ...exercise, name: text };
                dispatch({ type: 'EDIT_EXERCISE', payload: updatedExercise });
              }}
              placeholder="Exercise Name"
              editable={!running}
            />
            <View style={styles.stepperContainer}>
              <StepperInput value={repeatCount} onChange={setRepeatCount} disabled={running} />
            </View>
          </View>
          <DraggableFlatList
            data={timers}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            onDragEnd={({ data }) => setTimers(data)}
          />
          <View style={styles.buttonContainer}>
            {!running && !exerciseId && (
              <>
                <Button text="Save" iconName="checkmark-outline" onPress={saveExercise} backgroundColor={colors.primary} disabled={name.length === 0} />
                <Button text="Cancel" iconName="close-outline" onPress={() => navigation.goBack()} backgroundColor={colors.secondary} />
              </>
            )}
          </View>
        </View>
      </ImageBackground>
      {!running && exerciseId &&
        (<AddButton
          navigation={navigation}
          destination={'TimerDetails'}
          exerciseId={exerciseId}
          params={{ exerciseId: exerciseId || new Date().toISOString() }}
        />)}
    </View>
  );
};

export default ExerciseDetails;
