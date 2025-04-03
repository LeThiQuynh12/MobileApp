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
    ngayBatDau: "",
    ngayKetThuc: "",
    taiLieu: null,
  });

  const [showCalendar, setShowCalendar] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (name, value) => {
    setTopicData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDayPress = (key, day) => {
    handleChange(key, day.dateString);
    setShowCalendar(null);
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
          { key: "tenDeTai", label: "Tên đề tài" },
          { key: "idGiangVien", label: "Giảng viên hướng dẫn" },
          { key: "idSinhVien", label: "Chủ nhiệm đề tài" },
          //{ key: "thanhVien", label: "Thành viên" },
          { key: "moTa", label: "Mô tả" },
          { key: "khoa", label: "Khoa" },
          { key: "linhVucNghienCuu", label: "Lĩnh vực nghiên cứu" },
        ].map(({ key, label }) => (
          <View key={key} style={styles.row}>
            <Text style={styles.label}>{label}:</Text>
            <TextInput
              style={styles.input}
              value={topicData[key]}
              onChangeText={(text) => handleChange(key, text)}
              placeholder={`Nhập ${label.toLowerCase()}`}
            />
          </View>
        ))}

        {[
          { key: "ngayBatDau", label: "Ngày bắt đầu" },
          { key: "ngayKetThuc", label: "Ngày kết thúc" },
        ].map(({ key, label }) => (
          <View key={key} style={styles.row}>
            <Text style={styles.label}>{label}:</Text>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => setShowCalendar(key)}
            >
              <Text style={styles.dateText}>
                {topicData[key] || "Chọn ngày"}
              </Text>
              <Icon name="calendar" size={20} color="#333" />
            </TouchableOpacity>
            {showCalendar === key && (
              <Calendar
                onDayPress={(day) => handleDayPress(key, day)}
                style={styles.calendar}
              />
            )}
          </View>
        ))}
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
  container: { flex: 1, padding: 16, backgroundColor: "#F2F2F2" },
  formContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    elevation: 5,
  },
  row: { marginBottom: 15 },
  label: { fontSize: 14, fontWeight: "600", marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    fontSize: 14,
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
  dateText: { fontSize: 14, color: "#333" },
  calendar: { borderRadius: 10, elevation: 5 },
  submitButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  disabledButton: { backgroundColor: "#ccc" },
  submitButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});

export default DangKyDeTai;
