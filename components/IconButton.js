import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../styles/colors';

const IconButton = ({ onPress, name, disabled }) => {
  return (
    <TouchableOpacity style={styles.iconButton} onPress={onPress} disabled={disabled}>
      <Icon name={name} size={20} color="#fff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },
});

export default IconButton;