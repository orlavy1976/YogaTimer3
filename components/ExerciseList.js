import React, { useContext } from 'react';
import { FlatList, Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { GlobalContext } from '../context/GlobalProvider';
import getBestMatchingIcon from '../utils/getBestMatchingIcon';
import { styles } from './ExerciseListStyles';

const ExerciseList = ({ navigation }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const { exercises } = state;

  const removeExercise = (id) => {
    dispatch({ type: 'REMOVE_EXERCISE', payload: id });
  };

  return (

    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/background.jpg')}
        imageStyle={styles.backgroundImageOpacity}
        style={styles.background}>
        <View style={styles.innerContainer}>
          <FlatList
            data={exercises}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <View style={styles.exerciseItem}>
                <View style={styles.exerciseLeftSide}>
                  <Image source={getBestMatchingIcon(item.name)} style={styles.customIcon} />
                  <TouchableOpacity onPress={() => navigation.navigate('ExerciseDetails', { exerciseId: item.id })}>
                    <View>
                      <Text style={styles.exerciseName}>{item.name}</Text>
                      <Text style={styles.exerciseTimers}>Timers: {item.timers.length}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.iconButton} onPress={() => removeExercise(item.id)}>
                    <Icon name="trash-outline" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />

        </View>
      </ImageBackground>
      <View style={styles.addButton}>
        <TouchableOpacity onPress={() => navigation.navigate('ExerciseDetails')}>
          <Icon name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View >

  );
};

export default ExerciseList;
