import React, { useState, useEffect } from "react";
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
import { useNavigation, useRoute } from "@react-navigation/native";
import { updateTopic } from "../../context/fetchData";
import { Calendar } from "react-native-calendars";
import Icon from "react-native-vector-icons/FontAwesome";

const SuaDeTai = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const topicData = params?.topic || {};
  console.log("đề tài nhận từ chi tiết đề tài:", topicData);
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

  // Khởi tạo dữ liệu từ topicData
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

  const handleDayPress = (key, day) => {
    handleChange(key, day.dateString);
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
      const response = await updateTopic({
        ...editedTopic,
        id: topicData.id, // Giữ nguyên ID
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
          { key: "tenDeTai", label: "Tên đề tài" },
          { key: "idGiangVien", label: "Giảng viên hướng dẫn" },
          { key: "idSinhVien", label: "Chủ nhiệm đề tài" },
          { key: "khoa", label: "Khoa" },
          { key: "linhVucNghienCuu", label: "Lĩnh vực nghiên cứu" },
        ].map(({ key, label }) => (
          <View key={key} style={styles.row}>
            <Text style={styles.label}>{label}:</Text>
            <TextInput
              style={styles.input}
              value={editedTopic[key]}
              onChangeText={(text) => handleChange(key, text)}
              placeholder={`Nhập ${label.toLowerCase()}`}
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
            >
              <Text style={styles.dateText}>
                {editedTopic[key] || "Chọn ngày"}
              </Text>
              <Icon name="calendar" size={20} color="#333" />
            </TouchableOpacity>
            {showCalendar === key && (
              <Calendar
                onDayPress={(day) => handleDayPress(key, day)}
                style={styles.calendar}
                markedDates={{
                  [editedTopic[key]]: {
                    selected: true,
                    selectedColor: "#007bff",
                  },
                }}
                minDate={
                  key === "ngayKetThuc" ? editedTopic.ngayBatDau : undefined
                }
              />
            )}
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Cập nhật</Text>
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

  saveButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },

  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    elevation: 3,
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
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
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
  },
  dateText: {
    fontSize: 14,
    color: "#333",
  },
  calendar: {
    marginTop: 10,
    borderRadius: 10,
    elevation: 4,
  },
});

export default SuaDeTai;
