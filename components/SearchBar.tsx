import { icons } from "@/constants/icons";
import React, { forwardRef } from "react";
import {
  Image,
  Pressable,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface Props
  extends Pick<TextInputProps, "placeholder" | "value" | "onChangeText"> {
  onPress?: () => void;
  autoFocus?: boolean;
}

const SearchBar = forwardRef<TextInput, Props>(
  ({ onPress, placeholder, value, onChangeText, autoFocus = false }, ref) => {
    const isTouchable = typeof onPress === "function";

    return (
      <Pressable
        onPress={() => {
          onPress?.();
        }}
        style={{ width: "100%" }}
      >
        <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-5">
          <Image
            source={icons.search}
            className="size-5"
            resizeMode="contain"
            tintColor="#ab8bff"
          />
          <TextInput
            ref={ref}
            autoFocus={autoFocus}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            editable={!isTouchable}
            placeholderTextColor="#a8b5db"
            className="flex-1 ml-2 text-white"
          />
        </View>
      </Pressable>
    );
  }
);

export default SearchBar;
