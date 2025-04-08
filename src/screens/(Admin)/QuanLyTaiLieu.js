import React, {
  useEffect,
  useState,
} from 'react';

import {
  Alert,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import api from '../../utils/api'; // Import API

const QuanLyTaiLieu = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [documents, setDocuments] = useState([]);
  const [sortAscending, setSortAscending] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingDocument, setEditingDocument] = useState(null);
  const [addModalVisible, setAddModalVisible] = useState(false);
  
  const [newDocument, setNewDocument] = useState({
    tenTaiLieu: "",
    loaiTaiLieu: "",
    duongDan: "",
    idDeTai: "",
    idCongViec: "",
  });
  
  const [selectedItem, setSelectedItem] = useState(null);

  // 🔥 Lấy danh sách tài liệu từ API
 // ✅ Di chuyển fetchDocuments ra ngoài useEffect
const fetchDocuments = async () => {
  try {
    const response = await api.get("/tailieu");
    
    console.log("Tài liệu từ API:", response.data);

    if (response.data.results && Array.isArray(response.data.results)) {
      setDocuments(response.data.results); // ✅ Cập nhật state đúng
    } else {
      console.error("Dữ liệu tài liệu không hợp lệ:", response.data);
      setDocuments([]);
    }
  } catch (error) {
    console.error("Lỗi khi lấy danh sách tài liệu:", error);
    setDocuments([]);
  }
};

// ✅ Gọi fetchDocuments trong useEffect
useEffect(() => {
  fetchDocuments();
}, []);

  // 🔍 Tìm kiếm tài liệu
  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  // 🔄 Sắp xếp theo ngày đăng
  const handleSort = () => {
    setDocuments([...documents].sort((a, b) => {
      const dateA = new Date(a.ngayTaiLen);
      const dateB = new Date(b.ngayTaiLen);
      
      return sortAscending ? dateA - dateB : dateB - dateA;
    }));
    setSortAscending(!sortAscending);
  };

  // 📝 Chỉnh sửa tài liệu
  const handleEdit = (document) => {
    setEditingDocument(document);
    setEditModalVisible(true);
  };

  const handleSaveEdit = async () => {
    if (!editingDocument?.tenTaiLieu || !editingDocument?.loaiTaiLieu || !editingDocument?.duongDan) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin trước khi lưu.");
      return;
    }
  
    try {
      await api.put(`/tailieu/${editingDocument.idTaiLieu}`, editingDocument);
  
      setDocuments(
        documents.map((d) => (d.idTaiLieu === editingDocument.idTaiLieu ? editingDocument : d))
      );
      setEditModalVisible(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật tài liệu:", error);
    }
  };
  
  

  // ❌ Xóa tài liệu
  const handleDelete = async (id) => {
    Alert.alert("Xác nhận xóa", "Bạn có chắc chắn muốn xóa tài liệu này không?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: async () => {
          try {
            await api.delete(`/tailieu/${id}`);
            setDocuments(documents.filter((doc) => doc.idTaiLieu !== id));
            setSelectedItem(null);
          } catch (error) {
            console.error("Lỗi khi xóa tài liệu:", error);
          }
        },
      },
    ]);
  };

  // ➕ Thêm tài liệu mới
  // ✅ Sử dụng fetchDocuments sau khi thêm tài liệu
const handleAddDocument = async () => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const userId = 5; // ⚠️ Thay giá trị này bằng ID thực tế của người dùng

    const response = await api.post("/tailieu", {
      tenTaiLieu: newDocument.tenTaiLieu,
      loaiTaiLieu: newDocument.loaiTaiLieu,
      duongDan: newDocument.duongDan,
      idDeTai: newDocument.idDeTai && !isNaN(newDocument.idDeTai) ? parseInt(newDocument.idDeTai) : null,
      idCongViec: newDocument.idCongViec && !isNaN(newDocument.idCongViec) ? parseInt(newDocument.idCongViec) : null,
      ngayTaiLen: today,
      idNguoiTaiLen: userId,
    });

    setAddModalVisible(false);
    setNewDocument({ tenTaiLieu: "", loaiTaiLieu: "", duongDan: "", idDeTai: "", idCongViec: "" });

    // ✅ Gọi fetchDocuments để cập nhật danh sách mới
    fetchDocuments();
  } catch (error) {
    console.error("Lỗi khi thêm tài liệu:", error);
  }
};
  

  // 🔍 Lọc tài liệu theo tìm kiếm
  const filteredDocuments = documents.filter((doc) =>
    doc.tenTaiLieu?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Tìm kiếm theo tên tài liệu..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.sortButton} onPress={handleSort}>
          <Text style={styles.buttonText}>Sắp xếp theo ngày {sortAscending ? "▲" : "▼"}</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.addButton} onPress={() => setAddModalVisible(true)}>
          <Text style={styles.buttonText}>+ Thêm Mới</Text>
        </TouchableOpacity> */}
      </View>
      <View style={styles.tableHeader}>
  <Text style={[styles.headerText, styles.cellSmall]}>STT</Text>
  <Text style={[styles.headerText, styles.cellSmall]}>Mã</Text>
  <Text style={[styles.headerText, styles.cellMedium]}>Tên Tài Liệu</Text>
  <Text style={[styles.headerText, styles.cellSmall]}>Loại</Text>
  <Text style={[styles.headerText, styles.cellMedium]}>Ngày Đăng</Text>
