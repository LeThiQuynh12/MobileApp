import React, {
  useEffect,
  useState,
} from 'react';

import * as DocumentPicker from 'expo-document-picker';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Calendar } from 'react-native-calendars';

import {
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import api from '../../utils/api';
import UploadFile from '../document/UploadFile';

const DangKyDeTai = () => {
  const navigation = useNavigation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCalendar, setShowCalendar] = useState(null);
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState(null);

  const [topicData, setTopicData] = useState({
    tenDeTai: "",
    maGiangVien: "",
    tenGiangVien: "",
    maSinhVien: "",
    tenSinhVien: "",
    thanhVien: [{ maSinhVien: "", tenSinhVien: "" }],
    moTa: "",
    khoa: "",
    linhVucNghienCuu: "",
    ngayBatDau: "",
    ngayKetThuc: "",
    taiLieu: null,
  });

  const postNotification = async () => {
    try {
      const responseLecturer = await api.get(`/users/lecturer/${topicData.maGiangVien}`);
      const lecturerId = responseLecturer.data.results.id;

      const studentIDs = await Promise.all(
        topicData.thanhVien.map(async (member) => {
          const res = await api.get(`/users/student/${member.maSinhVien}`);
          const id = res.data.results.id;
          return id;
        })
      );

      const responseLeader = await api.get(`/users/student/${topicData.maSinhVien}`);
      const leaderId = responseLeader.data.results.id;

      const userIDs = [lecturerId, ...studentIDs, leaderId];

      const notification = {
        tieuDe: "Bạn đã đăng kí đề tài thành công",
        moTa: `Đề tài của bạn: ${topicData.tenDeTai}. Giảng viên hướng dẫn: ${topicData.tenGiangVien} Trưởng nhóm: ${topicData.tenSinhVien}, các thành viên tham gia: ${topicData.thanhVien.map(member => member.tenSinhVien).join(", ")}`,
        userIds: userIDs
      };

      const responsePost = await api.post("/notifications", notification);
      if (responsePost.status === 201 || responsePost.status === 200) {
        alert("Đã gửi thông báo thành công");
      }
    } catch (error) {
      console.error("❌ Lỗi gửi thông báo:", error.response?.data || error.message);
      alert("Không thể gửi thông báo");
    }
  };

  // Hàm gửi dữ liệu đề tài
  const postTopic = async (data) => {
    try {
      // 1. Chuẩn bị payload JSON
      const payload = {
        tenDeTai: data.tenDeTai,
        moTa: data.moTa,
        idGiangVien: parseInt(data.maGiangVien),
        khoa: data.khoa,
        linhVucNghienCuu: data.linhVucNghienCuu,
        ngayBatDau: data.ngayBatDau,
        ngayKetThuc: data.ngayKetThuc,
        group: {
          groupName: `${data.tenDeTai} Group`,
          description: data.moTa || "No description",
          leaderId: parseInt(data.maSinhVien),
          memberIds: data.thanhVien
            .filter((member) => member.maSinhVien !== data.maSinhVien)
            .map((member) => parseInt(member.maSinhVien)),
        },
      };

      // 2. Tạo FormData chỉ khi có file
      if (data.taiLieu) {
        const formData = new FormData();
        formData.append("data", JSON.stringify(payload));
        formData.append("file", {
          uri: data.taiLieu.uri,
          type: data.taiLieu.type,
          name: data.taiLieu.name,
        });

        return await api.post("/topics", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      // 3. Gửi JSON thông thường nếu không có file
      return await api.post("/topics", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        config: error.config,
      });
      throw error;
    }
  };

  

  // Hàm lấy danh sách đề tài
  const fetchTopics = async () => {
    try {
      const response = await api.get("/topics");
      setTopics(response.data.results);
      return response.data.results;
    } catch (err) {
      console.error("Fetch error:", err);
      throw err;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchTopics();
      } catch (err) {
        setError(err.message);
        setTopics([]);
      }
    };

    loadData();
  }, []);

  // Các hàm xử lý sự kiện
  const handleChange = (name, value) => {
    setTopicData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMemberChange = (index, field, value) => {
    const newMembers = [...topicData.thanhVien];
    newMembers[index] = { ...newMembers[index], [field]: value };
    setTopicData((prev) => ({ ...prev, thanhVien: newMembers }));
  };

  const addMemberField = () => {
    setTopicData((prev) => ({
      ...prev,
      thanhVien: [...prev.thanhVien, { maSinhVien: "", tenSinhVien: "" }],
    }));
  };

  const removeMemberField = (index) => {
    if (topicData.thanhVien.length > 1) {
      const newMembers = [...topicData.thanhVien];
      newMembers.splice(index, 1);
      setTopicData((prev) => ({ ...prev, thanhVien: newMembers }));
    }
  };

  const handleDayPress = (key, day) => {
    handleChange(key, day.dateString);
    setShowCalendar(null);
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      if (result.type === "success") {
        setTopicData((prev) => ({
          ...prev,
          taiLieu: {
            name: result.name,
            uri: result.uri,
            type: result.mimeType,
            size: result.size,
          },
        }));
      }
    } catch (err) {
      Alert.alert("Lỗi", "Không thể chọn tài liệu");
      console.log(err);
    }
  };

  // Hàm validate dữ liệu
  const validateData = () => {
    const requiredFields = {
      tenDeTai: "Tên đề tài",
      maGiangVien: "Mã giảng viên",
      tenGiangVien: "Tên giảng viên",
      maSinhVien: "Mã sinh viên",
      tenSinhVien: "Tên sinh viên",
    };

    for (const [field, name] of Object.entries(requiredFields)) {
      if (!topicData[field]) {
        Alert.alert("Lỗi", `Vui lòng nhập ${name}`);
        return false;
      }
    }

    for (const [index, member] of topicData.thanhVien.entries()) {
      if (!member.maSinhVien || !member.tenSinhVien) {
        Alert.alert(
          "Lỗi",
          `Vui lòng nhập đủ thông tin cho thành viên thứ ${index + 1}`
        );
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateData()) return;

    setIsSubmitting(true);
    try {
      const response = await postTopic(topicData);
      if (response) {
        postNotification();
        Alert.alert("Thành công", "Đăng ký đề tài thành công");
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert(
        "Lỗi",
        error.response?.data?.message || "Có lỗi xảy ra khi đăng ký đề tài"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Hàm hiển thị icon file
  const getFileIcon = () => {
    if (!topicData.taiLieu?.name) {
      return <FontAwesome name="file-o" size={20} color="#7f8c8d" />;
    }

    const ext = topicData.taiLieu.name.split(".").pop().toLowerCase();
    const iconMap = {
      pdf: { name: "file-pdf-o", color: "#e74c3c" },
      doc: { name: "file-word-o", color: "#2c3e50" },
      docx: { name: "file-word-o", color: "#2c3e50" },
      xls: { name: "file-excel-o", color: "#27ae60" },
      xlsx: { name: "file-excel-o", color: "#27ae60" },
      ppt: { name: "file-powerpoint-o", color: "#e67e22" },
      pptx: { name: "file-powerpoint-o", color: "#e67e22" },
      jpg: { name: "file-image-o", color: "#3498db" },
      jpeg: { name: "file-image-o", color: "#3498db" },
      png: { name: "file-image-o", color: "#3498db" },
      gif: { name: "file-image-o", color: "#3498db" },
    };

    const icon = iconMap[ext] || { name: "file-o", color: "#7f8c8d" };
    return <FontAwesome name={icon.name} size={20} color={icon.color} />;
  };
  return (
    <ScrollView style={styles.container}>
      {/* Form container */}
      <View style={styles.formContainer}>
        {/* Tên đề tài */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Tên đề tài *</Text>
          <View style={styles.inputContainer}>
            <MaterialIcons
              name="title"
              size={20}
              color="#555"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              value={topicData.tenDeTai}
              onChangeText={(text) => handleChange("tenDeTai", text)}
              placeholder="Nhập tên đề tài"
            />
          </View>
        </View>

        {/* Thông tin giảng viên */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Thông tin giảng viên hướng dẫn *</Text>

          {/* Mã giảng viên */}
          <View style={[styles.inputContainer, { marginBottom: 10 }]}>
            <Ionicons
              name="id-card"
              size={20}
              color="#555"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              value={topicData.maGiangVien}
              onChangeText={(text) => handleChange("maGiangVien", text)}
              placeholder="Nhập mã giảng viên"
            />
          </View>

          {/* Tên giảng viên */}
          <View style={styles.inputContainer}>
            <Ionicons
              name="person"
              size={20}
              color="#555"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              value={topicData.tenGiangVien}
              onChangeText={(text) => handleChange("tenGiangVien", text)}
              placeholder="Nhập tên giảng viên hướng dẫn"
            />
          </View>
        </View>

        {/* Thông tin chủ nhiệm đề tài */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Thông tin chủ nhiệm đề tài *</Text>

          {/* Mã sinh viên */}
          <View style={[styles.inputContainer, { marginBottom: 10 }]}>
            <Ionicons
              name="id-card"
              size={20}
              color="#555"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              value={topicData.maSinhVien}
              onChangeText={(text) => handleChange("maSinhVien", text)}
              placeholder="Nhập mã sinh viên"
            />
          </View>

          {/* Tên sinh viên */}
          <View style={styles.inputContainer}>
            <Ionicons
              name="person"
              size={20}
              color="#555"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              value={topicData.tenSinhVien}
              onChangeText={(text) => handleChange("tenSinhVien", text)}
              placeholder="Nhập tên chủ nhiệm đề tài"
            />
          </View>
        </View>

        {/* Thành viên nhóm */}
        <View style={styles.inputGroup}>
          <View style={styles.sectionHeader}>
            <Text style={styles.label}>Thành viên nhóm</Text>
            <TouchableOpacity onPress={addMemberField} style={styles.addButton}>
              <Ionicons name="add" size={20} color="#3498db" />
              <Text style={styles.addButtonText}>Thêm thành viên</Text>
            </TouchableOpacity>
          </View>

          {topicData.thanhVien.map((member, index) => (
            <View key={index} style={styles.memberContainer}>
              <View style={styles.memberItem}>
                <Ionicons
                  name="id-card"
                  size={18}
                  color="#555"
                  style={styles.memberIcon}
                />
                <TextInput
                  style={[styles.memberInput, styles.codeInput]}
                  value={member.maSinhVien}
                  onChangeText={(text) =>
                    handleMemberChange(index, "maSinhVien", text)
                  }
                  placeholder="Mã sinh viên"
                />
              </View>

              <View style={[styles.memberItem, { marginTop: 8 }]}>
                <Ionicons
                  name="person-outline"
                  size={18}
                  color="#555"
                  style={styles.memberIcon}
                />
                <TextInput
                  style={[styles.memberInput, styles.nameInput]}
                  value={member.tenSinhVien}
                  onChangeText={(text) =>
                    handleMemberChange(index, "tenSinhVien", text)
                  }
                  placeholder="Tên thành viên"
                />
              </View>

              {topicData.thanhVien.length > 1 && (
                <TouchableOpacity
                  onPress={() => removeMemberField(index)}
                  style={styles.removeButton}
                >
                  <Ionicons name="trash-outline" size={20} color="#e74c3c" />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

        {/* Khoa */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Khoa</Text>
          <View style={styles.inputContainer}>
            <Ionicons
              name="business"
              size={20}
              color="#555"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              value={topicData.khoa}
              onChangeText={(text) => handleChange("khoa", text)}
              placeholder="Nhập tên khoa"
            />
          </View>
        </View>

        {/* Lĩnh vực nghiên cứu */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Lĩnh vực nghiên cứu</Text>
          <View style={styles.inputContainer}>
            <Ionicons
              name="pricetags"
              size={20}
              color="#555"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              value={topicData.linhVucNghienCuu}
              onChangeText={(text) => handleChange("linhVucNghienCuu", text)}
              placeholder="Nhập lĩnh vực nghiên cứu"
            />
          </View>
        </View>

        {/* Mô tả */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mô tả đề tài</Text>
          <View style={[styles.inputContainer, styles.multilineContainer]}>
            <Ionicons
              name="document-text"
              size={20}
              color="#555"
              style={styles.inputIcon}
            />
            <TextInput
              style={[styles.input, styles.multilineInput]}
              value={topicData.moTa}
              onChangeText={(text) => handleChange("moTa", text)}
              placeholder="Nhập mô tả chi tiết"
              multiline
              numberOfLines={4}
            />
          </View>
        </View>

        {/* Ngày bắt đầu và kết thúc */}
        {["ngayBatDau", "ngayKetThuc"].map((key) => (
          <View key={key} style={styles.inputGroup}>
            <Text style={styles.label}>
              {key === "ngayBatDau" ? "Ngày bắt đầu" : "Ngày kết thúc"}
            </Text>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => setShowCalendar(key)}
            >
              <Ionicons
                name="calendar"
                size={20}
                color="#555"
                style={styles.inputIcon}
              />
              <Text style={styles.dateText}>
                {topicData[key] || "Chọn ngày"}
              </Text>
            </TouchableOpacity>
            {showCalendar === key && (
              <Calendar
                onDayPress={(day) => handleDayPress(key, day)}
                style={styles.calendar}
                markedDates={{
                  [topicData[key]]: {
                    selected: true,
                    selectedColor: "#3498db",
                  },
                }}
                minDate={
                  key === "ngayKetThuc" ? topicData.ngayBatDau : undefined
                }
                theme={{
                  todayTextColor: "#3498db",
                  selectedDayBackgroundColor: "#3498db",
                  arrowColor: "#3498db",
                }}
              />
            )}
          </View>
        ))}

      <Text style={styles.label}>Tài liệu đính kèm (nếu có)</Text>

      <UploadFile/>

      </View>

      {/* Submit button */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Ionicons name="save" size={20} color="#fff" />
            <Text style={styles.submitButtonText}>Đăng ký đề tài</Text>
          </>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 15,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#34495e",
    paddingVertical: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  addButtonText: {
    color: "#3498db",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 5,
  },
  memberContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    position: "relative",
  },
  memberItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  memberIcon: {
    marginRight: 10,
  },
  memberInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
  },
  codeInput: {
    flex: 0.6,
    marginRight: 10,
  },
  nameInput: {
    flex: 1,
  },
  removeButton: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  multilineContainer: {
    alignItems: "flex-start",
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  dateText: {
    flex: 1,
    fontSize: 15,
    color: "#34495e",
  },
  calendar: {
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    elevation: 4,
  },

  submitButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
});

export default DangKyDeTai;