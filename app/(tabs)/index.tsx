import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchMovies } from '@/services/api';
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
import '../global.css';

export default function Index() {
  const router = useRouter();
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
        {popularMovieLoading ? (
          <ActivityIndicator size="large" color="#0000ff" className="mt-10" />
        ) : popularMovieError ? (
          <View className="flex-1 self-center">
            <Text className="text-white text-sm">
              Error: {popularMovieError.message}
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
            <Text className="text-white text-xl font-bold my-6">
              Popular Movies
            </Text>
            <FlatList
              data={popularMovieData}
              renderItem={({ item }) => <MovieCart {...item} />}
              keyExtractor={item => item.id.toString()}
              // className="flex "
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: 'flex-start',
                gap: 12,
                marginBottom: 20,
              }}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
