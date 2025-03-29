import React from 'react';

import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const users = [
  {
    id: "1",
    avatar:
      "https://png.pngtree.com/png-clipart/20190120/ourlarge/pngtree-teachers-day-teachers-day-illustration-cartoon-teacher-glasses-teacher-png-image_493446.jpg",
    code: "TS1234",
    name: "TS. Trần Trung",
    email: "trungt123@gmail.com",
    role: "Giảng viên",
  },
  {
    id: "2",
    avatar:
      "https://tse1.mm.bing.net/th?id=OIP.qIf5gKDvYwWfNPznR2jxIQAAAA&pid=Api&P=0&h=180",
    code: "HT1508",
    name: "Hoàng Thị Thảo",
    email: "hoangthithao@gmail.com",
    role: "Sinh viên",
  },
  {
    id: "233",
    avatar:
      "https://tse1.mm.bing.net/th?id=OIP.qIf5gKDvYwWfNPznR2jxIQAAAA&pid=Api&P=0&h=180",
    code: "HT1508",
    name: "Hoàng Thị Thảo",
    email: "hoangthithao@gmail.com",
    role: "Sinh viên",
  },
  {
    id: "23w3",
    avatar:
      "https://tse1.mm.bing.net/th?id=OIP.qIf5gKDvYwWfNPznR2jxIQAAAA&pid=Api&P=0&h=180",
    code: "HT1508",
    name: "Hoàng Thị Thảo",
    email: "hoangthithao@gmail.com",
    role: "Sinh viên",
  },
  {
    id: "332",
    avatar:
      "https://tse1.mm.bing.net/th?id=OIP.qIf5gKDvYwWfNPznR2jxIQAAAA&pid=Api&P=0&h=180",
    code: "HT1508",
    name: "Hoàng Thị Thảo",
    email: "hoangthithao@gmail.com",
    role: "Sinh viên",
  },
];

const QuanLyNguoiDung = () => {
  const navigation = useNavigation();
  
  const handleDelete = (userId) => {
    Alert.alert("Xác nhận xóa", "Bạn có chắc chắn muốn xóa người dùng này?", [
      { text: "Hủy", style: "cancel" },
      { text: "Xóa", style: "destructive" },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={22} color="#64B5F6" style={styles.searchIcon} />
        <TextInput 
          placeholder="Tìm kiếm người dùng"  
          placeholderTextColor="#9E9E9E" 
          style={styles.searchInput} 
        />
      </View>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.infoContainer}>
              <Text style={[styles.text, styles.borderBottom]}><Text style={styles.boldText}>Mã:</Text> {item.code}</Text>
              <Text style={[styles.text, styles.borderBottom]}><Text style={styles.boldText}>Họ và tên:</Text> {item.name}</Text>
              <Text style={[styles.text, styles.borderBottom]}><Text style={styles.boldText}>Email:</Text> {item.email}</Text>
              <Text style={styles.text}><Text style={styles.boldText}>Vai trò:</Text> {item.role}</Text>
            </View>
            <View style={styles.iconContainer}>
              <TouchableOpacity 
                onPress={() => navigation.navigate("SuaNguoiDung", { user: item })} 
                style={styles.iconButton}
                activeOpacity={0.6}
              >
                <Ionicons name="pencil" size={24} color="#4fff" />
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => handleDelete(item.id)}
                style={styles.iconButton}
                activeOpacity={0.6}
              >
                <Ionicons name="trash" size={24} color="#FF5252" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default QuanLyNguoiDung;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E3F2FD" },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    margin: 10,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    borderColor: "#64B5F6",
    borderWidth: 2,
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, height: 45, fontSize: 16, color: "#333" },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
    borderColor: "#64B5F6",
    borderWidth: 2,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 30,
    marginRight: 12,
    borderWidth: 2,
    borderColor: "#64B5F6",
  },
  infoContainer: { flex: 1 },
  text: { 
    marginVertical: 5, 
    paddingBottom: 5, 
    fontSize: 13,
    color: "#333",
  },
  boldText: { fontWeight: "bold", color: "#1976D2" },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  iconContainer: {
    flexDirection: "",
    gap: 15,
  },
  iconButton: { 
    borderRadius: 5,
    backgroundColor: "#1976D2",
    padding: 2,
  },
});
