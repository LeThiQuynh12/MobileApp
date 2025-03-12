import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React, { useState } from "react";

// Import các màn hình
import HomeScreen from "./src/screens/HomeScreen";
import XemTienDo from "./src/screens/XemTienDo";
import DuyetDeTai from "./src/screens/DuyetDeTai";
import ThongTinCaNhan from "./src/screens/ThongTinCaNhan";
import DangNhap from "./src/screens/DangNhap";
// import ChiTietDeTai from "./src/screens/topic/ChiTietDeTai";
import TrangChuGV from "./src/screens/(GV)/TrangChu";
import ThongBao from "./src/screens/ThongBao";
import color from "./src/utils/color";
import { AntDesign, Fontisto } from "@expo/vector-icons";
import HeaderLeft from "./src/components/HeaderLeft";
import GiangVienNavigator from "./src/navigation/GiangVienNavigator";
import SinhVienNavigator from "./src/navigation/SinhVienNavigator";
import AdminNavigator from "./src/navigation/AdminNavigator";
import QuenMatKhau from "./src/screens/QuenMatKhau";
import HeaderPlusIcon from "./src/components/HeaderRightPlus";
import BackButton from "./src/components/BackButton";
import XacMinhMatKhau from "./src/screens/XacMinhMatKhau";
import { AuthProvider } from "./src/context/AuthContext";

// Tạo các navigator
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// 🚀 App chính
export default function App() {
  const [userRole, setUserRole] = useState(null);
  let screenComponent;

  if (userRole === null) {
    screenComponent = (
      <Stack.Screen name="DangNhap">
        {(props) => <DangNhap {...props} setUserRole={setUserRole} />}
      </Stack.Screen>
    );
  } else if (userRole === "giangvien") {
    screenComponent = (
      <Stack.Screen name="GiangVien">
        {(props) => <GiangVienNavigator {...props} setUserRole={setUserRole} />}
      </Stack.Screen>
    );
  } else if (userRole === "sinhvien") {
    screenComponent = (
      <Stack.Screen name="SinhVien">
        {(props) => <SinhVienNavigator {...props} setUserRole={setUserRole} />}
      </Stack.Screen>
    );
  } else if (userRole === "admin") {
    screenComponent = (
      <Stack.Screen name="Admin">
        {(props) => <AdminNavigator {...props} setUserRole={setUserRole} />}
      </Stack.Screen>
    );
  } else {
    screenComponent = (
      <Stack.Screen name="DangNhap">
        {(props) => <DangNhap {...props} setUserRole={setUserRole} />}
      </Stack.Screen>
    );
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {screenComponent}
            <Stack.Screen
              name="QuenMatKhau"
              component={QuenMatKhau}
              options={({ navigation }) => ({
                headerShown: true,
                headerStyle: { height: 90 },
                headerTintColor: color.darkBlue,
                headerTitle: "Quên mật khẩu",
                headerTitleStyle: {
                  fontSize: 18,
                },

                headerLeft: () => (
                  <BackButton buttonColor={color.darkBlue}></BackButton>
                ),
              })}
            />
            <Stack.Screen
              name="XacMinhMatKhau"
              component={XacMinhMatKhau}
              options={({ navigation }) => ({
                headerShown: true,
                headerStyle: { height: 90 },
                headerTintColor: color.darkBlue,
                headerTitle: "Xác minh mật khẩu",
                headerTitleStyle: {
                  fontSize: 18,
                },

                headerLeft: () => (
                  <BackButton buttonColor={color.darkBlue}></BackButton>
                ),
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
