import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './src/view/homeScreen';
import { HistoryScreen } from './src/view/historyScreen';
import { Button } from 'react-native';
import { AddTimerScreen } from './src/view/addTimerScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Timers"
          component={TimerStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="History" component={HistoryScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


const TimerStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: 'Timers',
          headerRight: () => (
            <Button title="➕" onPress={() => navigation.navigate('AddTimer')} />
          ),
        })}
      />
      <Stack.Screen
        name="AddTimer"
        component={AddTimerScreen}
        options={{ title: 'Add Timer' }}
      />
    </Stack.Navigator>
  );
};