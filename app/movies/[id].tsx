import { icons } from '@/constants/icons';
import { fetchMovieDetails } from '@/services/api';
import useFetch from '@/services/useFetch';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface Heading {
  label: string;
  text?: string | number | null | string[];
}

export const CommonHeading = ({ label, text }: Heading) => (
  <View className="flex flex-col items-start mb-6">
    <Text className="text-light-200 text-sm ">{label ?? 'N/A'}</Text>
    {label === 'Overview' ? (
      <Text className="text-white text-[14px] leading-7">{text ?? ''}</Text>
    ) : (
      <Text className="text-light-100 font-semibold text-sm leading-7 ">
        {text ?? 'N/A'}
      </Text>
    )}
  </View>
);

const Movies = () => {
  const { id } = useLocalSearchParams();
  const {
    data: movie,
    isLoading,
    error,
  } = useFetch(() => fetchMovieDetails(id as string));

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: movie?.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`
                : 'https://placeholder.co/600*400/1a1a1a/ffffff.png',
            }}
            className="h-[560px] w-full rounded-2xl "
            resizeMode="stretch"
          />
          <TouchableOpacity className="absolute right-10 -bottom-6 size-24 bg-white rounded-full flex items-center justify-center">
            <Image
              source={icons.play}
              className="w-10 h-10"
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>

        <View className="mt-5 px-5">
          {/* Heading part start */}
          <View>
            <Text className="text-xl font-bold leading-7 text-white">
              {movie?.title ?? 'N/A'}
            </Text>
          </View>
          <View className="flex-row items-center mt-2 mb-4 gap-x-2">
            <Text className="text-light-200 text-sm leading-7">
              {movie?.release_date.split('-')[0]}
            </Text>
            <Text className="w-1 h-1 bg-light-200 rounded-full"></Text>
            <Text className="text-light-200 text-sm leading-7">
              {movie?.runtime}m
            </Text>
            {movie?.adult ? (
              <>
                <Text className="w-1 h-1 bg-light-200 rounded-full"></Text>{' '}
                <Text className="text-light-200 text-sm leading-7">
                  {movie?.adult && '18+'}
                </Text>
              </>
            ) : (
              ''
            )}
          </View>
          {/* Heading part end */}

          {/* Rating part end*/}
          <View className="bg-[#221F3D] py-2 px-3 flex-row items-center justify-center w-[170px] rounded-lg mb-6">
            <Image source={icons.star} className="w-4 h-4" resizeMode="cover" />

            <Text className="text-white text-sm ml-2">
              {movie?.vote_average}
            </Text>
            <Text className="text-light-200 text-sm">/10</Text>
            <Text className="text-light-200 text-sm ml-2">
              ({movie?.vote_count}votes)
            </Text>
          </View>
          {/* Rating part end*/}
          <CommonHeading label="Overview" text={movie?.overview} />
          <View className="flex-row items-center gap-x-8">
            <CommonHeading
              label="Release date"
              text={movie?.release_date.split('-')[0]}
            />
            <CommonHeading label="Status" text={movie?.status} />
          </View>
          <Text className="text-sm text-light-200">Generes</Text>
          <View className="mb-6 mt-2 flex-row flex-wrap  gap-4">
            {movie?.genres.map(item => (
              <View
                key={item.id}
                className="bg-[#221F3D] py-[6px] px-[10px] flex items-center justify-center  rounded-lg "
              >
                <Text className="text-sm font-semibold text-white">
                  {item.name}
                </Text>
              </View>
            ))}
          </View>
          <CommonHeading
            label="Countries"
            text={movie?.production_countries
              ?.map(item => item.name)
              .join('     •     ')}
          />
          {/* Budget */}
          <View className="flex-row items-center gap-x-8">
            <CommonHeading
              label="Budget"
              text={`$${Math.round(movie?.budget ?? 0) / 1_000_000} million`}
            />
            <CommonHeading
              label="Revenue"
              text={`$${Math.floor(movie?.revenue ?? 0) / 1_000_000} million`}
            />
          </View>
          <CommonHeading label="Tagline" text={movie?.tagline} />
          <CommonHeading
            label="Production Companies"
            text={movie?.production_companies
              ?.map(item => item.name)
              .join('   •   ')}
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={router.back}
        className="bg-accent absolute right-6 left-6 bottom-4 py-3 rounded-lg flex-row items-center justify-center gap-2"
      >
        <Text className="text-white text-lg capitalize font-semibold leading-3">
          Visit homepage
        </Text>
        <Image
          source={icons.arrow}
          className="w-7 h-7 mt-1"
          resizeMode="cover"
          tintColor={'#fff'}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Movies;
