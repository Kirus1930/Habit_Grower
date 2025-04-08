import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ChartBar as BarChart2 } from 'lucide-react-native';

export default function StatsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Статистика</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <BarChart2 size={24} color="#6366f1" />
            <Text style={styles.cardTitle}>Обзор за неделю</Text>
          </View>
          
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>85%</Text>
              <Text style={styles.statLabel}>Выполнено</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Привычек</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>Идеальных дней</Text>
            </View>
          </View>
        </View>

        <View style={styles.streakCard}>
          <Text style={styles.streakTitle}>Текущая серия</Text>
          <Text style={styles.streakCount}>7 дней</Text>
          <Text style={styles.streakDescription}>Так держать! У вас отлично получается!</Text>
        </View>
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
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginLeft: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#6366f1',
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  streakCard: {
    backgroundColor: '#6366f1',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  streakTitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  streakCount: {
    fontSize: 48,
    fontWeight: '700',
    color: '#fff',
    marginVertical: 8,
  },
  streakDescription: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
});