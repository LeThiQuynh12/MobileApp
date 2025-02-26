import React from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

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
    <View style={styles.card}>
      <View style={styles.cardTitleContainer}>
        <Icon
          name="bar-chart"
          size={22}
          color="#64B5F6"
          style={styles.cardTitleIcon}
        />
        <Text style={styles.cardTitle}>{topic.title}</Text>
      </View>
      <Text style={styles.cardInfo}>Người hướng dẫn: {topic.instructor}</Text>
      <Text style={styles.cardInfo}>Chủ nhiệm đề tài: {topic.leader}</Text>
      <Text style={styles.cardInfo}>Khoa: {topic.faculty}</Text>
      <Text style={styles.cardInfo}>Tình trạng: {topic.status}</Text>
      <TouchableOpacity
        style={styles.detailButton}
        onPress={() => navigation.navigate("ChiTietDeTai")}
      >
        <Text style={styles.detailButtonText}>Chi tiết</Text>
      </TouchableOpacity>
    </View>
  );
};

const SVDanhSachDeTai = () => {
  const navigation = useNavigation(); // Sửa lỗi thiếu navigation
  return (
    <View style={styles.container}>
      {/* Thanh tiêu đề */}
      <View style={styles.header}>
        <Ionicons
          name="menu"
          size={24}
          color="white"
          onPress={() => navigation.openDrawer()}
        />
        <Text style={styles.headerTitle}>Danh sách đề tài</Text>
      </View>
      <View style={styles.searchContainer}>
        <Icon name="search" size={19} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Lọc theo người hướng dẫn, chủ nhiệm đề tài,..."
          placeholderTextColor="#999"
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

export default SVDanhSachDeTai;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#64B5F6",
    padding: 25,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginLeft: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 8,
    paddingHorizontal: 10,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: "#333",
    fontSize: 15,
  },
  scrollView: {
    flex: 1,
    marginHorizontal: 15,
    marginTop: 10,
  },
  sectionTitle: {
    marginVertical: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#64B5F6",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    elevation: 2, // bongs
  },
  cardTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardTitleIcon: {
    marginRight: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 6,
    marginRight: 25,
    color: "#64B5F6",
    paddingHorizontal: 13,
    textAlign: "justify",
  },
  cardInfo: {
    fontSize: 14,
    color: "#333",
    marginBottom: 2,
    paddingHorizontal: 30,
  },
  detailButton: {
    marginTop: 8,
    alignSelf: "center",
    borderColor: "#64B5F6",
    borderWidth: 2,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    height: 35,
    width: 120,
  },
  detailButtonText: {
    color: "#64B5F6",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});
