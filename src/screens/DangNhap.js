import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import color from "../utils/color";
import { useNavigation } from "@react-navigation/native";

const DangNhap = () => {
  const navigation = useNavigation();
  const handleHome = () => {
    navigation.navigate("MainTabs");
  };
  const [selectedRole, setSelectedRole] = useState("Giảng viên"); // Mặc định chọn Giảng viên
  const [isPasswordVisible, setPasswordVisible] = useState(false); // Trạng thái ẩn/hiện mật khẩu
  const [isChecked, setIsChecked] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.headertitle}>
        <Image
          style={styles.imgLogin}
          source={require("../data/imgs/DangNhapbg.png")}
        />
        <Text style={styles.title}>EPU NCKH</Text>
        <Text style={styles.subtitle}>Vui lòng đăng nhập tài khoản</Text>

        <View style={styles.roleContainer}>
          {/* Nút Giảng viên */}
          <TouchableOpacity
            style={[
              styles.roleButton,
              selectedRole === "Giảng viên" && styles.activeButton,
            ]}
            onPress={() => setSelectedRole("Giảng viên")}
          >
            <Text
              style={[
                styles.roleText,
                selectedRole === "Giảng viên" && styles.activeText,
              ]}
            >
              Giảng viên
            </Text>
          </TouchableOpacity>

          {/* Nút Sinh viên */}
          <TouchableOpacity
            style={[
              styles.roleButton,
              selectedRole === "Sinh viên" && styles.activeButton,
            ]}
            onPress={() => setSelectedRole("Sinh viên")}
          >
            <Text
              style={[
                styles.roleText,
                selectedRole === "Sinh viên" && styles.activeText,
              ]}
            >
              Sinh viên
            </Text>
          </TouchableOpacity>
        </View>

        {/* Nhập tài khoản */}
        <View style={styles.inputContainer}>
          <Icon
            style={styles.icon}
            name="user"
            size={20}
            color={color.darkgray}
          />
          <TextInput style={styles.input} placeholder="Nhập tài khoản" />
        </View>

        {/* Nhập mật khẩu */}
        <View style={styles.inputContainer}>
          <Icon
            style={styles.icon}
            name="lock"
            size={20}
            color={color.darkgray}
          />
          <TextInput
            style={styles.input}
            placeholder="Nhập mật khẩu"
            secureTextEntry={!isPasswordVisible} // Ẩn hoặc hiện mật khẩu
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!isPasswordVisible)}
          >
            <Icon
              name={isPasswordVisible ? "eye" : "eye-slash"}
              size={20}
              color={color.darkgray}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.forgotandremember}>
          <View style={styles.rememberPW}>
            <TouchableOpacity
              onPress={() => setIsChecked(!isChecked)}
              style={[
                styles.checkbox,
                { borderColor: isChecked ? color.darkBlue : color.darkBlue }, // Viền màu darkblue
              ]}
            >
              {isChecked && (
                <Icon name="check" size={16} color={color.darkBlue} /> // Dấu tích màu darkblue
              )}
            </TouchableOpacity>

            <Text style={styles.rememberPWText}>Nhớ mật khẩu</Text>
          </View>

          <Text style={styles.forgotPw}>Quên mật khẩu</Text>
        </View>
        {/* Nút đăng nhập */}
        <TouchableOpacity style={styles.buttonLogin} onPress={handleHome}>
          <Text style={styles.buttonLoginText}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DangNhap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
  },
  headertitle: {
    alignItems: "center",
  },
  imgLogin: {
    width: "100%",
    height: 300,
    marginTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 18,
    color: color.textColor,
    marginTop: 5,
    marginBottom: 25,
  },
  roleContainer: {
    flexDirection: "row",
    backgroundColor: color.gray,
    borderRadius: 30,
    width: "90%",
    marginBottom: 20,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 30,
    alignItems: "center",
  },
  activeButton: {
    backgroundColor: color.mainColor,
  },
  roleText: {
    fontSize: 16,
    color: color.textColor,
  },
  activeText: {
    color: color.white,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: color.gray,
    borderRadius: 10,
    width: "80%",
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: color.darkgray,
  },
  buttonLogin: {
    backgroundColor: color.mainColor,
    paddingVertical: 12,
    borderRadius: 15,
    width: "80%",
    alignItems: "center",
    marginTop: 20,
  },
  buttonLoginText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  forgotandremember: {
    width: "80%",
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },

  rememberPW: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  checkbox: {
    width: 23,
    height: 23,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: color.background,
  },
  rememberPWText: {
    color: color.textColor,
    fontSize: 16,
    marginLeft: 10,
  },
  forgotPw: {
    color: color.red,
    fontSize: 16,
  },
});
