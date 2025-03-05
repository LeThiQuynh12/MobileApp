import React from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
//import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ThemDeTai = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="white" onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>Thêm đề tài </Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.row}>
          <Text style={styles.label}>
            Tên đề tài: <Text style={styles.required}>*</Text>
          </Text>
          <TextInput style={[styles.input, styles.flexInput]} />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>
            Người hướng dẫn: <Text style={styles.required}>*</Text>
          </Text>
          <TextInput style={[styles.input, styles.flexInput]} />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>
            Chủ nhiệm đề tài: <Text style={styles.required}>*</Text>
          </Text>
          <TextInput style={[styles.input, styles.flexInput]} />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>
            Người tham gia: <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={[styles.input, styles.flexInput, styles.multiline]}
            multiline
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Mô tả:</Text>
          <TextInput
            style={[styles.input, styles.flexInput, styles.multiline]}
            multiline
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Tài liệu liên quan:</Text>
          <TouchableOpacity style={styles.uploadButton}>
            <Icon name="upload" size={20} color="#fff" />
            <Text style={styles.uploadButtonText}>Tải lên</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Thêm đề tài</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ThemDeTai;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#64B5F6",
    padding: 25,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginLeft: 15,
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    gap: 22,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start", // Giữ text trên dòng đầu tiên
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    flexDirection: "row",
    fontWeight: "bold",
    color: "#333",
    width: 120, // Để giữ khoảng cách đồng đều
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
  },
  flexInput: {
    flex: 1, // Giúp input mở rộng hết dòng
  },
  multiline: {
    height: 80,
    textAlignVertical: "top", // Căn chữ lên đầu
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7AD530",
    padding: 12,
    borderRadius: 5,
    marginLeft: 10, // Để tạo khoảng cách với chữ "Tài liệu liên quan",
    alignItems: "center",
    justifyContent: "center",
    width: 150,
  },
  uploadButtonText: {
    color: "#fff",
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  submitButton: {
    marginTop: 35,
    backgroundColor: "#64B5F6",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "center",
    width: 200,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  required: {
    color: "red",
  },
});
