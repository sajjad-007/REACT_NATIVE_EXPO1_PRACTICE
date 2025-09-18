import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { useRouter } from 'expo-router';
import { Image, ScrollView, StatusBar, View } from 'react-native';
import SearchBar from '../components/SearchBar';
import '../global.css';

export default function Index() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-primary">
      <StatusBar barStyle="default" />
      <Image
        source={images.bg}
        className="absolute w-full mx-auto z-0"
        resizeMethod="auto"
      />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-18 h-18 mx-auto mt-16 mb-16" />
        <View>
          <SearchBar
            placeholder="Search through 300+ movies online"
            onPress={() => {
              router.push('/(tabs)/Search');
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
