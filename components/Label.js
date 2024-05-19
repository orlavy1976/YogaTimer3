import React from 'react';
import { StyleSheet, Text } from 'react-native';
import colors from '../styles/colors';

const Label = ({ text }) => {
  return (
    <Text style={styles.label}>{text}</Text>
  );
};

const styles = StyleSheet.create({
  label: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
  },
});

export default Label;