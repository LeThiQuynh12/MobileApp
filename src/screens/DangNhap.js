import React, { useContext, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import color from "../utils/color";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import api, { API_URL, getTokens, saveTokens } from "../utils/api";
import { AuthContext } from "../context/AuthContext";

const DangNhap = ({ setUserRole = null }) => {
  const navigation = useNavigation();
  const { login, getCurrentUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("Giảng viên");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [selectedDate, setSelectedDate] = useState("");

  const handleHome = async () => {
    // console.log("API_URL", API_URL);
    // console.log(email, password);
    const loginData = {
      username: email,
      password,
    };
    // axios
    //   .post(API_URL + "/auth/login", loginData, {
    //     headers: {
    //       "Content-Type": "application/json", // Xác định dữ liệu là JSON
    //       Accept: "application/json", // Chấp nhận phản hồi JSON
    //     },
    //     // withCredentials: true, // Cho phép gửi & nhận cookie từ server
    //   })
    //   .then((response) => {
    //     // console.log("Đăng nhập thành công:", response.data);
    //     const access_token = response.data.results.access_token;
    //     const refresh_token = response.data.results.refresh_token;
    //     // console.log("token: ", access_token, refresh_token);
    //     // localStorage.setItem("access_token", access_token);
    //     // localStorage.setItem("refresh_token", refresh_token);
    //     // navigation("/");
    //     // Lưu token
    //     saveTokens({ access_token, refresh_token });
    //   })
    //   .catch((error) => {
    //     console.error(
    //       "Lỗi đăng nhập:",
    //       error.response ? error.response.data : error.message
    //     );
    //   });

    // Gửi request POST
    try {
      // const response = await api.post("/auth/login", loginData);
      // console.log("Đăng nhập thành công:", response.data.results);
      // const access_token = response.data.results.access_token;
      // const refresh_token = response.data.results.refresh_token;
      // await saveTokens({ access_token, refresh_token });
      // await getCurrentUser();
      await login(loginData.username, loginData.password);
      // setSelectedRole("admin");
      // setUserRole("admin");
      // navigation("/");
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
    }

    // console.log("token: ", await getTokens());

    if (selectedRole === "Giảng viên") {
      setUserRole("giangvien");
    } else if (selectedRole === "Sinh viên") {
      setUserRole("sinhvien");
    } else {
      setUserRole("admin");
    }
  };

  const handleForgetPassword = () => {
    navigation.navigate("QuenMatKhau");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <KeyboardAwareScrollView
        style={styles.container}
        extraScrollHeight={-300} // Đẩy màn hình lên khi bàn phím xuất hiện
        enableOnAndroid={true} // Kích hoạt trên Android
        keyboardShouldPersistTaps="handled" // Đảm bảo có thể bấm ra ngoài để ẩn bàn phím
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.headertitle}>
            <Image
              style={styles.imgLogin}
              source={require("../data/imgs/DangNhapbg.png")}
            />
            <Text style={styles.title}>EPU NCKH</Text>
            <Text style={styles.subtitle}>Vui lòng đăng nhập tài khoản</Text>

            <View style={styles.roleContainer}>
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

              <TouchableOpacity
                style={[
                  styles.roleButton,
                  selectedRole === "Admin" && styles.activeButton,
                ]}
                onPress={() => setSelectedRole("Admin")}
              >
                <Text
                  style={[
                    styles.roleText,
                    selectedRole === "Admin" && styles.activeText,
                  ]}
                >
                  Admin
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Icon
                style={styles.icon}
                name="user"
                size={20}
                color={color.darkgray}
              />
              <TextInput
                style={styles.input}
                placeholder="Nhập email"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon
                style={styles.icon}
                name="lock"
                size={20}
                color={color.darkgray}
              />
              <TextInput
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                placeholder="Nhập mật khẩu"
                secureTextEntry={!isPasswordVisible}
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
                  style={[styles.checkbox, { borderColor: color.darkBlue }]}
                >
                  {isChecked && (
                    <Icon name="check" size={16} color={color.darkBlue} />
                  )}
                </TouchableOpacity>
                <Text style={styles.rememberPWText}>Nhớ mật khẩu</Text>
              </View>
              <TouchableOpacity onPress={handleForgetPassword}>
                <Text style={styles.forgotPw}>Quên mật khẩu</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.buttonLogin} onPress={handleHome}>
              <Text style={styles.buttonLoginText}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView>
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
