import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchMovies } from '@/services/api';
import { storeUserSearch } from '@/services/appwrite';
import useFetch from '@/services/useFetch';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import MovieCart from '../components/MovieCart';
import SearchBar from '../components/SearchBar';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const {
    data: movieData,
    isLoading,
    error,
    refetch: refetchMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }));
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery?.trim()) {
        await refetchMovies();
        if (movieData?.length > 0 && movieData?.[0]) {
          await storeUserSearch(searchQuery, movieData[0]);
        }
      } else {
        reset();
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);
  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute mx-auto w-full"
        alt="not found"
      />
      <FlatList
        data={movieData}
        renderItem={({ item }) => <MovieCart {...item} />}
        keyExtractor={item => item.id.toString()}
        className="px-6 pb-2"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'flex-start',
          gap: 15,
          marginBottom: 20,
        }}
        ListHeaderComponent={
          <>
            {isLoading && (
              <View className="flex-1 mt-10 mx-auto">
                <ActivityIndicator size="large" color="#ab8bff" />
              </View>
            )}
            {error && (
              <View className="flex-1 mt-10 mx-auto">
                <Text>Error: {error.message}</Text>
              </View>
            )}
            <View className="mb-10">
              <Image source={icons.logo} className="mx-auto mt-24 mb-10" />
              <SearchBar
                placeholder="Search your movies"
                value={searchQuery}
                onChangeText={text => setSearchQuery(text)}
              />
              {!isLoading && !error && searchQuery?.trim() && (
                <View className="flex flex-row items-center gap-4 mt-5 px-3 overflow-hidden ">
                  <Text className="text-xl  text-[#a8b5db] ">
                    Search result showing for:
                  </Text>
                  <Text className="text-xl text-[#ab8bff]">{searchQuery}</Text>
                </View>
              )}
            </View>
          </>
        }
        ListEmptyComponent={
          <View>
            {!isLoading && !error ? (
              <Text className="text-xl text-red-500 mt-16 mx-auto">
                {searchQuery?.trim()
                  ? 'No movies found!'
                  : 'Start searching for a movie'}
              </Text>
            ) : null}
          </View>
        }
      />
    </View>
  );
};

export default Search;