</View>

<FlatList
  data={filteredDocuments}
  keyExtractor={(item) => item.idTaiLieu.toString()}
  renderItem={({ item, index }) => (
    <TouchableOpacity
      onPress={() =>
        setSelectedItem(selectedItem === item.idTaiLieu ? null : item.idTaiLieu)
      }
      style={styles.tableRow}
    >
      <Text style={[styles.cell, styles.cellSmall]}>{index + 1}</Text>
      <Text style={[styles.cell, styles.cellSmall]}>{item.idTaiLieu}</Text>
      <Text style={[styles.cell, styles.cellMedium]}>{item.tenTaiLieu}</Text>
      <Text style={[styles.cell, styles.cellSmall]}>{item.loaiTaiLieu}</Text>
      <Text style={[styles.cell, styles.cellMedium]}>{item.ngayTaiLen}</Text>

      {selectedItem === item.idTaiLieu && (
        <View style={styles.actionButtons}>
          <TouchableOpacity onPress={() => handleEdit(item)}>
            <AntDesign name="edit" size={20} color="blue" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(item.idTaiLieu)}>
            <AntDesign name="delete" size={20} color="red" />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  )}
/>


      {/* Modal thêm tài liệu */}
      <Modal visible={addModalVisible} animationType="slide" transparent>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Thêm tài liệu</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên Tài Liệu"
        placeholderTextColor="#aaa"
        value={newDocument.tenTaiLieu}
        onChangeText={(text) => setNewDocument({ ...newDocument, tenTaiLieu: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Loại Tài Liệu (PDF, DOCX...)"
          placeholderTextColor="#aaa"
        value={newDocument.loaiTaiLieu}
        onChangeText={(text) => setNewDocument({ ...newDocument, loaiTaiLieu: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Đường Dẫn"
          placeholderTextColor="#aaa"
        value={newDocument.duongDan}
        onChangeText={(text) => setNewDocument({ ...newDocument, duongDan: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="ID Đề Tài"
          placeholderTextColor="#aaa"
        keyboardType="numeric"
        value={newDocument.idDeTai}
        onChangeText={(text) => setNewDocument({ ...newDocument, idDeTai: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="ID Công Việc (nếu có)"
          placeholderTextColor="#aaa"
        keyboardType="numeric"
        value={newDocument.idCongViec}
        onChangeText={(text) => setNewDocument({ ...newDocument, idCongViec: text })}
      />
      <View style={styles.modalButtons}>
        <TouchableOpacity onPress={() => setAddModalVisible(false)} style={styles.cancelButton}>
          <Text>Hủy</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAddDocument} style={styles.saveButton}>
          <Text>Lưu</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>

<Modal visible={editModalVisible} animationType="slide" transparent>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Chỉnh sửa tài liệu</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên Tài Liệu"
          placeholderTextColor="#aaa"
        value={editingDocument?.tenTaiLieu || ""}
        onChangeText={(text) => setEditingDocument({ ...editingDocument, tenTaiLieu: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Loại Tài Liệu"
          placeholderTextColor="#aaa"
        value={editingDocument?.loaiTaiLieu || ""}
        onChangeText={(text) => setEditingDocument({ ...editingDocument, loaiTaiLieu: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Đường Dẫn"
          placeholderTextColor="#aaa"
        value={editingDocument?.duongDan || ""}
        onChangeText={(text) => setEditingDocument({ ...editingDocument, duongDan: text })}
      />
      {/* <TextInput
        style={styles.input}
        placeholder="ID Đề Tài"
          placeholderTextColor="#aaa"
        keyboardType="numeric"
        value={editingDocument?.idDeTai?.toString() || ""}
        onChangeText={(text) => setEditingDocument({ ...editingDocument, idDeTai: text })}
      /> */}
      {/* <TextInput
        style={styles.input}
        placeholder="ID Công Việc"
          placeholderTextColor="#aaa"
        keyboardType="numeric"
        value={editingDocument?.idCongViec?.toString() || ""}
        onChangeText={(text) => setEditingDocument({ ...editingDocument, idCongViec: text })}
      /> */}
      <View style={styles.modalButtons}>
        <TouchableOpacity onPress={() => setEditModalVisible(false)} style={styles.cancelButton}>
          <Text>Hủy</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSaveEdit} style={styles.saveButton}>
          <Text>Lưu</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>


    </View>
  );
};

export default QuanLyTaiLieu;


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

  addButton: {
    backgroundColor: "#66BB6A",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },

  sortButton: {
    backgroundColor: "#FF6B60",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: "center",
  },

  buttonText: { color: "white", fontWeight: "bold" },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
    alignItems: "center",
  },

  tableRow: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    alignItems: "center",
  },

  headerText: {
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    color: "white",
  },

  cell: {
    flex: 1,
    textAlign: "center",
    paddingHorizontal: 5,
  },

  cellSmall: {
    flex: 0.5,
    textAlign: "center",
  },

  cellMedium: {
    flex: 1.2,
    textAlign: "center",
  },

  actionButtons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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

  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 5,
  
  },

  modalButtons: { flexDirection: "row", justifyContent: "space-around" },

  cancelButton: { padding: 10, backgroundColor: "gray", borderRadius: 5 },

  saveButton: { padding: 10, backgroundColor: "green", borderRadius: 5 },
});



