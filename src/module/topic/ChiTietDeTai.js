import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Linking,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import color from "../../utils/color";
import { MaterialIcons, FontAwesome, Feather } from "@expo/vector-icons";

const ChiTietDeTai = () => {
  const { params } = useRoute();
  const { topic } = params;
  const topicId = topic.id;
  console.log(topicId);

  const navigation = useNavigation();
  const tasksct = params?.tasksct || [];

  const handleShowAllTask = () => {
    navigation.navigate("DanhSachNhiemVu", { topicId });
  };

  const handleEditTopic = () => {
    navigation.navigate("SuaDeTai", { topic });
  };

  const handleOpenDocument = () => {
    // Replace with actual document URL or handling
    Linking.openURL("https://example.com/document.pdf");
  };
  const formatHocVi = (hocVi) => {
    if (hocVi === "Tiến sĩ") return "TS.";
    if (hocVi === "Thạc sĩ") return "ThS.";
    if (hocVi === "Phó giáo sư, Tiến sĩ") return "PGS.TS.";
    return hocVi; // Giữ nguyên nếu không thuộc các trường hợp trên
  };
  const renderMembers = () => {
    // Kiểm tra nếu không có thành viên nào
    if (!topic.group.members || topic.group.members.length === 0) {
      return (
        <View style={styles.detailItem}>
          <MaterialIcons name="people" size={18} color="#666" />
          <Text style={styles.detailText}>
            <Text style={styles.detailLabel}>Thành viên: </Text>
            Không có thành viên nào khác
          </Text>
        </View>
      );
    }

    // Nếu có thành viên
    return (
      <>
        <View style={styles.detailItem}>
          <MaterialIcons name="people" size={18} color="#666" />
          <Text style={styles.detailLabel}>Thành viên: </Text>
        </View>
        {topic.group.members.map((member, index) => (
          <View key={index} style={[styles.detailItem, styles.memberItem]}>
            <MaterialIcons name="person-outline" size={16} color="#666" />
            <Text style={styles.memberText}>{member.user.fullName}</Text>
          </View>
        ))}
      </>
    );
  };
  return (
    <ScrollView style={styles.container}>
      {/* Header with gradient background */}

      {/* Main content */}
      <View style={styles.content}>
        {/* Project details card */}
        <View style={styles.card}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Text style={styles.topicName}>{topic.tenDeTai}</Text>
              <TouchableOpacity
                onPress={handleEditTopic}
                style={styles.editButton}
              >
                <Feather name="edit-2" size={22} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.cardHeader}>
            <MaterialIcons name="info" size={20} color={color.mainColor} />
            <Text style={styles.cardTitle}>Thông tin đề tài</Text>
          </View>

          <View style={styles.detailItem}>
            <MaterialIcons name="person" size={18} color="#666" />
            <Text style={styles.detailText}>
              <Text style={styles.detailLabel}>Chủ nhiệm: </Text>
              {topic.group.leader.user.fullName}
            </Text>
          </View>

          <View style={styles.detailItem}>
            <MaterialIcons name="school" size={18} color="#666" />
            <Text style={styles.detailText}>
              <Text style={styles.detailLabel}>Giảng viên HD: </Text>
              {formatHocVi(topic.lecturer.academicTitle)}
              {topic.lecturer.user.fullName}
            </Text>
          </View>

          <View style={styles.detailItem}>
            <MaterialIcons name="apartment" size={18} color="#666" />
            <Text style={styles.detailText}>
              <Text style={styles.detailLabel}>Khoa: </Text>
              {topic.khoa}
            </Text>
          </View>

          <View style={styles.detailItem}>
            <MaterialIcons name="date-range" size={18} color="#666" />
            <Text style={styles.detailText}>
              <Text style={styles.detailLabel}>Thời gian: </Text>
              {topic.ngayBatDau} - {topic.ngayKetThuc}
            </Text>
          </View>

          <View style={styles.detailItem}>
            <MaterialIcons name="category" size={18} color="#666" />
            <Text style={styles.detailText}>
              <Text style={styles.detailLabel}>Lĩnh vực: </Text>
              {topic.linhVucNghienCuu}
            </Text>
          </View>

          {renderMembers()}
        </View>

        {/* Description card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialIcons
              name="description"
              size={20}
              color={color.mainColor}
            />
            <Text style={styles.cardTitle}>Mô tả đề tài</Text>
          </View>
          <Text style={styles.descriptionText}>{topic.moTa}</Text>
        </View>

        {/* Documents card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialIcons
              name="attach-file"
              size={20}
              color={color.mainColor}
            />
            <Text style={styles.cardTitle}>Tài liệu liên quan</Text>
          </View>
          <TouchableOpacity
            style={styles.documentItem}
            onPress={handleOpenDocument}
          >
            <FontAwesome name="file-pdf-o" size={24} color="#e74c3c" />
            <Text style={styles.documentText}>Báo cáo đề tài.pdf</Text>
            <MaterialIcons name="chevron-right" size={24} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.documentItem}
            onPress={handleOpenDocument}
          >
            <FontAwesome name="file-word-o" size={24} color="#2c3e50" />
            <Text style={styles.documentText}>Tài liệu tham khảo.docx</Text>
            <MaterialIcons name="chevron-right" size={24} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Tasks card */}
        <View style={styles.card}>
          <View style={[styles.cardHeader, styles.taskHeader]}>
            <View>
              <Text style={styles.cardTitle}>Nhiệm vụ</Text>
              <Text style={styles.taskSubtitle}>
                {tasksct.length} nhiệm vụ được giao
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleShowAllTask}
              style={styles.viewAllButton}
            >
              <Text style={styles.viewAllText}>Xem tất cả</Text>
              <MaterialIcons
                name="chevron-right"
                size={18}
                color={color.mainColor}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.taskProgress}>
            <View style={styles.progressItem}>
              <View
                style={[styles.progressBadge, { backgroundColor: "#2ecc71" }]}
              >
                <Text style={styles.progressCount}>
                  {tasksct.filter((t) => t.status === "Hoàn thành").length}
                </Text>
              </View>
              <Text style={styles.progressLabel}>Hoàn thành</Text>
            </View>
            <View style={styles.progressItem}>
              <View
                style={[styles.progressBadge, { backgroundColor: "#f39c12" }]}
              >
                <Text style={styles.progressCount}>
                  {tasksct.filter((t) => t.status === "Đang thực hiện").length}
                </Text>
              </View>
              <Text style={styles.progressLabel}>Đang làm</Text>
            </View>
            <View style={styles.progressItem}>
              <View
                style={[styles.progressBadge, { backgroundColor: "#e74c3c" }]}
              >
                <Text style={styles.progressCount}>
                  {tasksct.filter((t) => t.status === "Chưa bắt đầu").length}
                </Text>
              </View>
              <Text style={styles.progressLabel}>Chưa bắt đầu</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Action buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={[styles.actionButton, styles.rejectButton]}>
          <MaterialIcons name="close" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Từ chối</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.approveButton]}>
          <MaterialIcons name="check" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Duyệt đề tài</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  topicName: {
    color: color.mainColor,
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    lineHeight: 28,
  },
  editButton: {
    backgroundColor: color.mainColor,
    padding: 8,
    borderRadius: 20,
    marginLeft: 10,
  },

  content: {
    paddingHorizontal: 15,
    paddingBottom: 80,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 18,
    marginVertical: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2c3e50",
    marginLeft: 10,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  detailText: {
    fontSize: 15,
    color: "#34495e",
    marginLeft: 10,
    flex: 1,
  },
  detailLabel: {
    fontWeight: "600",
    color: "#2c3e50",
  },
  descriptionText: {
    fontSize: 15,
    color: "#34495e",
    lineHeight: 22,
  },
  documentItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  documentText: {
    fontSize: 15,
    color: "#34495e",
    marginLeft: 12,
    flex: 1,
  },
  taskHeader: {
    justifyContent: "space-between",
    marginBottom: 10,
  },
  taskSubtitle: {
    fontSize: 13,
    color: "#7f8c8d",
    marginLeft: 10,
    marginTop: 2,
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewAllText: {
    color: color.mainColor,
    fontSize: 15,
    fontWeight: "600",
  },
  taskProgress: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  progressItem: {
    alignItems: "center",
  },
  progressBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  progressCount: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  progressLabel: {
    fontSize: 13,
    color: "#7f8c8d",
  },
  actionButtons: {
    position: "absolute",
    bottom: 20,
    left: 15,
    right: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 12,
    width: "48%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  approveButton: {
    backgroundColor: "#2ecc71",
  },
  rejectButton: {
    backgroundColor: "#e74c3c",
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});

export default ChiTietDeTai;
