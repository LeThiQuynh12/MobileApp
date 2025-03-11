import React, { useEffect, useState } from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

import color from "../../utils/color";

const daysOfWeek = [
  "Chủ Nhật",
  "Thứ Hai",
  "Thứ Ba",
  "Thứ Tư",
  "Thứ Năm",
  "Thứ Sáu",
  "Thứ Bảy",
];

const today = new Date();

const SupervisionTopics = () => {
  const getData = async () => {
    // try {
    //     const response = await fetch('http://192.168.1.100:8080/api/tailieu');
    //   const data = await response.json();
    //   console.log(data); // Dữ liệu từ API
    // } catch (error) {
    //   console.error('Lỗi khi gọi API:', error);
    // }
  };

  useEffect(() => {
    getData();
  }, []);
  const [expandedTopic1, setExpandedTopic1] = useState(false);
  const [expandedTopic2, setExpandedTopic2] = useState(false);
  console.log(123);
  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.greeting}>
        Xin chào, <Text style={{ fontWeight: "bold" }}>TênSV</Text>
      </Text>
      <Text>Mã sinh viên: &lt;mãSV&gt;</Text>

      {/* Ngày tháng */}
      <View style={styles.dateSection}>
        <FontAwesome name="calendar" size={24} color="#007AFF" />
        <View>
          <Text style={styles.dateText}>
            {`${daysOfWeek[today.getDay()]}, ${today.getDate()}/${
              today.getMonth() + 1
            }/${today.getFullYear()}`}
          </Text>
          <Text style={styles.normalText}>Có &lt;?&gt; cập nhật mới</Text>
        </View>
      </View>

      {/* Danh sách Nhiệm vụ */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Nhiệm vụ cần làm:</Text>

        {/* Nhiệm vụ 1 */}
        <TouchableOpacity
          style={styles.topicItem}
          onPress={() => setExpandedTopic1(!expandedTopic1)}
        >
          <Text>Nhiệm vụ 1</Text>
          <MaterialIcons
            name={expandedTopic1 ? "keyboard-arrow-up" : "keyboard-arrow-down"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
        {expandedTopic1 && (
          <Text style={styles.subText}>Thời hạn: 1/1/2000</Text>
        )}

        {/* nhiệm vụ 2 */}
        <TouchableOpacity
          style={styles.topicItem}
          onPress={() => setExpandedTopic2(!expandedTopic2)}
        >
          <Text>Nhiệm vụ 2</Text>
          <MaterialIcons
            name={expandedTopic2 ? "keyboard-arrow-up" : "keyboard-arrow-down"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
        {expandedTopic2 && (
          <Text style={styles.subText}>Thời hạn: 2/2/2000</Text>
        )}
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.lightGray,
    padding: 20,
  },
  greeting: {
    fontSize: 18,
    color: color.mainColor,
  },
  subText: {
    fontSize: 14,
    color: color.gray,
    marginBottom: 10,
  },
  dateSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 25,
    marginTop: 10,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
    color: color.mainColor,
  },
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: color.mainColor,
  },
  topicItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  normalText: {
    color: color.textColor, // Hoặc sử dụng color.textColor nếu có biến màu chung
  },
});

export default SupervisionTopics;
