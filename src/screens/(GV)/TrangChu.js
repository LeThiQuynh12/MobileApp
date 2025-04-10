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

// Bảng màu hài hòa (giống sinh viên)
const COLORS = {
  primary: '#64B5F6',
  primaryDark: '#1976D2',
  primaryLight: '#E3F2FD',
  accent: '#FF7049',
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
  const [lecturer, setLecturer] = useState(null);
  const [topics, setTopics] = useState([]);
  const [totalTopics, setTotalTopics] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef(null);
  const [loading, setLoading] = useState(true);

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

        if (!foundLecturer) {
          console.warn("Không tìm thấy giảng viên!");
          setLoading(false);
          return;
        }

        setLecturer(foundLecturer);

        const topicsResponse = await api.get(`/topics/lecturer/${foundLecturer.id}`);
        let topicsData = [];
        const rawData = topicsResponse.data;
        if (rawData && rawData.results && Array.isArray(rawData.results)) {
          topicsData = rawData.results;
        } else {
          console.warn("Dữ liệu không hợp lệ:", rawData);
        }
        setTopics(topicsData);

        const totalTopicsResponse = await api.get(`/topics`);
        const totalTopicsData = totalTopicsResponse.data.results.length;
        setTotalTopics(totalTopicsData);
      } catch (error) {
        console.error("❌ Lỗi khi lấy dữ liệu:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Tự động chuyển slide sau 3 giây
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % awardWinners.length);
    }, 3000);

    return () => clearInterval(slideInterval.current);
  }, []);

  const handleDotPress = (index) => {
    clearInterval(slideInterval.current);
    setCurrentSlide(index);
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % awardWinners.length);
    }, 3000);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <FontAwesome name="spinner" size={24} color={COLORS.primaryDark} />
        <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        {/* Phần thông tin người dùng */}
        <View style={styles.header}>
          <Text style={styles.greeting}>
            <FontAwesome name="hand-paper-o" size={18} color={COLORS.primaryDark} /> {" "}
            Xin chào, <Text style={{ fontWeight: "bold", color: COLORS.secondary }}>{user?.fullName || "..."}</Text>
          </Text>
          <Text style={styles.studentId}>Mã GV: {lecturer?.id || "Chưa có dữ liệu"}</Text>
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
          <Text style={styles.cardTitle}>Đề Tài Đang Hướng Dẫn</Text>
          <View style={styles.totalTopicsContainer}>
            <Text style={styles.totalTopicsText}>
              Tổng số: <Text style={{ fontWeight: "600", color: COLORS.accent }}>{topics.length}</Text>/{totalTopics}
            </Text>
          </View>
          {topics.length > 0 ? (
            topics.map((topic, index) => (
              <TouchableOpacity key={topic.id} style={styles.topicItem}>
                <View style={[styles.circleNumber, { backgroundColor: COLORS.secondary }]}>
                  <Text style={styles.numberText}>{index + 1}</Text>
                </View>
                <View style={styles.topicInfo}>
                  <Text style={styles.topicTitle}>{topic.tenDeTai}</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.normalText}>Chưa có đề tài nào.</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  loadingText: {
    fontSize: 16,
    color: COLORS.textPrimary,
    marginTop: 8,
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
    fontSize: 14,
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
    backgroundColor: COLORS.secondary,
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