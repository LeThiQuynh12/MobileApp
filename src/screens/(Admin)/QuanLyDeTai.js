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

const allTopics = [
  {
    title: "NGHIÊN CỨU CÁC VẤN ĐỀ BẢO MẬT VÀ THỬ NGHIỆM CÁC TÍNH NĂNG BẢO MẬT",
    instructor: "TS. Trần Trung",
    leader: "Hoàng Thị Thảo",
    faculty: "Công nghệ thông tin",
    status: "Chưa duyệt",
  },
  {
    title: "PHÁT TRIỂN HỆ THỐNG GỢI Ý SẢN PHẨM DỰA TRÊN AI",
    instructor: "PGS. TS. Nguyễn Văn An",
    leader: "Trần Minh Tâm",
    faculty: "Công nghệ thông tin",
    status: "Đã duyệt",
  },
  {
    title: "PHÁT TRIỂN HỆ THỐNG GỢI Ý SẢN PHẨM DỰA TRÊN AI",
    instructor: "PGS. TS. Nguyễn Văn An",
    leader: "Trần Minh Tâm",
    faculty: "Công nghệ thông tin",
    status: "Đã duyệt",
  },
  {
    title: "PHÁT TRIỂN HỆ THỐNG GỢI Ý SẢN PHẨM DỰA TRÊN AI",
    instructor: "PGS. TS. Nguyễn Văn An",
    leader: "Trần Minh Tâm",
    faculty: "Công nghệ thông tin",
    status: "Đã duyệt",
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
      <View style={styles.statusContainer}>
        {topic.status === "Đã duyệt" ? (
          <Ionicons name="checkmark-circle" size={22} color="#4CAF50" />
        ) : (
          <Ionicons name="close-circle" size={22} color="#E53935" />
        )}
        <Text style={styles.statusText}>{topic.status}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.iconButton}
        onPress={() => navigation.navigate("SuaDeTai", { topicId: topic.id })}
        >
          <Ionicons name="pencil" size={30} color="#66BB6A" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="trash" size={30} color="#FF6B60" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const QuanLyDeTai = () => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={19} color="#64B5F6" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="  Lọc theo người hướng dẫn, chủ nhiệm đề tài,..."
          placeholderTextColor="#64B5F6"
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {allTopics.map((topic, index) => (
          <TopicCard key={index} topic={topic} />
        ))}
      </ScrollView>
    </View>
  );
};

export default QuanLyDeTai;

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
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    height: 42,
    fontSize: 16,
    color: "#333",
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
    fontSize: 14,
    fontWeight: "bold",
    color: "#64B5F6",
    marginLeft: 10,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  cardInfo: {
    fontSize: 14,
    color: "#333",
    marginLeft: 6,
  },
  statusContainer: {
    flexDirection: "row",
    marginTop: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: "#F2F2F9",
    alignSelf: "flex-start",
  },
  statusText: {
    fontSize: 15,
    marginLeft: 6,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "",
    marginTop: 12,
  },
  iconButton: {
    padding: 8,
  },
});