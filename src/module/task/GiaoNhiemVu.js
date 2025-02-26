import React, { useState } from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { TextInput } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";

import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";

const GiaoNhiemVu = () => {
  const navigation = useNavigation();
  const [openTopic, setOpenTopic] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [topics, setTopics] = useState([
    { label: "Bảo mật hệ thống", value: "detai1" },
    { label: "Học máy trong AI", value: "detai2" },
    { label: "Bảo mật React Native", value: "detai3" },
  ]);

  const [openStudent, setOpenStudent] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students, setStudents] = useState([
    { label: "Nguyễn Văn A", value: "sv1" },
    { label: "Trần Thị B", value: "sv2" },
    { label: "Lê Văn C", value: "sv3" },
    { label: "Hoàng Minh D", value: "sv4" },
  ]);

  // Quản lý Deadline
  const [deadline, setDeadline] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    if (selectedDate) {
      setDeadline(selectedDate);
    }
    setShowPicker(false);
  };

  return (
    <View style={styles.container}>
      {/*<View style={styles.header}>
        <Ionicons
          name="menu"
          size={24}
          color="white"
          onPress={() => navigation.openDrawer()}
        />
        <Text style={styles.headerTitle}>Giao nhiệm vụ </Text>
      </View>
      */}
      <View style={styles.formContainer}>
        <View style={styles.row}>
          <Text style={styles.label}>Chọn đề tài:</Text>
          <View style={styles.dropdownWrapper}>
            <DropDownPicker
              open={openTopic}
              value={selectedTopic}
              items={topics}
              setOpen={setOpenTopic}
              setValue={setSelectedTopic}
              setItems={setTopics}
              placeholder="Chọn đề tài"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
            />
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Tên nhiệm vụ:</Text>
          <TextInput style={styles.input} />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Deadline:</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowPicker(true)}
          >
            <Text>{deadline.toISOString().split("T")[0]}</Text>
          </TouchableOpacity>
          {showPicker && (
            <DateTimePicker
              value={deadline}
              mode="date"
              display="default"
              onChange={onChangeDate}
            />
          )}
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Sinh viên làm:</Text>
          <View style={styles.dropdownWrapper}>
            <DropDownPicker
              open={openStudent}
              value={selectedStudent}
              items={students}
              setOpen={setOpenStudent}
              setValue={setSelectedStudent}
              setItems={setStudents}
              placeholder="Chọn sinh viên"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
            />
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Mô tả:</Text>
          <TextInput
            style={[styles.input, styles.flexInput, styles.multiline]}
            multiline
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Tài liệu:</Text>
          <TouchableOpacity style={styles.uploadButton}>
            <Icon name="upload" size={20} color="#fff" />
            <Text style={styles.uploadButtonText}>Tải lên</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Đăng ký</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GiaoNhiemVu;

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
  formContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    gap: 24,
  },
  flexInput: {
    flex: 1, // Giúp input mở rộng hết dòng
  },
  multiline: {
    height: 80,
    textAlignVertical: "top", // Căn chữ lên đầu
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    width: 100,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
  },
  multiline: {
    height: 80,
    textAlignVertical: "top",
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7AD530",
    padding: 12,
    borderRadius: 5,
    marginLeft: 10,
    justifyContent: "center",
    width: 150,
  },
  uploadButtonText: {
    color: "#fff",
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  submitButton: {
    marginTop: 35,
    backgroundColor: "#64B5F6",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "center",
    width: 200,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  dropdownWrapper: {
    flex: 1,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
  },
});
