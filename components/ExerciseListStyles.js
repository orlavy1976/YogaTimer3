import { StyleSheet } from 'react-native';
import colors from '../styles/colors';

export const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundImageOpacity: {
    opacity: 0.2,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  innerContainer: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  exerciseLeftSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  exerciseTimers: {
    fontSize: 14,
    color: colors.textPrimary,
  },
  dragging: {
    opacity: 0.3,
  },
});
