import React, {
  useEffect,
  useState,
} from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

import api from '../../utils/api';
import color from '../../utils/color';

const daysOfWeek = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
const today = new Date();

const SupervisionTopics = () => {
  const [user, setUser] = useState(null); // Thông tin người dùng
  const [student, setStudent] = useState(null); // Thông tin sinh viên
  const [topics, setTopics] = useState([]); // Danh sách đề tài của sinh viên
  const [totalTopics, setTotalTopics] = useState(0);
  const [tasks, setTasks] = useState([]); // Danh sách nhiệm vụ của sinh viên
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await api.get("/auth/account");
        const userData = userResponse.data.results;
        setUser(userData);
  
        const studentsResponse = await api.get("/students");
        const foundStudent = studentsResponse.data.results.find((stu) => stu.user.id === userData.id);
        setStudent(foundStudent);
  
        if (foundStudent) {
          // Lấy danh sách đề tài của sinh viên
          const topicsResponse = await api.get(`/topics?studentId=${foundStudent.id}`);
          const filteredTopics = topicsResponse.data.results.filter(
            topic => String(topic.idSinhVien) === String(foundStudent.id)
          );
          setTopics(filteredTopics);
  
          // Lấy tổng số đề tài của tất cả sinh viên
          const allTopicsResponse = await api.get("/topics");
          setTotalTopics(allTopicsResponse.data.results.length);

          // Lấy danh sách nhiệm vụ của sinh viên
          const tasksResponse = await api.get("/tasks");
          const studentTasks = tasksResponse.data.results.filter(task => 
            task.students.some(stu => stu.id === foundStudent.id)
          );
          setTasks(studentTasks);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error.response?.data || error.message);
      }
    };
  
    fetchData();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.greeting}>
          <FontAwesome name="hand-paper-o" size={18} color="#007AFF" /> {" "}
          Xin chào, <Text style={{ fontWeight: "bold" }}>{user?.fullName || "..."}</Text>
        </Text>

        <Text>Mã sinh viên: {student?.id || "Chưa có dữ liệu"}</Text>

        <View style={styles.dateSection}>
          <FontAwesome name="calendar" size={24} color="#007AFF" />
          <View>
            <Text style={styles.dateText}>
              {`${daysOfWeek[today.getDay()]}, ${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`}
            </Text>
            <Text style={styles.normalText}>Bạn có {topics.length} đề tài đang thực hiện</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Đề tài của bạn</Text>
          <View style={styles.totalTopicsContainer}>
            <Text style={styles.totalTopicsText}>
              Tổng số đề tài: <Text style={{ fontWeight: "bold" }}>{topics.length}/{totalTopics}</Text>
            </Text>
          </View>

          {topics.map((topic, index) => (
            <TouchableOpacity key={topic.id} style={styles.topicItem}>
              <View style={styles.circleNumber}>
                <Text style={styles.numberText}>{index + 1}</Text>
              </View>
              <View style={styles.topicInfo}>
                <Text style={styles.topicTitle}>{topic.tenDeTai}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

       {/* Danh sách nhiệm vụ */}
      <View style={styles.cardTask}>
        <Text style={styles.cardTitle}>Nhiệm vụ của bạn</Text>
        {tasks.length === 0 ? (
          <Text style={styles.normalText}>Bạn chưa có nhiệm vụ nào.</Text>
        ) : (
          tasks.map((task, index) => {
            let statusColor = "#000"; // Mặc định màu đen
            if (task.trangThai === "Đang thực hiện") statusColor = "#28a745"; // Xanh lá
            else if (task.trangThai === "Hoàn thành") statusColor = "#007bff"; // Xanh dương
            else if (task.trangThai === "Chưa bắt đầu") statusColor = "#dc3545"; // Đỏ

            return (
              <View key={index} style={styles.taskItem}>
                <Text style={styles.taskTitle}>{task.tenCongViec}</Text>
                <Text style={styles.taskDescription}>{task.moTa}</Text>
                <Text style={[styles.taskStatus, { color: statusColor }]}>
                  Trạng thái: {task.trangThai}
                </Text>
              </View>
            );
          })
        )}
      </View>


      </View>
    </ScrollView>
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
  cardTask:{
    marginTop: 20,
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
    backgroundColor: "#E3F2FD",
    paddingVertical: 8,
    borderRadius: 20,
  },
  totalTopicsText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1976D2",
  },
  circleNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#5DADE2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  numberText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  cardTitle: {
    fontSize: 14,
    marginBottom: 10,
    color: "#000",
    textAlign: "center",
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    padding: 10,
    marginHorizontal: 50,
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
  },
  topicInfo: {
    flexDirection: "column",
    justifyContent: "center",
  },
  topicTitle: {
    fontSize: 15,
    color: color.mainColor,
  },
   taskItem: {
    backgroundColor: "#E3F2FD",
    padding: 12,
    borderRadius: 12, // Bo góc đẹp hơn
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Đổ bóng nhẹ cho Android

  },
  taskTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#5DADE2",
  },
  taskDescription: {
    fontSize: 14,
    color: "#666",
    marginVertical: 4,
  },
  taskStatus: {
    fontSize: 14,
    fontWeight: "bold",
  },

});

export default SupervisionTopics;