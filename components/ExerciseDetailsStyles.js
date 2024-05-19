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
    width: '50%',
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  timerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
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
  stepperContainer: {
    marginBottom: 10,
  },
  inputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timerLeftSide: {
    flexDirection: 'row',
    alignItems: 'left',
  },
});
