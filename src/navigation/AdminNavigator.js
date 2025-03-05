import React from 'react';

import {
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Ionicons } from '@expo/vector-icons';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import BackButton from '../components/BackButton';
import HeaderLeft from '../components/HeaderLeft';
import HeaderPlusIcon from '../components/HeaderRightPlus';
import GiaoNhiemVu from '../module/task/GiaoNhiemVu';
import ChiTietDeTai from '../module/topic/ChiTietDeTai';
import SuaNguoiDung from '../module/user/SuaNguoiDung';
import ThemDeTai from '../module/user/ThemDeTai';
import ThemNguoiDung from '../module/user/ThemNguoiDung';
import QuanLyCongViec from '../screens/(Admin)/QuanLyCongViec';
import QuanLyDeTai from '../screens/(Admin)/QuanLyDeTai';
import QuanLyNguoiDung from '../screens/(Admin)/QuanLyNguoiDung';
import SuaCongViec from '../screens/(Admin)/SuaCongViec';
import SuaDeTai from '../screens/(Admin)/SuaDeTai';
import TrangChuAdmin from '../screens/(Admin)/TrangChuAdmin';
import color from '../utils/color';

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
            title="Quản lý đề tài"
            navigation={navigation}
          ></HeaderLeft>
        ),
        headerRight: () => (
          <HeaderPlusIcon navigation={navigation} destination="ThemDeTai" />
        ),
      })}
    >
      <Stack.Screen
        name="QuanLyDeTai"
        component={QuanLyDeTai}
        options={{
          title: "Quản lý đề tài",
        }}
      />
      <Stack.Screen name="ThemDeTai"
      component={ThemDeTai}
      options={{
        headerShown: false,
      }}/>
        <Stack.Screen
  name="ChiTietDeTai"
  component={ChiTietDeTai}
  options={{
    headerTitle: "Chi tiết Đề tài",
    headerStyle: {
      backgroundColor: color.mainColor, // Màu xanh cho header
    },
    headerTitleStyle: {
      fontSize: 18,
      color: color.white,
    },
    headerTintColor: color.white, // Màu chữ trắng để dễ đọc
    headerLeft: () => <BackButton />, // Thêm nút quay lại
  }}
/>
<Stack.Screen
  name="SuaDeTai"
  component={SuaDeTai}
  options={{
headerShown: false,
  }}
/>

    </Stack.Navigator>
  );
}

function TaskManagementScreen() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          height: 110,
        },
        headerTitle: "",
        headerLeft: () => (
          <HeaderLeft title="Quản lý công việc" navigation={navigation} />
        ),
        // headerRight: () => (
        //   <HeaderPlusIcon navigation={navigation} destination="GiaoNhiemVu" />
        // ),
      })}
    >
      {/* Màn hình danh sách công việc */}
      <Stack.Screen
  name="QuanLyCongViec"
  component={QuanLyCongViec}
  options={({ navigation }) => ({
    headerRight: () => (
      <HeaderPlusIcon navigation={navigation} destination="GiaoNhiemVu" />
    ),
  })}
/>

     <Stack.Screen
  name="GiaoNhiemVu"
  component={GiaoNhiemVu}
  options={({ navigation }) => ({
    headerTitle: "Giao Nhiệm Vụ",
    headerStyle: {
      backgroundColor: color.mainColor, // Màu nền cho header
    },
    headerTitleStyle: {
      fontSize: 18,
      color: color.white, // Màu chữ trắng
    },
    headerTintColor: color.white, // Màu của nút back
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ paddingLeft: 15 }}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
    ),
  })}
/>
<Stack.Screen
  name="SuaCongViec"
  component={SuaCongViec}
  options={({ navigation }) => ({
    headerTitle: "Sửa công việc",
    headerStyle: {
      backgroundColor: color.mainColor, // Màu nền cho header
    },
    headerTitleStyle: {
      fontSize: 18,
      color: color.white, // Màu chữ trắng
    },
    headerTintColor: color.white, // Màu của nút back
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ paddingLeft: 15 }}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
    ),
  })}
/>
     
    </Stack.Navigator>
  );
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
          headerShown: false,
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
          headerShown: false,
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
