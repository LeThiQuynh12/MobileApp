import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

import api from '../../utils/api';

// Bảng màu hài hòa
const COLORS = {
  primary: '#64B5F6',
  primaryDark: '#1976D2',
  primaryLight: '#E3F2FD',
  accent: '#EE82EE',
  secondary: '#008DFE',
  success: '#4CAF50',
  danger: '#EF5350',
  background: '#F5F7FA',
  cardBg: '#FFFFFF',
  textPrimary: '#263238',
  textSecondary: '#607D8B',
};

const daysOfWeek = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
const today = new Date();


const awardWinners = [
  { id: 1, name: "Nghiên cứu ảnh hưởng hoạt động logistics đến hiệu quả sản xuất kinh doanh tại Công ty CP sữa TH", award: "Th.S. Nguyễn Thị Việt Ngọc", image: "https://media.tapchitaichinh.vn/900x506/images/upload/2023/08/18/a47.jpg" },
  { id: 2, name: "Nghiên cứu trở ngại đối với ý định khởi nghiệp của sinh viên ngành Quản trị Kinh doanh tại Hà Nội", award: "Nguyễn Ánh Tuyết", image: "https://tse4.mm.bing.net/th?id=OIP.0Nq-Bh10gbvxCVf0i5IJ4gAAAA&pid=Api&P=0&h=180" },
  { id: 3, name: "Nghiên cứu công cụ phân tích dòng nguyên vật liệu nhằm tối ưu hoá quá trình sản xuất trong các doanh nghiệp nhiệt điện", award: "TS. Nguyễn Tố Tâm", image: "https://kientruc.vn/wp-content/uploads/2015/09/nlmt121.jpg" },
];

