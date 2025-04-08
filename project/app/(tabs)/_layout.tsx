import { Tabs } from 'expo-router';
import { Chrome as Home, ChartBar as BarChart2, CirclePlus as PlusCircle, Settings } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarStyle: {
        backgroundColor: '#ffffff',
        borderTopColor: '#f1f5f9',
      },
      tabBarActiveTintColor: '#6366f1',
      tabBarInactiveTintColor: '#94a3b8',
      headerShown: false,
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Сегодня',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: 'Добавить',
          tabBarIcon: ({ color, size }) => <PlusCircle size={size} color={color} />
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Статистика',
          tabBarIcon: ({ color, size }) => <BarChart2 size={size} color={color} />
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Настройки',
          tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />
        }}
      />
    </Tabs>
  );
}