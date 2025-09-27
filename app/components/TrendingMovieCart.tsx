import { images } from '@/constants/images';
import MaskedView from '@react-native-masked-view/masked-view';
import { Link } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
const TrendingMovieCart = ({
  movie: { title, poster_url, movie_id },
  index,
}: TrendingCardProps) => {
  return (
    <Link href={`../movies/${movie_id}`} asChild>
      <TouchableOpacity className="w-36 rounded-lg">
        <Image
          source={{ uri: poster_url }}
          className="w-36 h-56 object-cover rounded-lg"
          resizeMode="cover"
        />
        <View className="absolute left-[-10px] top-[153px]">
          <MaskedView
            maskElement={
              <Text className="text-6xl text-white font-bold ">
                {index + 1}
              </Text>
            }
          >
            <Image source={images.rankingGradient} resizeMode="contain" />
          </MaskedView>
        </View>
        <Text className="text-lg text-white mt-2" numberOfLines={1}>
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingMovieCart;
