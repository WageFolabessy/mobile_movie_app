import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import MaskedView from "@react-native-masked-view/masked-view";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const TrendingCard = ({
  movie: {
    movie_id,
    title,
    poster_url,
    vote_average,
    vote_count,
    release_date,
    original_language,
  },
  index,
}: TrendingCardProps) => {
  return (
    <Link href={`/movies/${movie_id}`} asChild>
      <TouchableOpacity className="w-36 mr-4 relative">
        <View className="rounded-2xl overflow-hidden shadow-lg shadow-black/40">
          <Image
            className="w-36 h-52"
            source={{ uri: poster_url }}
            resizeMode="cover"
          />
          <View className="absolute -top-1 left-0">
            <MaskedView
              maskElement={
                <View className="flex-1 items-center justify-center">
                  <Text className="font-extrabold text-white text-5xl">
                    {index + 1}
                  </Text>
                </View>
              }
            >
              <Image
                source={images.rankingGradient}
                className="w-10 h-10 rounded-full"
                resizeMode="cover"
              />
            </MaskedView>
          </View>
        </View>

        <View className="mt-2">
          <Text className="text-sm font-bold text-white" numberOfLines={1}>
            {title}
          </Text>
          <Text className="text-xs text-gray-400 font-medium uppercase mt-0.5">
            {original_language}
          </Text>

          <View className="flex-row items-center mt-1">
            <Image source={icons.star} className="w-4 h-4 mr-1" />
            <Text className="text-xs text-white font-semibold">
              {vote_average?.toFixed(1)} | {vote_count}
            </Text>
          </View>

          <Text className="text-xs text-gray-400 font-medium mt-1">
            {release_date?.split("-")[0]}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;
