import { View, Text, Image, TextInput, Pressable } from "react-native";
import React, { useRef } from "react";
import { icons } from "@/constants/icons";
import { useFocusEffect } from "@react-navigation/native";

interface Props {
  placeholder: string;
  value?: string;
  onPress?: () => void;
  onChangeText?: (text: string) => void;
  autoFocus?: boolean;
  showKeyboard?: boolean;
}

const SearchBar = ({
  placeholder,
  value,
  onPress,
  onChangeText,
  autoFocus = false,
  showKeyboard = true,
}: Props) => {
  const inputRef = useRef<TextInput>(null);

  useFocusEffect(() => {
    let timeout = setTimeout(() => {
      if (inputRef.current && autoFocus) {
        inputRef.current.focus();
      }
    }, 100);

    return () => clearTimeout(timeout);
  });

  return (
    <Pressable onPress={onPress}>
      <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4 ">
        <Image
          source={icons.search}
          className="size-5"
          resizeMode="contain"
          tintColor={"#ab8bff"}
        />

        <TextInput
          ref={inputRef}
          //onPress={onPress}
          placeholder={placeholder || "Search"}
          editable={showKeyboard}
          pointerEvents="box-only"
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor="#A8B5DB"
          className="flex-1 ml-2 text-white"
          keyboardType="web-search"
        />
      </View>
    </Pressable>
  );
};

export default SearchBar;
