import React, { useEffect, useState } from "react";
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
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import color from "../../utils/color";
import api from "../../utils/api";

const SuaNguoiDung = ({ route }) => {
  const navigation = useNavigation();

  // Nhận dữ liệu từ route
  const user = route?.params?.user || null;

  // State lưu thông tin user
  const [id, setId] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const [openRole, setOpenRole] = useState(false);
  const [roles, setRoles] = useState([
    { label: "Giảng viên", value: "gv" },
    { label: "Sinh viên", value: "sv" },
    { label: "Admin", value: "ad" },
  ]);

  // Set dữ liệu khi mở form
  useEffect(() => {
    if (user) {
      setId(user.id?.toString() || "");
      setFullName(user.fullName || "");
      setEmail(user.email || "");
      setPhoneNumber(user.phoneNumber || "");
      setGender(user.gender || "");
      setSelectedRole(
        user.role === "ADMIN" ? "ad" : user.role === "USER" ? "sv" : "gv"
      );
    }
  }, [user]);

  const [validation, setValidation] = useState({
    fullName: { error: '', isOke: false },
    email: { error: '', isOke: false },
    phoneNumber: { error: '', isOke: false },
    password: { error: '', isOke: false },
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

  const checkPassword = () => {
    setValidation(prev => {
      const newValid = { ...prev };
      if (password === '')
        newValid.password = { error: '', isOke: true };
      else
        if (password.length < 6)
          newValid.password = { error: 'Mật khẩu phải có ít nhất 6 ký tự.', isOke: false };
        else
          newValid.password = { error: '', isOke: true };
      return newValid;
    });
  };

  const handleUpdate = () => {
    checkEmail();
    checkFullName();
    checkPhoneNumber();
  };

  useEffect(() => {
    if (
      validation.email.isOke &&
      validation.fullName.isOke &&
      validation.phoneNumber.isOke
    ) {
      updateUser();
    }
  }, [validation]);

  const updateUser = async () => {
    try {
      const updatedUser = {
        fullName,
        email,
        phoneNumber,
        gender,
        role: selectedRole === "ad" ? "ADMIN" : selectedRole === "sv" ? "USER" : "TEACHER",
      };

      if (password.trim() !== "") {
        checkPassword();
        if (!validation.password.isOke) return;
        updatedUser.password = password;
      }

      console.log("call api");
      const response = await api.put(`/users/${id}`, updatedUser);
      if (response.status === 200) {
        alert("Cập nhật thành công!");
        navigation.navigate("QuanLyNguoiDung");
      } else {
        alert("Cập nhật thất bại, vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Lỗi cập nhật người dùng:", error);
      alert("Đã có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  return (

    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.container}>
            {/* Thanh tiêu đề */}
            <View style={styles.header}>
              <Ionicons
                name="arrow-back"
                size={24}
                color="white"
                onPress={() => navigation.navigate("QuanLyNguoiDung")}
              />
              <Text style={styles.headerTitle}>Sửa người dùng</Text>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.row}>
                <Text style={styles.label}>Mã:</Text>
                <TextInput style={styles.input} value={id} editable={false} />
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Họ và tên:</Text>
                <TextInput
                  style={styles.input}
                  value={fullName}
                  onChangeText={(text) => setFullName(text)}
                />
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Email:</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
              </View>
              {validation.email.error === '' ? '' : <Text style={styles.error}>{validation.email.error}</Text>}

              <View style={styles.row}>
                <Text style={styles.label}>Số điện thoại:</Text>
                <TextInput
                  style={styles.input}
                  value={phoneNumber}
                  onChangeText={(text) => setPhoneNumber(text)}
                />
              </View>
              {validation.phoneNumber.error === '' ? '' : <Text style={styles.error}>{validation.phoneNumber.error}</Text>}

              <View style={styles.row}>
                <Text style={styles.label}>Giới tính:</Text>
                <TouchableOpacity
                  style={[
                    styles.radioButton,
                    gender === "MALE" && styles.selectedRadio,
                  ]}
                  onPress={() => setGender("MALE")}
                >
                  <Text style={styles.radioText}>Nam</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.radioButton,
                    gender === "FEMALE" && styles.selectedRadio,
                  ]}
                  onPress={() => setGender("FEMALE")}
                >
                  <Text style={styles.radioText}>Nữ</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Mật khẩu:</Text>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry
                />
              </View>
              {validation.password.error === '' ? '' : <Text style={styles.error}>{validation.password.error}</Text>}

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
                  />
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleUpdate}>
              <Text style={styles.submitButtonText}>Lưu thay đổi</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default SuaNguoiDung;

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
