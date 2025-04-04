import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
  ActivityIndicator,
  Platform,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Calendar } from "react-native-calendars";
import { MaterialIcons, FontAwesome, Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import api from "../../utils/api";

const SuaDeTai = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const topicData = params?.topic;

  // State management
  const [formData, setFormData] = useState({
    tenDeTai: "",
    moTa: "",
    khoa: "",
    linhVucNghienCuu: "",
    ngayBatDau: "",
    ngayKetThuc: "",
  });
  const [documents, setDocuments] = useState([]);
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState({
    maSinhVien: "",
    tenSinhVien: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCalendar, setShowCalendar] = useState(null);

  // Initialize form data
  useEffect(() => {
    if (topicData) {
      setFormData({
        tenDeTai: topicData.tenDeTai || "",
        moTa: topicData.moTa || "",
        khoa: topicData.khoa || "",
        linhVucNghienCuu: topicData.linhVucNghienCuu || "",
        ngayBatDau: topicData.ngayBatDau || "",
        ngayKetThuc: topicData.ngayKetThuc || "",
      });

      setDocuments(topicData.documents || []);

      setMembers(
        topicData.group?.members?.map((member) => ({
          id: member.user?.id,
          maSinhVien: member.user?.id.toString(),
          tenSinhVien: member.user?.fullName,
        })) || []
      );
    }
  }, [topicData]);

  // Member management
  const handleAddMember = () => {
    if (!newMember.maSinhVien || !newMember.tenSinhVien) {
      Alert.alert("Lỗi", "Vui lòng nhập đủ mã và tên sinh viên");
      return;
    }

    if (isNaN(Number(newMember.maSinhVien))) {
      Alert.alert("Lỗi", "Mã sinh viên phải là số");
      return;
    }

    setMembers((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        maSinhVien: newMember.maSinhVien,
        tenSinhVien: newMember.tenSinhVien,
      },
    ]);

    setNewMember({ maSinhVien: "", tenSinhVien: "" });
  };

  // Form handlers
  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDayPress = (key, day) => {
    handleChange(key, day.dateString);
    setShowCalendar(null);
  };

  // Document management
  const handleAddDocument = () => {
    setDocuments((prev) => [...prev, { name: "", uri: "" }]);
  };

  const handleDocumentChange = (index, updates) => {
    setDocuments((prev) =>
      prev.map((doc, i) => (i === index ? { ...doc, ...updates } : doc))
    );
  };

  const handleRemoveDocument = (index) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePickDocument = async (index) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      if (result.type === "success") {
        handleDocumentChange(index, {
          name: result.name,
          uri:
            Platform.OS === "android"
              ? result.uri
              : result.uri.replace("file://", ""),
          type: result.mimeType,
        });
      }
    } catch (err) {
      Alert.alert("Lỗi", "Không thể chọn tài liệu");
    }
  };

  // File icon helper
  const getFileIcon = (fileName) => {
    const icons = {
      pdf: { icon: "file-pdf-o", color: "#e74c3c" },
      doc: { icon: "file-word-o", color: "#2c3e50" },
      docx: { icon: "file-word-o", color: "#2c3e50" },
      xls: { icon: "file-excel-o", color: "#27ae60" },
      xlsx: { icon: "file-excel-o", color: "#27ae60" },
      ppt: { icon: "file-powerpoint-o", color: "#e67e22" },
      pptx: { icon: "file-powerpoint-o", color: "#e67e22" },
      jpg: { icon: "file-image-o", color: "#3498db" },
      jpeg: { icon: "file-image-o", color: "#3498db" },
      png: { icon: "file-image-o", color: "#3498db" },
      gif: { icon: "file-image-o", color: "#3498db" },
    };

    if (!fileName)
      return <FontAwesome name="file-o" size={20} color="#7f8c8d" />;

    const ext = fileName.split(".").pop().toLowerCase();
    const fileType = icons[ext] || { icon: "file-o", color: "#7f8c8d" };

    return (
      <FontAwesome name={fileType.icon} size={20} color={fileType.color} />
    );
  };
  const handleDelete = async () => {
    try {
      const response = await api.delete(`/topics/${topicData.id}`);
      console.log("hiiiiiiiiiiiiiiiiiiiiiiiii:", topicData.id);
      if (response.status === 200) {
        Alert.alert("Thành công", "Đã xóa đề tài thành công");
        navigation.goBack(); // Quay lại trang trước sau khi xóa
      } else {
        throw new Error("Xóa thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi xóa:", error.response?.data || error.message);
      Alert.alert(
        "Lỗi",
        error.response?.data?.message || "Có lỗi xảy ra khi xóa"
      );
    }
  };
  // Form submission
  // Remove or comment out the duplicate 'handleSubmit' function below this line:
  const handleSubmit = async () => {
    if (!formData.tenDeTai) {
      Alert.alert("Lỗi", "Vui lòng nhập tên đề tài");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        idGiangVien: topicData.lecturer?.id,
        tinhTrang: topicData.tinhTrang || "Đã duyệt",
        group: {
          groupName: topicData.group?.groupName || `${formData.tenDeTai} Group`,
          description: topicData.group?.description || formData.moTa,
          leaderId: topicData.group?.leader?.id,
          memberIds: [
            ...(topicData.group?.members?.map((member) => member.user?.id) ||
              []),
            ...members
              .map((member) => parseInt(member.maSinhVien))
              .filter((id) => !isNaN(id)),
          ],
        },
        documents: documents.filter((doc) => doc.name && doc.uri),
      };

      const response = await api.put(`/topics/${topicData.id}`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data) {
        Alert.alert("Thành công", "Cập nhật đề tài thành công", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      }
    } catch (error) {
      console.error("Update error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });

      let errorMessage = "Có lỗi xảy ra khi cập nhật";

      if (error.response) {
        if (error.response.status === 400) {
          errorMessage = error.response.data?.message || "Dữ liệu không hợp lệ";
        } else if (error.response.status === 401) {
          errorMessage = "Phiên đăng nhập hết hạn";
        } else if (error.response.data?.errors) {
          errorMessage = Object.values(error.response.data.errors).join("\n");
        }
      }

      Alert.alert("Lỗi", errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
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
              value={formData.tenDeTai}
              onChangeText={(text) => handleChange("tenDeTai", text)}
              placeholder="Nhập tên đề tài"
            />
          </View>
        </View>

        {/* Giảng viên hướng dẫn */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Giảng viên hướng dẫn</Text>
          <View style={[styles.infoContainer, styles.nonEditable]}>
            <Ionicons
              name="person"
              size={20}
              color="#555"
              style={styles.inputIcon}
            />
            <View style={styles.infoContent}>
              <Text style={styles.codeText}>{topicData.lecturer?.id}</Text>
              <Text style={styles.nameText}>
                {topicData.lecturer?.user?.fullName}
              </Text>
            </View>
          </View>
        </View>

        {/* Chủ nhiệm đề tài */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Chủ nhiệm đề tài</Text>
          <View style={[styles.infoContainer, styles.nonEditable]}>
            <Ionicons
              name="school"
              size={20}
              color="#555"
              style={styles.inputIcon}
            />
            <View style={styles.infoContent}>
              <Text style={styles.codeText}>{topicData.group?.leader?.id}</Text>
              <Text style={styles.nameText}>
                {topicData.group?.leader?.user?.fullName}
              </Text>
            </View>
          </View>
        </View>

        {/* Thành viên nhóm */}
        <View style={styles.inputGroup}>
          <View style={styles.sectionHeader}>
            <Text style={styles.label}>Thành viên nhóm</Text>
          </View>

          {/* Form thêm thành viên */}
          <View style={styles.addMemberContainer}>
            <View style={styles.memberInputRow}>
              <TextInput
                style={[styles.input, styles.memberInput]}
                placeholder="Mã sinh viên"
                value={newMember.maSinhVien}
                onChangeText={(text) =>
                  setNewMember({ ...newMember, maSinhVien: text })
                }
                keyboardType="numeric"
              />
              <TextInput
                style={[styles.input, styles.memberInput]}
                placeholder="Tên sinh viên"
                value={newMember.tenSinhVien}
                onChangeText={(text) =>
                  setNewMember({ ...newMember, tenSinhVien: text })
                }
              />
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddMember}
              >
                <Ionicons name="add" size={20} color="#3498db" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Danh sách thành viên */}
          {members.length > 0 ? (
            members.map((member, index) => (
              <View key={member.id || index} style={styles.memberItem}>
                <Ionicons
                  name="person-outline"
                  size={18}
                  color="#555"
                  style={styles.memberIcon}
                />
                <View style={styles.memberInfo}>
                  <Text style={styles.memberCode}>{member.maSinhVien}</Text>
                  <Text style={styles.memberName}>{member.tenSinhVien}</Text>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={handleDelete}
                >
                  <Ionicons name="trash-outline" size={18} color="#e74c3c" />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>Chưa có thành viên nào</Text>
          )}
        </View>

        {/* Các trường thông tin khác */}
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
              value={formData.khoa}
              onChangeText={(text) => handleChange("khoa", text)}
              placeholder="Nhập tên khoa"
            />
          </View>
        </View>

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
              value={formData.linhVucNghienCuu}
              onChangeText={(text) => handleChange("linhVucNghienCuu", text)}
              placeholder="Nhập lĩnh vực nghiên cứu"
            />
          </View>
        </View>

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
              value={formData.moTa}
              onChangeText={(text) => handleChange("moTa", text)}
              placeholder="Nhập mô tả chi tiết"
              multiline
              numberOfLines={4}
            />
          </View>
        </View>

        {/* Tài liệu đính kèm */}
        <View style={styles.inputGroup}>
          <View style={styles.sectionHeader}>
            <Text style={styles.label}>Tài liệu đính kèm</Text>
            <TouchableOpacity
              onPress={handleAddDocument}
              style={styles.addButton}
            >
              <Ionicons name="add" size={20} color="#3498db" />
              <Text style={styles.addButtonText}>Thêm tài liệu</Text>
            </TouchableOpacity>
          </View>

          {documents.length > 0 ? (
            documents.map((doc, index) => (
              <View key={index} style={styles.documentItem}>
                {getFileIcon(doc.name)}
                <View style={styles.documentInputContainer}>
                  <TextInput
                    style={[styles.input, styles.documentInput]}
                    value={doc.name}
                    onChangeText={(text) =>
                      handleDocumentChange(index, { name: text })
                    }
                    placeholder="Tên tài liệu"
                  />
                  <TouchableOpacity
                    onPress={() => handlePickDocument(index)}
                    style={styles.uploadButton}
                  >
                    <Text style={styles.uploadButtonText}>
                      {doc.uri ? "Đã chọn file" : "Chọn file"}
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => handleRemoveDocument(index)}
                  style={styles.removeButton}
                >
                  <Ionicons name="trash-outline" size={18} color="#e74c3c" />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>Chưa có tài liệu nào</Text>
          )}
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
                {formData[key] || "Chọn ngày"}
              </Text>
            </TouchableOpacity>
            {showCalendar === key && (
              <Calendar
                onDayPress={(day) => handleDayPress(key, day)}
                style={styles.calendar}
                markedDates={{
                  [formData[key]]: {
                    selected: true,
                    selectedColor: "#3498db",
                  },
                }}
                minDate={
                  key === "ngayKetThuc" ? formData.ngayBatDau : undefined
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
      </View>

      {/* Nút gửi */}
      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Ionicons name="save" size={20} color="#fff" />
            <Text style={styles.saveButtonText}>Lưu thay đổi</Text>
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
    padding: 15,
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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
    borderRadius: 8,
    paddingHorizontal: 15,
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
  multilineContainer: {
    alignItems: "flex-start",
    minHeight: 100,
  },
  multilineInput: {
    textAlignVertical: "top",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f8f9fa",
  },
  nonEditable: {
    opacity: 0.7,
  },
  infoContent: {
    marginLeft: 10,
  },
  codeText: {
    fontSize: 14,
    color: "#7f8c8d",
  },
  nameText: {
    fontSize: 16,
    fontWeight: "500",
  },
  addMemberContainer: {
    marginBottom: 15,
  },
  memberInputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  memberInput: {
    flex: 1,
    marginRight: 5,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  memberItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    marginBottom: 8,
  },
  memberInfo: {
    flex: 1,
    marginLeft: 10,
  },
  memberCode: {
    fontSize: 14,
    color: "#7f8c8d",
  },
  memberName: {
    fontSize: 16,
  },
  removeButton: {
    padding: 5,
  },
  emptyText: {
    color: "#7f8c8d",
    fontStyle: "italic",
    textAlign: "center",
    marginVertical: 10,
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
  documentItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  documentInputContainer: {
    flex: 1,
    marginLeft: 10,
  },
  documentInput: {
    marginBottom: 5,
  },
  uploadButton: {
    backgroundColor: "#f0f0f0",
    padding: 8,
    borderRadius: 5,
  },
  uploadButtonText: {
    color: "#3498db",
  },
  removeButton: {
    padding: 8,
    marginLeft: 5,
  },
  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
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
  saveButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
});

export default SuaDeTai;
