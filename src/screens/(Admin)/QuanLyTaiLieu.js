import React, { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Modal, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as FileSystem from 'expo-file-system';

const QuanLyTaiLieu = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [documents, setDocuments] = useState([
    { id: "1", docId: "TL001", docName: "Báo cáo NCKH", author: "Nguyễn Văn Nam", publishDate: "2023-10-01" },
    { id: "2", docId: "TL002", docName: "Giáo trình AI", author: "Trần Thị Lan", publishDate: "2022-05-15" },
    { id: "3", docId: "TL003", docName: "Lập trình web căn bản", author: "Lê Quang Hiếu", publishDate: "2021-11-12" },
    { id: "4", docId: "TL004", docName: "Cơ sở dữ liệu nâng cao", author: "Phạm Minh Tuấn", publishDate: "2020-02-20" },
    { id: "5", docId: "TL005", docName: "Kỹ thuật lập trình Python", author: "Võ Thanh Tâm", publishDate: "2023-03-25" },
    { id: "6", docId: "TL006", docName: "Mạng máy tính cơ bản", author: "Đỗ Thị Mai", publishDate: "2019-07-09" },
    { id: "7", docId: "TL007", docName: "Lập trình di động Android", author: "Trương Hữu Tính", publishDate: "2021-08-18" },
    { id: "8", docId: "TL008", docName: "Thuật toán và cấu trúc dữ liệu", author: "Nguyễn Thị Mai", publishDate: "2022-12-10" },
    { id: "9", docId: "TL009", docName: "Kiến trúc máy tính", author: "Nguyễn Văn Hưng", publishDate: "2018-05-22" },
    { id: "10", docId: "TL010", docName: "Hệ điều hành Unix", author: "Lâm Bích Lan", publishDate: "2021-04-14" },
  ]);
  const [sortAscending, setSortAscending] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingDocument, setEditingDocument] = useState(null);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [newDocument, setNewDocument] = useState({ docId: "", docName: "", author: "", publishDate: "" });
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const handleSort = () => {
    setDocuments([...documents].sort((a, b) => {
      const dateA = new Date(a.publishDate); // Convert to Date object
      const dateB = new Date(b.publishDate); // Convert to Date object
      return sortAscending ? dateA - dateB : dateB - dateA; // Compare dates
    }));
    setSortAscending(!sortAscending);
  };
  

  const handleEdit = (document) => {
    setEditingDocument(document);
    setEditModalVisible(true);
  };

  const handleSaveEdit = () => {
    setDocuments(documents.map(d => (d.id === editingDocument.id ? editingDocument : d)));
    setEditModalVisible(false);
  };

  const handleDelete = (id) => {
    Alert.alert(
      "Xác nhận xóa",
      "Bạn có chắc chắn muốn xóa tài liệu này không?",
      [
        { text: "Hủy", style: "cancel" },
        { text: "Xóa", onPress: () => {
            setDocuments(documents.filter(document => document.id !== id));
            setSelectedItem(null); // Ẩn icon sau khi xóa
          }, style: "destructive" }
      ]
    );
  };

  const handleExport = async () => {
    const csvData = documents.map(d => `${d.docId},${d.docName},${d.author || ""},${d.publishDate}`).join("\n");
    const fileUri = FileSystem.documentDirectory + "documents.csv";
    await FileSystem.writeAsStringAsync(fileUri, csvData, { encoding: FileSystem.EncodingType.UTF8 });
    console.log("File exported to", fileUri);
  };

  const handleAddDocument = () => {
    setDocuments([...documents, { ...newDocument, id: String(documents.length + 1) }]);
    setAddModalVisible(false);
    setNewDocument({ docId: "", docName: "", author: "", publishDate: "" }); // Reset author là chuỗi rỗng
  };
  

  const filteredDocuments = documents.filter(doc => doc.docName.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Tìm kiếm theo tên tài liệu..."
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
          <Text style={styles.buttonText}>Sắp xếp theo ngày đăng{sortAscending ? "▲" : "▼"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={() => setAddModalVisible(true)}>
          <Text style={styles.buttonText}>+ Thêm Mới</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={filteredDocuments}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => (
          <View style={styles.tableHeader}>
            <Text style={[styles.headerText, { flex: 0.3 }]}>STT</Text>
            <Text style={[styles.headerText, { flex: 1 }]}>Mã Tài Liệu</Text>
            <Text style={[styles.headerText, { flex: 2 }]}>Tên Tài Liệu</Text>
            <Text style={[styles.headerText, { flex: 1.5 }]}>Người Đăng</Text>
            <Text style={[styles.headerText, { flex: 1.5 }]}>Ngày Đăng</Text>
          </View>
        )}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => setSelectedItem(selectedItem === item.id ? null : item.id)} style={styles.tableRow}>
