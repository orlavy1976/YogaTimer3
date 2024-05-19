import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../styles/colors';

const AddButton = ({ navigation, destination, params }) => {
  return (
    <View style={styles.addButton}>
      <TouchableOpacity onPress={() => navigation.navigate(destination, params)}>
        <Icon name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default AddButton;
