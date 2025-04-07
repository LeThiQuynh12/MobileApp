// File ChiTietNhiemVu.js
import { StyleSheet, Text, TouchableOpacity, View, Image, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import { Calendar } from "react-native-calendars";
import color from "../../utils/color";
import moment from "moment";
import api from "../../utils/api";

import {
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import * as DocumentPicker from 'expo-document-picker';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ChiTietNhiemVu = ({ route }) => {
  const { task } = route.params; // Lấy dữ liệu được truyền qua
  console.log("Route Params:", route.params);

  const [selectedStatus, setSelectedStatus] = useState(
    task?.trangThai || "In progress"
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDay, setStartDay] = useState(task?.ngayBatDau || "");
  const [endDay, setEndDay] = useState(task?.ngayKetThuc || "");
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  console.log(task);

  // Cập nhật state khi task thay đổi
  useEffect(() => {
    if (task) {
      setTitle(task.tenCongViec || "");
      setDescription(task.moTa || "");
    }
  }, [task]);

  const updateTask = async () => {
    try {
      const updatedTask = {
        ten: title,
        moTa: description,
        trangThai: selectedStatus,
        ngayBatDau: startDay,
        ngayKetThuc: endDay,
      };
      console.log(task);

      const response = await api.put(`/tasks/${task.id}`, updatedTask);

      if (response.status === 200) {
        console.log("Nhiệm vụ đã được cập nhật:", response.data);
        Alert.alert("Thành công", "Nhiệm vụ đã được cập nhật!");
      } else {
        setError("Không thể cập nhật nhiệm vụ!");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
      setError("Đã xảy ra lỗi, vui lòng thử lại!");
    }
  };

  // Format the date to dd/MM/yyyy
  const formatDate = (date) => moment(date).format("DD/MM/YYYY");

  const [newComment, setNewComment] = useState(""); // Nhận xét mới
  const [comments, setComments] = useState([
    { name: "Trần Trung", text: "Nhiệm vụ chi tiết, hoàn thành đúng thời hạn" },
    { name: "Hoàng Thị Thảo", text: "Các bạn thực hiện nhiệm vụ tốt, đầy đủ" },
    { name: "Lê Thị Quỳnh", text: "Khó thế Thảo ơi" },
  ]);
  const handleAddComment = () => {
    if (newComment.trim() === "") return; // Kiểm tra nếu comment rỗng
    setComments([...comments, { name: "Người dùng", text: newComment }]);
    setNewComment(""); // Xóa nội dung nhập sau khi gửi
  };

  const handleSelectedStartDay = (day) => {
    setStartDay(day.dateString); // Cập nhật ngày bắt đầu
    setShowStartCal(false); // Đóng lịch sau khi chọn
  };

  const handleSelectedEndDay = (day) => {
    setEndDay(day.dateString); // Cập nhật ngày kết thúc
    setShowEndCal(false); // Đóng lịch sau khi chọn
  };

  const [showStartCal, setShowStartCal] = useState(false);
  const [showEndCal, setShowEndCal] = useState(false);

  const handleSelectFile = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });

      setSelectedFile(res); // Lưu file vào state

    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("Người dùng đã hủy chọn file");
      } else {
        console.error("Lỗi khi chọn file:", err);
        Alert.alert("Lỗi", "Không thể chọn tài liệu");
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <KeyboardAwareScrollView
        style={styles.container}
        extraScrollHeight={-100} // Đẩy màn hình lên khi bàn phím xuất hiện
        enableOnAndroid={true} // Kích hoạt trên Android
        keyboardShouldPersistTaps="handled" // Đảm bảo có thể bấm ra ngoài để ẩn bàn phím
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <View style={styles.containerDetailTask}>
              <View style={styles.task}>
                <View style={styles.taskContainer}>
                  <TextInput
                    style={styles.textTaskName}
                    value={title} // Dùng state thay vì task?.title
                    onChangeText={(text) => setTitle(text)}
                  />

                  {/* <TextInput
                    value={summary} // Dùng state thay vì task?.summary
                    style={styles.textTaskSummary}
                    onChangeText={(text) => setSummary(text)}
                  /> */}
                  <ScrollView style={styles.contentTaskContainer}>
                    <TextInput
                      value={description} // Dùng state thay vì task?.description
                      onChangeText={(text) => setDescription(text)}
                      multiline={true}
                      numberOfLines={4}
                      style={{
                        textAlignVertical: "top",
                        borderWidth: 1,
                        borderRadius: 10,
                        borderColor: "#bb9",
                        padding: 7.5,
                      }}
                    />
                  </ScrollView>

                  <View style={styles.date}>
                    <Text style={{ marginRight: 20 }}>
                      Ngày bắt đầu: {formatDate(startDay)}{" "}
                      {/* Format date here */}
                    </Text>

                    <TouchableOpacity
                      onPress={() => setShowStartCal(!showStartCal)}
                    >
                      <Icon name="calendar" color={color.black} size={20} />
                    </TouchableOpacity>
                    {showStartCal && (
                      <View style={styles.calendarContainer}>
                        <Calendar
                          onDayPress={handleSelectedStartDay}
                          style={styles.calendar}
                        />
                      </View>
                    )}
                  </View>

                  <View style={styles.date}>
                    <Text style={{ marginRight: 20 }}>
                      Ngày đến hạn: {formatDate(endDay)}{" "}
                      {/* Format date here */}
                    </Text>

                    <TouchableOpacity
                      onPress={() => setShowEndCal(!showEndCal)}
                    >
                      <Icon name="calendar" color={color.black} size={20} />
                    </TouchableOpacity>
                    {showEndCal && (
                      <View style={styles.calendarContainer}>
                        <Calendar
                          onDayPress={handleSelectedEndDay}
                          style={styles.calendar}
                        />
                      </View>
                    )}
                  </View>

                  <Text style={{ marginTop: 10 }}>Người thực hiện</Text>
                  {task?.members?.map((member, index) => (
                    <View key={index} style={styles.membersContainer}>
                      <Image source={member.img} style={styles.imgMember} />
                      <Text>{member.name}</Text>
                    </View>
                  ))}

                  <View style={styles.documents}>
                    <Text style={{ paddingVertical: 10, marginTop: 10 }}>
                      Tài liệu
                    </Text>
                    <TouchableOpacity style={styles.uploadFile}>
                      <Text style={{ marginTop: 5 }}>Tải tài liệu</Text>
                    </TouchableOpacity>
                  </View>
                  {selectedFile && (
                    <Text style={{ marginTop: 10, fontStyle: 'italic' }}>
                      Đã chọn: {selectedFile.name}
                    </Text>
                  )}

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
                  <TouchableOpacity style={styles.button} onPress={updateTask}>
                    <Text style={styles.buttonText}>Cập nhật</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.commentContainer}>
              <View
                style={{
                  borderBottomWidth: 1,
                  marginBottom: 10,
                  borderBottomColor: color.darkgray,
                }}
              ></View>
              <Text style={styles.commentTitle}>Nhận xét:</Text>
              <View style={styles.comment}>
                {comments.map((comment, index) => (
                  <View key={index}>
                    <Text style={styles.commentName}>{comment.name}</Text>
                    <Text style={styles.description}>{comment.text}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.addComment}>
                <TextInput
                  style={styles.commentInput}
                  placeholder="Nhập nhận xét..."
                  value={newComment}
                  onChangeText={setNewComment}
                />
                <TouchableOpacity onPress={handleAddComment}>
                  <Icon
                    name="send"
                    size={20}
                    color={color.mainColor}
                    style={{ marginLeft: 10 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.gray,
    flex: 1,
  },
  containerDetailTask: {
    backgroundColor: color.gray,
    flex: 1,
    alignItems: "center",
  },
  taskHeader: {
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
    marginTop: 20,
    borderRadius: 20,
    paddingBottom: 20
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
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#bb9",
    padding: 10,
    fontSize: 15,
    marginBottom: 10,
  },
  // textTaskSummary: {
  //   fontSize: 15,
  //   marginBottom: 10,
  // },
  contentTaskContainer: {
    marginBottom: 10
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
  button: {
    marginTop: 30,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 15,
    color: '#fff',
    fontWeight: 600
  },
  commentContainer: {
    marginTop: 15,
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: 25,
  },
  comment: {
    marginTop: 10,
  },
  description: {
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    padding: 8,
    borderColor: color.darkgray,
    backgroundColor: color.white,
  },

  commentTitle: {
    fontSize: 17,
    fontWeight: "bold",
    alignSelf: "center",
    color: color.darkBlue,
  },
  commentName: {
    color: color.mainColor,
    fontSize: 15,
    marginLeft: 5,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    borderColor: color.darkgray,
    backgroundColor: color.white,
  },
  addComment: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: color.white,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    marginBottom: 50,
  },
  calendarContainer: {
    flex: 1,
    position: "absolute", // Đặt lịch ở vị trí tuyệt đối
    marginTop: 20,
    top: "30%", // Điều chỉnh vị trí theo chiều dọc
    left: "10%", // Điều chỉnh vị trí theo chiều ngang
    right: "10%", // Điều chỉnh kích thước
    zIndex: 1, // Đảm bảo lịch hiển thị phía trên các thành phần khác
  },

  calendar: {
    backgroundColor: color.white, // Màu nền của lịch
    borderRadius: 10, // Bo góc lịch
  },
});
export default ChiTietNhiemVu;
