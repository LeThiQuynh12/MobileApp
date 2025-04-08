import React, {
  useEffect,
  useState,
} from 'react';

import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

import api from '../../utils/api'; // Thêm API import
import color from '../../utils/color';

const daysOfWeek = [
  "Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"
];

const today = new Date();

const SupervisionTopics = () => {
  const [user, setUser] = useState(null);
  const [lecturer, setLecturer] = useState(null);
  const [topics, setTopics] = useState([]);
  const [totalTopics, setTotalTopics] = useState(0); // Thêm state cho tổng số đề tài
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy thông tin tài khoản
        const userResponse = await api.get("/auth/account");
        const userData = userResponse.data.results;
        setUser(userData);
        console.log("User:", userData);

        // Lấy danh sách giảng viên
        const lecturerResponse = await api.get("/lecturers");
        const foundLecturer = lecturerResponse.data.results.find(
          (lect) => lect.userId === userData.id
        );

        if (!foundLecturer) {
          console.warn("Không tìm thấy giảng viên!");
          setLoading(false);
          return;
        }

        setLecturer(foundLecturer);
        console.log("Giảng viên:", foundLecturer);

        // 🟢 Lấy danh sách đề tài của giảng viên (Dùng API đúng)
        const topicsResponse = await api.get(`/topics/lecturer/${foundLecturer.id}`);
        console.log("Dữ liệu từ API topics:", topicsResponse.data);

        let topicsData = [];

        const rawData = topicsResponse.data;

        // Truy cập vào mảng kết quả
        if (rawData && rawData.results && Array.isArray(rawData.results)) {
          topicsData = rawData.results;
        } else {
          console.warn("Dữ liệu không hợp lệ:", rawData);
        }

        setTopics(topicsData);
        console.log("✅ Danh sách đề tài sau khi xử lý:", topicsData);

        // 🟢 Lấy tổng số đề tài
        const totalTopicsResponse = await api.get(`/topics`);
        const totalTopicsData = totalTopicsResponse.data.results.length;
        setTotalTopics(totalTopicsData);
        console.log("✅ Tổng số đề tài:", totalTopicsData);

      } catch (error) {
        console.error("❌ Lỗi khi lấy dữ liệu:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.greeting}>
        <FontAwesome name="hand-paper-o" size={18} color="#007AFF" />{" "}
        Xin chào, <Text style={{ fontWeight: "bold" }}>{user?.fullName}</Text>
      </Text>
      <Text>Mã giảng viên: {lecturer?.id}</Text>

      {/* Ngày tháng */}
      <View style={styles.dateSection}>
        <FontAwesome name="calendar" size={24} color="#007AFF" />
        <View>
          <Text style={styles.dateText}>
            {new Date().toLocaleDateString("vi-VN", {
              weekday: "long",
              day: "numeric",
              month: "numeric",
              year: "numeric",
            })}
          </Text>
          <Text style={styles.normalText}>
            Có <Text style={{ fontWeight: "bold" }}>{topics.length}</Text> đề tài cập nhật mới
          </Text>
        </View>
      </View>

      {/* Card chứa các đề tài */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Đề tài đang hướng dẫn:</Text>

        <View style={styles.totalTopicsContainer}>
          <Text style={styles.totalTopicsText}>
            Tổng số đề tài: <Text style={{ fontWeight: "bold" }}>{topics.length}/{totalTopics}</Text>
          </Text>
        </View>

        {topics.length > 0 ? (
          topics.map((topic, index) => (
            <TouchableOpacity key={topic.id} style={styles.topicItem}>
              <View style={styles.circleNumber}>
                <Text style={styles.numberText}>{index + 1}</Text>
              </View>
              <View style={styles.topicInfo}>
                <Text style={styles.topicTitle}>{topic.tenDeTai}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noDataText}>Không có đề tài nào.</Text>
        )}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  greeting: {
    fontSize: 18,
    color: color.mainColor,
    marginBottom: 10,
  },
  dateSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 25,
    marginTop: 10,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
    color: color.mainColor,
    marginBottom: 10,
  },
  normalText: {
    color: color.textColor,
  },
  card: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    paddingBottom: 30,
    borderColor: "#64B5F6",
    borderWidth: 2,
  },
  totalTopicsContainer: {
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#E3F2FD", // Màu nền nhẹ
    paddingVertical: 8,
    borderRadius: 20,
  },
  
  totalTopicsText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1976D2", // Màu xanh dương đậm
  },
  
  circleNumber: {
    width: 30,  // Kích thước vòng tròn
    height: 30, 
    borderRadius: 15, // Bo tròn 100%
    backgroundColor: "#5DADE2", // Xanh dương
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10, // Cách chữ một khoảng
  },
  
  numberText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff", // Chữ trắng nổi bật
  },
  
  cardTitle: {
    fontSize: 14,
    marginBottom: 10,
    color: "#000",
    textAlign: "center",
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    padding: 10,
    marginHorizontal: 50

  },
  topicItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginHorizontal: 20,
    paddingHorizontal: 30,
    marginBottom: 10,
    paddingLeft: -2,
  },
  topicInfo: {
    flexDirection: "column",
    justifyContent: "center",
  },
  topicTitle: {
    fontSize: 15,
    // fontWeight: "bold",
    color: color.mainColor,
  },
  topicLecturer: {
    fontSize: 14,
    color: color.gray,
  },
});

export default SupervisionTopics;