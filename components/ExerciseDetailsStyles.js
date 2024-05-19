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
  input: {
    height: 40,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
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
  addButtonIcon: {
    fontSize: 30,
    color: colors.iconColor,
  },
  timerItemContainer: {
    flex: 1,
    backgroundColor: colors.cardBackground,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
  },
  timerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timerDetail: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  iconButton: {
    backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  runButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5ba4a4',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  runButtonDisabled: {
    backgroundColor: '#b0d6d6'
  },
  disabled: {
    opacity: 0.5,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  progressBarContainer: {
    flex: 1,
    width: '100%',
  },
  progressBar: {
    marginTop: 10,
  },
});
