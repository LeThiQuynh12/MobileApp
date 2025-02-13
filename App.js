import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome"; // Import Icon

// Import các màn hình
import HomeScreen from "./src/screens/HomeScreen";
import XemTienDo from "./src/screens/XemTienDo";
import DuyetDeTai from "./src/screens/DuyetDeTai";
import ThongTinCaNhan from "./src/screens/ThongTinCaNhan";
import DangNhap from "./src/screens/DangNhap";

const Drawer = createDrawerNavigator();

// 🛠 Tạo menu Drawer với icon
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      {/* Phần thông tin người dùng */}
      <View style={styles.userInfo}>
        <Image
          source={{ uri: "https://i.imgur.com/6VBx3io.png" }}
          style={styles.avatar}
        />
        <Text style={styles.userName}>Trần Trung</Text>
        <Text style={styles.userEmail}>trungt@gmail.com</Text>
      </View>

      {/* Các mục menu */}
      <View style={styles.menuItems}>
        <DrawerItem
          label="Trang chủ"
          icon={({ color }) => <Icon name="home" size={20} color={color} />}
          onPress={() => props.navigation.navigate("Home")}
        />
        <DrawerItem
          label="Xem tiến độ"
          icon={({ color }) => (
            <Icon name="line-chart" size={20} color={color} />
          )}
          onPress={() => props.navigation.navigate("XemTienDo")}
        />
        <DrawerItem
          label="Duyệt đề tài"
          icon={({ color }) => (
            <Icon name="hand-paper-o" size={20} color={color} />
          )}
          onPress={() => props.navigation.navigate("DuyetDeTai")}
        />
        <DrawerItem
          label="Thông tin cá nhân"
          icon={({ color }) => <Icon name="user" size={20} color={color} />}
          onPress={() => props.navigation.navigate("ThongTinCaNhan")}
        />
      </View>

      {/* Nút đăng xuất */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => props.navigation.navigate("DangNhap")}
        >
          <Icon name="sign-out" size={20} color="black" />
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["right", "left"]}>
        <NavigationContainer>
          <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
          >
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="XemTienDo" component={XemTienDo} />
            <Drawer.Screen name="DuyetDeTai" component={DuyetDeTai} />
            <Drawer.Screen name="ThongTinCaNhan" component={ThongTinCaNhan} />
            <Drawer.Screen
              name="DangNhap"
              component={DangNhap}
              options={{ headerShown: false }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  userInfo: {
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  userEmail: {
    fontSize: 14,
    color: "#666",
  },
  menuItems: {
    marginTop: 10,
  },
  logoutContainer: {
    marginTop: "auto",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoutText: {
    fontSize: 16,
    marginLeft: 10,
  },
});
