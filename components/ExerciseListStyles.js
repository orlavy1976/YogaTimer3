import { StyleSheet } from 'react-native';
import colors from '../styles/colors';

export const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundImageOpacity: {
    opacity: 0.2, // Adjust the opacity as needed
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
  customIcon: {
    width: 48,
    height: 48,
    marginRight: 8,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 80,
    backgroundColor: colors.primary,
    borderRadius: 35, // making it round
    width: 70, // equal width and height to make it circular
    height: 70, // equal width and height to make it circular
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, // shadow for android
    shadowColor: '#000', // shadow for iOS
    shadowOffset: { width: 0, height: 2 }, // shadow for iOS
    shadowOpacity: 0.2, // shadow for iOS
    shadowRadius: 8, // shadow for iOS
  },
  addButtonText: {
    color: colors.iconColor,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.cardBackground,
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginLeft: 'auto',
  },
  iconButton: {
    backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },
});
