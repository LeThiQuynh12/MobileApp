import { React, useState, useEffect } from 'react';

import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import api from '../../utils/api';
import color from '../../utils/color';

const QuanLyNguoiDung = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/users`);
      setUsers(response.data.results || []);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
      setError("Không thể tải thông tin người dùng, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchUser();

    // const interval = setInterval(() => {
    //   fetchUser();
    // }, 30000);

    // return () => clearInterval(interval);
  }, []);

  const handleDelete = (userId) => {
    Alert.alert("Xác nhận xóa", "Bạn có chắc chắn muốn xóa người dùng này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: async () => {
          try {
            setLoading(true);
            await api.delete(`/users/${userId}`);
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
            Alert.alert("Thành công", "Người dùng đã được xóa!");
          } catch (error) {
            console.error("Lỗi khi xóa người dùng:", error);
            Alert.alert("Lỗi", "Không thể xóa người dùng, vui lòng thử lại!");
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  const filteredUsers = users.filter(user =>
    user.fullName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={22} color="#64B5F6" style={styles.searchIcon} />
        <TextInput
          placeholder="Tìm kiếm người dùng"
          placeholderTextColor="#64B5F6"
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color={color.darkBlue} />
      ) : error ? (
        <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
      ) : (
        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <View style={styles.infoContainer}>
                <Text style={[styles.text, styles.borderBottom]}><Text style={styles.boldText}>Mã:</Text> {item.id}</Text>
                <Text style={[styles.text, styles.borderBottom]}><Text style={styles.boldText}>Họ và tên:</Text> {item.fullName}</Text>
                <Text style={[styles.text, styles.borderBottom]}><Text style={styles.boldText}>Giới tính:</Text> {item.gender === 'MALE' ? 'Nam' : 'Nữ'}</Text>
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
      )}

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