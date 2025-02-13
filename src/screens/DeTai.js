import { StyleSheet, Button, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
const DeTai = () => {
  const navigation = useNavigation();
  const handleBackHome = () => {
    navigation.navigate("Home");
  };
  return (
    <View style={styles.container}>
      <Text>DeTai</Text>
      <Button title="Trang chủ" onPress={handleBackHome} />
    </View>
  );
};

export default DeTai;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
