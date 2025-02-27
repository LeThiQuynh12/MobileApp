import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import TrangChuAdmin from "../screens/(Admin)/TrangChuAdmin";
import QuanLyNguoiDung from "../screens/(Admin)/QuanLyNguoiDung";
import SuaNguoiDung from "../module/user/SuaNguoiDung";
import BackButton from "../components/BackButton";
import color from "../utils/color";
import HeaderLeft from "../components/HeaderLeft";
import HeaderPlusIcon from "../components/HeaderRightPlus";
import ThemNguoiDung from "../module/user/ThemNguoiDung";

// 🏠 Các màn hình quản lý Admin
function AdminHomeScreen() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          height: 110,
        },
        // eaderTitle: "",
        headerTitle: "", // Ẩn tiêu đề mặc định
        headerLeft: () => (
          <HeaderLeft title="Trang chủ" navigation={navigation}></HeaderLeft>
        ),
      })}
    >
      <Stack.Screen
        name="TrangChuAdmin"
        component={TrangChuAdmin}
        options={{
          title: "Trang chủ",
        }}
      />
    </Stack.Navigator>
  );

  // <TrangChuAdmin></TrangChuAdmin>;
}
function UserManagementScreen() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          height: 110,
        },
        // eaderTitle: "",
        headerTitle: "", // Ẩn tiêu đề mặc định
        headerLeft: () => (
          <HeaderLeft
            title="Quản lý người dùng"
            navigation={navigation}
          ></HeaderLeft>
        ),
        headerRight: () => (
          <HeaderPlusIcon navigation={navigation} destination="ThemNguoiDung" />
        ),
      })}
    >
      <Stack.Screen
        name="QuanLyNguoiDung"
        component={QuanLyNguoiDung}
        options={{
          title: "Quản lý Người dùng",
        }}
      />
      <Stack.Screen
        name="SuaNguoiDung"
        component={SuaNguoiDung}
        options={{
          headerShown: false,
          headerTitle: "Sửa người dùng", // Thêm lại tiêu đề\
          headerStyle: {
            backgroundColor: color.mainColor, // Màu xanh cho header
          },
          headerTitleStyle: {
            fontSize: 18,
          },
          headerShown: false,
          headerTintColor: color.white, // Màu chữ trắng để dễ đọc
          headerLeft: () => <BackButton />, // Thay menu bằng nút quay lại
        }}
      />
      <Stack.Screen
        name="ThemNguoiDung"
        component={ThemNguoiDung}
        options={{
          headerShown: false,
          headerTitle: "Thêm người dùng", // Thêm lại tiêu đề\
          headerStyle: {
            backgroundColor: color.mainColor, // Màu xanh cho header
          },
          headerTitleStyle: {
            fontSize: 18,
          },
          headerShown: false,
          headerTintColor: color.white, // Màu chữ trắng để dễ đọc
          headerLeft: () => <BackButton />, // Thay menu bằng nút quay lại
        }}
      />
    </Stack.Navigator>
  );
}
function TopicManagementScreen() {
  return <Text>Quản lý đề tài</Text>;
}
function TaskManagementScreen() {
  return <Text>Quản lý công việc</Text>;
}
function ReviewManagementScreen() {
  return <Text>Quản lý đánh giá</Text>;
}
function DocumentManagementScreen() {
  return <Text>Quản lý tài liệu</Text>;
}
function NotificationScreen() {
  return <Text>Thông báo</Text>;
}

// 🛠 Custom Drawer (thêm chức năng Đăng xuất)
const CustomDrawer = (props) => {
  const { setUserRole, navigation } = props; // Nhận setUserRole từ props

  const handleLogout = () => {
    props.setUserRole(null);
    // onPress: () => {
    //         props.setUserRole(null); // 🏁 Cập nhật userRole -> Quay về màn hình đăng nhập
    //       },
    // Alert.alert(
    //   "Xác nhận",
    //   "Bạn có chắc chắn muốn đăng xuất?",
    //   [
    //     { text: "Hủy", style: "cancel" },
    //     {
    //       text: "Đăng xuất",
    //       onPress: () => {
    //         props.setUserRole(null); // 🏁 Cập nhật userRole -> Quay về màn hình đăng nhập
    //       },
    //     },
    //   ],
    //   { cancelable: true }
    // );
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <TouchableOpacity onPress={handleLogout} style={{ padding: 16 }}>
        <Text style={{ color: "red", fontWeight: "bold" }}>Đăng xuất</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

// 📌 Drawer Navigator
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const AdminNavigator = ({ setUserRole }) => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawer {...props} setUserRole={setUserRole} />
      )}
      screenOptions={{
        headerShown: false,
        drawerStyle: { backgroundColor: "#fff", width: 250 },
        drawerActiveTintColor: "#007bff",
        drawerInactiveTintColor: "#333",
      }}
    >
      <Drawer.Screen
        name="AdminHome"
        component={AdminHomeScreen}
        options={{
          title: "Trang chủ",
          drawerIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="UserManagement"
        component={UserManagementScreen}
        options={{
          headerShown: false,
          title: "Quản lý Người dùng",
          drawerIcon: ({ color, size }) => (
            <Icon name="users" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="TopicManagement"
        component={TopicManagementScreen}
        options={{
          title: "Quản lý Đề tài",
          drawerIcon: ({ color, size }) => (
            <Icon name="file-text" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="TaskManagement"
        component={TaskManagementScreen}
        options={{
          title: "Quản lý Công việc",
          drawerIcon: ({ color, size }) => (
            <Icon name="tasks" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="ReviewManagement"
        component={ReviewManagementScreen}
        options={{
          title: "Quản lý Đánh giá",
          drawerIcon: ({ color, size }) => (
            <Icon name="star" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="DocumentManagement"
        component={DocumentManagementScreen}
        options={{
          title: "Quản lý Tài liệu",
          drawerIcon: ({ color, size }) => (
            <Icon name="folder" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          title: "Thông báo",
          drawerIcon: ({ color, size }) => (
            <Icon name="bell" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default AdminNavigator;
