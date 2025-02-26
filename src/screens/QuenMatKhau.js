import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  TouchableHighlight,
} from "react-native";
import React from "react";
import color from "../utils/color";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
const QuenMatKhau = () => {
  const navigation = useNavigation();
  const handleBackLogin = () => {
    navigation.navigate("DangNhap");
  };
  const handleForgotPass = () => {
    navigation.navigate("XacMinhMatKhau");
  };
  return (
    <View style={styles.container}>
      {/* <View style={styles.containerHeader}>
        <Icon
          name="arrow-left"
          color={color.mainColor}
          size={20}
          onPress={handleBackLogin}
        />
      </View> */}
      <View>
        {/* <Text style={styles.header}>Quên mật khẩu</Text> */}
        <Text style={styles.requirement}>
          Vui lòng nhập email của bạn để xác minh, chúng tôi sẽ gửi mã đến email
          của bạn
        </Text>
        <Text style={{ marginTop: 20, fontSize: 15, fontWeight: "bold" }}>
          Email
        </Text>
        <View style={styles.inputEmail}>
          <TextInput placeholder="Nhập email của bạn" />
        </View>
        <TouchableHighlight
          underlayColor={color.darkBlue}
          style={styles.btn}
          onPress={handleForgotPass}
        >
          <Text style={styles.btnText}>Lấy lại mật khẩu</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default QuenMatKhau;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 30,
  },
  containerHeader: {
    flexDirection: "row",
    marginTop: 55,
  },
  header: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 20,
  },
  requirement: {
    marginTop: 20,
    fontSize: 15,
  },
  inputEmail: {
    alignSelf: "center",
    borderWidth: 1,
    width: "100%",
    height: 50,
    justifyContent: "center",
    marginTop: 10,
    borderRadius: 5,
    padding: 10,
    borderColor: color.gray,
  },
  btn: {
    marginTop: 20,
    backgroundColor: color.mainColor,
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
  },
  btnText: {
    color: color.white,
    fontWeight: "bold",
  },
});
