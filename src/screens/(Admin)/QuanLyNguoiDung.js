import React from "react";

import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const users = [
  {
    id: "1",
    avatar:
      "https://png.pngtree.com/png-clipart/20190120/ourlarge/pngtree-teachers-day-teachers-day-illustration-cartoon-teacher-glasses-teacher-png-image_493446.jpg",
    code: "TS1234",
    name: "TS. Trần Trung",
    email: "trungt123@gmail.com",
    role: "Giảng viên",
    power: "DuyetDeTai, XemTienDo, ThongTinCaNhan",
  },
  {
    id: "2",
    avatar:
      "https://tse1.mm.bing.net/th?id=OIP.qIf5gKDvYwWfNPznR2jxIQAAAA&pid=Api&P=0&h=180",
    code: "HT1508",
    name: "Hoàng Thị Thảo",
    email: "hoangthithao@gmail.com",
    role: "Sinh viên",
    power: "DangKyDeTai, XpemTienDo, ThongTinCaNhan, GiaoNhiemVu",
  },
  {
    id: "3",
    avatar:
      "https://tse1.mm.bing.net/th?id=OIP.qIf5gKDvYwWfNPznR2jxIQAAAA&pid=Api&P=0&h=180",
    code: "HT1508",
    name: "Khúc Xuân Triển",
    email: "khuctrient@gmail.com",
    role: "Sinh viên",
    power: "DangKyDeTai, XpemTienDo, ThongTinCaNhan, GiaoNhiemVu",
  },
];

const QuanLyNguoiDung = () => {
  const navigation = useNavigation();
  const handleDelete = (userId) => {
    Alert.alert("Xác nhận xóa", "Bạn có chắc chắn muốn xóa người dùng này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        // onPress: () => handleDeleteUser(userId), // Gọi hàm thực hiện xóa
        style: "destructive",
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Thanh tiêu đề */}
      {/* <View style={styles.header}>
        <Ionicons name="menu" size={24} color="white" onPress={() => navigation.openDrawer()} />
        <Text style={styles.headerTitle}>Quản lý người dùng</Text>
      </View> */}

      {/* Ô tìm kiếm */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#aaa"
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Tìm kiếm người dùng"
          style={styles.searchInput}
        />
      </View>

      {/* Danh sách người dùng */}
      <FlatList
        style={{ flex: 1 }}
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <Text style={styles.text}>
              <Text style={styles.boldText}>Mã:</Text> {item.code}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.boldText}>Họ và tên:</Text> {item.name}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.boldText}>Email:</Text> {item.email}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.boldText}>Vai trò:</Text> {item.role}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.boldText}>Được quyền truy cập:</Text>{" "}
              {item.power}
            </Text>

            <View style={styles.buttonContainer}>
              {/* <TouchableOpacity style={styles.editButton} onPress = {() => navigation.navigate("ThemNguoiDung")}>
                <Text style={styles.buttonText}>Thêm</Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                style={styles.updateButton}
                onPress={() =>
                  navigation.navigate("SuaNguoiDung", { user: item })
                }
              >
                <Text style={styles.buttonText}>Sửa</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.buttonText}>Xóa</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Thanh điều hướng */}
      {/* <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("ThemNguoiDung")}
        >
          <Ionicons name="add" size={28} color="#fff" />
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default QuanLyNguoiDung;

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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 10,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchIcon: { marginRight: 5 },
  searchInput: { flex: 1, height: 40 },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    gap: 7,
  },
  avatar: {
    width: 50,
    height: 50,
    marginBottom: 10,
    borderRadius: 20,
  },
  text: { marginVertical: 2 },
  boldText: { fontWeight: "bold" },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    gap: 40,
  },
  editButton: {
    backgroundColor: "#66BB6A",
    padding: 8,
    borderRadius: 5,
    width: 100,
  },
  updateButton: {
    backgroundColor: "#66BB6A",
    padding: 8,
    borderRadius: 5,
    width: 100,
  },
  deleteButton: {
    backgroundColor: "#FF6B60",
    padding: 10,
    borderRadius: 5,
    width: 100,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    padding: 15,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  addButton: {
    backgroundColor: "#64B5F6",
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -20,
  },
});
