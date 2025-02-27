import {
  StyleSheet,
  Text,
  Button,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TopicCard } from "../module/topic/TopicCard";
import ChiTietDeTai from "../module/topic/ChiTietDeTai";
import InputSearch from "../components/InputSearch";

const yourTopic = [
  {
    title:
      "NGHIÊN CỨU CÁC VẤN ĐỀ BẢO MẬT VÀ THỬ NGHIỆM CÁC TÍNH NĂNG BẢO MẬT KHI PHÁT TRIỂN MOBILE APP DỰA TRÊN NỀN TẢNG NATIVE REACT VÀ KOTLIN",
    instructor: "TS. Trần Trung",
    leader: "Hoàng Thị Thảo",
    faculty: "Công nghệ thông tin",
    status: "Chưa duyệt",
  },
  {
    title:
      "NGHIÊN CỨU CÁC VẤN ĐỀ BẢO MẬT VÀ THỬ NGHIỆM CÁC TÍNH NĂNG BẢO MẬT KHI PHÁT TRIỂN MOBILE APP DỰA TRÊN NỀN TẢNG NATIVE REACT VÀ KOTLIN",
    instructor: "TS. Trần Trung",
    leader: "Hoàng Thị Thảo",
    faculty: "Công nghệ thông tin",
    status: "Chưa duyệt",
  },
  {
    title:
      "NGHIÊN CỨU CÁC VẤN ĐỀ BẢO MẬT VÀ THỬ NGHIỆM CÁC TÍNH NĂNG BẢO MẬT KHI PHÁT TRIỂN MOBILE APP DỰA TRÊN NỀN TẢNG NATIVE REACT VÀ KOTLIN",
    instructor: "TS. Trần Trung",
    leader: "Hoàng Thị Thảo",
    faculty: "Công nghệ thông tin",
    status: "Chưa duyệt",
  },
  {
    title:
      "NGHIÊN CỨU CÁC VẤN ĐỀ BẢO MẬT VÀ THỬ NGHIỆM CÁC TÍNH NĂNG BẢO MẬT KHI PHÁT TRIỂN MOBILE APP DỰA TRÊN NỀN TẢNG NATIVE REACT VÀ KOTLIN",
    instructor: "TS. Trần Trung",
    leader: "Hoàng Thị Thảo",
    faculty: "Công nghệ thông tin",
    status: "Chưa duyệt",
  },
];

const XemTienDo = () => {
  const navigation = createStackNavigator();
  return (
    <SafeAreaView style={{ marginBottom: 60 }}>
      {/* <Text>Hi</Text> */}
      <InputSearch></InputSearch>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Đề tài của bạn</Text>
        {yourTopic.map((topic, index) => (
          <TopicCard key={index} topic={topic} destination="ChiTietDeTai" />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default XemTienDo;

const styles = StyleSheet.create({
  scrollView: {
    // flex: 1,
    marginHorizontal: 15,
    marginTop: 10,
  },
  sectionTitle: {
    marginVertical: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#64B5F6",
    textAlign: "center",
  },
});
