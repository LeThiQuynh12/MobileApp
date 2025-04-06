import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import React, { useContext, useState } from "react";

import DangNhap from "./src/screens/DangNhap";
import color from "./src/utils/color";
import GiangVienNavigator from "./src/navigation/GiangVienNavigator";
import SinhVienNavigator from "./src/navigation/SinhVienNavigator";
import AdminNavigator from "./src/navigation/AdminNavigator";
import QuenMatKhau from "./src/screens/QuenMatKhau";
import HeaderPlusIcon from "./src/components/HeaderRightPlus";
import BackButton from "./src/components/BackButton";
import XacMinhMatKhau from "./src/screens/XacMinhMatKhau";
import { AuthContext, AuthProvider } from "./src/context/AuthContext";
import { navigationRef } from "./src/utils/NavigationService";

// Tạo các navigator
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// 🚀 App chính
export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="DangNhap" component={DangNhap} />
            <Stack.Screen name="GiangVien" component={GiangVienNavigator} />
            <Stack.Screen name="SinhVien" component={SinhVienNavigator} />
            <Stack.Screen name="Admin" component={AdminNavigator} />
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
        {/* <NavigationContainer>
          {user ? (
            // 👉 Khi đã login, render theo loại user
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {user.role === "LECTURER" && (
                <Stack.Screen name="GiangVien" component={GiangVienNavigator} />
              )}
              {user.role === "STUDENT" && (
                <Stack.Screen name="SinhVien" component={SinhVienNavigator} />
              )}
              {user.role === "ADMIN" && (
                <Stack.Screen name="Admin" component={AdminNavigator} />
              )}
            </Stack.Navigator>
          ) : (
            // 👉 Khi chưa login, render login + quên mật khẩu
            <Stack.Navigator>
              <Stack.Screen
                name="DangNhap"
                component={DangNhap}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="QuenMatKhau"
                component={QuenMatKhau}
                options={{
                  headerShown: true,
                  headerStyle: { height: 90 },
                  headerTintColor: color.darkBlue,
                  headerTitle: "Quên mật khẩu",
                  headerTitleStyle: { fontSize: 18 },
                  headerLeft: () => <BackButton buttonColor={color.darkBlue} />,
                }}
              />
              <Stack.Screen
                name="XacMinhMatKhau"
                component={XacMinhMatKhau}
                options={{
                  headerShown: true,
                  headerStyle: { height: 90 },
                  headerTintColor: color.darkBlue,
                  headerTitle: "Xác minh mật khẩu",
                  headerTitleStyle: { fontSize: 18 },
                  headerLeft: () => <BackButton buttonColor={color.darkBlue} />,
                }}
              />
            </Stack.Navigator>
          )}
        </NavigationContainer> */}
      </AuthProvider>
    </SafeAreaProvider>
  );
}
