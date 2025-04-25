import { View, Text } from "react-native";
import React, { useEffect, useRef } from "react";
import { createShimmerPlaceHolder } from "expo-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

interface MovieCardPlaceholderPros {
  width?: string | number;
  height?: string | number;
  isLoading: boolean;
}

const ShimmerPlaceHolder = createShimmerPlaceHolder(LinearGradient);
const MovieCardPlaceholder = ({
  width = 200,
  height = 500,
  isLoading = false,
}: MovieCardPlaceholderPros) => {
  return (
    <View style={{ width, height }}>
      <ShimmerPlaceHolder
        visible={false}
        location={[0.3, 0.7]}
        duration={1000}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#0F0D23",
          borderRadius: 8,
        }}
        shimmerColors={["#0F0D23", "rgba(255,255,255,0.05)"]}
      ></ShimmerPlaceHolder>
      <ShimmerPlaceHolder
        stopAutoRun={false}
        style={{
          marginTop: 8,
          width: "100%",
          height: 8,
          borderRadius: 12,
        }}
        shimmerColors={["rgba(255,255,255,0.1)", "rgba(255,255,255,0.1)"]}
        location={[0.5, 1]}
      ></ShimmerPlaceHolder>
      <ShimmerPlaceHolder
        stopAutoRun={false}
        style={{
          marginTop: 8,
          width: "50%",
          height: 8,
          borderRadius: 12,
        }}
        shimmerColors={["rgba(255,255,255,0.1)", "rgba(255,255,255,0.1)"]}
        location={[0.5, 1]}
      ></ShimmerPlaceHolder>
    </View>
  );
};

export default MovieCardPlaceholder;
