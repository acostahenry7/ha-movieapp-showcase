import React, { useEffect, useRef, useState } from "react";
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { Link, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MovieCardPlaceholder from "@/components/MovieCardPlaceholder";
import BackTopButton from "@/components/BackTopButton";

export default function Index() {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const flatlistRef = useRef<FlatList>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const {
    data: trendingMovies,
    loading: trendingMoviesLoading,
    error: trendingMoviesError,
  } = useFetch(() => getTrendingMovies());

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch,
  } = useFetch(
    () =>
      fetchMovies({
        query: "",
        page,
      }),
    true
  );

  const paddedMovies = [...(movies ?? [])];
  const remainder = (movies?.length ?? 0) % 3;
  if (remainder !== 0) {
    const placeholders = new Array(3 - remainder).fill({ isPlaceholder: true });
    paddedMovies.push(...placeholders);
  }

  useEffect(() => {
    if (page && page > 1 && page <= 4) {
      refetch(true);
    }
  }, [page]);

  const handleEndReached = () => {
    setPage((prev) => (prev <= 4 ? prev + 1 : prev));
  };

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      {/* <View className="w-full h-14 bg-[rgba(0,0,0,0.2)] absolute"></View> */}
      <View className="flex-1 px-5">
        {moviesError || trendingMoviesError ? (
          <Text className="text-white">
            Error: ${moviesError?.message || trendingMoviesError?.message}
          </Text>
        ) : (
          <FlatList
            ref={flatlistRef}
            data={paddedMovies}
            onScroll={(event) => {
              const offsetY = event.nativeEvent.contentOffset.y;
              setShowScrollTop(offsetY > 300);
            }}
            ListHeaderComponent={() => (
              <>
                <Image
                  source={icons.logo}
                  className="w-12 h-10 mt-20 mb-5 mx-auto"
                />
                <View className="flex-1 mt-5">
                  <SearchBar
                    onPress={() => router.push("/search")}
                    placeholder="Search for a movie"
                    showKeyboard={false}
                  />

                  {trendingMovies && (
                    <View className="mt-10">
                      <Text className="text-lg text-white font-bold mt-5 mb-3">
                        Trending Movies
                      </Text>
                      <FlatList
                        className="mb-4 mt-3 "
                        data={trendingMovies}
                        renderItem={({ item, index }) => (
                          <TrendingCard movie={item} index={index} />
                        )}
                        keyExtractor={(item) => item.movie_id.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={() => <View className="w-4" />}
                      />
                    </View>
                  )}
                  <Text className="text-lg text-white font-bold mt-5 mb-3">
                    Latest Movies
                  </Text>
                </View>
              </>
            )}
            renderItem={({ item }) => {
              if (item.isPlaceholder) {
                if (moviesLoading) {
                  return <MovieCardPlaceholder width={"30%"} height={180} />;
                } else {
                  return <></>;
                }
              } else {
                return <MovieCard {...item} />;
              }
            }}
            keyExtractor={(item, index) =>
              item.isPlaceholder ? index : item.id.toString()
            }
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: "flex-start",
              gap: 20,
              paddingRight: 5,
              paddingBottom: 10,
            }}
            contentContainerStyle={{ paddingBottom: 160 }}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() => (
              <View className="flex flex-row gap-5">
                {/* <Text className="text-white w-[30%]">Loading...</Text> */}
                {moviesLoading &&
                  Array(3)
                    .fill(0)
                    .map((item, index) => (
                      <MovieCardPlaceholder
                        key={index}
                        width={"30%"}
                        height={180}
                        isLoading={moviesLoading}
                      />
                    ))}
              </View>
            )}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.5}
          />
        )}

        {showScrollTop && (
          <BackTopButton
            onPressButton={() => {
              flatlistRef.current?.scrollToOffset({
                offset: 0,
                animated: true,
              });

              setShowScrollTop(false);
            }}
          />
        )}
      </View>
    </View>
  );
}
