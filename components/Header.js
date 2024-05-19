import React from 'react';
import { StyleSheet, Text } from 'react-native';
import colors from '../styles/colors';

const Header = ({ text }) => {
  return (
    <Text style={styles.header}>{text}</Text>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default Header;