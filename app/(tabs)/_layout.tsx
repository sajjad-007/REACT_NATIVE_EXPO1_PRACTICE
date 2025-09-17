import { Tabs } from 'expo-router';
import React from 'react';

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarItemStyle: {
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarStyle: {
          backgroundColor: '#0F0D23',
          position: 'absolute',
          height: 60,
          marginHorizontal: 27,
          marginBottom: 30,
          borderRadius: 50,
          borderColor: '#0F0D23',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          // tabBarIcon: ({ focused }) => <ImageBackground></ImageBackground>,
        }}
      />
      <Tabs.Screen
        name="Search"
        options={{
          title: 'Search',
        }}
      />
      <Tabs.Screen
        name="Saved"
        options={{
          title: 'Saved',
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: 'Profile',
        }}
      />
    </Tabs>
  );
};

export default _layout;
