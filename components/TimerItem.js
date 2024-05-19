import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import * as Progress from 'react-native-progress';
import colors from '../styles/colors';
import CustomIcon from './CustomIcon';
import { styles } from './ExerciseDetailsStyles';
import IconButton from './IconButton';
import Label from './Label';

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
        <View style={styles.timerLeftSide}>
          <CustomIcon source={require('../assets/icons/timer.jpg')} />
          <View>
            <Label text={`Duration: ${running && item.id === timerRef.current?.id ? `${remainingTime}/${item.duration}` : `${item.duration}s`}`} />
            <Label text={`Loop: ${running && item.id === timerRef.current?.id ? `${currentLoop}/${item.loop}` : `${item.loop} times`}`} />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <IconButton
            onPress={() => navigation.navigate('TimerDetails', { exerciseId, timerId: item.id })}
            name='pencil-outline'
            disabled={running}
          />
          <IconButton
            onPress={() => {
              const newTimers = timers.filter((timer) => timer.id !== item.id);
              setTimers(newTimers);
              dispatch({ type: 'REMOVE_TIMER', payload: { exerciseId, timerId: item.id } });
            }}
            name='trash-outline'
            disabled={running}
          />
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
