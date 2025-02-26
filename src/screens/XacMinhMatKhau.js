import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import color from "../utils/color";
import QuenMatKhau from "./QuenMatKhau";
import Icon from "react-native-vector-icons/FontAwesome";
import { TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const XacMinhMatKhau = () => {
  const navigation = useNavigation();
  const [activeButton, setActiveButton] = useState(null);

  const handlePressIn = (button) => {
    setActiveButton(button);
  };

  const handlePressOut = () => {
    setActiveButton(null);
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.containerHeader}>
        <Icon
          name="arrow-left"
          color={color.mainColor}
          size={20}
          onPress={handleBack}
        />
      </View> */}
      <View style={styles.body}>
        <View style={styles.content}>
          <Text style={styles.textHeader}>Nhập mã xác minh</Text>
          <Text style={{ fontSize: 15, marginBottom: 20 }}>
            Một mã xác minh sẽ gồm bốn chữ số đã được gửi đến địa chỉ email mà
            bạn đã cung cấp.
          </Text>
          <View>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input}></TextInput>
              <TextInput style={styles.input}></TextInput>
              <TextInput style={styles.input}></TextInput>
              <TextInput style={styles.input}></TextInput>
            </View>
            <View style={styles.confirmCancel}>
              <TouchableOpacity
                style={[styles.btn, activeButton === "Hủy" && styles.btnActive]}
                onPressIn={() => handlePressIn("Hủy")}
                onPressOut={handlePressOut}
              >
                <Text
                  style={[
                    { fontSize: 17 },
                    activeButton === "Hủy" && styles.textActive,
                  ]}
                >
                  Hủy
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.btn,
                  activeButton === "Xác nhận" && styles.btnActive,
                ]}
                onPressIn={() => handlePressIn("Xác nhận")}
                onPressOut={handlePressOut}
              >
                <Text
                  style={[
                    { fontSize: 17 },
                    activeButton === "Xác nhận" && styles.textActive,
                  ]}
                >
                  Xác nhận
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default XacMinhMatKhau;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerHeader: {
    flexDirection: "row",
    marginTop: 55,
    marginLeft: 20,
  },
  body: {
    flex: 1,
    marginTop: -100,
    justifyContent: "center",
    alignSelf: "center",
  },
  content: {
    borderRadius: 10,
    borderWidth: 1,
    height: 300,
    width: "90%",
    borderColor: color.gray,
    padding: 10,
  },
  textHeader: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    borderWidth: 1,
    borderColor: color.gray,
    width: "20%",
    height: 70,
    fontSize: 50,
    textAlign: "center",
  },
  confirmCancel: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  btn: {
    borderWidth: 2,
    color: color.mainColor,
    borderColor: color.mainColor,
    width: "42%",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 10,
    backgroundColor: color.lightBlue,
  },
  btnActive: {
    backgroundColor: color.mainColor,
  },
  textActive: {
    color: "white",
  },
});
