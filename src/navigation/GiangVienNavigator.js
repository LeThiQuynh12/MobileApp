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
import React, { useContext, useEffect, useState } from "react";

// // Import các màn hình
// import HomeScreen from "../../src/screens/HomeScreen";
import XemTienDo from "../../src/screens/XemTienDo";
import ThongTinCaNhan from "../../src/screens/ThongTinCaNhan";
import DangNhap from "../screens/DangNhap";
import ChiTietDeTai from "../module/topic/ChiTietDeTai";
import TrangChuGV from "../../src/screens/(GV)/TrangChu";
import ThongBao from "../../src/screens/ThongBao";
import color from "../../src/utils/color";
import { AntDesign, Fontisto } from "@expo/vector-icons";
import BackButton from "../components/BackButton";
import HeaderLeft from "../components/HeaderLeft";
import DanhSachDeTai from "../module/topic/DanhSachDeTai";
import DangKyDeTai from "../module/topic/DangKyDeTai";
import HeaderPlusIcon from "../components/HeaderRightPlus";
import ChiTietNhiemVu from "../module/task/ChiTietNhiemVu";
import DanhSachNhiemVu from "../module/task/DanhSachNhiemVu";
import GiaoNhiemVu from "../module/task/GiaoNhiemVu";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";

// Tạo các navigator
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// 🏠 Stack Navigator cho tab Home
function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation, route }) => ({
        headerStyle: {
          height: 110,
        },
        headerTitle: route.name === "ThongBao" ? "Thông báo" : "",
        headerLeft: () =>
          route.name === "ThongBao" ? (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              //   style={{ marginLeft: 20 }}
            >
              {/* <AntDesign name="arrowleft" size={24} color={color.darkBlue} /> */}
              <BackButton></BackButton>
            </TouchableOpacity>
          ) : (
            <HeaderLeft title="Trang chủ" navigation={navigation} />
          ),
        headerRight: () =>
          route.name === "TrangChuGV" ? (
            <TouchableOpacity onPress={() => navigation.navigate("ThongBao")}>
              <Fontisto
                name="bell"
                size={23}
                color={color.darkBlue}
                style={{ marginRight: 25 }}
              />
            </TouchableOpacity>
          ) : null,
      })}
    >
      <Stack.Screen name="TrangChuGV" component={TrangChuGV} />
      <Stack.Screen
        name="ThongBao"
        component={ThongBao}
        options={{
          headerTitle: "Thông báo", // Thêm lại tiêu đề\
          headerStyle: {
            backgroundColor: color.mainColor, // Màu xanh cho header
          },
          headerTitleStyle: {
            fontSize: 18,
          },
          headerTintColor: color.white, // Màu chữ trắng để dễ đọc
          headerLeft: () => <BackButton />, // Thay menu bằng nút quay lại
        }}
      />
    </Stack.Navigator>
  );
}

// 📊 Stack Navigator cho tab Xem Tiến Độ
function TienDoStack() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          height: 110,
        },
        headerTitle: "", // Ẩn tiêu đề mặc định
        headerLeft: () => (
          <HeaderLeft title="Tiến độ" navigation={navigation}></HeaderLeft>
        ),
      })}
    >
      <Stack.Screen
        name="TienDoMain"
        component={XemTienDo}
        options={{ title: "Xem tiến độ" }}
      />
    </Stack.Navigator>
  );
}

// 📑 Stack Navigator cho tab Duyệt Đề Tài
function DanhSachDeTaiStack() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation, route }) => ({
        headerStyle: {
          height: 110,
        },
        // eaderTitle: "",
        headerTitle: "", // Ẩn tiêu đề mặc định
        headerLeft: () => (
          <HeaderLeft
            title="Danh sách đề tài"
            navigation={navigation}
          ></HeaderLeft>
        ),
        // Chỉ hiển thị HeaderPlusIcon ở màn hình "DanhSachDeTai"
        headerRight: () =>
          route.name === "DanhSachDeTai" ? (
            <HeaderPlusIcon navigation={navigation} />
          ) : null,
      })}
    >
      {/* DanhSachDeTai */}
      <Stack.Screen name="DanhSachDeTai" component={DanhSachDeTai} />
      <Stack.Screen
        name="ChiTietDeTai"
        component={ChiTietDeTai}
        // screenOptions={{ headerShown: false }}
        options={{
          headerTitle: "Chi tiết đề tài", // Thêm lại tiêu đề\
          headerStyle: {
            backgroundColor: color.mainColor, // Màu xanh cho header
          },
          headerTitleStyle: {
            fontSize: 18,
          },
          headerTintColor: color.white, // Màu chữ trắng để dễ đọc
          headerLeft: () => <BackButton />, // Thay menu bằng nút quay lại
        }}
      />
      <Stack.Screen
        name="DanhSachNhiemVu"
        component={DanhSachNhiemVu}
        options={{
          headerTitle: "Danh sách nhiệm vụ", // Thêm lại tiêu đề\
          headerStyle: {
            backgroundColor: color.mainColor, // Màu xanh cho header
          },
          headerTitleStyle: {
            fontSize: 18,
          },
          headerTintColor: color.white, // Màu chữ trắng để dễ đọc
          headerLeft: () => <BackButton />, // Thay menu bằng nút quay lại
        }}
      />
      {/* Giao nhiệm vụ */}
      <Stack.Screen
        name="GiaoNhiemVu"
        component={GiaoNhiemVu}
        options={{
          headerTitle: "Giao nhiệm vụ", // Thêm lại tiêu đề\
          headerStyle: {
            backgroundColor: color.mainColor, // Màu xanh cho header
          },
          headerTitleStyle: {
            fontSize: 18,
          },
          headerTintColor: color.white, // Màu chữ trắng để dễ đọc
          headerLeft: () => <BackButton />, // Thay menu bằng nút quay lại
        }}
      />
      {/* Chi Tiết nhiệm vụ */}
      <Stack.Screen
        name="ChiTietNhiemVu"
        component={ChiTietNhiemVu}
        options={{
          headerTitle: "Chi tiết nhiệm vụ", // Thêm lại tiêu đề\
          headerStyle: {
            backgroundColor: color.mainColor, // Màu xanh cho header
          },
          headerTitleStyle: {
            fontSize: 18,
          },
          headerTintColor: color.white, // Màu chữ trắng để dễ đọc
          headerLeft: () => <BackButton />, // Thay menu bằng nút quay lại
        }}
      />
      <Stack.Screen
        name="DangKyDeTai"
        component={DangKyDeTai}
        options={{
          headerTitle: "Đăng ký đề tài", // Thêm lại tiêu đề\
          headerStyle: {
            backgroundColor: color.mainColor, // Màu xanh cho header
          },
          headerTitleStyle: {
            fontSize: 18,
          },
          headerTintColor: color.white, // Màu chữ trắng để dễ đọc
          headerLeft: () => <BackButton />, // Thay menu bằng nút quay lại
          headerRight: "",
        }}
      />
    </Stack.Navigator>
  );
}

