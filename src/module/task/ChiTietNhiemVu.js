// File ChiTietNhiemVu.js
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from "react-native";
import React, {
  useState,
  useCallback,
  useEffect,
  useImperativeHandle,
} from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import color from "../../utils/color";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 100;

const ChiTietNhiemVu = React.forwardRef((props, ref) => {
  const [selectedStatus, setSelectedStatus] = useState("In progress");
  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };
  const route = useRoute();
  const task = route.params?.task || props.task; // Lấy task từ route params hoặc props

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");

  // Cập nhật state khi task thay đổi
  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setSummary(task.summary || "");
      setDescription(task.description || "");
    }
  }, [task]); // Theo dõi sự thay đổi của task

  console.log({ title, summary, description }); // Kiểm tra giá trị
  const formatDate = (date) => moment(date).format("DD-MM-YYYY");

  const [startDay, setStartDay] = useState(task?.startDay || "");
  const [endDay, setEndDay] = useState(task?.endDay || "");
  const [showStartCal, setShowStartCal] = useState(false);
  const [showEndCal, setShowEndCal] = useState(false);

  const onClose = () => {
    scrollTo(0);
  };

  const handleSelectedStartDay = (day) => {
    setStartDay(formatDate(day.dateString)); // Cập nhật ngày bắt đầu
    setShowStartCal(false); // Ẩn lịch
  };

  const handleSelectedEndDay = (day) => {
    setEndDay(formatDate(day.dateString)); // Cập nhật ngày kết thúc
    setShowEndCal(false); // Ẩn lịch
  };

  const translateY = useSharedValue(0);
  const active = useSharedValue(false);

  const scrollTo = useCallback((destination) => {
    "worklet";
    active.value = destination !== 0;
    translateY.value = withSpring(destination, { damping: 50 });
  }, []);

  const isActive = useCallback(() => {
    return active.value;
  }, []);

  useImperativeHandle(ref, () => ({ scrollTo, isActive }), [
    scrollTo,
    isActive,
  ]);

  const context = useSharedValue({ y: 0 });

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
    })
    .onEnd(() => {
      if (translateY.value > SCREEN_HEIGHT / 3) {
        scrollTo(90);
      } else if (translateY.value < SCREEN_HEIGHT / 3) {
        scrollTo(MAX_TRANSLATE_Y);
      }
    });

  useEffect(() => {
    scrollTo(SCREEN_HEIGHT / 2); // Hiển thị bottom sheet ở giữa màn hình
  }, [scrollTo, translateY]);

  const rBottomSheetStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
      [25, 5],
      Extrapolation.CLAMP
    );
    return {
      borderRadius,
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
        <View style={styles.container}>
          <View style={styles.containerDetailTask}>
            <View style={styles.taskHeader}>
              <TouchableOpacity
                style={styles.textTaskHeaderctn}
                onPress={onClose}
              >
                <Text style={styles.textHeaderDetail}>Đóng</Text>
              </TouchableOpacity>
              <Text style={styles.textHeaderTaskDetail}>Nhiệm vụ chi tiết</Text>
              <TouchableOpacity style={styles.textTaskHeaderctn}>
                <Text style={styles.textHeaderDetail}>Lưu</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.task}>
              <View style={styles.taskContainer}>
                <TextInput
                  style={styles.textTaskName}
                  value={task?.title}
                  onChangeText={(text) => setTitle(text)} // Cập nhật state khi nhập
                ></TextInput>
                <TextInput
                  value={summary} // Dùng state thay vì task?.summary
                  style={styles.textTaskSummary}
                  onChangeText={(text) => setSummary(text)}
                />
                <ScrollView style={styles.contentTaskContainer}>
                  <TextInput
                    value={description} // Dùng state thay vì task?.description
                    onChangeText={(text) => setDescription(text)}
                    multiline={true}
                    numberOfLines={4}
                    style={{ textAlignVertical: "top" }}
                  />
                </ScrollView>

                <View style={styles.date}>
                  <Text style={{ marginRight: 20 }}>
                    Ngày bắt đầu: {task?.startDay}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setShowStartCal(!showStartCal)}
                  >
                    <Icon name="calendar" color={color.black} size={20} />
                  </TouchableOpacity>
                  {showStartCal && (
                    <Calendar onDayPress={handleSelectedStartDay} />
                  )}
                </View>

                <View style={styles.date}>
                  <Text style={{ marginRight: 20 }}>
                    Ngày đến hạn: {task?.endDay}
                  </Text>
                  <TouchableOpacity onPress={() => setShowEndCal(!showEndCal)}>
                    <Icon name="calendar" color={color.black} size={20} />
                  </TouchableOpacity>
                  {showEndCal && <Calendar onDayPress={handleSelectedEndDay} />}
                </View>

                <Text style={{ marginTop: 10 }}>Người thực hiện</Text>
                <View style={styles.membersContainer}>
                  <Image
                    source={require("../../../src/data/imgs/defaultAvatar.png")} // Đảm bảo đường dẫn chính xác
                    style={styles.imgMember}
                  />
                  <TextInput>{task?.members[0]?.name}</TextInput>
                </View>
                <View style={styles.membersContainer}>
                  <Image
                    source={require("../../../src/data/imgs/defaultAvatar.png")} // Đảm bảo đường dẫn chính xác
                    style={styles.imgMember}
                  />
                  <TextInput>{task?.members[1]?.name}</TextInput>
                </View>
                <View style={styles.documents}>
                  <Text style={{ paddingVertical: 10, marginTop: 10 }}>
                    Tài liệu
                  </Text>
                  <TouchableOpacity style={styles.uploadFile}>
                    <Text style={{ marginTop: 5 }}>Tải tài liệu</Text>
                  </TouchableOpacity>
                </View>
                <Text style={{ marginTop: 10 }}>Trạng thái</Text>

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
                            selectedStatus === status
                              ? color.white
                              : color.darkBlue,
                          fontWeight: "bold",
                        }}
                      >
                        {status}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </View>
      </Animated.View>
    </GestureDetector>
  );
});

