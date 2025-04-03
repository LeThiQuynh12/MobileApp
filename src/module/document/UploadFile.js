import React, { useState } from 'react';

import * as DocumentPicker from 'expo-document-picker';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { AntDesign } from '@expo/vector-icons';

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
    <View>
      <TouchableOpacity onPress={selectFiles} style={{ padding: 10, backgroundColor: "#7AD530", borderRadius: 5, alignItems: "center", marginBottom: 10 }}>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Chọn File</Text>
      </TouchableOpacity>

      <FlatList
        data={selectedFiles}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: "#ddd" }}>
            <Text style={{ flex: 1 }}>{item.name}</Text>
            <TouchableOpacity onPress={() => removeFile(index)}>
              <AntDesign name="delete" size={20} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity onPress={uploadFiles} style={{ padding: 10, backgroundColor: "#64B5F6", marginTop: 10, borderRadius: 5, alignItems: "center" }}>
        {uploading ? <ActivityIndicator color="#fff" /> : <Text style={{ color: "#fff", fontWeight: "bold" }}>Tải Lên</Text>}
      </TouchableOpacity>
    </View>
  );
};

export default UploadFile;
