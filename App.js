import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React, { useState } from 'react'

// Import các màn hình
import HomeScreen from "./src/screens/HomeScreen";
import XemTienDo from "./src/screens/XemTienDo";
import DuyetDeTai from "./src/screens/DuyetDeTai";
import ThongTinCaNhan from "./src/screens/ThongTinCaNhan";
import DangNhap from "./src/screens/DangNhap";
import TopicDetail from "./src/screens/topic/TopicDetail";
import color from "./src/utils/color";
import { AntDesign, Fontisto } from "@expo/vector-icons";

// Tạo các navigator
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Header của các Stack
function HeaderLeft({ title, navigation }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <TouchableOpacity
        onPress={() => navigation.openDrawer()}
        style={{ marginLeft: 20, marginRight: 20 }}
      >
        <FontAwesome6 name="bars-staggered" size={21} color={color.darkBlue} />
      </TouchableOpacity>
      <Text style={{ fontSize: 18, fontWeight: '400', fontWeight: '500' }}>{title}</Text>
    </View>
  )
}

// Nút quay lại tùy chỉnh
function BackButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 20, marginRight: 12 }}>
      <AntDesign name="back" size={21} color={color.white} />
    </TouchableOpacity>
  );
}

// 🏠 Stack Navigator cho tab Home
function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          height: 110,
        },
        headerTitle: "", // Ẩn tiêu đề mặc định
        headerLeft: () => (
          <HeaderLeft title="Trang chủ" navigation={navigation}></HeaderLeft>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={() => alert("Nhấn vào icon!")}>
            <Fontisto name="bell" size={23} color={color.darkBlue} style={{ marginRight: 25 }} />
            {/* <Icon name="bell-o" size={22} color="black" style={{ marginRight: 25 }} /> */}
          </TouchableOpacity>
        ),
      })}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: "Trang chủ" }} />
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
      <Stack.Screen name="TienDoMain" component={XemTienDo} options={{ title: "Xem tiến độ" }} />
    </Stack.Navigator>
  );
}

// 📑 Stack Navigator cho tab Duyệt Đề Tài
function DuyetDeTaiStack() {
  return (
    <Stack.Navigator screenOptions={({ navigation }) => ({
      headerStyle: {
        height: 110,
      },
      // headerTitle: "", // Ẩn tiêu đề mặc định
      headerLeft: () => (
        <HeaderLeft title="Danh sách để tài" navigation={navigation}></HeaderLeft>
      ),
    })}>
      <Stack.Screen
        name="DuyetMain"
        component={DuyetDeTai}

      />
      <Stack.Screen
        name="TopicDetail"
        component={TopicDetail}
        options={{
          headerTitle: "Chi tiết đề tài", // Thêm lại tiêu đề\
          headerStyle: {
            backgroundColor: color.mainColor, // Màu xanh cho header
          },
          headerTintColor: color.white, // Màu chữ trắng để dễ đọc
          headerLeft: () => <BackButton />, // Thay menu bằng nút quay lại
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
          <HeaderLeft title="Thông tin cá nhân" navigation={navigation}></HeaderLeft>
        ),
      })}
    >
      <Stack.Screen name="ThongTinMain" component={ThongTinCaNhan} options={{ title: "Thông tin cá nhân" }} />
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
          tabBarIcon: ({ color }) => <Icon name="home" size={20} color={color} />,
        }}
      />
      <Tab.Screen
        name="TienDo"
        component={TienDoStack}
        options={{
          tabBarLabel: "Tiến độ",
          tabBarIcon: ({ color }) => <Icon name="line-chart" size={20} color={color} />,
        }}
      />
      <Tab.Screen
        name="DuyetDeTai"
        component={DuyetDeTaiStack}
        options={{
          tabBarLabel: "Duyệt đề tài",
          tabBarIcon: ({ color }) => <Icon name="hand-paper-o" size={20} color={color} />,
        }}
      />
      <Tab.Screen
        name="ThongTinCaNhan"
        component={ThongTinStack}
        options={{
          tabBarLabel: "Cá nhân",
          tabBarIcon: ({ color }) => <Icon name="user" size={20} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

// 🛠 Drawer Navigation
function CustomDrawerContent(props) {
  const { state, navigation } = props;
  const currentRoute = state.routes[state.index]?.state?.routes?.[state.routes[state.index]?.state?.index]?.name || "Home";

  const navigateToTab = (routeName) => {
    navigation.navigate("MainTabs", { screen: routeName });
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.userInfo}>
        <Image source={{ uri: "https://i.imgur.com/6VBx3io.png" }} style={styles.avatar} />
        <Text style={styles.userName}>Trần Trung</Text>
        <Text style={styles.userEmail}>trungt@gmail.com</Text>
      </View>

      <View style={styles.menuItems}>
        {[
          { label: "Trang chủ", icon: "home", route: "Home" },
          { label: "Xem tiến độ", icon: "line-chart", route: "TienDo" },
          { label: "Duyệt đề tài", icon: "hand-paper-o", route: "DuyetDeTai" },
          { label: "Thông tin cá nhân", icon: "user", route: "ThongTinCaNhan" },
        ].map((item) => {
          const isFocused = currentRoute === item.route;

          return (
            <DrawerItem
              key={item.route}
              label={item.label}
              icon={({ color }) => <Icon name={item.icon} size={20} color={isFocused ? "#fff" : color} />}
              onPress={() => navigateToTab(item.route)}
              style={[styles.drawerItem, isFocused && styles.drawerItemActive]}
              labelStyle={{ color: isFocused ? "#fff" : "#000" }}
            />
          );
        })}
      </View>


      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate("DangNhap")}>
          <Icon name="sign-out" size={20} color="black" />
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}



// 🚀 App chính
export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["right", "left"]}>
        <NavigationContainer>
          <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{ headerShown: false }} // Ẩn toàn bộ tiêu đề
          >
            <Drawer.Screen name="MainTabs" component={BottomTabs} />
            <Drawer.Screen name="DangNhap" component={DangNhap} />
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
