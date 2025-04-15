import React, { useEffect, useState } from 'react';

import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../utils/api';
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

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Icon name="thumb-tack" size={20} color="#64B5F6" style={styles.cardIcon} />
        <Text style={styles.cardTitle}>{task.topic.tenDeTai}</Text>
      </View>
      <Text style={styles.cardInfo}><Text style={styles.label}>Tên nhiệm vụ:</Text> {task.moTa}</Text>
      <Text style={styles.cardInfo}><Text style={styles.label}>Mô tả:</Text> {task.moTa}</Text>
      <Text style={styles.cardInfo}><Text style={styles.label}>Thời gian:</Text> {task.ngayBatDau} → {task.ngayKetThuc}</Text>
      <Text style={styles.label}>Người thực hiện: {" "}
        {task.students && task.students.length > 0
          ? task.students.map(a => a.user.fullName).join(", ")
          : "Chưa có"}
      </Text>
      {/* Hiển thị trạng thái với màu sắc khác nhau */}
      <View style={[styles.statusContainer, {
        backgroundColor: taskStatusColors[
          task.trangThai === "To do"
            ? "Chưa bắt đầu"
            : (task.trangThai === "In progress"
              ? "Đang thực hiện"
              : "Hoàn thành")]
      }]}>
        <Text style={styles.statusText}>{task.trangThai === "To do"
          ? "Chưa bắt đầu"
          : (task.trangThai === "In progress"
            ? "Đang thực hiện"
            : "Hoàn thành")}</Text>
      </View>
    </View>
  );
};

const QuanLyCongViec = () => {
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async (page, isLoadMore = false) => {
    try {
      if (isLoadMore)
        setLoadMore(true);
      else {
        setLoadMore(false);
        setPage(0);
      }

      setError(null);
      const response = await api.get(`/tasks/split?page=${page}&size=4`);
      const data = response.data.results.content || [];
      const totalPages = response.data.results.totalPages || 0;

      if (isLoadMore) {
        setTasks((prev) => [...prev, ...data]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setTasks(data);
        setPage(1);
      }

      setHasMore(page < totalPages - 1);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
      setError("Không thể tải thông báo, vui lòng thử lại!");
    } finally {
      setLoading(false);
      setLoadMore(false);
    }
  }

  useEffect(() => {
    fetchTasks(0);
  }, []);

  const loadingMore = () => {
    if (!loadMore && hasMore) {
      fetchTasks(page, true);
    }
  };

  return (
    <View style={styles.container}>
      {/* Thanh tìm kiếm */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={18} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm công việc..."
          placeholderTextColor="#999"
          onChangeText={(text) => setSearchText(text)}
        />
      </View>

      {/* Danh sách công việc */}
      <FlatList
        data={tasks}
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
    padding: 5,
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
