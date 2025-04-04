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
import { Calendar } from "react-native-calendars";
import { MaterialIcons, FontAwesome, Ionicons } from "@expo/vector-icons";
import api from "../../utils/api";
const SuaDeTai = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const topicData = params?.topic;
  const [editedTopic, setEditedTopic] = useState({
    tenDeTai: "",
    moTa: "",
    khoa: "",
    linhVucNghienCuu: "",
    ngayBatDau: "",
    ngayKetThuc: "",
  });

  const [documents, setDocuments] = useState([]);
  const [showCalendar, setShowCalendar] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (topicData) {
      setEditedTopic({
        tenDeTai: topicData.tenDeTai || "",
        moTa: topicData.moTa || "",
        khoa: topicData.khoa || "",
        linhVucNghienCuu: topicData.linhVucNghienCuu || "",
        ngayBatDau: topicData.ngayBatDau || "",
        ngayKetThuc: topicData.ngayKetThuc || "",
      });
      setDocuments(topicData.documents || []);
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

  const handleAddDocument = () => {
    setDocuments([...documents, { name: "", link: "" }]);
  };

  const handleDocumentChange = (index, field, value) => {
    const newDocuments = [...documents];
    newDocuments[index][field] = value;
    setDocuments(newDocuments);
  };

  const handleRemoveDocument = (index) => {
    const newDocuments = [...documents];
    newDocuments.splice(index, 1);
    setDocuments(newDocuments);
  };

  const handleAddMember = () => {
    const newMembers = [...(topicData.group?.members || [])];
    newMembers.push({
      profileCode: "",
      user: {
        fullName: "",
      },
    });
    // Cần cập nhật state hoặc API ở đây
  };

  const handleSubmit = async () => {
    if (
      !editedTopic.tenDeTai ||
      !editedTopic.moTa ||
      !editedTopic.khoa ||
      !editedTopic.linhVucNghienCuu ||
      !editedTopic.ngayBatDau ||
      !editedTopic.ngayKetThuc ||
      !topicData.lecturer?.id ||
      !topicData.group?.leader?.id
    ) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ các trường bắt buộc");
      return;
    }

    const payload = {
      tenDeTai: editedTopic.tenDeTai,
      moTa: editedTopic.moTa,
      idGiangVien: topicData.lecturer?.id ?? 0, // Đảm bảo là Long
      khoa: editedTopic.khoa,
      linhVucNghienCuu: editedTopic.linhVucNghienCuu,
      ngayBatDau: new Date(editedTopic.ngayBatDau).toISOString().split("T")[0], // Chuẩn hóa định dạng ngày
      ngayKetThuc: new Date(editedTopic.ngayKetThuc)
        .toISOString()
        .split("T")[0], // Chuẩn hóa định dạng ngày
      tinhTrang: "Đã duyệt",
      group: {
        groupName: topicData.group?.groupName || "Science Research",
        description: topicData.group?.description || "Description of the group",
        leaderId: topicData.group?.leader?.id ?? 0, // Đảm bảo là Long
        memberIds: topicData.group?.members
          ? topicData.group.members
              .map((m) => m.user?.id)
              .filter((id) => id !== undefined)
          : [],
      },
    };

    setIsSubmitting(true);
    try {
      const response = await api.put(`/topics/${topicData.id}`, payload);

      if (response.status === 200) {
        Alert.alert("Thành công", "Cập nhật đề tài thành công");
        navigation.goBack();
      } else {
        throw new Error("Cập nhật thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error.response?.data || error.message);
      Alert.alert(
        "Lỗi",
        error.response?.data?.message || "Có lỗi xảy ra khi cập nhật"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFileIcon = (fileName) => {
    if (!fileName) return "file";
    const ext = fileName.split(".").pop().toLowerCase();
    switch (ext) {
      case "pdf":
        return "pdf";
      case "doc":
      case "docx":
        return "word";
      case "xls":
      case "xlsx":
        return "excel";
      case "ppt":
      case "pptx":
        return "powerpoint";
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return "image";
      default:
        return "file";
    }
  };

  const getFileIconComponent = (fileName) => {
    const iconType = getFileIcon(fileName);
    switch (iconType) {
      case "pdf":
        return <FontAwesome name="file-pdf-o" size={20} color="#e74c3c" />;
      case "word":
        return <FontAwesome name="file-word-o" size={20} color="#2c3e50" />;
      case "excel":
        return <FontAwesome name="file-excel-o" size={20} color="#27ae60" />;
      case "powerpoint":
        return (
          <FontAwesome name="file-powerpoint-o" size={20} color="#e67e22" />
        );
      case "image":
        return <FontAwesome name="file-image-o" size={20} color="#3498db" />;
      default:
        return <FontAwesome name="file-o" size={20} color="#7f8c8d" />;
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Form container */}
      <View style={styles.formContainer}>
        {/* Tên đề tài */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Tên đề tài</Text>
          <View style={styles.inputContainer}>
            <MaterialIcons
              name="title"
              size={20}
              color="#555"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              value={editedTopic.tenDeTai}
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
              <View style={styles.infoRow}>
                <Text style={styles.codeText}>{topicData.lecturer?.id}</Text>
                <Text style={styles.nameText}>
                  {topicData.lecturer?.user?.fullName}
                </Text>
              </View>
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
              <View style={styles.infoRow}>
                <Text style={styles.codeText}>
                  {topicData.group?.leader?.id}
                </Text>
                <Text style={styles.nameText}>
                  {topicData.group?.leader?.user?.fullName}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Thành viên nhóm */}
        <View style={styles.inputGroup}>
          <View style={styles.sectionHeader}>
            <Text style={styles.label}>Thành viên nhóm</Text>
            <TouchableOpacity
              onPress={handleAddMember}
              style={styles.addButton}
            >
              <Ionicons name="add" size={20} color="#3498db" />
              <Text style={styles.addButtonText}>Thêm thành viên</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.membersContainer}>
            {topicData.group?.members?.length > 0 ? (
              topicData.group.members.map((member, index) => (
                <View key={index} style={styles.memberItem}>
                  <Ionicons
                    name="person-outline"
                    size={18}
                    color="#555"
                    style={styles.memberIcon}
                  />
                  <TextInput
                    style={[styles.memberInput, styles.codeInput]}
                    value={member.user?.id.toString()}
                    onChangeText={(text) => {
                      // Xử lý cập nhật mã sinh viên
                    }}
                    placeholder="Mã SV"
                  />
                  <TextInput
                    style={[styles.memberInput, styles.nameInput]}
                    value={member.user?.fullName}
                    onChangeText={(text) => {
                      // Xử lý cập nhật họ tên
                    }}
                    placeholder="Họ và tên"
                  />
                  <TouchableOpacity style={styles.removeButton}>
                    <Ionicons name="trash-outline" size={18} color="#e74c3c" />
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <Text style={styles.emptyText}>Không có thành viên nào</Text>
            )}
          </View>
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
              value={editedTopic.khoa}
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
              value={editedTopic.linhVucNghienCuu}
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
              value={editedTopic.moTa}
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
                {getFileIconComponent(doc.name)}
                <View style={styles.documentInputContainer}>
                  <TextInput
                    style={[styles.input, styles.documentInput]}
                    value={doc.name}
                    onChangeText={(text) =>
                      handleDocumentChange(index, "name", text)
                    }
                    placeholder="Tên tài liệu"
                  />
                  <TextInput
                    style={[styles.input, styles.documentInput]}
                    value={doc.link}
                    onChangeText={(text) =>
                      handleDocumentChange(index, "link", text)
                    }
                    placeholder="Đường dẫn tài liệu"
                  />
                </View>
                <TouchableOpacity
                  onPress={() => handleRemoveDocument(index)}
                  style={styles.removeButton}
                >
                  <Ionicons name="trash" size={18} color="#e74c3c" />
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
                {editedTopic[key] || "Chọn ngày"}
              </Text>
            </TouchableOpacity>
            {showCalendar === key && (
              <Calendar
                onDayPress={(day) => handleDayPress(key, day)}
                style={styles.calendar}
                markedDates={{
                  [editedTopic[key]]: {
                    selected: true,
                    selectedColor: "#3498db",
                  },
                }}
                minDate={
                  key === "ngayKetThuc" ? editedTopic.ngayBatDau : undefined
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

      {/* Submit button */}
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
  },

  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 15,
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
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: "#f5f5f5",
  },
  infoContent: {
    flex: 1,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  codeText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 10,
  },
  nameText: {
    fontSize: 15,
    color: "#34495e",
    fontWeight: "500",
  },
  nonEditableText: {
    fontSize: 12,
    color: "#95a5a6",
    fontStyle: "italic",
  },
  nonEditable: {
    backgroundColor: "#f5f5f5",
    borderColor: "#eee",
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
    padding: 5,
  },
  addButtonText: {
    color: "#3498db",
    marginLeft: 5,
    fontWeight: "500",
  },
  membersContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
  },
  memberItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  memberIcon: {
    marginRight: 10,
  },
  memberInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 8,
    fontSize: 14,
  },
  codeInput: {
    width: 80,
    marginRight: 10,
  },
  nameInput: {
    flex: 1,
    marginRight: 10,
  },
  documentItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  documentInputContainer: {
    flex: 1,
    marginLeft: 10,
  },
  documentInput: {
    marginBottom: 8,
  },
  removeButton: {
    padding: 5,
    marginLeft: 10,
  },
  emptyText: {
    color: "#95a5a6",
    textAlign: "center",
    paddingVertical: 10,
    fontStyle: "italic",
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
  saveButton: {
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
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
});

export default SuaDeTai;
