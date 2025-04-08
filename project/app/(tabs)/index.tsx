import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Check, Trash2 } from 'lucide-react-native';
import { useHabits } from '@/hooks/useHabits';
import { useTheme } from '@/context/ThemeContext';

export default function TodayScreen() {
  const { habits, loading, toggleHabit, deleteHabit } = useHabits();
  const { isDark } = useTheme();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

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
        ]}>Привычки на сегодня</Text>
        <Text style={[
          styles.date,
          isDark && { color: '#9ca3af' }
        ]}>{formatDate(new Date())}</Text>
      </View>
      
      <ScrollView style={styles.habitList}>
        {habits.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={[
              styles.emptyStateText,
              isDark && { color: '#9ca3af' }
            ]}>
              Нет добавленных привычек.{'\n'}Добавьте новую привычку, чтобы начать отслеживание.
            </Text>
          </View>
        ) : (
          habits.map(habit => (
            <View key={habit.id} style={styles.habitWrapper}>
              <TouchableOpacity
                style={[
                  styles.habitCard,
                  habit.completed && styles.habitCardCompleted,
                  isDark && {
                    backgroundColor: '#2c2d31',
                    borderColor: '#2c2d31'
                  }
                ]}
                onPress={() => toggleHabit(habit.id)}
              >
                <View style={styles.habitInfo}>
                  <Text style={[
                    styles.habitName,
                    isDark && { color: '#fff' }
                  ]}>{habit.name}</Text>
                  <Text style={[
                    styles.habitDescription,
                    isDark && { color: '#9ca3af' }
                  ]}>{habit.description}</Text>
                </View>
                <View style={[
                  styles.checkBox,
                  habit.completed && styles.checkBoxCompleted,
                  isDark && { borderColor: '#4c4d51' }
                ]}>
                  {habit.completed && <Check size={20} color="#fff" />}
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteHabit(habit.id)}
              >
                <Trash2 size={20} color="#ef4444" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
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
  date: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 4,
  },
  habitList: {
    padding: 20,
  },
  habitWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  habitCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
  },
  habitCardCompleted: {
    backgroundColor: '#f8fafc',
  },
  habitInfo: {
    flex: 1,
  },
  habitName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
  },
  habitDescription: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  checkBox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    marginLeft: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBoxCompleted: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  deleteButton: {
    marginLeft: 12,
    padding: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
  },
});