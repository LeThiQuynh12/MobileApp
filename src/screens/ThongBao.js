import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import color from "../utils/color";
import api from "../utils/api";

const NotificationScreen = () => {
  const [filter, setFilter] = useState("Gần đây"); // Bộ lọc
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [expandedNotification, setExpandedNotification] = useState(null);
  const [allNotifications, setAllNotifications] = useState([]); // Dữ liệu gốc
  const [filteredNotifications, setFilteredNotifications] = useState([]); // Dữ liệu sau lọc
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🛠 GET danh sách thông báo từ API
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await api.get("/notifications");

      console.log("API Response:", response.data);

      if (response.data && Array.isArray(response.data.results)) {
        setAllNotifications(response.data.results);
        setFilteredNotifications(response.data.results); // Mặc định hiển thị tất cả
      } else {
        throw new Error("Dữ liệu API không hợp lệ");
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
      setError("Không thể tải thông báo, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // 📌 Bộ lọc thông báo dựa trên trạng thái
  const filterNotifications = (option) => {
    setFilter(option);
    setShowFilterOptions(false);

    if (option === "Chưa đọc") {
      setFilteredNotifications(allNotifications.filter((n) => n.trangThai === "Chưa đọc"));
    } else if (option === "Đã đọc") {
      setFilteredNotifications(allNotifications.filter((n) => n.trangThai === "Đã đọc"));
    } else {
      setFilteredNotifications(allNotifications); // Hiển thị tất cả
    }
  };

  const toggleNotification = (id) => {
    setExpandedNotification(expandedNotification === id ? null : id);
  };

  return (
    <View style={styles.container}>
      {/* Dropdown sắp xếp thông báo */}
      <TouchableOpacity
        style={styles.sortButton}
        onPress={() => setShowFilterOptions(!showFilterOptions)}
      >
        <Text style={styles.sortText}>Sắp xếp theo: {filter} ▼</Text>
      </TouchableOpacity>

      {showFilterOptions && (
        <View style={styles.dropdown}>
          {["Gần đây", "Chưa đọc", "Đã đọc"].map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.dropdownItem}
              onPress={() => filterNotifications(option)}
            >
              <Text style={styles.dropdownText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Hiển thị lỗi nếu có */}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Hiển thị loading nếu dữ liệu chưa load xong */}
      {loading ? (
        <ActivityIndicator size="large" color={color.darkBlue} />
      ) : (
        <ScrollView>
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <TouchableOpacity
                key={notification.id}
                style={[
                  styles.notificationItem,
                  notification.trangThai === "Chưa đọc" ? styles.unread : styles.read,
                ]}
                onPress={() => toggleNotification(notification.id)}
              >
                <Text style={styles.titleText}>{notification.tieuDe}</Text>
                <Text style={styles.contentText}>{notification.moTa}</Text>
                <Text style={styles.statusText}>{notification.trangThai}</Text>

                {expandedNotification === notification.id && (
                  <View
                    style={[
                      styles.detail,
                      notification.trangThai === "Chưa đọc" ? styles.unread : styles.read,
                    ]}
                  >
                    <Text style={styles.detailText}>
                      Thời gian: {notification.thoiGian}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noDataText}>Không có thông báo nào</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
    padding: 20,
  },
  sortButton: {
    alignSelf: "flex-end",
    padding: 8,
    borderRadius: 10,
    backgroundColor: color.gray,
    marginBottom: 10,
  },
  sortText: {
    color: color.darkgray,
    fontSize: 14,
  },
  dropdown: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: color.white,
    borderRadius: 10,
    shadowColor: color.darkgray,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 10,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: color.gray,
  },
  dropdownText: {
    fontSize: 14,
    color: color.textColor,
  },
  notificationItem: {
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
  },
  unread: {
    backgroundColor: "#ffebe8",
  },
  read: {
    backgroundColor: color.gray,
  },
  titleText: {
    color: color.darkBlue,
    fontWeight: "bold",
  },
  contentText: {
    color: color.textColor,
    marginTop: 5,
  },
  statusText: {
    color: color.darkBlue,
    fontWeight: "bold",
    alignSelf: "flex-end",
  },
  detail: {
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
  },
  detailText: {
    color: color.textColor,
  },
  noDataText: {
    textAlign: "center",
    color: color.textColor,
    marginTop: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default NotificationScreen;
