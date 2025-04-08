import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useState } from 'react';
import { Bell, Moon, Sun, Trash2 } from 'lucide-react-native';
import { useHabits } from '@/hooks/useHabits';
import { useTheme } from '@/context/ThemeContext';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const { resetAllHabits } = useHabits();
  const { theme, setTheme, isDark } = useTheme();

  const handleResetData = () => {
    Alert.alert(
      'Подтверждение',
      'Вы уверены, что хотите удалить все привычки? Это действие нельзя отменить.',
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: resetAllHabits,
        },
      ],
    );
  };

  const handleThemeChange = () => {
    setTheme(isDark ? 'light' : 'dark');
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
        ]}>Настройки</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={[
            styles.sectionTitle,
            isDark && { color: '#9ca3af' }
          ]}>Предпочтения</Text>
          
          <View style={[
            styles.setting,
            isDark && { backgroundColor: '#2c2d31' }
          ]}>
            <View style={styles.settingInfo}>
              <Bell size={20} color={isDark ? '#6366f1' : '#6366f1'} />
              <Text style={[
                styles.settingText,
                isDark && { color: '#fff' }
              ]}>Уведомления</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#e2e8f0', true: '#818cf8' }}
              thumbColor={notifications ? '#6366f1' : '#fff'}
            />
          </View>

          <View style={[
            styles.setting,
            isDark && { backgroundColor: '#2c2d31' }
          ]}>
            <View style={styles.settingInfo}>
              {isDark ? (
                <Moon size={20} color="#6366f1" />
              ) : (
                <Sun size={20} color="#6366f1" />
              )}
              <Text style={[
                styles.settingText,
                isDark && { color: '#fff' }
              ]}>Тёмная тема</Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={handleThemeChange}
              trackColor={{ false: '#e2e8f0', true: '#818cf8' }}
              thumbColor={isDark ? '#6366f1' : '#fff'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[
            styles.sectionTitle,
            isDark && { color: '#9ca3af' }
          ]}>Управление данными</Text>
          
          <TouchableOpacity
            style={[
              styles.dangerButton,
              isDark && { backgroundColor: '#2c2d31' }
            ]}
            onPress={handleResetData}
          >
            <Trash2 size={20} color="#ef4444" />
            <Text style={styles.dangerButtonText}>Сбросить все данные</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={[
            styles.sectionTitle,
            isDark && { color: '#9ca3af' }
          ]}>О приложении</Text>
          <Text style={[
            styles.version,
            isDark && { color: '#9ca3af' }
          ]}>Версия 1.0.0</Text>
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    color: '#1e293b',
    marginLeft: 12,
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fef2f2',
    padding: 16,
    borderRadius: 12,
  },
  dangerButtonText: {
    color: '#ef4444',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  version: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
});