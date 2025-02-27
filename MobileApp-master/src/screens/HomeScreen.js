import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
const HomeScreen = () => {
  // ✅ Nhận navigation từ props
  const navigation = useNavigation();
  const handleDangNhap = () => {
    navigation.navigate("DangNhap"); // ✅ Điều hướng đúng cách
  };

  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <Button title="Đăng nhập" onPress={handleDangNhap} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
