import React, { useState } from 'react';

import * as DocumentPicker from 'expo-document-picker';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import api from '../../utils/api'; // Import API instance

const UploadFile = ({ idDeTai, idCongViec, idNguoiTaiLen }) => {
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const selectFiles = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "image/*"],
        multiple: true,
      });

      if (res.canceled) return;

      setSelectedFiles([...selectedFiles, ...res.assets]);
    } catch (err) {
      Alert.alert("Lỗi", "Không thể chọn file.");
      console.error(err);
    }
  };

  const uploadFiles = async () => {
    if (selectedFiles.length === 0) {
      Alert.alert("Lỗi", "Vui lòng chọn ít nhất một file!");
      return;
    }
  
    setUploading(true);
    const formData = new FormData();
  
    selectedFiles.forEach((file, index) => {
      const fileUri = file.uri.startsWith("file://") ? file.uri.replace("file://", "") : file.uri;
  
      formData.append("files", {
        uri: fileUri,
        type: file.mimeType,
        name: file.name,
      });
  
      formData.append(`tenTaiLieu[${index}]`, file.name);
      formData.append(`loaiTaiLieu[${index}]`, file.mimeType);
    });
  
    if (idDeTai !== null) formData.append("idDeTai", idDeTai);
    if (idCongViec !== null) formData.append("idCongViec", idCongViec);
    formData.append("idNguoiTaiLen", idNguoiTaiLen);
  
    try {
      const response = await api.post("/tailieu/upload-multiple", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      Alert.alert("Thành công", "Tải lên thành công!");
      setSelectedFiles([]); // Xóa danh sách file sau khi tải lên thành công
    } catch (error) {
      console.error("Lỗi khi tải lên file:", error);
      Alert.alert("Lỗi", "Tải lên thất bại!");
    } finally {
      setUploading(false);
    }
  };

  const removeFile = (index) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {selectedFiles.length === 0 ? (
          <TouchableOpacity style={styles.uploadButton} onPress={selectFiles}>
            <View style={styles.uploadButtonContent}>
              <Ionicons name="cloud-upload" size={24} color="#3498db" />
              <Text style={styles.uploadButtonText}>Tải lên tài liệu</Text>
            </View>
          </TouchableOpacity>
        ) : (
          selectedFiles.map((item, index) => (
            <View key={index} style={styles.documentContainer}>
              <View style={styles.documentInfo}>
                <Ionicons name="document-outline" size={24} color="#2c3e50" />
                <View style={styles.documentTextContainer}>
                  <Text style={styles.documentName} numberOfLines={1} ellipsizeMode="tail">
                    {item.name}
                  </Text>
                  <Text style={styles.documentSize}>
                    {(item.size / 1024).toFixed(2)} KB
                  </Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => removeFile(index)} style={styles.removeDocumentButton}>
                <Ionicons name="close-circle" size={24} color="#e74c3c" />
              </TouchableOpacity>
            </View>
          ))
        )}

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
    padding: 8,
    marginVertical: 8,
    borderRadius: 20,
    marginHorizontal: 30,
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
  },
  fileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  fileName: {
    flex: 1,
  },
  uploadButton: {
    borderWidth: 1,
    borderColor: "#3498db",
    borderRadius: 10,
    borderStyle: "dashed",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f9fa",
    marginVertical: 15,
    marginHorizontal: 30,
  },
  uploadButtonContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  uploadButtonText: {
    marginTop: 10,
    color: "#3498db",
    fontSize: 16,
    fontWeight: "500",
  },
  documentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    backgroundColor: "#fff",
    marginVertical: 5,
    marginHorizontal: 30,
  },
  documentInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  documentTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  documentName: {
    fontSize: 15,
    color: "#2c3e50",
    fontWeight: "500",
  },
  documentSize: {
    fontSize: 13,
    color: "#7f8c8d",
    marginTop: 4,
  },
  removeDocumentButton: {
    padding: 5,
  },
});

export default UploadFile;