export default ChiTietNhiemVu;

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.mainColor,
    flex: 1,
    borderRadius: 20,
  },
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: "100%",
    backgroundColor: color.white,
    position: "absolute",
    top: SCREEN_HEIGHT,
    borderRadius: 30,
  },
  containerHeader: {
    flexDirection: "row",
    marginTop: 55,
    marginBottom: 30,
  },
  iconArrowLeft: {
    marginHorizontal: 20,
  },
  textHeader: {
    color: color.white,
    fontWeight: "bold",
    fontSize: 18,
  },
  containerDetailTask: {
    backgroundColor: color.gray,
    flex: 1,
    alignItems: "center",
    borderRadius: 20,
  },
  taskHeader: {
    height: 50,
    width: "100%",
    backgroundColor: color.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textTaskHeaderctn: {
    marginHorizontal: 20,
  },
  task: {
    backgroundColor: color.white,
    width: "90%",
    height: 600,
    marginTop: 20,
    borderRadius: 20,
  },
  taskContainer: {
    marginHorizontal: 30,
    marginTop: 20,
  },
  textHeaderDetail: {
    color: color.mainColor,
    fontWeight: "bold",
    fontSize: 15,
  },
  textHeaderTaskDetail: {
    fontWeight: "bold",
    fontSize: 17,
  },
  textTaskName: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 5,
  },
  textTaskSummary: {
    fontSize: 15,
    marginBottom: 10,
  },
  contentTaskContainer: {
    marginTop: 10,
    height: 200,
  },
  date: {
    flexDirection: "row",
    marginTop: 10,
  },
  membersContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  imgMember: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  documents: {
    flexDirection: "row",
  },
  uploadFile: {
    backgroundColor: color.mainColor,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginLeft: 20,
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: color.white,
    marginTop: 20,
    marginRight: 10,
  },
  btnStatus: {
    backgroundColor: color.lightBlue,
    width: "35%",
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    color: color.darkBlue,
  },
  btnActive: {
    backgroundColor: color.mainColor,
    width: "35%",
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
});
