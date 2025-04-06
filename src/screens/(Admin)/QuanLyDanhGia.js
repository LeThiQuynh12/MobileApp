import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { Alert } from "react-native";

const QuanLyDanhGia = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortAscending, setSortAscending] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [newReview, setNewReview] = useState({
    topicId: "",
    topicName: "",
    students: [""],
    score: "",
    comment: "",
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const [reviews, setReviews] = useState([
    {
      id: "1",
      topicId: "001",
      topicName: "AI trong Y tế",
      students: ["Nguyễn Văn Nam", "Trần Xuân Mạnh"],
      score: 8.5,
      comment: "Tốt",
    },
    {
      id: "2",
      topicId: "002",
      topicName: "Blockchain",
      students: ["Trần Thị Lan", "Nguyễn Kim Ngân"],
      score: 6.0,
      comment: "Cần cải thiện",
    },
    {
      id: "3",
      topicId: "003",
      topicName: "IoT trong Nông Nghiệp",
      students: ["Lê Minh Tuấn", "Phạm Hồng Sơn"],
      score: 9.0,
      comment: "Xuất sắc",
    },
    {
      id: "4",
      topicId: "004",
      topicName: "Ứng dụng Big Data",
      students: ["Hoàng Thị Hạnh", "Nguyễn Đức Duy"],
      score: 7.2,
      comment: "Khá tốt",
    },
    {
      id: "5",
      topicId: "005",
      topicName: "Học máy và Nhận diện hình ảnh",
      students: ["Bùi Văn Phúc", "Trần Thu Hằng"],
      score: 5.5,
      comment: "Chưa đạt yêu cầu",
    },
    {
      id: "6",
      topicId: "006",
      topicName: "Ứng dụng Chatbot trong Chăm sóc Khách hàng",
      students: ["Nguyễn Anh Khoa", "Võ Thanh Bình"],
      score: 8.0,
      comment: "Tốt",
    },
    {
      id: "7",
      topicId: "007",
      topicName: "Bảo mật dữ liệu trong điện toán đám mây",
      students: ["Lương Văn Hưng", "Đỗ Minh Quân"],
      score: 7.8,
      comment: "Cần bổ sung nội dung",
    },
    {
      id: "8",
      topicId: "008",
      topicName: "Ứng dụng AR/VR trong Giáo dục",
      students: ["Trần Hoàng Nam", "Lê Quỳnh Chi"],
      score: 6.8,
      comment: "Khả năng ứng dụng cao",
    },
    {
      id: "9",
      topicId: "009",
      topicName: "Hệ thống Gợi ý sử dụng AI",
      students: ["Vũ Thị Hương", "Nguyễn Tuấn Anh"],
      score: 9.5,
      comment: "Rất tốt, có thể triển khai thực tế",
    },
    {
      id: "10",
      topicId: "010",
      topicName: "Ứng dụng Drone trong Giao thông",
      students: ["Đặng Văn Cường", "Phạm Thanh Tùng"],
      score: 7.0,
      comment: "Ý tưởng hay nhưng cần hoàn thiện thêm",
    },
  ]);

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const handleSort = () => {
    setReviews(
      [...reviews].sort((a, b) =>
        sortAscending ? a.score - b.score : b.score - a.score
      )
    );
    setSortAscending(!sortAscending);
  };

  const handleEdit = (review) => {
    setEditingReview(review);
    setEditModalVisible(true);
  };

  const handleSaveEdit = () => {
    setReviews(
      reviews.map((r) => (r.id === editingReview.id ? editingReview : r))
    );
    setEditModalVisible(false);
  };

  const handleDelete = (id) => {
    Alert.alert(
      "Xác nhận xóa",
      "Bạn có chắc chắn muốn xóa đánh giá này không?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          onPress: () => {
            setReviews(reviews.filter((review) => review.id !== id));
            setSelectedItem(null); // Ẩn icon sau khi xóa
          },
          style: "destructive",
        },
      ]
    );
  };

  const handleExport = async () => {
    const csvData = reviews
      .map(
        (r) =>
          `${r.topicId},${r.topicName},${r.students.join(", ")},${r.score},${
            r.comment
          }`
      )
      .join("\n");
    const fileUri = FileSystem.documentDirectory + "reviews.csv";
    await FileSystem.writeAsStringAsync(fileUri, csvData, {
      encoding: FileSystem.EncodingType.UTF8,
    });
    console.log("File exported to", fileUri);
  };
  const handleAddReview = () => {
    setReviews([...reviews, { ...newReview, id: String(reviews.length + 1) }]);
    setAddModalVisible(false);
    setNewReview({
      topicId: "",
      topicName: "",
      students: [""],
      score: "",
      comment: "",
    });
  };

  const filteredReviews = reviews.filter((review) =>
    review.topicName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Tìm kiếm theo tên đề tài..."
        value={searchQuery}
        onChangeText={(text) => {
          setSearchQuery(text);
          console.log("Search Query:", text);
        }}
      />
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.exportButton} onPress={handleExport}>
          <Text style={styles.buttonText}>Xuất Excel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sortButton} onPress={handleSort}>
          <Text style={styles.buttonText}>
            Sắp xếp điểm {sortAscending ? "▲" : "▼"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setAddModalVisible(true)}
        >
          <Text style={styles.buttonText}>+ Thêm Mới</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredReviews}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => (
          <View style={styles.tableHeader}>
            <Text style={[styles.headerText, { flex: 0.5 }]}>STT</Text>
            <Text style={[styles.headerText, { flex: 1 }]}>Mã Đề Tài</Text>
            <Text style={[styles.headerText, { flex: 2 }]}>Tên Đề Tài</Text>
            <Text style={[styles.headerText, { flex: 2 }]}>Sinh Viên</Text>
            <Text style={[styles.headerText, { flex: 1 }]}>Điểm</Text>
            <Text style={[styles.headerText, { flex: 1.5 }]}>Nhận xét</Text>
          </View>
        )}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() =>
              setSelectedItem(selectedItem === item.id ? null : item.id)
            }
            style={styles.tableRow}
          >
            <Text style={[styles.cell, { flex: 0.5 }]}>{index + 1}</Text>
            <Text style={[styles.cell, { flex: 1 }]}>{item.topicId}</Text>
            <Text style={[styles.cell, { flex: 2 }]}>{item.topicName}</Text>
            <Text style={[styles.cell, { flex: 2 }]}>
              {item.students.join(", ")}
            </Text>
            <Text style={[styles.cell, { flex: 1 }]}>{item.score}</Text>
            <Text style={[styles.cell, { flex: 1.5 }]}>{item.comment}</Text>
            {selectedItem === item.id && (
              <View style={styles.actionButtons}>
                <TouchableOpacity onPress={() => handleEdit(item)}>
                  <AntDesign name="edit" size={20} color="blue" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                  <AntDesign name="delete" size={20} color="red" />
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        )}
      />

      {/* Modal chỉnh sửa */}
      <Modal visible={editModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chỉnh sửa đánh giá</Text>
            <Text style={styles.label}>Mã Đề Tài:</Text>
            <TextInput
              style={styles.input}
              value={editingReview?.topicId || ""}
              onChangeText={(text) =>
                setEditingReview((prev) => ({ ...prev, topicId: text }))
              }
            />

            <Text style={styles.label}>Tên Đề Tài:</Text>
            <TextInput
              style={styles.input}
              value={editingReview?.topicName}
              onChangeText={(text) =>
                setEditingReview({ ...editingReview, topicName: text })
              }
            />

            <Text style={styles.label}>Sinh Viên:</Text>
            {editingReview?.students.map((sv, index) => (
              <TextInput
                key={index}
                style={styles.input}
                value={sv}
                onChangeText={(text) => {
                  const newStudents = [...editingReview.students];
                  newStudents[index] = text;
                  setEditingReview({ ...editingReview, students: newStudents });
                }}
              />
            ))}
            <TouchableOpacity
              onPress={() =>
                setEditingReview({
                  ...editingReview,
                  students: [...editingReview.students, ""],
                })
              }
            >
              <Text style={{ fontStyle: "italic" }}>+ Thêm Sinh Viên</Text>
            </TouchableOpacity>

            <Text style={styles.label}>Điểm:</Text>
            <TextInput
              style={styles.input}
              value={String(editingReview?.score)}
              keyboardType="numeric"
              onChangeText={(text) =>
                setEditingReview({
                  ...editingReview,
                  score: parseFloat(text) || 0,
                })
              }
            />

            <Text style={styles.label}>Nhận Xét:</Text>
            <TextInput
              style={styles.input}
              value={editingReview?.comment}
              onChangeText={(text) =>
                setEditingReview({ ...editingReview, comment: text })
              }
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => {
                  setEditModalVisible(false);
                  setSelectedItem(null);
                }}
                style={styles.cancelButton}
              >
                <Text>Hủy</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  handleSaveEdit();
                  setSelectedItem(null);
                }}
                style={styles.saveButton}
              >
                <Text>Lưu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={addModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Thêm đánh giá</Text>
            <TextInput
              style={styles.input}
              placeholder="Mã Đề Tài"
              value={newReview.topicId}
              onChangeText={(text) =>
                setNewReview({ ...newReview, topicId: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Tên Đề Tài"
              value={newReview.topicName}
              onChangeText={(text) =>
                setNewReview({ ...newReview, topicName: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Sinh Viên (cách nhau bằng dấu phẩy)"
              value={newReview.students.join(", ")}
              onChangeText={(text) =>
                setNewReview({ ...newReview, students: text.split(", ") })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Điểm"
              value={newReview.score}
              keyboardType="numeric"
              onChangeText={(text) =>
                setNewReview({ ...newReview, score: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Nhận xét"
              value={newReview.comment}
              onChangeText={(text) =>
                setNewReview({ ...newReview, comment: text })
              }
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => setAddModalVisible(false)}
                style={styles.cancelButton}
              >
                <Text>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleAddReview}
                style={styles.saveButton}
              >
                <Text>Lưu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  searchBar: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  exportButton: {
    backgroundColor: "#66BB6A",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: "center",
  },
  sortButton: {
    backgroundColor: "#FF6B60",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#66BB6A",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: { color: "white", fontWeight: "bold" },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#66b3ff",
    padding: 10,
  },
  headerText: {
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    color: "white",
  },
  tableRow: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  cell: { flex: 1, textAlign: "center" },
  cellSmall: { flex: 0.5 },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: { borderBottomWidth: 1, marginBottom: 10, padding: 5 },
  modalButtons: { flexDirection: "row", justifyContent: "space-around" },
  cancelButton: { padding: 10, backgroundColor: "gray", borderRadius: 5 },
  saveButton: { padding: 10, backgroundColor: "green", borderRadius: 5 },
});

export default QuanLyDanhGia;
