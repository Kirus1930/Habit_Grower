import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { useHabits } from '@/hooks/useHabits';
import { useTheme } from '@/context/ThemeContext';

export default function AddHabitScreen() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { addHabit } = useHabits();
  const { isDark } = useTheme();

  const handleSubmit = async () => {
    if (!name.trim()) {
      Alert.alert('Ошибка', 'Пожалуйста, введите название привычки');
      return;
    }

    try {
      await addHabit(name.trim(), description.trim());
      router.push('/');
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось создать привычку. Попробуйте еще раз.');
    }
  };

  return (
    <View style={[
      styles.container,
      isDark && { backgroundColor: '#1a1b1e' }
    ]}>
      <View style={[
        styles.header,
        isDark && { backgroundColor: '#2c2d31', borderBottomColor: '#2c2d31' }
      ]}>
        <Text style={[
          styles.title,
          isDark && { color: '#fff' }
        ]}>Создать новую привычку</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={[
            styles.label,
            isDark && { color: '#fff' }
          ]}>Название привычки</Text>
          <TextInput
            style={[
              styles.input,
              isDark && {
                backgroundColor: '#2c2d31',
                borderColor: '#4c4d51',
                color: '#fff'
              }
            ]}
            value={name}
            onChangeText={setName}
            placeholder="например, Утренняя медитация"
            placeholderTextColor={isDark ? '#9ca3af' : '#64748b'}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[
            styles.label,
            isDark && { color: '#fff' }
          ]}>Описание</Text>
          <TextInput
            style={[
              styles.input,
              styles.textArea,
              isDark && {
                backgroundColor: '#2c2d31',
                borderColor: '#4c4d51',
                color: '#fff'
              }
            ]}
            value={description}
            onChangeText={setDescription}
            placeholder="например, 10 минут осознанности"
            placeholderTextColor={isDark ? '#9ca3af' : '#64748b'}
            multiline
            numberOfLines={4}
          />
        </View>

        <TouchableOpacity 
          style={[
            styles.button,
            !name && styles.buttonDisabled
          ]}
          onPress={handleSubmit}
          disabled={!name}
        >
          <Text style={styles.buttonText}>Создать привычку</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: '#94a3b8',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});