<Text style={[styles.cell, { flex: 0.3 }]}>{index + 1}</Text>   
<Text style={[styles.cell, { flex: 1 }]}>{item.docId}</Text>
<Text style={[styles.cell, { flex: 2 }]}>{item.docName}</Text>
<Text style={[styles.cell, { flex: 1.5 }]}>{item.author}</Text>
<Text style={[styles.cell, { flex: 1.5 }]}>{item.publishDate}</Text>

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
            <Text style={styles.modalTitle}>Chỉnh sửa tài liệu</Text>
            <Text style={styles.label}>Mã Tài Liệu:</Text>
            <TextInput
              style={styles.input}
              value={editingDocument?.docId || ""}
              onChangeText={(text) => setEditingDocument(prev => ({ ...prev, docId: text }))}
            />

            <Text style={styles.label}>Tên Tài Liệu:</Text>
            <TextInput
              style={styles.input}
              value={editingDocument?.docName}
              onChangeText={(text) => setEditingDocument({ ...editingDocument, docName: text })}
            />

<Text style={styles.label}>Người Đăng:</Text>
<TextInput
  style={styles.input}
  value={editingDocument?.author || ""}
  onChangeText={(text) => setEditingDocument({ ...editingDocument, author: text })}
/>

<Text style={styles.label}>Ngày Đăng:</Text>
<TextInput
  style={styles.input}
  value={String(editingDocument?.publishDate)}
  keyboardType="numeric"
  onChangeText={(text) => setEditingDocument({ ...editingDocument, publishDate: parseFloat(text) || 0 })}
/>


            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => { setEditModalVisible(false); setSelectedItem(null); }} style={styles.cancelButton}>
                <Text>Hủy</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { handleSaveEdit(); setSelectedItem(null); }} style={styles.saveButton}>
                <Text>Lưu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={addModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Thêm tài liệu</Text>
            <TextInput style={styles.input} placeholder="Mã Tài Liệu" value={newDocument.docId} onChangeText={(text) => setNewDocument({ ...newDocument, docId: text })} />
            <TextInput style={styles.input} placeholder="Tên Tài Liệu" value={newDocument.docName} onChangeText={(text) => setNewDocument({ ...newDocument, docName: text })} />

            <TextInput style={styles.input} placeholder="Người Đăng (cách nhau bằng dấu phẩy)" value={newDocument.author} onChangeText={(text) => setNewDocument({ ...newDocument, author: text})} />
            <TextInput style={styles.input} placeholder="Ngày Đăng" value={newDocument.Date} keyboardType="numeric" onChangeText={(text) => setNewDocument({ ...newDocument, publishDate: text })} />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  searchBar: { height: 40, borderColor: "#ccc", borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, marginBottom: 10 },
  buttonRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  exportButton: { backgroundColor: "#66BB6A", padding: 10, borderRadius: 5, flex: 1, marginRight: 5, alignItems: "center" },
  sortButton: { backgroundColor: "#FF6B60", padding: 10, borderRadius: 5, flex: 1, marginLeft: 5, alignItems: "center" },
  addButton: { backgroundColor: "#66BB6A", padding: 10, borderRadius: 5, alignItems: "center", flex: 1, marginHorizontal: 5 },
  buttonText: { color: "white", fontWeight: "bold" },
  tableHeader: { flexDirection: "row", backgroundColor: "#66b3ff", padding: 10 },
  headerText: { fontWeight: "bold", flex: 1, textAlign: "center", color: "white" },
  tableRow: { flexDirection: "row", padding: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  cell: { flex: 1, textAlign: "center" },
  cellSmall: { flex: 0.5 },
  actionButtons: { flexDirection: "row", justifyContent: "space-around", flex: 1 },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { width: "80%", backgroundColor: "white", padding: 20, borderRadius: 10 },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: { borderBottomWidth: 1, marginBottom: 10, padding: 5 },
  modalButtons: { flexDirection: "row", justifyContent: "space-around" },
  cancelButton: { padding: 10, backgroundColor: "gray", borderRadius: 5 },
  saveButton: { padding: 10, backgroundColor: "green", borderRadius: 5 },
});

export default QuanLyTaiLieu;
