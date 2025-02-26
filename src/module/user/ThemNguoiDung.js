import React, { useState } from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ThemNguoiDung = () => {
  const navigation = useNavigation();
    const [openRole, setOpenRole] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);
    const [roles, setRoles] = useState([
      { label: "Giảng viên", value: "gv" },
      { label: "Sinh viên", value: "sv" },
    ]);

    const [openPower, setOpenPower] = useState(false);
      const [selectedPower, setSelectedPower] = useState(null);
      const [powers, setPowers] = useState([
        { label: "Duyệt đề tài", value: "p1" },
        { label: "Xem tiến độ", value: "p2" },
        { label: "Thông tin cá nhân", value: "p3" },
        { label: "Đăng ký đề tài", value: "p4" },
        { label: "Giao nhiệm vụ", value: "p5" },
        { label: "Đăng ký đề tài", value: "p6" },
      ]);
  return (
    <View style={styles.container}>
      {/* Thanh tiêu đề */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="white" onPress={() => navigation.navigate("QuanLyNguoiDung")} />

        <Text style={styles.headerTitle}>Thêm người dùng (Phân quyền)</Text>
      </View>

      <View style={styles.formContainer}>
        
      <View style={styles.row}>
          <Text style={styles.label}>Mã:</Text>
          <TextInput style={styles.input}/>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Họ và tên:</Text>
          <TextInput style={styles.input}/>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Email:</Text>
          <TextInput style={styles.input}/>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Mật khẩu:</Text>
          <TextInput style={styles.input}/>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Vai trò:</Text>
          <View style={styles.dropdownWrapper}>
            <DropDownPicker
              open={openRole}
              value={selectedRole}
              items={roles}
              setOpen={setOpenRole}
              setValue={setSelectedRole}
              setItems={setRoles}
              placeholder="Chọn vai trò"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
            />
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Được quyền truy cập:</Text>
          <View style={styles.dropdownWrapper}>
            <DropDownPicker
              open={openPower}
              value={selectedPower}
              items={powers}
              setOpen={setOpenPower}
              setValue={setSelectedPower}
              setItems={setPowers}
              placeholder="Được quyền truy cập"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
            />
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Đồng ý</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ThemNguoiDung;

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#F2F2F2",
   
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#64B5F6',
    padding: 25,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 15,
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    gap: 24,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    width: 100,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
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
  dropdownWrapper: {
    flex: 1,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
  },

});
