import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Habit {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  createdAt: string;
  completedDates: string[];
}

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHabits();
  }, []);

  const loadHabits = async () => {
    try {
      const storedHabits = await AsyncStorage.getItem('habits');
      if (storedHabits) {
        setHabits(JSON.parse(storedHabits));
      }
    } catch (error) {
      console.error('Ошибка при загрузке привычек:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveHabits = async (updatedHabits: Habit[]) => {
    try {
      await AsyncStorage.setItem('habits', JSON.stringify(updatedHabits));
      setHabits(updatedHabits);
    } catch (error) {
      console.error('Ошибка при сохранении привычек:', error);
    }
  };

  const addHabit = async (name: string, description: string) => {
    const newHabit: Habit = {
      id: Date.now().toString(),
      name,
      description,
      completed: false,
      createdAt: new Date().toISOString(),
      completedDates: [],
    };
    await saveHabits([...habits, newHabit]);
  };

  const toggleHabit = async (id: string) => {
    const today = new Date().toISOString().split('T')[0];
    const updatedHabits = habits.map(habit => {
      if (habit.id === id) {
        const isCompleted = !habit.completed;
        const completedDates = isCompleted
          ? [...habit.completedDates, today]
          : habit.completedDates.filter(date => date !== today);
        return { ...habit, completed: isCompleted, completedDates };
      }
      return habit;
    });
    await saveHabits(updatedHabits);
  };

  const deleteHabit = async (id: string) => {
    const updatedHabits = habits.filter(habit => habit.id !== id);
    await saveHabits(updatedHabits);
  };

  const resetAllHabits = async () => {
    await AsyncStorage.removeItem('habits');
    setHabits([]);
  };

  return {
    habits,
    loading,
    addHabit,
    toggleHabit,
    deleteHabit,
    resetAllHabits
  };
}