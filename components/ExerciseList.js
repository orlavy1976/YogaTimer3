import React, { useContext } from 'react';
import { FlatList, Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { GlobalContext } from '../context/GlobalProvider';
import levenshtein from '../utils/levenshtein';
import { styles } from './ExerciseListStyles';
const backgroundImage = require('../assets/background.jpg');
const ExerciseList = ({ navigation }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const { exercises } = state;

  const removeExercise = (id) => {
    dispatch({ type: 'REMOVE_EXERCISE', payload: id });
  };

  const icons = [
    { name: 'asana', src: require('../assets/icons/asana.jpg') },
    { name: 'bliss', src: require('../assets/icons/bliss.jpg') },
    { name: 'chakrasana', src: require('../assets/icons/chakrasana.jpg') },
    { name: 'meditation', src: require('../assets/icons/meditation.jpg') },
    { name: 'power', src: require('../assets/icons/power.jpg') },
    { name: 'shavasana', src: require('../assets/icons/shavasana.jpg') },
    { name: 'standing', src: require('../assets/icons/standing.jpg') },
    { name: 'sunsalutation', src: require('../assets/icons/sunsalutation.jpg') }
  ];

  const getLevenshteinSimilarity = (str1, str2) => {
    const distance = levenshtein(str1.toLowerCase(), str2.toLowerCase());
    return 1 - distance / Math.max(str1.length, str2.length);
  };

  const getBestMatchingIcon = (exerciseName) => {
    let bestMatch = null;
    let highestSimilarity = 0;

    icons.forEach(icon => {
      const similarity = getLevenshteinSimilarity(exerciseName, icon.name);
      if (similarity > highestSimilarity) {
        highestSimilarity = similarity;
        bestMatch = icon.src;
      }
    });

    if (highestSimilarity < 0.5) {
      bestMatch = icons[Math.floor(Math.random() * icons.length)].src;
    }

    return bestMatch;
  };

  const handleError = (e) => { console.log(e.nativeEvent.error); };
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
