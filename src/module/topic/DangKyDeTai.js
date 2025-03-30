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
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "../../utils/api"; // Import API_URL từ file cấu hình
import { postTopicList } from "../../context/fetchData";

const DangKyDeTai = () => {
  const navigation = useNavigation();

  // State lưu trữ thông tin đề tài
  const [topicData, setTopicData] = useState({
    tenDeTai: "",
    giangVienHuongDan: "",
    chuNhiemDeTai: "",
    thanhVien: "",
    moTa: "",
    taiLieu: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Hàm xử lý thay đổi dữ liệu
  const handleChange = (name, value) => {
    setTopicData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Hàm gửi dữ liệu lên server
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
      const formData = new FormData();
      formData.append("tenDeTai", topicData.tenDeTai);
      formData.append("giangVienHuongDan", topicData.giangVienHuongDan);
      formData.append("chuNhiemDeTai", topicData.chuNhiemDeTai);
      formData.append("thanhVien", topicData.thanhVien);
      formData.append("moTa", topicData.moTa);

      if (topicData.taiLieu) {
        formData.append("taiLieu", topicData.taiLieu);
      }

      const response = await postTopicList(formData);

      if (response) {
        // Kiểm tra response theo cách phù hợp với API của bạn
        Alert.alert("Thành công", "Đăng ký đề tài thành công");
        navigation.goBack();
      } else {
        throw new Error("Đăng ký thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi đăng ký đề tài:", error);
      Alert.alert("Lỗi", error.message || "Có lỗi xảy ra khi đăng ký đề tài");
    } finally {
      setIsSubmitting(false);
    }
  };
  // Hàm chọn file (giả lập - cần tích hợp thư viện chọn file thực tế)
  const handlePickDocument = async () => {
    // Thực tế cần sử dụng thư viện như react-native-document-picker
    // Đây chỉ là ví dụ minh họa
    Alert.alert("Thông báo", "Chức năng chọn file sẽ được tích hợp sau");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        {/* Tên đề tài */}
        <View style={styles.row}>
          <Text style={styles.label}>
            Tên đề tài: <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={[styles.input, styles.flexInput]}
            value={topicData.tenDeTai}
            onChangeText={(text) => handleChange("tenDeTai", text)}
            placeholder="Nhập tên đề tài"
          />
        </View>

        {/* Người hướng dẫn */}
        <View style={styles.row}>
          <Text style={styles.label}>
            Người hướng dẫn: <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={[styles.input, styles.flexInput]}
            value={topicData.giangVienHuongDan}
            onChangeText={(text) => handleChange("giangVienHuongDan", text)}
            placeholder="Nhập tên giảng viên hướng dẫn"
          />
        </View>

        {/* Chủ nhiệm đề tài */}
        <View style={styles.row}>
          <Text style={styles.label}>
            Chủ nhiệm đề tài: <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={[styles.input, styles.flexInput]}
            value={topicData.chuNhiemDeTai}
            onChangeText={(text) => handleChange("chuNhiemDeTai", text)}
            placeholder="Nhập tên chủ nhiệm đề tài"
          />
        </View>

        {/* Người tham gia */}
        <View style={styles.row}>
          <Text style={styles.label}>
            Người tham gia: <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={[styles.input, styles.flexInput, styles.multiline]}
            value={topicData.thanhVien}
            onChangeText={(text) => handleChange("thanhVien", text)}
            multiline
            placeholder="Nhập tên các thành viên tham gia, cách nhau bởi dấu phẩy"
          />
        </View>

        {/* Mô tả */}
        <View style={styles.row}>
          <Text style={styles.label}>Mô tả:</Text>
          <TextInput
            style={[styles.input, styles.flexInput, styles.multiline]}
            value={topicData.moTa}
            onChangeText={(text) => handleChange("moTa", text)}
            multiline
            placeholder="Nhập mô tả chi tiết về đề tài"
          />
        </View>

        {/* Tài liệu liên quan */}
        <View style={styles.row}>
          <Text style={styles.label}>Tài liệu liên quan:</Text>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={handlePickDocument}
          >
            <Icon name="upload" size={20} color="#fff" />
            <Text style={styles.uploadButtonText}>
              {topicData.taiLieu ? topicData.taiLieu.name : "Tải lên"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Nút đăng ký */}
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
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    padding: 16,
  },
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
    alignItems: "flex-start",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    width: 120,
    paddingTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
    fontSize: 14,
  },
  flexInput: {
    flex: 1,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
    flex: 1,
  },
  uploadButtonText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "600",
  },
  submitButton: {
    backgroundColor: "#2196F3",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 30,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#90CAF9",
  },
  required: {
    color: "red",
  },
});

export default DangKyDeTai;
