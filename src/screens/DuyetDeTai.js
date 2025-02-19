import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
const DuyetDeTai = () => {
  const navigation = useNavigation()
  return (
    <View>
      <Text>DuyetDeTai</Text>
      <Button title="Xem chi tiết đề tài" onPress={()=> navigation.navigate("TopicDetail")} />
    </View>
  );
};

export default DuyetDeTai;

const styles = StyleSheet.create({});
