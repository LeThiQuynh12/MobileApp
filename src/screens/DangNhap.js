import React, { useContext, useEffect, useState } from "react";

import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from "react-native-vector-icons/FontAwesome";

import { useNavigation } from "@react-navigation/native";

import { AuthContext } from "../context/AuthContext";
import color from "../utils/color";
import { ActivityIndicator } from "react-native";

const DangNhap = () => {
  const navigation = useNavigation();
  const { login, user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (user?.role) {
      if (user.role === "LECTURER") {
        navigation.replace("GiangVien");
      } else if (user.role === "STUDENT") {
        navigation.replace("SinhVien");
      } else if (user.role === "ADMIN") {
        navigation.replace("Admin");
      }
    }
  }, [user?.role]);

  const handleHome = async () => {
    if (email.trim() === "" || password.trim() === "") {
      Alert.alert("Vui lòng nhập đủ thông tin email và mật khẩu");
      return;
    }
    setIsLoading(true);
    const loginData = {
      username: email.toLowerCase(),
      password,
    };
    try {
      await login(loginData.username, loginData.password);
    } catch (error) {
      Alert.alert("Vui lòng kiểm tra lại thông tin đăng nhập!");
    } finally {
      setIsLoading(false);
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
            <TouchableOpacity
              style={[styles.buttonLogin, isLoading && { opacity: 0.5 }]}
              onPress={handleHome}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.buttonLoginText}>Đăng nhập</Text>
              )}
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
