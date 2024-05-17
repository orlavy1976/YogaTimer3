import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useReducer } from 'react';

const initialState = {
  exercises: [
    { id: '1', name: 'Long Flow', timers: [{ id: '1', duration: 30, loop: 30, soundAtStart: true }] },
  ],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_EXERCISE':
      return { ...state, exercises: [...state.exercises, action.payload] };
    case 'EDIT_EXERCISE':
      return {
        ...state,
        exercises: state.exercises.map((exercise) =>
          exercise.id === action.payload.id ? action.payload : exercise
        ),
      };
    case 'REMOVE_EXERCISE':
      return { ...state, exercises: state.exercises.filter((exercise) => exercise.id !== action.payload) };
    case 'ADD_TIMER':
      return {
        ...state,
        exercises: state.exercises.map((exercise) =>
          exercise.id === action.payload.exerciseId
            ? { ...exercise, timers: [...exercise.timers, action.payload.timer] }
            : exercise
        ),
      };
    case 'EDIT_TIMER':
      return {
        ...state,
        exercises: state.exercises.map((exercise) =>
          exercise.id === action.payload.exerciseId
            ? {
              ...exercise,
              timers: exercise.timers.map((timer) =>
                timer.id === action.payload.timer.id ? action.payload.timer : timer
              ),
            }
            : exercise
        ),
      };
    case 'REMOVE_TIMER':
      return {
        ...state,
        exercises: state.exercises.map((exercise) =>
          exercise.id === action.payload.exerciseId
            ? {
              ...exercise,
              timers: exercise.timers.filter((timer) => timer.id !== action.payload.timerId),
            }
            : exercise
        ),
      };
    case 'SET_STATE':
      return { ...action.payload };
    default:
      return state;
  }
};

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const loadState = async () => {
      const savedState = await AsyncStorage.getItem('state');
      if (savedState) {
        dispatch({ type: 'SET_STATE', payload: JSON.parse(savedState) });
      }
    };
    loadState();
  }, []);

  useEffect(() => {
    const saveState = async () => {
      await AsyncStorage.setItem('state', JSON.stringify(state));
    };
    saveState();
  }, [state]);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
