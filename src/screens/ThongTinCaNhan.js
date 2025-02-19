import { StyleSheet, Button, Text, View, ScrollView, Image, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import color from "../utils/color";
// import avatarImage from "../data/imgs/defaultAvatar.png"

const data={
  avatarHref: "",
  name: "Khúc Xuân Triển",
  email: "triendeptrai@gmail.com",
  status: "Đang học",
  gender: 1,
  profileCode: "",
  schoolYear: 2022,
  agent: 1,
  trainingType: "Chính quy",
  department: "Công nghệ thông tin",
  major:"Công nghệ phần mềm",
  class: "D17CNPM6"
}

const ThongTinCaNhan = () => {
  const navigation = useNavigation();
  const handleBackHome = () => {
    navigation.navigate("Home");
  };
  return (
    <ScrollView style={styles.container}>
      {/* <Text>Thong tin cá nhân</Text> */}
      <View style={styles.generalInfomation}>
        <View style={{backgroundColor: "violet", borderRadius: 100, padding: 40, marginBottom: 8}}></View>
        <Text style={styles.generalName}>{data.name}</Text>
        <Text style={styles.generalEmail}>{data.email}</Text>
        {/* <Image source={avatarImage}></Image> */}
      </View>
      <View style={styles.fixedInfomation}>
        <Text style={styles.textitem}><Text style={styles.textTitle}>Trạng thái:</Text> {data.status}</Text>
        <Text style={styles.textitem}><Text style={styles.textTitle}>Giới tính:</Text> {data.gender}</Text>
        <Text style={styles.textitem}><Text style={styles.textTitle}>Mã hồ sơ:</Text> {data.profileCode}</Text>
        <Text style={styles.textitem}><Text style={styles.textTitle}>Khóa:</Text> {data.schoolYear}</Text>
        <Text style={styles.textitem}><Text style={styles.textTitle}>Cơ sở:</Text> {data.agent}</Text>
        <Text style={styles.textitem}><Text style={styles.textTitle}>Loại hình đào tạo:</Text> {data.trainingType}</Text>
        <Text style={styles.textitem}><Text style={styles.textTitle}>Ngành:</Text> {data.department}</Text>
        <Text style={styles.textitem}><Text style={styles.textTitle}>Chuyên ngành:</Text> {data.major}</Text>
        <Text style={styles.textitem}><Text style={styles.textTitle}>Lớp:</Text> {data.class}</Text>
        
      </View>
      <View style={styles.inputContainer}>

      {/* Tiêu đề */}
      <Text style={styles.title}>THÔNG TIN QUAN HỆ GIA ĐÌNH</Text>

      {/* Email */}
      <Text style={styles.label}>Email</Text>
      <TextInput value={data.email} style={styles.input} placeholder="Nhập email" />

      {/* Số điện thoại */}
      <Text style={styles.label}>Số điện thoại</Text>
      <TextInput style={styles.input} placeholder="Nhập số điện thoại" keyboardType="numeric" />

      {/* Tiêu đề */}
      <Text style={[styles.title, {marginTop: 30}]}>THÔNG TIN QUAN HỆ GIA ĐÌNH</Text>

      {/* Họ và tên cha */}
      <Text style={styles.label}>Họ và tên cha</Text>
      <TextInput style={styles.input} placeholder="Nhập họ và tên cha" />

      {/* Nghề nghiệp cha */}
      <Text style={styles.label}>Nghề nghiệp cha</Text>
      <TextInput style={styles.input} placeholder="Nhập nghề nghiệp cha" />

      {/* Họ và tên mẹ */}
      <Text style={styles.label}>Họ và tên mẹ</Text>
      <TextInput style={styles.input} placeholder="Nhập họ và tên mẹ" />

      {/* Nghề nghiệp mẹ */}
      <Text style={styles.label}>Nghề nghiệp mẹ</Text>
      <TextInput style={styles.input} placeholder="Nhập nghề nghiệp mẹ" />
    </View>
    <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Thay đổi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={[styles.buttonText]}>Lưu</Text>
        </TouchableOpacity>
    </View>  
      {/* <Button title="Trang chủ" onPress={handleBackHome} /> */}
    </ScrollView>
  );
};

export default ThongTinCaNhan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  generalInfomation: {
    marginTop: 30,
    alignItems: 'center',
    marginBottom: 36,
  },
  generalName: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  generalEmail: {
    fontSize: 15,
    color: "#7D7F88"
  },
  fixedInfomation: {
    marginBottom: 30
  },
  textitem: {
    fontSize: 15,
    marginHorizontal: 8,
    lineHeight: 28
    },
  textTitle: {
    fontWeight: '700'
  },
  inputContainer: {
    padding: 20,
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "white",
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
  },
  buttonWrapper: {
    flexDirection: 'row',
    gap: 20,
    paddingHorizontal: 20,
    marginBottom: 100
  },
  buttonContainer: {
    opacity: 0.8,
    backgroundColor: color.darkBlue,
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 20,
    flex: 1
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    flex: 1
  },
});
