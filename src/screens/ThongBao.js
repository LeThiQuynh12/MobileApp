import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import color from "../utils/color";

const NotificationScreen = () => {
  const [filter, setFilter] = useState("Gần đây");
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [expandedNotification, setExpandedNotification] = useState(null);

  const toggleNotification = (id) => {
    setExpandedNotification(expandedNotification === id ? null : id);
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Thông báo</Text> */}

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
              onPress={() => {
                setFilter(option);
                setShowFilterOptions(false);
              }}
            >
              <Text style={styles.dropdownText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Thông báo 1 - Chưa đọc */}
      <TouchableOpacity
        style={[styles.notificationItem, styles.unread]}
        onPress={() => toggleNotification(1)}
      >
        <Text style={styles.titleText}>Tiêu đề</Text>
        <Text style={styles.contentText}>Nội dung thông báo</Text>
        <Text style={styles.statusText}>Chưa đọc</Text>
        {expandedNotification === 1 && (
          <View style={[styles.detail, styles.unread]}>
            <Text style={styles.detailText}>Chi tiết thông báo 1...</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Thông báo 2 - Đã đọc */}
      <TouchableOpacity
        style={[styles.notificationItem, styles.read]}
        onPress={() => toggleNotification(2)}
      >
        <Text style={styles.titleText}>Tiêu đề</Text>
        <Text style={styles.contentText}>Nội dung thông báo</Text>
        <Text style={styles.statusText}>Đã đọc</Text>
        {expandedNotification === 2 && (
          <View style={[styles.detail, styles.read]}>
            <Text style={styles.detailText}>Chi tiết thông báo 2...</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: color.darkBlue,
    textAlign: "center",
    marginBottom: 20,
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
});

export default NotificationScreen;
