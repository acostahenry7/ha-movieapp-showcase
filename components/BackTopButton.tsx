import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

const BackTopButton = ({ onPressButton }: { onPressButton: () => void }) => {
  return (
    <TouchableOpacity
      className="bg-accent z-[15] absolute bottom-24 right-5 size-16 text-white rounded-full flex justify-center items-center"
      onPress={onPressButton}
    >
      <Image
        source={icons.arrow}
        style={{ transform: [{ rotate: "-90deg" }] }}
      />
      {/* <Text className="text-white">Top</Text> */}
    </TouchableOpacity>
  );
};

export default BackTopButton;
