import React from "react";
import { Stack } from "expo-router";
import "./globals.css";
import { StatusBar, View } from "react-native";

export default function RootLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: "#030014" }}>
      <StatusBar translucent backgroundColor={"transparent"} hidden />
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            animation: "flip",
          }}
        />
        <Stack.Screen
          name="movies/[id]"
          options={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        />
      </Stack>
    </View>
  );
}
