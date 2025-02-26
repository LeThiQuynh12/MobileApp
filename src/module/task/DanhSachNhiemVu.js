// File DanhSachNhiemVu.js
import React, { useCallback, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  ScrollView,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import ChiTietNhiemVu from "./ChiTietNhiemVu"; // Đảm bảo đường dẫn đúng
import color from "../../utils/color";

export default function DanhSachNhiemVu() {
  const navigation = useNavigation();
  const refBottomSheet = useRef(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");
  const handleBackTopicDetail = () => {
    navigation.navigate("ChiTietDeTai");
  };
  const handleAddTask = () => {
    navigation.navigate("GiaoNhiemVu");
  };
  const [selectedStatus, setSelectedStatus] = useState("In progress");
  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };
  const onPress = useCallback((task) => {
    console.log(task);
    setSelectedTask(task); // Lưu nhiệm vụ được chọn
    refBottomSheet.current.scrollTo(-SCREEN_HEIGHT / 1 + 85); // Mở bottom sheet
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* <View style={styles.containerHeader}>
          <Icon
            style={styles.iconArrowLeft}
            name="arrow-left"
            color="white"
            size={20}
            onPress={handleBackTopicDetail}
          />
          <Text style={styles.textHeader}>Danh sách nhiệm vụ</Text>
        </View> */}
        <View style={styles.searchContainer}>
          <Text style={styles.txtSearch}>Tìm kiếm...</Text>
        </View>
        <View style={styles.bodyContainer}>
          {/* Trạng thái nhiệm vụ */}
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
              <TouchableOpacity
                style={styles.taskContent}
                onPress={() =>
                  onPress({
                    title: "Nhiệm vụ 1",
                    summary: "Xây dựng giao diện quản lý sinh viên",
                    description:
                      "Thiết kế màn hình đăng nhập, chi tiết đề tài, danh sách đề tài",
                    startDay: "20-12-2025",
                    endDay: "20-12-2025",
                    members: [
                      { img: "", name: "Quynh" },
                      { img: "", name: "Trien" },
                    ],
                  })
                }
              >
                <View style={{ paddingVertical: 10, paddingHorizontal: 15 }}>
                  <Text style={styles.txtHeaderTaskContent}>Nhiệm vụ 1</Text>
                  <Text style={{ fontSize: 15 }}>
                    Xây dựng giao diện quản lý sinh viên
                  </Text>
                  <View style={styles.members}>
                    <Image
                      source={require("../../../src/data/imgs/defaultAvatar.png")}
                      style={styles.imgMember}
                    />
                    <Image
                      source={require("../../../src/data/imgs/defaultAvatar.png")} // Đảm bảo đường dẫn chính xác
                      style={styles.imgMember}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.taskContent}
                onPress={() =>
                  onPress({
                    title: "Nhiệm vụ 2",
                    summary: "Xây dựng giao diện quản lý sinh viên",
                    description:
                      "Thiết kế màn hình đăng nhập, chi tiết đề tài, danh sách đề tài",
                    startDay: "20-12-2025",
                    endDay: "20-12-2025",
                    members: [
                      { img: "", name: "Viet" },
                      { img: "", name: "Trien" },
                    ],
                  })
                }
              >
                <View style={{ paddingVertical: 10, paddingHorizontal: 15 }}>
                  <Text style={styles.txtHeaderTaskContent}>Nhiệm vụ 2</Text>
                  <Text style={{ fontSize: 15 }}>
                    Xây dựng giao diện quản lý sinh viên
                  </Text>
                  <View style={styles.members}>
                    <Image
                      source={require("../../../src/data/imgs/defaultAvatar.png")}
                      style={styles.imgMember}
                    />
                    <Image
                      source={require("../../../src/data/imgs/defaultAvatar.png")} // Đảm bảo đường dẫn chính xác
                      style={styles.imgMember}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.taskContent}
                onPress={() =>
                  onPress({
                    title: "Nhiệm vụ 3",
                    summary: "Xây dựng giao diện quản lý giảng viên",
                    description:
                      "Thiết kế màn hình đăng nhập, trang chủ, thông tin cá nhân, chi tiết đề tài, danh sách đề tài",
                    startDay: "20-12-2025",
                    endDay: "20-12-2025",
                    members: [
                      { img: "", name: "Quynh" },
                      { img: "", name: "Viet" },
                    ],
                  })
                }
              >
                <View style={{ paddingVertical: 10, paddingHorizontal: 15 }}>
                  <Text style={styles.txtHeaderTaskContent}>Nhiệm vụ 3</Text>
                  <Text style={{ fontSize: 15 }}>
                    Xây dựng giao diện quản lý sinh viên
                  </Text>
                  <View style={styles.members}>
                    <Image
                      source={require("../../../src/data/imgs/defaultAvatar.png")}
                      style={styles.imgMember}
                    />
                    <Image
                      source={require("../../../src/data/imgs/defaultAvatar.png")} // Đảm bảo đường dẫn chính xác
                      style={styles.imgMember}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <TouchableOpacity onPress={handleAddTask} style={styles.addNewTask}>
            <Icon name="plus" size={30} color={color.mainColor} solid={false} />
          </TouchableOpacity>
        </View>
        <ChiTietNhiemVu ref={refBottomSheet} task={selectedTask} />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.mainColor,
  },
  containerHeader: {
    flexDirection: "row",
    marginTop: 55,
  },
  iconArrowLeft: {
    marginHorizontal: 20,
  },
  textHeader: {
    color: color.white,
    fontWeight: "bold",
    fontSize: 18,
  },
  searchContainer: {
    width: "80%",
    height: 40,
    backgroundColor: color.white,
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 15,
    marginVertical: 20,
  },
  txtSearch: {
    marginLeft: 20,
    fontSize: 15,
    color: color.darkgray,
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: color.gray,
  },
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
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    color: color.darkBlue,
  },
  btnActive: {
    backgroundColor: color.mainColor,
    paddingHorizontal: 25,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  taskListContainer: {
    flex: 1,
    alignItems: "center",
  },
  taskContent: {
    width: "90%",
    backgroundColor: color.white,
    marginTop: 20,
    borderRadius: 20,
  },
  txtHeaderTaskContent: { fontWeight: "bold", fontSize: 15, marginBottom: 10 },
  members: {
    flexDirection: "row",
    marginTop: 10,
  },
  imgMember: {
    width: 25,
    height: 25,
    borderRadius: 50,
  },
  addNewTask: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: color.bgPlus,
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
    marginBottom: 20,
    borderRadius: 100,
    width: 70,
    height: 70,
  },
});
