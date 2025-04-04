import { React, useState, useEffect } from "react";
import {
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import api from "../../utils/api";
import color from "../../utils/color"; // Đảm bảo file này có màu `darkBlue`

const NotificationCard = ({ notification, onDelete }) => {
  const handleDelete = () => {
    Alert.alert("Xác nhận xóa", "Bạn có chắc chắn muốn xóa thông báo này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        onPress: () => onDelete(notification.id), // Gọi hàm xóa
        style: "destructive",
      },
    ]);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardInfo}>
        <Text style={styles.label}>Tiêu đề:</Text> {notification.tieuDe}
      </Text>
      <Text style={styles.cardInfo}>
        <Text style={styles.label}>Mô tả:</Text> {notification.moTa}
      </Text>
      <Text style={styles.cardInfo}>
        <Text style={styles.label}>Thời gian:</Text> {new Date(notification.thoiGian).toLocaleString()}
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.buttonText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const QuanLyThongBao = () => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get("/notifications");
      setNotifications(response.data.results || []);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
      setError("Không thể tải thông báo, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNotification = async (id) => {
    try {
      await api.delete(`/notifications/${id}`);
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
      Alert.alert("Thành công", "Thông báo đã được xóa.");
    } catch (error) {
      console.error("Lỗi khi xóa thông báo:", error);
      Alert.alert("Lỗi", "Xóa thông báo thất bại. Vui lòng thử lại.");
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={18} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm thông báo..."
          placeholderTextColor="#999"
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={color.darkBlue} />
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchNotifications}>
            <Text style={styles.buttonText}>Thử lại</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={notifications.slice().reverse().filter((notif) => {
            const tieuDe = notif.tieuDe || "";
            return tieuDe.toLowerCase().includes(searchText.toLowerCase());
          })}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <NotificationCard notification={item} onDelete={handleDeleteNotification} />
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default QuanLyThongBao;

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    padding: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 12,
    paddingHorizontal: 12,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: "#333",
    fontSize: 16,
  },
  errorContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  retryButton: {
    backgroundColor: "#FF6B60",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginVertical: 8,
    elevation: 4,
  },
  cardInfo: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  label: {
    fontWeight: "bold",
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
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
};
