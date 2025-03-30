import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { postTopicList } from "../../context/fetchData";
import { Calendar } from "react-native-calendars";
import Icon from "react-native-vector-icons/FontAwesome";

const DangKyDeTai = () => {
  const navigation = useNavigation();
  const [topicData, setTopicData] = useState({
    tenDeTai: "",
    giangVienHuongDan: "",
    chuNhiemDeTai: "",
    thanhVien: "",
    moTa: "",
    khoa: "",
    linhVucNghienCuu: "",
    ngayBatDau: new Date(),
    ngayKetThuc: new Date(),
    taiLieu: null,
  });

  const [showCalendar, setShowCalendar] = useState({
    ngayBatDau: false,
    ngayKetThuc: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (name, value) => {
    setTopicData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDayPress = (key, day) => {
    const selectedDate = new Date(day.timestamp);
    handleChange(key, selectedDate);
    setShowCalendar({ ...showCalendar, [key]: false });
  };

  const handleSubmit = async () => {
    if (
      !topicData.tenDeTai ||
      !topicData.giangVienHuongDan ||
      !topicData.chuNhiemDeTai
    ) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ các trường bắt buộc");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await postTopicList(topicData);
      if (response) {
        Alert.alert("Thành công", "Đăng ký đề tài thành công");
        navigation.goBack();
      } else {
        throw new Error("Đăng ký thất bại");
      }
    } catch (error) {
      Alert.alert("Lỗi", error.message || "Có lỗi xảy ra khi đăng ký đề tài");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        {[
          { label: "Tên đề tài", key: "tenDeTai", required: true },
          {
            label: "Người hướng dẫn",
            key: "giangVienHuongDan",
            required: true,
          },
          { label: "Chủ nhiệm đề tài", key: "chuNhiemDeTai", required: true },
          { label: "Người tham gia", key: "thanhVien", multiline: true },
          { label: "Mô tả", key: "moTa", multiline: true },
          { label: "Khoa", key: "khoa" },
          { label: "Lĩnh vực nghiên cứu", key: "linhVucNghienCuu" },
        ].map((field) => (
          <View key={field.key} style={styles.row}>
            <Text style={styles.label}>
              {field.label}:{" "}
              {field.required && <Text style={styles.required}>*</Text>}
            </Text>
            <TextInput
              style={[
                styles.input,
                styles.flexInput,
                field.multiline && styles.multilineInput,
              ]}
              value={topicData[field.key]}
              onChangeText={(text) => handleChange(field.key, text)}
              placeholder={`Nhập ${field.label.toLowerCase()}`}
              multiline={field.multiline}
            />
          </View>
        ))}

        {/* Chọn ngày bắt đầu */}
        <View style={styles.row}>
          <Text style={styles.label}>Ngày bắt đầu:</Text>
          <View style={styles.datePickerContainer}>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() =>
                setShowCalendar({ ...showCalendar, ngayBatDau: true })
              }
            >
              <Text style={styles.dateText}>
                {formatDate(topicData.ngayBatDau)}
              </Text>
              <Icon name="calendar" size={20} color="#333" />
            </TouchableOpacity>
            {showCalendar.ngayBatDau && (
              <View style={styles.calendarContainer}>
                <Calendar
                  onDayPress={(day) => handleDayPress("ngayBatDau", day)}
                  style={styles.calendar}
                  markedDates={{
                    [formatDate(topicData.ngayBatDau)
                      .split("/")
                      .reverse()
                      .join("-")]: { selected: true },
                  }}
                />
              </View>
            )}
          </View>
        </View>

        {/* Chọn ngày kết thúc */}
        <View style={styles.row}>
          <Text style={styles.label}>Ngày kết thúc:</Text>
          <View style={styles.datePickerContainer}>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() =>
                setShowCalendar({ ...showCalendar, ngayKetThuc: true })
              }
            >
              <Text style={styles.dateText}>
                {formatDate(topicData.ngayKetThuc)}
              </Text>
              <Icon name="calendar" size={20} color="#333" />
            </TouchableOpacity>
            {showCalendar.ngayKetThuc && (
              <View style={styles.calendarContainer}>
                <Calendar
                  onDayPress={(day) => handleDayPress("ngayKetThuc", day)}
                  style={styles.calendar}
                  minDate={formatDate(topicData.ngayBatDau)
                    .split("/")
                    .reverse()
                    .join("-")}
                  markedDates={{
                    [formatDate(topicData.ngayKetThuc)
                      .split("/")
                      .reverse()
                      .join("-")]: { selected: true },
                  }}
                />
              </View>
            )}
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.submitButton, isSubmitting && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>Đăng ký</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2F2F2", padding: 16 },
  formContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    width: 150,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
    fontSize: 14,
    flex: 1,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  datePickerContainer: {
    flex: 1,
  },
  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
  },
  dateText: {
    fontSize: 14,
    color: "#333",
  },
  calendarContainer: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  calendar: {
    borderRadius: 10,
    elevation: 4,
  },
  submitButton: {
    backgroundColor: "#2196F3",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 30,
  },
  submitButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  disabledButton: { backgroundColor: "#90CAF9" },
  required: { color: "red" },
});

export default DangKyDeTai;
