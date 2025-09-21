import { icons } from '@/constants/icons';
import { Link } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const MovieCart = ({
  id,
  title,
  poster_path,
  release_date,
  vote_count,
  vote_average,
}: Movie) => {
  return (
    <Link href={`../movies/${id}`} className="flex-1 w-[30%]" asChild>
      <TouchableOpacity>
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : 'https://placeholder.co/600*400/1a1a1a/ffffff.png',
          }}
          className="h-56 w-full object-cover rounded-lg"
          alt="not found"
          resizeMethod="auto"
        />

        <Text className="text-white text-lg mt-2" numberOfLines={1}>
          {title}
        </Text>
        <View className="flex-row items-center justify-start gap-2">
          <Image source={icons.star} alt="not found" />
          <Text className="text-white text-sm mt-1">
            {Math.round(vote_average / 2)}
          </Text>
        </View>
        <Text className="text-white text-sm mt-1">
          {release_date.split('-')[0]}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCart;
