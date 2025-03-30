import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import color from "../../utils/color";

const ChiTietDeTai = () => {
  const { params } = useRoute();
  const topic = params?.topic || {
    tenDeTai: "NGHIÊN CỨU ỨNG DỤNG AI TRONG GIÁO DỤC",
    tenSinhVien: "Nguyễn Văn A",
    hocVi: "Tiến sĩ",
    tenGiangVien: "Trần Văn B",
    khoa: "Công nghệ Thông tin",
    trangThai: "Đang thực hiện",
    ngayBatDau: "01/10/2023",
    ngayKetThuc: "30/05/2024",
    linhVucNghienCuu: "Trí tuệ nhân tạo",
    moTa: "Nghiên cứu và phát triển hệ thống giáo dục thông minh sử dụng AI",
  };

  const navigation = useNavigation();

  const formatHocVi = (hocVi) => {
    const titles = {
      "Tiến sĩ": "TS.",
      "Thạc sĩ": "ThS.",
      "Phó giáo sư, Tiến sĩ": "PGS.TS.",
    };
    return titles[hocVi] || hocVi;
  };

  const renderInfoItem = (label, value) => (
    <View style={styles.infoItem}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Topic Card */}
      <View style={styles.card}>
        <View style={styles.titleContainer}>
          <Text style={styles.topicTitle}>{topic.tenDeTai}</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("SuaDeTai", {
                topic: topic,
                idSinhVien: topic.idSinhVien,
                idGiangVien: topic.idGiangVien,
              })
            }
          >
            <Ionicons name="create-outline" size={24} color={color.mainColor} />
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        {renderInfoItem("Chủ nhiệm:", topic.tenSinhVien)}
        {renderInfoItem(
          "Người hướng dẫn:",
          `${formatHocVi(topic.hocVi)} ${topic.tenGiangVien}`
        )}
        {renderInfoItem("Khoa:", topic.khoa)}
        {renderInfoItem("Trạng thái:", topic.tinhTrang)}
        {renderInfoItem(
          "Thời gian thực hiện:",
          `${topic.ngayBatDau} - ${topic.ngayKetThuc}`
        )}
        {renderInfoItem("Lĩnh vực:", topic.linhVucNghienCuu)}
        {renderInfoItem("Số lượng thành viên:", "5")}
      </View>

      {/* Documents Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tài liệu liên quan</Text>
        <View style={styles.documentsContainer}>
          <TouchableOpacity style={styles.documentItem}>
            <Ionicons name="document-text" size={24} color={color.mainColor} />
            <Text style={styles.documentText}>Báo cáo đề cương.pdf</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.documentItem}>
            <Ionicons name="document-text" size={24} color={color.mainColor} />
            <Text style={styles.documentText}>Tài liệu tham khảo.docx</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Progress Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Tiến độ nhiệm vụ</Text>
          <TouchableOpacity
            style={styles.viewAllButton}
            onPress={() => navigation.navigate("DanhSachNhiemVu")}
          >
            <Text style={styles.viewAllText}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressSegment,
              { backgroundColor: "#FF6B6B", width: "30%" },
            ]}
          />
          <View
            style={[
              styles.progressSegment,
              { backgroundColor: "#FFD166", width: "50%" },
            ]}
          />
          <View
            style={[
              styles.progressSegment,
              { backgroundColor: "#06D6A0", width: "20%" },
            ]}
          />
        </View>

        <View style={styles.progressLegend}>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: "#FF6B6B" }]}
            />
            <Text style={styles.legendText}>Chưa bắt đầu (3)</Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: "#FFD166" }]}
            />
            <Text style={styles.legendText}>Đang thực hiện (5)</Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: "#06D6A0" }]}
            />
            <Text style={styles.legendText}>Hoàn thành (2)</Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={[styles.button, styles.approveButton]}>
          <Text style={styles.buttonText}>Duyệt đề tài</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.rejectButton]}>
          <Text style={styles.buttonText}>Từ chối</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },

  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: color.mainColor,
    marginBottom: 12,
    textAlign: "center",
  },
  divider: {
    height: 1,
    backgroundColor: "#E9ECEF",
    marginVertical: 12,
  },
  infoItem: {
    flexDirection: "row",
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  infoLabel: {
    fontSize: 14,
    color: "#6C757D",

    fontWeight: "600",
  },
  infoValue: {
    fontSize: 14,
    color: "#212529",
    fontWeight: "600",
    flex: 1,
    marginLeft: 10,
  },
  section: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: color.mainColor,
  },
  viewAllButton: {
    backgroundColor: color.mainColor,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  viewAllText: {
    color: "white",
    fontSize: 12,
  },
  documentsContainer: {
    marginTop: 8,
  },
  documentItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E9ECEF",
  },
  documentText: {
    marginLeft: 10,
    color: "#495057",
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#E9ECEF",
    flexDirection: "row",
    overflow: "hidden",
    marginVertical: 12,
  },
  progressSegment: {
    height: "100%",
  },
  progressLegend: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 8,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "48%",
    marginBottom: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 3,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: "#6C757D",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  approveButton: {
    backgroundColor: color.mainColor,
  },
  rejectButton: {
    backgroundColor: "#FF3D00",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ChiTietDeTai;
