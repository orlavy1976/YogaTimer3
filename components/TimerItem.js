import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../styles/colors';
import { styles } from './ExerciseDetailsStyles';

const TimerItem = ({ item, timers, remainingTime, currentLoop, running, timerRef, exerciseId, navigation, setTimers, dispatch, drag }) => {
  const progress = item.id === timerRef.current?.id
    ? (item.duration - remainingTime) / item.duration
    : 0;
  return (
    <TouchableOpacity
      onLongPress={drag}
      disabled={running}
      style={styles.timerItemContainer}
    >
      <View style={styles.timerItem}>
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
            <Icon name="pencil-outline" size={20} color={colors.iconColor} />
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
            <Icon name="trash-outline" size={20} color={colors.iconColor} />
          </TouchableOpacity>
        </View>
      </View>
      {running && item.id === timerRef.current?.id && <View style={styles.progressBarContainer}>
        <Progress.Bar
          progress={progress}
          width={null}
          color={colors.primary}
          style={styles.progressBar}
        />
      </View>
      }
    </TouchableOpacity>
  );
};

export default TimerItem;
