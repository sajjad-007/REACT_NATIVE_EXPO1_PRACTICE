import { icons } from '@/constants/icons';
import React from 'react';
import { Image, TextInput, View } from 'react-native';

interface Props {
  placeholder: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
}

const SearchBar = ({ placeholder, onPress, value, onChangeText }: Props) => {
  return (
    <View className="flex-row items-center bg-dark-200 px-5 py-2 rounded-full">
      <Image
        source={icons.search}
        className="absolute flex-1 ml-5"
        tintColor={'#ab8bff'}
      />
      <TextInput
        placeholder={placeholder}
        value={value}
        onPress={onPress}
        onChangeText={onChangeText}
        className="flex-1 text-white ml-8"
        placeholderTextColor="#a8b5db"
      />
    </View>
  );
};

export default SearchBar;
