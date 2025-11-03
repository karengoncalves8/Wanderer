import { Tabs } from 'expo-router';
import React from 'react';

import FeIcon from 'react-native-vector-icons/Feather';
import IoIcon from 'react-native-vector-icons/Ionicons';
import MaIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        },
        tabBarItemStyle: {
          padding: 10
        },
        tabBarLabelStyle: { display: "none" }
      }}>
      <Tabs.Screen
        name="trips/index"
        options={{
          tabBarIcon: ({ color }) => <IoIcon name='trail-sign-outline' color={color} size={28} />
        }}
      />
      <Tabs.Screen
        name="trips/[id]"
        options={{
          href: null, 
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color }) => <FeIcon name='home' color={color} size={28} />
        }}
      />
      <Tabs.Screen
        name="booking/index"
        options={{
          tabBarIcon: ({ color }) => <MaIcon name='ticket-confirmation-outline' color={color} size={28}/>
        }}
      />
    </Tabs>
  );
}
