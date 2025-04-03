import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  View,
  Image,
  KeyboardAwareScrollView,
  FlatList
} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import * as DocumentPicker from "expo-document-picker";
import Icon from "react-native-vector-icons/FontAwesome";

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import color from '../../utils/color';
import api from '../../utils/api';

const ThemNguoiDung = () => {
  // State lưu thông tin user
  const navigation = useNavigation();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [image, setImage] = useState(null);

  const [openRole, setOpenRole] = useState(false);
  const [roles, setRoles] = useState([
    { label: "Giảng viên", value: "gv" },
    { label: "Sinh viên", value: "sv" },
    { label: "Admin", value: "ad" },
  ]);

  const [validation, setValidation] = useState({
    fullName: { error: '', isOke: false },
    email: { error: '', isOke: false },
    phoneNumber: { error: '', isOke: false },
    gender: { error: '', isOke: false },
    password: { error: '', isOke: false },
    role: { error: '', isOke: false },
  })

  const checkFullName = () => {
    setValidation(prev => {
      const newValid = { ...prev };
      if (fullName === '')
        newValid.fullName = { error: 'Bạn chưa nhập họ tên đầy đủ', isOke: false };
      else
        newValid.fullName = { error: '', isOke: true };
      return newValid;
    })
  }

  const checkEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setValidation(prev => {
      const newValid = { ...prev };
      if (email === '')
        newValid.email = { error: 'Bạn chưa nhập email', isOke: false };
      else
        if (!emailRegex.test(email))
          newValid.email = { error: 'Bạn nhập email không đúng định dạng', isOke: false };
        else
          newValid.email = { error: '', isOke: true };
      return newValid;
    })
  }

  const checkPhoneNumber = () => {
    const phoneRegex = /^0\d{9}$/;
    setValidation(prev => {
      const newValid = { ...prev };
      if (phoneNumber === '')
        newValid.phoneNumber = { error: 'Bạn chưa nhập số điện thoại', isOke: false };
      else
        if (!phoneRegex.test(phoneNumber))
          newValid.phoneNumber = { error: 'Số điện thoại không hợp lệ! Phải có 10 chữ số và bắt đầu bằng 0.', isOke: false };
        else
          newValid.phoneNumber = { error: '', isOke: true };
      return newValid;
    });
  };

  const checkGender = () => {
    setValidation(prev => {
      const newValid = { ...prev };
      if (gender === '')
        newValid.gender = { error: "Bạn chưa chọn giới tính", isOke: false };
      else
        newValid.gender = { error: "", isOke: true };
      return newValid;
    })
  }

  const checkPassword = () => {
    setValidation(prev => {
      const newValid = { ...prev };
      if (password.length < 6)
        newValid.password = { error: 'Mật khẩu phải có ít nhất 6 ký tự.', isOke: false };
      else
        newValid.password = { error: '', isOke: true };
      return newValid;
    });
  };

  const checkRole = () => {
    setValidation(prev => {
      const newValid = { ...prev };
      if (selectedRole === '')
        newValid.role = { error: "Bạn chưa chọn quyền", isOke: false };
      else
        newValid.role = { error: "", isOke: true };
      return newValid;
    });
  }

  const pickImage = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "image/*",
        copyToCacheDirectory: true,
      });
      if (!result.canceled) {
        const selectedFile = result.assets[0];

        const isImage = selectedFile.mimeType?.startsWith("image/") || /\.(jpg|jpeg|png|gif)$/i.test(selectedFile.name);

        if (isImage) {
          setImage(selectedFile);
        } else {
          alert("Vui lòng chọn một tệp hình ảnh hợp lệ!");
        }
      }
    } catch (error) {
      console.log("Lỗi khi chọn tài liệu:", error);
    }
  };

  const handleCreate = () => {
    checkEmail();
    checkFullName();
    checkPhoneNumber();
    checkGender();
    checkPassword();
    checkRole();
  };

  useEffect(() => {
    if (
      validation.email.isOke &&
      validation.fullName.isOke &&
      validation.phoneNumber.isOke &&
      validation.gender.isOke &&
      validation.password.isOke &&
      validation.role.isOke
    ) {
      createUser();
    }
  }, [validation]);

  const createUser = async () => {
    if (
      !validation.fullName.isOke ||
      !validation.email.isOke ||
      !validation.phoneNumber.isOke ||
      !validation.gender.isOke ||
      !validation.password.isOke ||
      !validation.role.isOke
    ) {
      alert('Vui lòng kiểm tra lại thông tin trước khi tạo!');
      return;
    }

    try {
      const newUser = {
        fullName,
        email,
        phoneNumber,
        gender,
        password,
        role: selectedRole === 'ad' ? 'ADMIN' : selectedRole === 'sv' ? 'USER' : 'LECTURER',
        avatarUrl: image && image.uri ? image.uri : null,
      };
      console.log('Sending new user:', newUser);

      const response = await api.post('/users', newUser);

      if (response.status === 201 || response.status === 200) {
        alert('Thêm mới thành công!');
        navigation.navigate('QuanLyNguoiDung');
      } else {
        alert(`Thêm mới thất bại với mã trạng thái: ${response.status}`);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.message || 'Đã có lỗi xảy ra!';
        setValidation(prev => ({
          ...prev,
          email: { error: errorMessage, isOke: false },
        }));
      } else
        alert('Đã có lỗi xảy ra, vui lòng thử lại!');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="white"
          onPress={() => navigation.navigate('QuanLyNguoiDung')}
        />
        <Text style={styles.headerTitle}>Thêm người dùng</Text>
      </View>
      <FlatList
        data={[0]}
        renderItem={() => (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
              style={styles.container}
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
              <View style={styles.container}>
                <View style={styles.formContainer}>
                  <View style={styles.row}>
                    <Text style={styles.label}>Họ và tên:</Text>
                    <TextInput
                      style={styles.input}
                      value={fullName}
                      onChangeText={(text) => setFullName(text)}
                    />
                  </View>
                  {validation.fullName.error === '' ? null : (
                    <Text style={styles.error}>{validation.fullName.error}</Text>
                  )}

                  <View style={styles.row}>
                    <Text style={styles.label}>Email:</Text>
                    <TextInput
                      style={styles.input}
                      value={email}
                      onChangeText={(text) => setEmail(text)}
                    />
                  </View>
                  {validation.email.error === '' ? null : (
                    <Text style={styles.error}>{validation.email.error}</Text>
                  )}

                  <View style={styles.row}>
                    <Text style={styles.label}>Số điện thoại:</Text>
                    <TextInput
                      style={styles.input}
                      value={phoneNumber}
                      onChangeText={(text) => setPhoneNumber(text)}
                    />
                  </View>
                  {validation.phoneNumber.error === '' ? null : (
                    <Text style={styles.error}>{validation.phoneNumber.error}</Text>
                  )}

                  <View style={styles.row}>
                    <Text style={styles.label}>Giới tính:</Text>
                    <TouchableOpacity
                      style={[styles.radioButton, gender === 'MALE' && styles.selectedRadio]}
                      onPress={() => setGender('MALE')}
                    >
                      <Text style={styles.radioText}>Nam</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.radioButton, gender === 'FEMALE' && styles.selectedRadio]}
                      onPress={() => setGender('FEMALE')}
                    >
                      <Text style={styles.radioText}>Nữ</Text>
                    </TouchableOpacity>
                  </View>
                  {validation.gender.error === '' ? null : (
                    <Text style={styles.error}>{validation.gender.error}</Text>
                  )}

                  <View style={styles.row}>
                    <Text style={styles.label}>Mật khẩu:</Text>
                    <TextInput
                      style={styles.input}
                      value={password}
                      onChangeText={(text) => setPassword(text)}
                      secureTextEntry
                    />
                  </View>
                  {validation.password.error === '' ? null : (
                    <Text style={styles.error}>{validation.password.error}</Text>
                  )}

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
                        style={styles.dropdown}
                        dropDownContainerStyle={styles.dropdownContainer}
                        placeholder="Chọn vai trò"
                      />
                    </View>
                  </View>
                  {validation.role.error === '' ? null : (
                    <Text style={styles.error}>{validation.role.error}</Text>
                  )}

                  <Text style={styles.label}>Chọn ảnh:</Text>
                  <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
                    <Icon name="upload" size={20} color="#fff" />
                    <Text style={styles.uploadButtonText}>Tải ảnh lên</Text>
                  </TouchableOpacity>
                  {image && (
                    <View style={styles.fileInfo}>
                      <Text style={styles.fileText}>📄 {image.name}</Text>
                    </View>
                  )}
                </View>

                <TouchableOpacity style={styles.submitButton} onPress={handleCreate}>
                  <Text style={styles.submitButtonText}>Tạo mới</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        )}
        keyExtractor={() => 'form'}
      />
    </View>
  );
}

export default ThemNguoiDung;

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
  error: {
    color: color.red,
    fontSize: 12
  },
  radioButton: {
    borderWidth: 2,
    borderColor: "#1976D2",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  selectedRadio: {
    backgroundColor: "#64B5F6",
  },
  radioText: {
    fontSize: 14,
    color: "#000",
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 5,
    justifyContent: "center",
    marginTop: 10,
  },
  uploadButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  fileInfo: {
    marginTop: 10,
    backgroundColor: "#E8EAF6",
    padding: 10,
    borderRadius: 5,
  },
  fileText: {
    fontSize: 14,
    color: "#333",
  },
  submitButton: {
    marginTop: 35,
    backgroundColor: "#64B5F6",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "center",
    width: 200,
    marginBottom: 35
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