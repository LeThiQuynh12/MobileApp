import React, { useEffect, useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import color from "../../utils/color";
import { useNavigation } from "@react-navigation/native";
import api from "../../utils/api";

const data = {
  topicName:
    "NGHIÊN CỨU CÁC VẤN ĐỀ BẢO MẬT VÀ THỬ NGHIỆM CÁC TÍNH NĂNG BẢO MẬT KHI PHÁT TRIỂN MOBILE APP DỰA TRÊN NỀN TẢNG NATIVE REACT VÀ KOTLIN.",
  projectManager: "Hoàng Thị Thảo",
  lecturerGuide: "Trần Trung",
  department: "Công nghệ thông tin",
  status: "Chờ duyệt",
  time: "15/12/2024 - 3/5/2025",
  field: "Phát triển Mobile App",
  member: 5,
};

const ChiTietDeTai = () => {
  const navigation = useNavigation();
  const [tasksct, setTasksct] = useState([]); // ✅ Luôn đảm bảo là mảng

  // Lấy danh sách nhiệm vụ từ API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get("/tasks");
        console.log("API response:", response.data);
        setTasksct(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Lỗi khi lấy tasks:", error);
        setTasksct([]); // ✅ Tránh undefined khi API lỗi
      }
    };
    fetchTasks();
  }, []);

  // Đếm số nhiệm vụ theo trạng thái
  const getTaskCountByStatus = (status) => {
    if (!Array.isArray(tasksct)) return 0; // ✅ Tránh lỗi undefined
    return tasksct.filter((task) => task.status === status).length;
  };

  // Tránh chia 0 khi tính phần trăm
  const getTaskPercentage = (status) => {
    const total = tasksct.length;
    return total > 0 ? `${(getTaskCountByStatus(status) / total) * 100}%` : "0%";
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.topicName}>{data.topicName}</Text>
      <View style={styles.divider} />

      <View style={styles.wrapper}>
        <Text style={styles.title}>Chi tiết:</Text>
        <Text style={styles.textitem}>
          <Text style={styles.textTitle}>Chủ nhiệm đề tài:</Text> {data.projectManager}
        </Text>
        <Text style={styles.textitem}>
          <Text style={styles.textTitle}>Người hướng dẫn:</Text> {data.lecturerGuide}
        </Text>
        <Text style={styles.textitem}>
          <Text style={styles.textTitle}>Khoa:</Text> {data.department}
        </Text>
        <Text style={styles.textitem}>
          <Text style={styles.textTitle}>Trạng thái:</Text> {data.status}
        </Text>
        <Text style={styles.textitem}>
          <Text style={styles.textTitle}>Thời gian thực hiện:</Text> {data.time}
        </Text>
        <Text style={styles.textitem}>
          <Text style={styles.textTitle}>Lĩnh vực:</Text> {data.field}
        </Text>
        <Text style={styles.textitem}>
          <Text style={styles.textTitle}>Số lượng người tham gia:</Text> {data.member}
        </Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.wrapper}>
        <View style={styles.taskContainer}>
          <Text style={styles.title}>Nhiệm vụ cần làm:</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("DanhSachNhiemVu", { tasksct })}
            style={styles.viewAllButton}
          >
            <Text style={{ color: color.white }}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>

        {/* Thanh trạng thái nhiệm vụ */}
        <View style={styles.taskStatusContainer}>
          <View style={[styles.statusBox, { backgroundColor: "red", width: getTaskPercentage("To do") }]} />
          <View style={[styles.statusBox, { backgroundColor: "yellow", width: getTaskPercentage("In progress") }]} />
          <View style={[styles.statusBox, { backgroundColor: "green", width: getTaskPercentage("Done") }]} />
        </View>

        {/* Chú thích trạng thái */}
        <View style={styles.decriptionTask}>
          <View style={styles.decriptionItem}>
            <View style={[styles.decriptionColor, { backgroundColor: "red" }]} />
            <Text>To do</Text>
          </View>
          <View style={styles.decriptionItem}>
            <View style={[styles.decriptionColor, { backgroundColor: "yellow" }]} />
            <Text>In progress</Text>
          </View>
          <View style={styles.decriptionItem}>
            <View style={[styles.decriptionColor, { backgroundColor: "green" }]} />
            <Text>Done</Text>
          </View>
        </View>
      </View>

      {/* Nút duyệt / từ chối đề tài */}
      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Duyệt đề tài</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonContainer, { backgroundColor: "#FF3D00" }]}>
          <Text style={styles.buttonText}>Từ chối</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  topicName: { color: color.mainColor, fontSize: 16, fontWeight: "700", textAlign: "center", marginBottom: 8 },
  divider: { height: 1, backgroundColor: "#DFD0D0", marginHorizontal: 16 },
  wrapper: { marginVertical: 12 },
  title: { fontSize: 15, color: color.mainColor, fontWeight: "500", paddingBottom: 8 },
  textitem: { fontSize: 15, marginHorizontal: 8, lineHeight: 28 },
  textTitle: { fontWeight: "700" },
  taskContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 16 },
  viewAllButton: {
    backgroundColor: color.mainColor,
    paddingHorizontal: 12,
    borderRadius: 100,
    height: 27,
    justifyContent: "center",
  },
  taskStatusContainer: { borderRadius: 10, flexDirection: "row", height: 12, overflow: "hidden", elevation: 2 },
  statusBox: { height: "100%" },
  decriptionTask: { flexDirection: "row", flexWrap: "wrap", padding: 20 },
  decriptionItem: { flexDirection: "row", width: "45%", marginRight: 8, alignItems: "center" },
  decriptionColor: { width: 16, height: 16, borderRadius: 6, marginRight: 4, elevation: 4 },
  buttonWrapper: { flexDirection: "row", gap: 20, marginBottom: 40 },
  buttonContainer: { backgroundColor: color.darkBlue, paddingVertical: 12, borderRadius: 16, alignItems: "center", flex: 1 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default ChiTietDeTai;