// 👤 Stack Navigator cho tab Thông Tin Cá Nhân
function ThongTinStack() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          height: 110,
        },
        headerTitle: "", // Ẩn tiêu đề mặc định
        headerLeft: () => (
          <HeaderLeft
            title="Thông tin cá nhân"
            navigation={navigation}
          ></HeaderLeft>
        ),
      })}
    >
      <Stack.Screen
        name="ThongTinMain"
        component={ThongTinCaNhan}
        options={{ title: "Thông tin cá nhân" }}
      />
    </Stack.Navigator>
  );
}

// 🛠 Bottom Tabs
function BottomTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: "Trang chủ",
          tabBarIcon: ({ color }) => (
            <Icon name="home" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="TienDo"
        component={TienDoStack}
        options={{
          tabBarLabel: "Tiến độ",
          tabBarIcon: ({ color }) => (
            <Icon name="line-chart" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="DanhSachDeTaiStack"
        component={DanhSachDeTaiStack}
        options={{
          tabBarLabel: "Danh sách đề tài",
          tabBarIcon: ({ color }) => (
            <Icon name="list-alt" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ThongTinCaNhan"
        component={ThongTinStack}
        options={{
          tabBarLabel: "Cá nhân",
          tabBarIcon: ({ color }) => (
            <Icon name="user" size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// 🛠 Drawer Navigation
function CustomDrawerContent(props) {
  const { user, logout } = useContext(AuthContext);
  console.log(user);
  const { state, navigation } = props;
  const currentRoute =
    state.routes[state.index]?.state?.routes?.[
      state.routes[state.index]?.state?.index
    ]?.name || "Home";

  const navigateToTab = (routeName) => {
    navigation.navigate("GiangVienHome", { screen: routeName });
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.userInfo}>
        <Image
          source={{ uri: "https://i.imgur.com/6VBx3io.png" }}
          style={styles.avatar}
        />
        <Text style={styles.userName}>{user?.fullName || "Lecturer name"}</Text>
        <Text style={styles.userEmail}>{user?.email || "Lecture email"}</Text>
      </View>
      <View style={styles.menuItems}>
        {[
          { label: "Trang chủ", icon: "home", route: "Home" },
          { label: "Xem tiến độ", icon: "line-chart", route: "TienDo" },
          {
            label: "Danh sách đề tài",
            icon: "list-alt",
            route: "DanhSachDeTai",
          },
          { label: "Thông tin cá nhân", icon: "user", route: "ThongTinCaNhan" },
        ].map((item) => {
          const isFocused = currentRoute === item.route;

          return (
            <DrawerItem
              key={item.route}
              label={item.label}
              icon={({ color }) => (
                <Icon
                  name={item.icon}
                  size={20}
                  color={isFocused ? "#fff" : color}
                />
              )}
              onPress={() => navigateToTab(item.route)}
              style={[styles.drawerItem, isFocused && styles.drawerItemActive]}
              labelStyle={{ color: isFocused ? "#fff" : "#000" }}
            />
          );
        })}
      </View>
      <View style={styles.logoutContainer}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={async () => {
            navigation.navigate("DangNhap");
            await logout();
          }}
        >
          <Icon name="sign-out" size={20} color="black" />
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const GiangVienNavigator = ({ setUserRole }) => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false }} // Ẩn toàn bộ tiêu đề
    >
      <Drawer.Screen name="GiangVienHome" component={BottomTabs} />
      {/* <Drawer.Screen name="MainTabsSV" component={BottomTabs} /> */}
      <Drawer.Screen name="DangNhap">
        {(props) => <DangNhap {...props} setUserRole={setUserRole} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

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
  themeSwitch: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
  },
  themeText: { fontSize: 16, fontWeight: "bold", marginHorizontal: 5 },
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
  drawerItem: {
    borderRadius: 5,
    marginVertical: 5,
  },
  drawerItemActive: {
    backgroundColor: color.mainColor, // Màu xanh làm nổi bật
  },
});

export default GiangVienNavigator;
