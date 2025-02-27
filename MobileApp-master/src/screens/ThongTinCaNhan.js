import { StyleSheet, Button, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
const ThongTinCaNhan = () => {
  const navigation = useNavigation();
  const handleBackHome = () => {
    navigation.navigate("Home");
  };
  return (
    <View style={styles.container}>
      <Text>Thong tin cá nhân</Text>
      <Button title="Trang chủ" onPress={handleBackHome} />
    </View>
  );
};

export default ThongTinCaNhan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
