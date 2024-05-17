import React, { useContext } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { GlobalContext } from '../context/GlobalProvider';
import { styles } from './ExerciseListStyles';

const ExerciseList = ({ navigation }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const { exercises } = state;

  const removeExercise = (id) => {
    dispatch({ type: 'REMOVE_EXERCISE', payload: id });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Complex Timer</Text>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('ExerciseDetails')}>
        <Icon name="add-circle-outline" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Add Exercise</Text>
      </TouchableOpacity>
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.exerciseItem}>
            <Text style={styles.exerciseName}>{item.name}</Text>
            <Text style={styles.exerciseTimers}>Timers: {item.timers.length}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('ExerciseDetails', { exerciseId: item.id })}>
                <Icon name="pencil-outline" size={20} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton} onPress={() => removeExercise(item.id)}>
                <Icon name="trash-outline" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default ExerciseList;
