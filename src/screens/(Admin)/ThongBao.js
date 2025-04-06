import React, { useState, useEffect } from "react";
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
import color from "../../utils/color";

const NotificationCard = ({ notification, onDelete }) => {
  const handleDelete = () => {
    Alert.alert("Xác nhận xóa", "Bạn có chắc chắn muốn xóa thông báo này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        onPress: () => onDelete(notification.id),
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
        <Text style={styles.label}>Thời gian:</Text>{" "}
        {new Date(notification.thoiGian).toLocaleString()}
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
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchNotifications = async (pageNum, isLoadMore = false) => {
    try {
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
        setPage(0); // Reset page nếu không phải loadMore
      }

      setError(null);
      const response = await api.get("/notifications/split", {
        params: { page: pageNum, size: 5 },
      });

      const newData = response.data.results.content || [];
      const totalPages = response.data.results.totalPages || 0;

      if (isLoadMore) {
        setNotifications((prev) => [...prev, ...newData]);
        setPage((prevPage) => prevPage + 1); // Chỉ tăng page sau khi nhận dữ liệu thành công
      } else {
        setNotifications(newData);
        setPage(1); // Trang đầu tiên sau khi reset
      }

      setHasMore(pageNum < totalPages - 1); // Nếu chưa đến trang cuối thì còn dữ liệu
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
      setError("Không thể tải thông báo, vui lòng thử lại!");
    } finally {
      setLoading(false);
      setLoadingMore(false);
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
    fetchNotifications(0);
  }, []);

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      fetchNotifications(page, true);
    }
  };


  const filteredNotifications = notifications.filter((notif) => {
    const tieuDe = notif.tieuDe || "";
    return tieuDe.toLowerCase().includes(searchText.toLowerCase());
  });

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

      {loading && page === 0 ? (
        <ActivityIndicator size="large" color={color.darkBlue} />
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => fetchNotifications(0)}>
            <Text style={styles.buttonText}>Thử lại</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredNotifications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <NotificationCard notification={item} onDelete={handleDeleteNotification} />
          )}
          contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator
                size="small"
                color={color.darkBlue}
                style={{ marginVertical: 10 }}
              />
            ) : null
          }
          ListEmptyComponent={
            !loading && (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Không có thông báo nào.</Text>
              </View>
            )
          }
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
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
  },
};