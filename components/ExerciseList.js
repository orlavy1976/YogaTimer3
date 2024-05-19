import React, { useContext } from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { GlobalContext } from '../context/GlobalProvider';
import getBestMatchingIcon from '../utils/getBestMatchingIcon';
import AddButton from './AddButton';
import Card from './Card';
import CustomIcon from './CustomIcon';
import { styles } from './ExerciseListStyles';
import IconButton from './IconButton';
import Label from './Label';

const ExerciseList = ({ navigation }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const { exercises } = state;

  const removeExercise = (id) => {
    dispatch({ type: 'REMOVE_EXERCISE', payload: id });
  };

  const updateExercisesOrder = (data) => {
    dispatch({ type: 'UPDATE_EXERCISES_ORDER', payload: data });
  };

  const renderItem = ({ item, drag }) => (
    <Card>
      <TouchableOpacity
        onLongPress={drag}
        onPress={() => navigation.navigate('ExerciseDetails', { exerciseId: item.id })}
        style={styles.exerciseItem}>
        <View style={styles.exerciseLeftSide}>
          <CustomIcon source={getBestMatchingIcon(item.name)} />
          <View>
            <Text style={styles.exerciseName}>{item.name}</Text>
            <Label text={`Timers: ${item.timers.length}`} />
          </View>
        </View>
        <IconButton onPress={() => removeExercise(item.id)} name='trash-outline' />
      </TouchableOpacity>
    </Card>
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/background.jpg')}
        imageStyle={styles.backgroundImageOpacity}
        style={styles.background}>
        <View style={styles.innerContainer}>
          <DraggableFlatList
            data={exercises}
            keyExtractor={(item) => item.id}
            onDragEnd={({ data }) => updateExercisesOrder(data)}
            renderItem={renderItem}
          />
        </View>
      </ImageBackground>
      <AddButton navigation={navigation} destination={'ExerciseDetails'} />
    </View>
  );
};

export default ExerciseList;
