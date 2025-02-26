import React from "react";
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
const tasks = [
  {
    id: 1,
    name: "Nhiệm vụ 1",
  },
  {
    id: 2,
    name: "Nhiệm vụ 2",
  },
  {
    id: 3,
    name: "Nhiệm vụ 3",
  },
  {
    id: 4,
    name: "Nhiệm vụ 4",
  },
];

const mockTask = {
  title: "Thiết kế UI",
  summary: "Thiết kế giao diện màn hình chính",
  description: "Cần hoàn thành wireframe và prototype trước thứ 6",
  startDay: "2025-02-26",
  endDay: "2025-03-05",
  members: [{ name: "Nguyễn Văn A" }, { name: "Trần Thị B" }],
};

const ChiTietDeTai = () => {
  const navigation = useNavigation();
  // <Button title="Quay lại" onPress={() => navigation.goBack()} />
  const handleShowTaskDetail = (id) => {
    navigation.navigate("ChiTietNhiemVu", { tasks: mockTask });
  };
  const handleShowAllTask = () => {
    navigation.navigate("DanhSachNhiemVu");
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.topicName}>{data.topicName}</Text>
      <View
        style={{
          padding: 0.5,
          marginHorizontal: 16,
          backgroundColor: "#DFD0D0",
        }}
      ></View>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Chi tiết:</Text>
        <Text style={styles.textitem}>
          <Text style={styles.textTitle}>Chủ nhiệm đề tài:</Text>{" "}
          {data.projectManager}
        </Text>
        <Text style={styles.textitem}>
          <Text style={styles.textTitle}>Người hướng dẫn:</Text>{" "}
          {data.lecturerGuide}
        </Text>
        <Text style={styles.textitem}>
          <Text style={styles.textTitle}>Khoa:</Text> {data.department}
        </Text>
        <Text style={styles.textitem}>
          <Text style={styles.textTitle}>Trạng thái:</Text> {data.status}
        </Text>
        <Text style={styles.textitem}>
          <Text style={styles.textTitle}>Thời gian thực hiện</Text> {data.time}
        </Text>
        <Text style={styles.textitem}>
          <Text style={styles.textTitle}>Lĩnh vực</Text> {data.field}
        </Text>
        <Text style={styles.textitem}>
          <Text style={styles.textTitle}>Số lượng người tham gia:</Text>{" "}
          {data.member}
        </Text>
      </View>
      <View
        style={{
          padding: 0.5,
          marginHorizontal: 16,
          backgroundColor: color.separate,
        }}
      ></View>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Tài liệu liên quan: </Text>
      </View>
      <View
        style={{
          padding: 0.5,
          marginHorizontal: 16,
          backgroundColor: color.separate,
        }}
      ></View>
      <View style={styles.wrapper}>
        <View style={styles.taskContainer}>
          <Text style={styles.title}>Nhiệm vụ cần làm:</Text>
          <TouchableOpacity
            onPress={handleShowAllTask}
            style={{
              backgroundColor: color.mainColor,
              paddingHorizontal: 12,
              borderRadius: 100,
              marginRight: 10,
              height: 27,
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#fff" }}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>
        {tasks &&
          tasks.map((task) => (
            <View style={styles.taskItem} key={task.id}>
              <Text>{task.name}</Text>
              <TouchableOpacity
                onPress={() => handleShowTaskDetail(task.id)}
                style={{
                  backgroundColor: color.mainColor,
                  paddingHorizontal: 12,
                  paddingVertical: 2,
                  borderRadius: 100,
                }}
              >
                <Text style={{ color: "#fff" }}>Xem chi tiết</Text>
              </TouchableOpacity>
            </View>
          ))}
        {/* <View style={styles.taskItem}>
                <Text>Nhiệm vụ 1</Text>
                <TouchableOpacity style={{backgroundColor: color.mainColor, paddingHorizontal: 12, paddingVertical: 2, borderRadius: 100}}>
                <Text style={{color: "#fff"}}>Xem chi tiết</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.taskItem}>
                <Text>Nhiệm vụ 2</Text>
                <TouchableOpacity style={{backgroundColor: color.mainColor, paddingHorizontal: 12, paddingVertical: 2, borderRadius: 100}}>
                <Text style={{color: "#fff"}}>Xem chi tiết</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.taskItem}>
                <Text>Nhiệm vụ 3</Text>
                <TouchableOpacity style={{backgroundColor: color.mainColor, paddingHorizontal: 12, paddingVertical: 2, borderRadius: 100}}>
                <Text style={{color: "#fff"}}>Xem chi tiết</Text>
                </TouchableOpacity>
            </View> */}
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Duyệt đề tài</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonContainer, { backgroundColor: "#FF3D00" }]}
        >
          <Text style={[styles.buttonText]}>Từ chối</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  topicName: {
    color: color.mainColor,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
    lineHeight: 20,
  },
  wrapper: {
    marginVertical: 12,
  },
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    // marginHorizontal: 8,
    fontSize: 15,
  },
  title: {
    fontSize: 15,
    color: color.mainColor,
    paddingBottom: 8,
    fontWeight: "500",
  },
  textitem: {
    fontSize: 15,
    marginHorizontal: 8,
    lineHeight: 28,
  },
  textTitle: {
    fontWeight: "700",
  },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    marginHorizontal: 8,
    fontSize: 15,
  },
  buttonWrapper: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 40,
  },
  buttonContainer: {
    opacity: 0.8,
    backgroundColor: color.darkBlue,
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 20,
    flex: 1,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
  },
});

export default ChiTietDeTai;
