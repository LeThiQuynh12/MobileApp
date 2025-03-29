import React from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const yourTopic = [
  {
    title:
      "NGHIÊN CỨU CÁC VẤN ĐỀ BẢO MẬT VÀ THỬ NGHIỆM CÁC TÍNH NĂNG BẢO MẬT KHI PHÁT TRIỂN MOBILE APP DỰA TRÊN NỀN TẢNG NATIVE REACT VÀ KOTLIN",
    instructor: "TS. Trần Trung",
    leader: "Hoàng Thị Thảo",
    faculty: "Công nghệ thông tin",
    status: "Chưa duyệt",
  },
];

const otherTopic = [
  {
    title: "PHÁT TRIỂN HỆ THỐNG GỢI Ý SẢN PHẨM DỰA TRÊN AI",
    instructor: "PGS. TS. Nguyễn Văn An",
    leader: "Trần Minh Tâm",
    faculty: "Công nghệ thông tin",
    status: "Đã duyệt",
  },
  {
    title: "PHÂN TÍCH DỮ LIỆU Y TẾ SỬ DỤNG MACHINE LEARNING",
    instructor: "ThS. Phạm Ngọc Hà",
    leader: "Nguyễn Thị Minh",
    faculty: "Y sinh học",
    status: "Đã duyệt",
  },
  {
    title: "NGHIÊN CỨU VÀ PHÁT TRIỂN PHẦN MỀM PHÒNG CHỐNG DDOS TỰ ĐỘNG",
    instructor: "TS. Khánh Linh",
    leader: "Nguyễn Thị Thảo",
    faculty: "Công nghệ thông tin",
    status: "Chưa duyệt",
  },
];

const TopicCard = ({ topic }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { borderLeftColor: topic.status === "Đã duyệt" ? "#4CAF50" : "#E53935" },
      ]}
      activeOpacity={0.9}
      onPress={() => navigation.navigate("ChiTietDeTai")}
    >


      <View style={styles.cardHeader}>
        <Ionicons name="book-outline" size={24} color="#64B5F6" />
        <Text style={styles.cardTitle}>{topic.title}</Text>
      </View>

      {/* Dùng icon thay cho emoji */}
      <View style={styles.cardRow}>
        <Ionicons name="person-outline" size={18} color="#555" />
        <Text style={styles.cardInfo}>Người hướng dẫn: {topic.instructor}</Text>
      </View>

      <View style={styles.cardRow}>
        <Ionicons name="people-outline" size={18} color="#555" />
        <Text style={styles.cardInfo}>Chủ nhiệm: {topic.leader}</Text>
      </View>

      <View style={styles.cardRow}>
        <Ionicons name="school-outline" size={18} color="#555" />
        <Text style={styles.cardInfo}>Khoa: {topic.faculty}</Text>
      </View>

      {/* Icon trạng thái */}
      <View style={styles.statusContainer}>
        {topic.status === "Đã duyệt" ? (
          <Ionicons name="checkmark-circle" size={22} color="#4CAF50" />
        ) : (
          <Ionicons name="close-circle" size={22} color="#E53935" />
        )}
        <Text style={styles.statusText}>{topic.status}</Text>
      </View>

      {/* Nút "Chi tiết" căn giữa */}
      <TouchableOpacity
        style={styles.detailButton}
        onPress={() => navigation.navigate("ChiTietDeTai")}
      >
        <Text style={styles.detailButtonText}>Chi tiết</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};


const DanhSachDeTai = () => {
  const navigation = useNavigation(); // Sửa lỗi thiếu navigation
  return (
    <View style={styles.container}>
      {/* Thanh tiêu đề */}
      {/* <View style={styles.header}>
        <Ionicons
          name="menu"
          size={24}
          color="white"
          onPress={() => navigation.openDrawer()}
        />
        <Text style={styles.headerTitle}>Danh sách đề tài</Text>
      </View> */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={19} color="#64B5F6" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="   Lọc theo người hướng dẫn, chủ nhiệm đề tài,..."
          placeholderTextColor="#64B5F6"
        />
      </View>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Đề tài của bạn</Text>
        {yourTopic.map((topic, index) => (
          <TopicCard key={index} topic={topic} />
        ))}
        <Text style={styles.sectionTitle}>Các đề tài khác</Text>
        {otherTopic.map((topic, index) => (
          <TopicCard key={index} topic={topic} />
        ))}

      </ScrollView>
    </View>
  );
};

export default DanhSachDeTai;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    paddingHorizontal: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: 10,
    borderRadius: 20,
    paddingHorizontal: 12,
    elevation: 3,
    borderWidth: 2,
    borderColor: "#64B5F6",
  },
  searchInput: {
    flex: 1,
    height: 42,
    fontSize: 16,
    color: "#333",
  },
  scrollView: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 14,
    // fontWeight: "bold",
    color: "#00",
    textAlign: "center",
    marginVertical: 15,
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    marginHorizontal: 70,
    paddingBottom: 10,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    borderLeftWidth: 6,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#64B5F6",
    flex: 1,
    marginLeft: 10,
  },
  cardInfo: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  statusBadge: {
    alignSelf: "flex-start",
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 12,
    color: "#fff",
    fontWeight: "bold",
  },
  detailButton: {
    marginTop: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#64B5F6",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    height: 35,
    width: 120,
  },
  detailButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
   // ✅ Bổ sung style cho hàng chứa icon + text
   cardRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  cardInfo: {
    fontSize: 14,
    color: "#333",
    marginLeft: 6, // 🔹 Để text cách icon một chút
  },
  
  statusContainer: {
    flexDirection: "row",
    marginTop: 8,
    marginBottom: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: "#F2F2F9",
    marginRight: 200,
  },
  statusText: {
    fontSize: 15,
    marginLeft: 6,
  },
});
