import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Calendar } from "react-native-calendars";

const SuaDeTai = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const topicData = params?.topic || {};

  console.log("Đề tài nhận từ chi tiết đề tài:", topicData);

  const [editedTopic, setEditedTopic] = useState({
    tenDeTai: "",
    idGiangVien: "",
    idSinhVien: "",
    moTa: "",
    khoa: "",
    linhVucNghienCuu: "",
    ngayBatDau: "",
    ngayKetThuc: "",
  });

  const [showCalendar, setShowCalendar] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize data from topicData
  useEffect(() => {
    if (topicData) {
      setEditedTopic({
        tenDeTai: topicData.tenDeTai || "",
        idGiangVien: topicData.idGiangVien || "",
        idSinhVien: topicData.idSinhVien || "",
        moTa: topicData.moTa || "",
        khoa: topicData.khoa || "",
        linhVucNghienCuu: topicData.linhVucNghienCuu || "",
        ngayBatDau: topicData.ngayBatDau || "",
        ngayKetThuc: topicData.ngayKetThuc || "",
      });
    }
  }, [topicData]);

  const handleChange = (name, value) => {
    setEditedTopic((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (event, selectedDate, key) => {
    if (event.type === "set") {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      handleChange(key, formattedDate);
    }
    setShowCalendar(null);
  };

  const handleSubmit = async () => {
    if (
      !editedTopic.tenDeTai ||
      !editedTopic.idGiangVien ||
      !editedTopic.idSinhVien
    ) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ các trường bắt buộc");
      return;
    }

    setIsSubmitting(true);
    try {
      // Replace with your actual API call
      const response = await updateTopic({
        ...editedTopic,
        id: topicData.id, // Keep the original ID
      });

      if (response) {
        Alert.alert("Thành công", "Cập nhật đề tài thành công");
        navigation.goBack();
      } else {
        throw new Error("Cập nhật thất bại");
      }
    } catch (error) {
      Alert.alert("Lỗi", error.message || "Có lỗi xảy ra khi cập nhật");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        {[
          { key: "tenDeTai", label: "Tên đề tài", required: true },
          { key: "idGiangVien", label: "Giảng viên hướng dẫn", required: true },
          { key: "idSinhVien", label: "Chủ nhiệm đề tài", required: true },
          { key: "khoa", label: "Khoa", required: false },
          {
            key: "linhVucNghienCuu",
            label: "Lĩnh vực nghiên cứu",
            required: false,
          },
        ].map(({ key, label, required }) => (
          <View key={key} style={styles.row}>
            <Text style={styles.label}>
              {label}: {required && <Text style={styles.required}>*</Text>}
            </Text>
            <TextInput
              style={styles.input}
              value={editedTopic[key]}
              onChangeText={(text) => handleChange(key, text)}
              placeholder={`Nhập ${label.toLowerCase()}`}
              editable={!isSubmitting}
            />
          </View>
        ))}

        <View style={styles.row}>
          <Text style={styles.label}>Mô tả:</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            value={editedTopic.moTa}
            onChangeText={(text) => handleChange("moTa", text)}
            placeholder="Nhập mô tả chi tiết"
            multiline
            numberOfLines={4}
            editable={!isSubmitting}
          />
        </View>

        {["ngayBatDau", "ngayKetThuc"].map((key) => (
          <View key={key} style={styles.row}>
            <Text style={styles.label}>
              {key === "ngayBatDau" ? "Ngày bắt đầu" : "Ngày kết thúc"}:
            </Text>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => setShowCalendar(key)}
              disabled={isSubmitting}
            >
              <Text style={styles.dateText}>
                {editedTopic[key] || "Chọn ngày"}
              </Text>
              <Ionicons name="calendar" size={20} color="#333" />
            </TouchableOpacity>
            {showCalendar === key && (
              <DateTimePicker
                value={
                  editedTopic[key] ? new Date(editedTopic[key]) : new Date()
                }
                mode="date"
                display="default"
                onChange={(event, date) => handleDateChange(event, date, key)}
                minimumDate={
                  key === "ngayKetThuc" && editedTopic.ngayBatDau
                    ? new Date(editedTopic.ngayBatDau)
                    : undefined
                }
              />
            )}
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.saveButton, isSubmitting && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        <Text style={styles.saveButtonText}>
          {isSubmitting ? "Đang cập nhật..." : "Cập nhật"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    padding: 16,
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  row: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  required: {
    color: "red",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: "#fff",
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: "top",
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
  saveButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default SuaDeTai;
