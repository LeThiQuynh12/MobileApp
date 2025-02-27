import { StyleSheet, Text, Button, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
const XemTienDo = () => {
  const navigation = createStackNavigator();
  const handleBackHome = () => {
    navigation.navigate("Home");
  };
  return (
    <View>
      <Text>Xem tiến độ</Text>
      <Button title="Trang chủ" onPress={handleBackHome} />
    </View>
  );
};

export default XemTienDo;

const styles = StyleSheet.create({});
