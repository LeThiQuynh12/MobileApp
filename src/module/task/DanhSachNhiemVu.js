import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import color from "../../utils/color";
import { Ionicons } from "@expo/vector-icons";
import api from "../../utils/api";

export default function DanhSachNhiemVu({ route }) {
  const navigation = useNavigation();
  const [selectedStatus, setSelectedStatus] = useState("To do");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const topicId = route?.params?.topicId;

  const fetchTask = async () => {
    try {
      setLoading(true);
      console.log(topicId);
      const response = await api.get(`/tasks/topic/${topicId}`);
      setTasks(response.data.results || []);
    } catch (err) {
      console.error("Lỗi khi lấy dữ liệu:", err);
      setError("Không thể tải thông tin nhiệm vụ, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  const handleStatusChange = (status) => setSelectedStatus(status);
  const handleAddTask = () => navigation.navigate("GiaoNhiemVu", { topicId });
  const handleTaskDetail = (selectedTask) =>
    navigation.navigate("ChiTietNhiemVu", { task: selectedTask });

  const filteredTasks = tasks.filter(
    (task) => task.trangThai === selectedStatus
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#aaa"
          style={styles.searchIcon}
        />
        <TextInput placeholder="Tìm kiếm nhiệm vụ" style={styles.searchInput} />
      </View>

      <View style={styles.bodyContainer}>
        <View style={styles.statusContainer}>
          {["To do", "In progress", "Done"].map((status) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.btnStatus,
                selectedStatus === status && styles.btnActive,
              ]}
              onPress={() => handleStatusChange(status)}
            >
              <Text
                style={{
                  color:
                    selectedStatus === status ? color.white : color.darkBlue,
                  fontWeight: "bold",
                }}
              >
                {status}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView>
          <View style={styles.taskListContainer}>
            {loading ? (
              <ActivityIndicator size="large" color={color.mainColor} />
            ) : error ? (
              <Text style={{ textAlign: "center", marginTop: 20, color: "red" }}>
                {error}
              </Text>
            ) : filteredTasks.length > 0 ? (
              filteredTasks.map((task, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.taskContent}
                  onPress={() => handleTaskDetail(task)}
                >
                  <View style={{ paddingVertical: 10, paddingHorizontal: 15 }}>
                    <Text style={styles.txtHeaderTaskContent}>
                      {task.tenCongViec}
                    </Text>
                    <Text style={{ fontSize: 15 }}>{task.moTa}</Text>
                    <View style={styles.members}>
                      {task.students.map((student, idx) => (
                        <View
                          key={idx}
                          style={{
                            backgroundColor: "#ddd",
                            paddingHorizontal: 8,
                            paddingVertical: 4,
                            borderRadius: 10,
                            marginRight: 5,
                            marginTop: 5,
                          }}
                        >
                          <Text style={{ fontSize: 12 }}>{student.name}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={{ textAlign: "center", marginTop: 20 }}>
                Không có nhiệm vụ nào
              </Text>
            )}
          </View>
        </ScrollView>

        <TouchableOpacity onPress={handleAddTask} style={styles.addNewTask}>
          <Icon name="plus" size={30} color={color.mainColor} solid={false} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: color.mainColor },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 10,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchIcon: { marginRight: 5 },
  searchInput: { flex: 1, height: 40 },
  bodyContainer: { flex: 1, backgroundColor: color.gray },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: color.white,
    padding: 10,
  },
  btnStatus: {
    backgroundColor: color.lightBlue,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
  },
  btnActive: { backgroundColor: color.mainColor },
  taskListContainer: { flex: 1, alignItems: "center" },
  taskContent: {
    width: "90%",
    backgroundColor: color.white,
    marginTop: 20,
    borderRadius: 20,
  },
  txtHeaderTaskContent: { fontWeight: "bold", fontSize: 15, marginBottom: 10 },
  members: { flexDirection: "row", flexWrap: "wrap", marginTop: 10 },
  addNewTask: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: color.bgPlus,
    borderRadius: 100,
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
  },
});
