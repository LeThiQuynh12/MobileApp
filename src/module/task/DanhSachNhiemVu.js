import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import color from "../../utils/color";
import ChiTietNhiemVu from "./ChiTietNhiemVu";
import { Ionicons } from "@expo/vector-icons";

// const tasks = [
//   {
//     title: "Nhiệm vụ 1",
//     summary: "Xây dựng giao diện quản lý sinh viên",
//     description:
//       "Thiết kế màn hình đăng nhập, chi tiết đề tài, danh sách đề tài",
//     startDay: "20-12-2025",
//     endDay: "20-12-2025",
//     members: [
//       {
//         img: require("../../../src/data/imgs/Quynh.png"),
//         name: "Quỳnh",
//       },
//       { img: require("../../../src/data/imgs/Trien.png"), name: "Triển" },
//     ],
//     status: "To do",
//   },
//   {
//     title: "Nhiệm vụ 2",
//     summary: "Xây dựng giao diện quản lý sinh viên",
//     description:
//       "Thiết kế màn hình đăng nhập, chi tiết đề tài, danh sách đề tài",
//     startDay: "20-12-2025",
//     endDay: "20-12-2025",
//     members: [
//       { img: require("../../../src/data/imgs/Viet.png"), name: "Việt" },
//       { img: require("../../../src/data/imgs/Trien.png"), name: "Triển" },
//     ],
//     status: "In progress",
//   },
//   {
//     title: "Nhiệm vụ 3",
//     summary: "Xây dựng giao diện quản lý giảng viên",
//     description:
//       "Thiết kế màn hình đăng nhập, trang chủ, thông tin cá nhân, chi tiết đề tài, danh sách đề tài",
//     startDay: "20-12-2025",
//     endDay: "20-12-2025",
//     members: [
//       { img: require("../../../src/data/imgs/Quynh.png"), name: "Quỳnh" },
//       { img: require("../../../src/data/imgs/Viet.png"), name: "Việt" },
//     ],
//     status: "To do",
//   },
// ];
export default function DanhSachNhiemVu({ route }) {
  const navigation = useNavigation();
  const [selectedStatus, setSelectedStatus] = useState("To do");

  // Kiểm tra tasks có tồn tại không trước khi sử dụng
  const tasks = route?.params?.tasksct || []; // Thay tasks thành tasksct
  // Sử dụng mảng rỗng nếu không có tasks
  console.log("Route Params ở đanhsachnhiemvu :", route?.params);

  const handleStatusChange = (status) => setSelectedStatus(status);
  const handleAddTask = () => navigation.navigate("GiaoNhiemVu");
  const handleTaskDetail = (selectedTask) =>
    navigation.navigate("ChiTietNhiemVu", { task: selectedTask });

  // Lọc danh sách nhiệm vụ theo trạng thái đã chọn
  const filteredTasks = tasks.filter((task) => task.status === selectedStatus);

  return (
    <View style={styles.container}>
      {/* <View style={styles.searchContainer}>
        <Text style={styles.txtSearch}>Tìm kiếm...</Text>
      </View> */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#aaa"
          style={styles.searchIcon}
        />
        <TextInput placeholder="Tìm kiếm nhiệm vụ" style={styles.searchInput} />
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.statusContainer}>
          {["To do", "In progress", "Done"].map((status) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.btnStatus,
                selectedStatus === status && styles.btnActive,
              ]}
              onPress={() => handleStatusChange(status)}
            >
              <Text
                style={{
                  color:
                    selectedStatus === status ? color.white : color.darkBlue,
                  fontWeight: "bold",
                }}
              >
                {status}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <ScrollView>
          <View style={styles.taskListContainer}>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.taskContent}
                  onPress={() => handleTaskDetail(task)}
                >
                  <View style={{ paddingVertical: 10, paddingHorizontal: 15 }}>
                    <Text style={styles.txtHeaderTaskContent}>
                      {task.title}
                    </Text>
                    <Text style={{ fontSize: 15 }}>{task.summary}</Text>
                    <View style={styles.members}>
                      {task.members.map((member, idx) => (
                        <Image
                          key={idx}
                          source={member.img}
                          style={styles.imgMember}
                        />
                      ))}
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={{ textAlign: "center", marginTop: 20 }}>
                Không có nhiệm vụ nào
              </Text>
            )}
          </View>
        </ScrollView>
        <TouchableOpacity onPress={handleAddTask} style={styles.addNewTask}>
          <Icon name="plus" size={30} color={color.mainColor} solid={false} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: color.mainColor },
  searchContainer: {
    width: "80%",
    height: 40,
    backgroundColor: color.white,
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 15,
    marginVertical: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 10,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchIcon: { marginRight: 5 },
  searchInput: { flex: 1, height: 40 },
  txtSearch: { marginLeft: 20, fontSize: 15, color: color.darkgray },
  bodyContainer: { flex: 1, backgroundColor: color.gray },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: color.white,
    padding: 10,
  },
  btnStatus: {
    backgroundColor: color.lightBlue,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
  },
  btnActive: { backgroundColor: color.mainColor },
  taskListContainer: { flex: 1, alignItems: "center" },
  taskContent: {
    width: "90%",
    backgroundColor: color.white,
    marginTop: 20,
    borderRadius: 20,
  },
  txtHeaderTaskContent: { fontWeight: "bold", fontSize: 15, marginBottom: 10 },
  members: { flexDirection: "row", marginTop: 10 },
  imgMember: { width: 25, height: 25, borderRadius: 50 },
  addNewTask: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: color.bgPlus,
    borderRadius: 100,
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
  },
});
