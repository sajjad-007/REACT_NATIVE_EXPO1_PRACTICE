import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchMovies } from '@/services/api';
import { getTrendingMovies } from '@/services/appwrite';
import useFetch from '@/services/useFetch';
import { useRouter } from 'expo-router';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import MovieCart from '../components/MovieCart';
import SearchBar from '../components/SearchBar';
import TrendingMovieCart from '../components/TrendingMovieCart';
import '../global.css';

export default function Index() {
  const router = useRouter();
  const {
    data: trendingMovies,
    isLoading: trendingMoviesLoading,
    error: trendingMoviesError,
  } = useFetch(getTrendingMovies);
  const {
    data: popularMovieData,
    isLoading: popularMovieLoading,
    error: popularMovieError,
  } = useFetch(() => fetchMovies({ query: '' }));
  return (
    <View className="flex-1 bg-primary">
      <StatusBar barStyle="default" className="bg-transparent" />
      <Image
        source={images.bg}
        className="absolute w-full mx-auto z-0"
        resizeMethod="auto"
      />
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-18 h-18 mx-auto mt-16 mb-16" />
        {popularMovieLoading || trendingMoviesLoading ? (
          <ActivityIndicator size="large" color="#0000ff" className="mt-10" />
        ) : popularMovieError || trendingMoviesError ? (
          <View className="flex-1 self-center">
            <Text className="text-white text-sm">
              Error:
              {popularMovieError?.message || trendingMoviesError?.message}
            </Text>
          </View>
        ) : (
          <View className="mt-10 px-6">
            <SearchBar
              placeholder="Search through 300+ movies online"
              onPress={() => {
                router.push('/(tabs)/Search');
              }}
            />
            {trendingMovies && (
              <View className="pt-10 pb-6">
                <Text className="text-white text-xl font-bold mb-6">
                  Trending movies
                </Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ gap: 20 }}
                  data={trendingMovies}
                  renderItem={({ item, index }) => (
                    <TrendingMovieCart movie={item} index={index} />
                  )}
                  keyExtractor={item => item.$id}
                />
              </View>
            )}
            <Text className="text-white text-xl font-bold my-6">
              Latest movies
            </Text>
            <FlatList
              data={popularMovieData}
              renderItem={({ item }) => <MovieCart {...item} />}
              keyExtractor={item => item.id.toString()}
              // className="flex "
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: 'flex-start',
                gap: 14,
                marginBottom: 24,
              }}
              scrollEnabled={false}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
