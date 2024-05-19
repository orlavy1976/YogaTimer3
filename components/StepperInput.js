import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../styles/colors';
const StepperInput = ({ value, onChange, disabled }) => {
  const handleChange = (number) => {
    if (number > 0 && number < 100) {
      onChange(number);
    }
  }
  return (
    <View style={[styles.container, disabled && styles.disabledContainer]}>
      <TouchableOpacity disabled={disabled} onPress={() => handleChange(value - 1)} style={styles.button}>
        <Icon name="remove" style={styles.buttonIcon} />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        value={value.toString()}
        onChangeText={(text) => handleChange(parseInt(text) || 0)}
        keyboardType="numeric"
        disabled={disabled}
      />
      <TouchableOpacity disabled={disabled} onPress={() => handleChange(value + 1)} style={styles.button}>
        <Icon name="add" style={styles.buttonIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledContainer: {
    opacity: 0.5,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  input: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: colors.secondary,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonIcon: {
    fontSize: 24,
    color: colors.iconColor,
  },
});

export default StepperInput;
