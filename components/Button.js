import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../styles/colors';

const Button = ({ onPress, backgroundColor, text, iconName, style, disabled }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }, style, disabled && { backgroundColor: '#ccc' }]}
      onPress={onPress}
      disabled={disabled}
    >
      {iconName && <Icon name={iconName} size={24} color="#fff" />}
      {text && <Text style={styles.buttonText}>{text}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  buttonText: {
    fontSize: 18,
    color: colors.iconColor,
    fontWeight: 'bold',
    marginLeft: 5,
    marginRight: 5,
  },
});

export default Button;
