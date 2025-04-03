import React, { useState, useEffect, useContext } from "react";
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
import { AuthContext } from "../context/AuthContext";
import moment from "moment";

const NotificationScreen = () => {
  const [filter, setFilter] = useState("Gần đây"); // Bộ lọc
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [expandedNotification, setExpandedNotification] = useState(null);
  const [allNotifications, setAllNotifications] = useState([]); // Dữ liệu gốc
  const [filteredNotifications, setFilteredNotifications] = useState([]); // Dữ liệu sau lọc
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  // 🛠 GET danh sách thông báo từ API
  const fetchNotifications = async (userId) => {
    try {
      setLoading(true);
      const response = await api.get(`/notifications/user/${userId}`);

      if (response.data && Array.isArray(response.data.results)) {
        setAllNotifications(response.data.results);
        setFilteredNotifications(response.data.results);
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
    if (user) {
      fetchNotifications(user.id);
    }
  }, [user]);

  // 📌 Bộ lọc thông báo dựa trên trạng thái
  const filterNotifications = (option) => {
    setFilter(option);
    setShowFilterOptions(false);

    if (option === "Chưa đọc") {
      setFilteredNotifications(allNotifications.filter((n) => n.status === "Chưa đọc"));
    } else if (option === "Đã đọc") {
      setFilteredNotifications(allNotifications.filter((n) => n.status === "Đã đọc"));
    } else {
      setFilteredNotifications(allNotifications); // Hiển thị tất cả
    }
  };

  const toggleNotification = async (notificationId) => {
    setExpandedNotification(expandedNotification === notificationId ? null : notificationId);
    try {
      const notification = filteredNotifications.find(n => n.notification.id === notificationId);

      if (notification.status === "Chưa đọc") {
        const status = "Đã đọc";
        await api.put(`/notifications/${notificationId}/read/${user.id}`);

        setFilteredNotifications(prev =>
          prev.map(n =>
            n.notification.id === notificationId ? { ...n, status: "Đã đọc" } : n
          )
        );
      }

      setExpandedNotification(expandedNotification === notificationId ? null : notificationId);
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái thông báo:", error);
    }
  };

  const formatDateTime = (isoString) => {
    return moment(isoString).format("HH:mm:ss - DD/MM/YYYY");
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
            filteredNotifications.slice().reverse().map((item) => (
              <TouchableOpacity
                key={item.notification.id}
                style={[
                  styles.notificationItem,
                  item.status === "Chưa đọc" ? styles.unread : styles.read,
                ]}
                onPress={() => toggleNotification(item.notification.id)}
              >
                <Text style={styles.titleText}>{item.notification.tieuDe}</Text>
                <Text style={styles.contentText}>{item.notification.moTa}</Text>
                <Text style={styles.statusText}>{item.status}</Text>

                {expandedNotification === item.notification.id && (
                  <View
                    style={[
                      styles.detail,
                      item.status === "Chưa đọc" ? styles.unread : styles.read,
                    ]}
                  >
                    <Text style={styles.detailText}>
                      Thời gian: {formatDateTime(item.notification.thoiGian)}
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
