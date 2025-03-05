import React from 'react';

import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { useNavigation } from '@react-navigation/native';

const taskStatusColors = {
  "Chưa bắt đầu": "#E57373",
  "Đang thực hiện": "#FFB74D",
  "Hoàn thành": "#81C784",
};

const allTasks = [
  {
    name: "Phân tích hệ thống",
    description: "Nghiên cứu và phân tích yêu cầu hệ thống",
    startDate: "2025-03-01",
    endDate: "2025-03-10",
    status: "Đang thực hiện",
    creator: "Hoàng Thị Thảo",
    assignee: "Lê Thị Quỳnh",
  },
  {
    name: "Thiết kế giao diện",
    description: "Lên wireframe và UI cho ứng dụng",
    startDate: "2025-03-05",
    endDate: "2025-03-15",
    status: "Chưa bắt đầu",
    creator: "Lê Hoàng C",
    assignee: "Nguyễn Văn D",
  },
  {
    name: "Triển khai backend",
    description: "Xây dựng API và kết nối với database",
    startDate: "2025-03-02",
    endDate: "2025-03-20",
    status: "Hoàn thành",
    creator: "Phạm Minh E",
    assignee: "Lê Thị F",
  },
];

const TaskCard = ({ task }) => {
    const navigation = useNavigation();
  
    const handleDelete = () => {
      Alert.alert("Xác nhận xóa", "Bạn có chắc chắn muốn xóa công việc này?", [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          onPress: () => console.log("Công việc đã bị xóa"), // Thêm logic xóa công việc tại đây
          style: "destructive",
        },
      ]);
    };
  
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Icon name="thumb-tack" size={20} color="#64B5F6" style={styles.cardIcon} />
          <Text style={styles.cardTitle}>{task.name}</Text>
        </View>
        <Text style={styles.cardInfo}><Text style={styles.label}>Mô tả:</Text> {task.description}</Text>
        <Text style={styles.cardInfo}><Text style={styles.label}>Thời gian:</Text> {task.startDate} → {task.endDate}</Text>
        <Text style={styles.cardInfo}><Text style={styles.label}>Người tạo:</Text> {task.creator}</Text>
        <Text style={styles.cardInfo}><Text style={styles.label}>Người thực hiện:</Text> {task.assignee || "Chưa có"}</Text>
  
        {/* Hiển thị trạng thái với màu sắc khác nhau */}
        <View style={[styles.statusContainer, { backgroundColor: taskStatusColors[task.status] }]}>
          <Text style={styles.statusText}>{task.status}</Text>
        </View>
  
        {/* Nhóm nút Sửa và Xóa vào một hàng ngang */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.updateButton}
            onPress={() => navigation.navigate("SuaCongViec", { task })}
          >
            <Text style={styles.buttonText}>Sửa</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.buttonText}>Xóa</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  

const QuanLyCongViec = () => {
  return (
    <View style={styles.container}>
      {/* Thanh tìm kiếm */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={18} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm công việc..."
          placeholderTextColor="#999"
        />
      </View>

      {/* Danh sách công việc */}
      <FlatList
        data={allTasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <TaskCard task={item} />}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default QuanLyCongViec;


const styles = StyleSheet.create({
    label: {
        fontWeight: "bold",
        color: "#333",
      },
      
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    padding: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 10,
    borderRadius: 12,
    paddingHorizontal: 12,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: "#333",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginVertical: 8,
    elevation: 4,
    gap: 10
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  cardIcon: {
    marginRight: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#64B5F6",
  },
  cardInfo: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  statusContainer: {
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginTop: 8,
  },
  statusText: {
    color: "#fff",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    gap: 40,
  },
  updateButton: {
    backgroundColor: "#66BB6A",
    padding: 8,
    borderRadius: 5,
    width: 100,
  },
  deleteButton: {
    backgroundColor: "#FF6B60",
    padding: 10,
    borderRadius: 5,
    width: 100,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  
});
