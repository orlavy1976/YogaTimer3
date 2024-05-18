// TimerItem.js
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from './ExerciseDetailsStyles';

const TimerItem = ({ item, timers, remainingTime, currentLoop, running, timerRef, exerciseId, navigation, setTimers, dispatch, drag }) => {
  return (
    <TouchableOpacity
      onLongPress={drag}
      disabled={running}
      style={styles.timerItem}
    >
      <View>
        <Text style={styles.timerDetail}>
          Duration: {running && item.id === timerRef.current?.id ? `${remainingTime}/${item.duration}` : `${item.duration}s`}
        </Text>
        <Text style={styles.timerDetail}>
          Loop: {running && item.id === timerRef.current?.id ? `${currentLoop}/${item.loop}` : `${item.loop} times`}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('TimerDetails', { exerciseId, timerId: item.id })}
          disabled={running}
        >
          <Icon name="pencil-outline" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            const newTimers = timers.filter((timer) => timer.id !== item.id);
            setTimers(newTimers);
            dispatch({ type: 'REMOVE_TIMER', payload: { exerciseId, timerId: item.id } });
          }}
          disabled={running}
        >
          <Icon name="trash-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default TimerItem;