const SupervisionTopics = () => {
  const [user, setUser] = useState(null);
  const [student, setStudent] = useState(null);
  const [topics, setTopics] = useState([]);
  const [totalTopics, setTotalTopics] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef(null);

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
          const topicsResponse = await api.get(`/topics/student/${foundStudent.id}`);
          const filteredTopics = topicsResponse.data.results.filter(
            topic => topic.group.members.some(member => member.id === foundStudent.id)
          );
          setTopics(filteredTopics);

          const allTopicsResponse = await api.get("/topics");
          setTotalTopics(allTopicsResponse.data.results.length);

          const tasksResponse = await api.get(`/tasks/student/${foundStudent.id}`);
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

    // Tự động chuyển slide sau 3 giây
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % awardWinners.length);
    }, 3000);

    // Cleanup interval khi component unmount
    return () => clearInterval(slideInterval.current);
  }, []);

  const handleDotPress = (index) => {
    clearInterval(slideInterval.current); // Dừng interval khi người dùng nhấn dot
    setCurrentSlide(index);
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % awardWinners.length);
    }, 3000); // Khởi động lại interval
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        {/* Phần thông tin người dùng */}
        <View style={styles.header}>
          <Text style={styles.greeting}>
            <FontAwesome name="hand-paper-o" size={16} color={COLORS.primaryDark} /> {" "}
            Xin chào, <Text style={{ color: COLORS.secondary }}>{user?.fullName || "..."}</Text>
          </Text>
          <Text style={styles.studentId}>Mã SV: {student?.id || "Chưa có dữ liệu"}</Text>
        </View>

        {/* Phần ngày tháng */}
        <View style={styles.dateSection}>
          <FontAwesome name="calendar" size={20} color={COLORS.primaryDark} />
          <View style={styles.dateContent}>
            <Text style={styles.dateText}>
              {`${daysOfWeek[today.getDay()]}, ${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`}
            </Text>
            <Text style={styles.normalText}>
              Bạn có <Text style={{ color: COLORS.accent }}>{topics.length}</Text> đề tài
            </Text>
          </View>
        </View>

        {/* Phần đề tài */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Đề Tài Đang Thực Hiện</Text>
          <View style={styles.totalTopicsContainer}>
            <Text style={styles.totalTopicsText}>
              Tổng số: <Text style={{ fontWeight: "600", color: COLORS.accent }}>{topics.length}</Text>/{totalTopics}
            </Text>
          </View>
          {topics.map((topic, index) => (
            <TouchableOpacity key={topic.id} style={styles.topicItem}>
              <View style={[styles.circleNumber, { backgroundColor: COLORS.secondary }]}>
                <Text style={styles.numberText}>{index + 1}</Text>
              </View>
              <View style={styles.topicInfo}>
                <Text style={styles.topicTitle}>{topic.tenDeTai}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Phần nhiệm vụ */}
        <View style={styles.cardTask}>
          <Text style={styles.cardTitle}>Nhiệm Vụ Được Giao</Text>
          {tasks.length === 0 ? (
            <Text style={styles.normalText}>Chưa có nhiệm vụ nào.</Text>
          ) : (
            tasks.map((task, index) => {
              let statusColor = COLORS.textSecondary;
              let statusIcon = "circle";
              if (task.trangThai === "Đang thực hiện") {
                statusColor = COLORS.success;
                statusIcon = "play-circle";
              } else if (task.trangThai === "Hoàn thành") {
                statusColor = COLORS.primaryDark;
                statusIcon = "check-circle";
              } else if (task.trangThai === "Chưa bắt đầu") {
                statusColor = COLORS.danger;
                statusIcon = "clock-o";
              }
              return (
                <View key={index} style={styles.taskItem}>
                  <View style={styles.taskHeader}>
                    <FontAwesome name={statusIcon} size={20} color={statusColor} />
                    <Text style={[styles.taskTitle, { color: statusColor }]}>{task.tenCongViec}</Text>
                  </View>
                  <Text style={styles.taskDescription}>{task.moTa}</Text>
                </View>
              );
            })
          )}
        </View>

        {/* Phần đề tài xuất sắc */}
        <View style={styles.cardWinners}>
          <Text style={styles.cardTitle}>Đề Tài Khoa Học Xuất Sắc EPU</Text>
          <View style={styles.sliderContainer}>
            <Image
              source={{ uri: awardWinners[currentSlide].image }}
              style={styles.winnerImage}
            />
            <Text style={styles.winnerName}>{awardWinners[currentSlide].name}</Text>
            <Text style={styles.winnerAward}>{awardWinners[currentSlide].award}</Text>
          </View>
          <View style={styles.dotsContainer}>
            {awardWinners.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dot,
                  { backgroundColor: index === currentSlide ? COLORS.primaryDark : COLORS.textSecondary },
                ]}
                onPress={() => handleDotPress(index)}
              />
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  greeting: {
    fontSize: 17,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  studentId: {
    fontSize: 15,
    color: COLORS.textSecondary,
    marginTop: 4,
    marginLeft: 30,
  },
  dateSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 8,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 8,
    marginBottom: 16,
  },
  dateContent: {
    flex: 1,
  },
  dateText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  normalText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  card: {
    backgroundColor: COLORS.cardBg,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
    marginBottom: 16,
  },
  cardTask: {
    backgroundColor: COLORS.cardBg,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.accent,
    marginBottom: 16,
  },
  cardWinners: {
    backgroundColor: COLORS.cardBg,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.success,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  totalTopicsContainer: {
    alignSelf: 'flex-start',
    marginBottom: 12,
    backgroundColor: COLORS.primaryLight,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  totalTopicsText: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.primaryDark,
  },
  topicItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primaryLight,
  },
  circleNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  numberText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.cardBg,
  },
  topicInfo: {
    flex: 1,
  },
  topicTitle: {
    fontSize: 16,
    color: COLORS.textPrimary,
    fontWeight: "500",
  },
  taskItem: {
    padding: 10,
    borderRadius: 8,
    marginVertical: 4,
    backgroundColor: COLORS.primaryLight,
  },
  taskHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  taskDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: 28,
  },
  sliderContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  winnerImage: {
    width: 320,
    height: 120,
    borderRadius: 10,
    marginBottom: 8,
  },
  winnerInfo: {
    flex: 1,
  },
  winnerName: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  winnerAward: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default SupervisionTopics;