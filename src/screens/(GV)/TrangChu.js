import React, {
  useEffect,
  useState,
} from 'react';

import {
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
  const [expandedTopic1, setExpandedTopic1] = useState(false);
  const [expandedTopic2, setExpandedTopic2] = useState(false);
  const [user, setUser] = useState(null);  // Thông tin người dùng
  const [lecturer, setLecturer] = useState(null);  // Thông tin giảng viên
  const [topics, setTopics] = useState([]);  // Danh sách đề tài của giảng viên
  const [students, setStudents] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await api.get("/auth/account");
        const userData = userResponse.data.results;
        setUser(userData);
  
        const lecturerResponse = await api.get("/lecturers");
        const foundLecturer = lecturerResponse.data.results.find(
          (lect) => lect.userId === userData.id
        );
  
        if (foundLecturer) {
          setLecturer(foundLecturer);
  
          const topicsResponse = await api.get(`/topics?lecturerId=${foundLecturer.id}`);
          const topicsData = topicsResponse.data.results;
          setTopics(topicsData);
  
          // Lấy danh sách tất cả idSinhVien từ các topics
          const studentIds = topicsData.map((topic) => topic.idSinhVien);
          
          // Gọi API lấy thông tin sinh viên
          if (studentIds.length > 0) {
            const studentsResponse = await api.get(`/students`);
            const studentsData = studentsResponse.data.results;
  
            // Map sinh viên theo idSinhVien
            const studentsMap = studentsData.reduce((acc, student) => {
              acc[student.id] = student;
              return acc;
            }, {});
  
            setStudents(studentsMap);
          }
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error.response?.data || error.message);
      }
    };
  
    fetchData();
  }, []);
  


  // Lọc các đề tài của giảng viên
  const lecturerTopics = topics.filter((topic) => topic.idGiangVien === lecturer?.id);

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.greeting}>
  <FontAwesome name="hand-paper-o" size={18} color="#007AFF" />  
  {" "}Xin chào, <Text style={{ fontWeight: "bold" }}>{user?.fullName}</Text>
</Text>

      <Text>Mã giảng viên: {lecturer?.id}</Text>

      {/* Ngày tháng */}
      <View style={styles.dateSection}>
        <FontAwesome name="calendar" size={24} color="#007AFF" />
        <View>
          <Text style={styles.dateText}>
            {`${daysOfWeek[today.getDay()]}, ${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`}
          </Text>
          <Text style={styles.normalText}>Có {lecturerTopics.length} đề tài cập nhật mới</Text>
        </View>
      </View>


      {/* Card chứa các đề tài đang hướng dẫn */}
      {/* <View style={styles.card}>
        <Text style={styles.cardTitle}>Đề tài đang hướng dẫn:</Text>

        {lecturerTopics.map((topic, index) => ( // Thêm index vào đây
  <TouchableOpacity key={topic.id} style={styles.topicItem}>
    <View style={styles.circleNumber}>
      <Text style={styles.numberText}>{index + 1}</Text> 
    </View>
    <View style={styles.topicInfo}>
      <Text style={styles.topicTitle}>{topic.tenDeTai}</Text>
    </View>
  </TouchableOpacity>
))}

      </View> */}

<View style={styles.card}>
  <Text style={styles.cardTitle}>Đề tài đang hướng dẫn:</Text>

  {/* Hiển thị tổng số đề tài */}
<View style={styles.totalTopicsContainer}>
  <Text style={styles.totalTopicsText}>
    Tổng số đề tài: <Text style={{ fontWeight: "bold" }}>{lecturerTopics.length}</Text> / {topics.length}
  </Text>
</View>


  {lecturerTopics.map((topic, index) => (
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
