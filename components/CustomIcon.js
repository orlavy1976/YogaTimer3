import React from 'react';
import { Image, StyleSheet } from 'react-native';

const CustomIcon = ({ source }) => {
  return (
    <Image source={source} style={styles.customIcon} />
  );
};

const styles = StyleSheet.create({
  customIcon: {
    width: 48,
    height: 48,
    marginRight: 8,
  },
});

export default CustomIcon;