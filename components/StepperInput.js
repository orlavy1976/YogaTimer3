import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../styles/colors';
const StepperInput = ({ label, value, onChange, disabled }) => {
  const handleChange = (number) => {
    if (number > 0 && number < 100) {
      onChange(number);
    }
  }
  return (
    <View style={[styles.container, disabled && styles.disabledContainer]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.innerContainer}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  innerContainer: {
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
    borderColor: colors.secondary,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  input: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: colors.primary,
    textAlign: 'center',
    fontSize: 16,
  },
  buttonIcon: {
    fontSize: 24,
    color: colors.iconColor,
  },
  label: {
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 10,
  },
});

export default StepperInput;
