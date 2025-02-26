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
      screen: "QuanLyNguoiDung",
    },
    {
      id: "2",
      title: "Danh Sách Giảng Viên",
      icon: "school",
      screen: "DSGiangVien",
    },
    {
      id: "3",
      title: "Danh Sách Sinh Viên",
      icon: "person",
      screen: "DSSinhVien",
    },
  ];

  // Render từng mục trong danh sách
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate(item.screen)}
    >
      <Ionicons name={item.icon} size={32} color="#64B5F6" />
      <Text style={styles.cardText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Thanh tiêu đề */}
      {/* <View style={styles.header}>
        <Ionicons name="menu" size={24} color="white" onPress={() => navigation.openDrawer()} />
        <Text style={styles.headerTitle}>Trang chủ</Text>
      </View> */}

      {/* Hình ảnh minh họa */}
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/128/9422/9422941.png",
        }}
        style={styles.image}
      />

      {/* Thống kê */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{totalUsers}</Text>
          <Text style={styles.statLabel}>Tổng người dùng</Text>
        </View>
        <View style={styles.statBox}>
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
      />
    </View>
  );
};

export default TrangChuAdmin;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#64B5F6",
    padding: 25,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginLeft: 15,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  statBox: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    width: "40%",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
  },
  listContainer: {
    padding: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3, // Hiệu ứng đổ bóng Android
  },
  cardText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 15,
  },
});
