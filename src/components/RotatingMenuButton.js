import React, { useRef } from "react";
import { Animated, TouchableOpacity } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import HeaderLeft from "./HeaderLeft";
import color from "../utils/color";

const RotatingMenuButton = ({ navigation, title }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 300, // Xoay trong 0.3 giây
      useNativeDriver: true,
    }).start(() => {
      rotateAnim.setValue(0);
    });

    navigation.openDrawer();
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <>
      {/* Giữ lại tiêu đề */}
      <HeaderLeft title={title} navigation={navigation} />

      {/* Nút mở Drawer có hiệu ứng xoay */}
      <TouchableOpacity
        onPress={handlePress}
        style={{ marginLeft: 20, marginRight: 20 }}
      >
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <FontAwesome6
            name="bars-staggered"
            size={21}
            color={color.darkBlue}
          />
        </Animated.View>
      </TouchableOpacity>
    </>
  );
};

export default RotatingMenuButton;
