import React from "react";

import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const TrangChuAdmin = () => {
  const navigation = useNavigation();

  // Thống kê giả lập
  const totalUsers = 100;
  const activeUsers = 50;

  // Danh sách chức năng quản lý
  const menuItems = [
    {
      id: "1",
      title: "Quản lý Người Dùng",
      icon: "people",
      screen: "UserManagement",
    },
    {
      id: "2",
      title: "Quản lý Đề Tài",
      icon: "book",
      screen: "TopicManagement",
    },
    {
      id: "3",
      title: "Quản lý Nhiệm vụ",
      icon: "briefcase",
      screen: "TaskManagement",
    },
    {
      id: "4",
      title: "Quản lý Đánh Giá",
      icon: "star",
      screen: "ReviewManagement",
    },
    {
      id: "5",
      title: "Quản lý Tài Liệu",
      icon: "document",
      screen: "DocumentManagement",
    },
    {
      id: "6",
      title: "Quản lý Thông Báo",
      icon: "notifications",
      screen: "NotificationManagement",
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate(item.screen)}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={item.icon} size={32} color="white" />
      </View>
      <Text style={styles.cardText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Hình ảnh minh họa */}
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/128/9422/9422941.png",
        }}
        style={styles.image}
      />

      {/* Thống kê */}
      <View style={styles.statsContainer}>
        <View style={[styles.statBox, { backgroundColor: "#42A5F5" }]}>
          <Text style={styles.statNumber}>{totalUsers}</Text>
          <Text style={styles.statLabel}>Tổng người dùng</Text>
        </View>
        <View style={[styles.statBox, { backgroundColor: "#66BB6A" }]}>
          <Text style={styles.statNumber}>{activeUsers}</Text>
          <Text style={styles.statLabel}>Đang truy cập</Text>
        </View>
      </View>

      {/* Danh sách quản lý */}
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default TrangChuAdmin;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa", paddingTop: 20 },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  statBox: {
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    width: "45%",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  statLabel: {
    fontSize: 14,
    color: "white",
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    marginVertical: 10,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
  },
  iconContainer: {
    backgroundColor: "#64B5F6",
    padding: 10,
    borderRadius: 10,
  },
  cardText: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 15,
    color: "#333",
  },
});
