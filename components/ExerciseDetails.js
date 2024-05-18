// ExerciseDetails.js
import React, { useContext, useEffect, useState } from 'react';
import { ImageBackground, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import Icon from 'react-native-vector-icons/Ionicons';
import TimerItem from '../components/TimerItem';
import { GlobalContext } from '../context/GlobalProvider';
import useExerciseTimer from '../hooks/useExerciseTimer';
import { styles } from './ExerciseDetailsStyles';

const ExerciseDetails = ({ route, navigation }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const { exerciseId } = route.params || {};
  const exercise = state.exercises.find((ex) => ex.id === exerciseId) || { name: '', timers: [] };
  const [name, setName] = useState(exercise.name);
  const [timers, setTimers] = useState(exercise.timers);
  const [running, setRunning] = useState(false);

  const { remainingTime, currentLoop, timerRef } = useExerciseTimer(timers, running, setRunning);

  useEffect(() => {
    const updatedExercise = state.exercises.find((ex) => ex.id === exerciseId);
    if (updatedExercise) {
      setTimers(updatedExercise.timers);
    }
  }, [state.exercises, exerciseId]);

  const saveExercise = () => {
    const newExercise = { id: exerciseId || new Date().toISOString(), name, timers };
    if (exerciseId) {
      dispatch({ type: 'EDIT_EXERCISE', payload: newExercise });
    } else {
      dispatch({ type: 'ADD_EXERCISE', payload: newExercise });
    }
    navigation.goBack();
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
                  <Text style={styles.buttonText}>Stop</Text>
                </>
              }
            </TouchableOpacity>
          </View>
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
          <DraggableFlatList
            data={timers}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            onDragEnd={({ data }) => setTimers(data)}
          />
          <View style={styles.buttonContainer}>
            {!running && !exerciseId && (
              <>
                <TouchableOpacity style={styles.saveButton} onPress={saveExercise}>
                  <Icon name="checkmark-outline" size={24} color="#fff" />
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                  <Icon name="close-outline" size={24} color="#fff" />
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </ImageBackground>
      <View style={styles.addButton}>
        <TouchableOpacity
          onPress={() => !running && navigation.navigate('TimerDetails', { exerciseId: exerciseId || new Date().toISOString() })}
          disabled={running}
        >
          <Icon name="add" style={styles.addButtonIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ExerciseDetails;
