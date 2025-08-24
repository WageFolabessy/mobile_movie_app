import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

const HomeHeader = ({ trendingMovies, isLoading, error }: any) => {
  const router = useRouter();

  if (isLoading) {
    return <ActivityIndicator size="small" color="#fff" className="mt-10" />;
  }

  if (error || !trendingMovies) {
    return (
      <Text className="text-red-500 text-center mt-10">
        Failed to load trending movies.
      </Text>
    );
  }

  return (
    <View className="my-5">
      <SearchBar
        onPress={() => router.push("/search?focus=1")}
        placeholder="Search for a movie..."
      />

      <View className="mt-10">
        <Text className="text-lg text-white font-bold mb-3">
          Trending Movies
        </Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View className="w-4" />}
          data={trendingMovies}
          renderItem={({ item, index }) => (
            <TrendingCard movie={item} index={index} />
          )}
          keyExtractor={(item) => item.movie_id.toString()}
        />
      </View>

      <Text className="text-lg text-white font-bold mt-5 mb-3">
        Latest Movies
      </Text>
    </View>
  );
};

export default function Index() {
  const {
    data: trendingMovie,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies);
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: refetchMovies,
  } = useFetch(() => fetchMovies({ query: "" }));
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetchMovies();
    setRefreshing(false);
  };

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard {...item} />}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 16,
          marginBottom: 16,
        }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <Image
              source={icons.logo}
              className="w-12 h-10 mt-20 mb-5 mx-auto"
            />
            <HomeHeader
              trendingMovies={trendingMovie}
              isLoading={trendingLoading}
              error={trendingError}
            />
          </>
        }
        ListEmptyComponent={() => (
          <View className="flex-1 justify-center items-center mt-20">
            {moviesLoading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : moviesError ? (
              <Text className="text-red-500 text-center">
                Error: {moviesError.message}
              </Text>
            ) : (
              <Text className="text-gray-400">No movies found.</Text>
            )}
          </View>
        )}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </View>
  );
}
