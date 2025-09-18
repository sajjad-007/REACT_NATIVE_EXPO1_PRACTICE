import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { Tabs } from 'expo-router';
import React from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';

const TabIcon = ({ icons, text, focused }: any) => {
  if (focused) {
    return (
      <ImageBackground
        source={images.highlight}
        className="absolute flex flex-1 gap-2 flex-row w-full min-w-[120px] min-h-[60px] mt-6 items-center justify-center rounded-full overflow-hidden"
      >
        <Image source={icons} tintColor="#151312" className="size-5" />
        <Text className="text-secondary text-sm font-bold capitalize">
          {text}
        </Text>
      </ImageBackground>
    );
  } else {
    return (
      <View className="flex flex-1 gap-2 flex-row w-full min-w-[120px] min-h-[60px] mt-6 items-center justify-center rounded-full overflow-hidden">
        <Image source={icons} tintColor="#fff" className="size-5" />
      </View>
    );
  }
};
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
          height: 54,
          marginHorizontal: 20,
          marginBottom: 30,
          borderRadius: 50,
          borderColor: '#0F0D23',
          overflow: 'hidden',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'index',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icons={icons.home} text={'home'} />
          ),
        }}
      />
      <Tabs.Screen
        name="Search"
        options={{
          title: 'Search',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icons={icons.search} text={'search'} />
          ),
        }}
      />
      <Tabs.Screen
        name="Saved"
        options={{
          title: 'Saved',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icons={icons.save} text={'Savedf'} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icons={icons.person} text={'profile'} />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
