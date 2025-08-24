import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mb-4">
    <Text className="text-light-300 text-xs mb-1">{label}</Text>
    <Text className="text-white text-sm font-semibold">{value || "N/A"}</Text>
  </View>
);

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id.toString())
  );

  return (
    <View className="bg-primary flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[550px] rounded-b-3xl shadow-lg"
            resizeMode="cover"
          />

          <View className="absolute top-5 right-5 bg-dark-200 rounded-full px-3 py-1 flex-row items-center shadow-md">
            <Image source={icons.star} className="w-4 h-4 mr-1" />
            <Text className="text-white font-bold text-sm">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
          </View>
        </View>

        <View className="px-5 mt-6">
          <Text className="text-white text-2xl font-bold mb-2">
            {movie?.title}
          </Text>

          <View className="flex-row items-center space-x-4 mb-4">
            <Text className="text-light-200 text-sm">
              {movie?.release_date?.slice(0, 4)}
            </Text>
            <Text className="text-light-200 text-sm"> | {movie?.runtime} minutes</Text>
          </View>

          <MovieInfo label="Overview" value={movie?.overview} />

          <Text className="text-white text-sm font-semibold mb-2">Genres</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-4 space-x-2"
          >
            {movie?.genres?.map((g) => (
              <View key={g.id} className="bg-dark-100 px-3 py-1 rounded-full">
                <Text className="text-white text-xs">{g.name}</Text>
              </View>
            ))}
          </ScrollView>

          <View className="flex-row justify-between">
            <MovieInfo
              label="Budget"
              value={`$${(movie?.budget ?? 0) / 1_000_000}M`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${Math.round((movie?.revenue ?? 0) / 1_000_000)}M`}
            />
          </View>

          <Text className="text-white text-sm font-semibold mt-4 mb-2">
            Production Companies
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-6 space-x-2"
          >
            {movie?.production_companies.map((c) => (
              <View key={c.id} className="bg-dark-100 px-3 py-1 rounded-full">
                <Text className="text-white text-xs">{c.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <SafeAreaView
        className="absolute bottom-0 left-0 right-0 bg-primary px-5 py-4"
        style={{ elevation: 12 }}
      >
        <TouchableOpacity
          className="bg-accent rounded-full py-3 flex-row items-center justify-center"
          onPress={router.back}
        >
          <Image
            source={icons.arrow}
            className="w-5 h-5 mr-2 rotate-180"
            tintColor="#fff"
          />
          <Text className="text-white font-semibold text-base">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({});
