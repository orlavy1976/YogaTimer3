import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundImageOpacity: {
    opacity: 0.2, // Adjust the opacity as needed
  },
  container: {
    flex: 1,
  },
  innerContainer: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6a4c93',
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
    backgroundColor: '#6a4c93',
    borderRadius: 30, // making it round
    width: 60, // equal width and height to make it circular
    height: 60, // equal width and height to make it circular
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, // shadow for android
    shadowColor: '#000', // shadow for iOS
    shadowOffset: { width: 0, height: 2 }, // shadow for iOS
    shadowOpacity: 0.2, // shadow for iOS
    shadowRadius: 8, // shadow for iOS
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  exerciseItem: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
  },
  exerciseLeftSide: {
    flexDirection: 'row',
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  exerciseTimers: {
    fontSize: 14,
    color: '#666666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  iconButton: {
    backgroundColor: '#b2947b',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },
});
