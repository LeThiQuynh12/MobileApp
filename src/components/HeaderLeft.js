import { FontAwesome6 } from "@expo/vector-icons";
import { Text, TouchableOpacity, Animated, View } from "react-native";
import color from "../utils/color";
import React, { useRef } from "react";

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
    outputRange: ["0deg", "180deg"],
  });

  return (
    <>
      {/* Giữ lại tiêu đề */}
      {/* <HeaderLeft title={title} navigation={navigation} /> */}

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
      <Text style={{ fontSize: 18, fontWeight: "400", fontWeight: "500" }}>
        {title}
      </Text>
    </>
  );
};

function HeaderLeft({ title, navigation }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <TouchableOpacity
        onPress={() => {
          navigation.openDrawer();
        }}
        style={{ marginLeft: 20, marginRight: 20 }}
      >
        <FontAwesome6 name="bars-staggered" size={21} color={color.darkBlue} />
      </TouchableOpacity>
      <Text style={{ fontSize: 18, fontWeight: "400", fontWeight: "500" }}>
        {title}
      </Text>
    </View>
  );
}

export default RotatingMenuButton;
