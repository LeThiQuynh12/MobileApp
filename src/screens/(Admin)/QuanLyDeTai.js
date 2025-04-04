import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import api from "../../utils/api";

const TopicCard = ({ topic, onDeleteSuccess }) => {
  const navigation = useNavigation();

  const formatHocVi = (hocVi) => {
    if (hocVi === "Tiến sĩ") return "TS.";
    if (hocVi === "Thạc sĩ") return "ThS.";
    if (hocVi === "Phó giáo sư, Tiến sĩ") return "PGS.TS.";
    return hocVi;
  };

  const handleDeleteTopic = async (topicId) => {
    Alert.alert(
      "Xác nhận xóa",
      `Bạn có chắc muốn xóa đề tài "${topic.tenDeTai}"?`,
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Xóa",
          onPress: async () => {
            try {
              // Sử dụng topicId để gọi API xóa đề tài
              await api.delete(`/topics/${topicId}`);

              Alert.alert("Thành công", "Đã xóa đề tài thành công");
              onDeleteSuccess();
            } catch (error) {
              Alert.alert(
                "Lỗi",
                "Không thể xóa đề tài: " + (error?.message || "Có lỗi xảy ra")
              );
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          borderLeftColor:
            topic.tinhTrang === "Đã duyệt" ? "#4CAF50" : "#E53935",
        },
      ]}
      activeOpacity={0.9}
      onPress={() => navigation.navigate("ChiTietDeTai", { topic })}
    >
      <View style={styles.cardHeader}>
        <Ionicons name="book-outline" size={24} color="#64B5F6" />
        <Text style={styles.cardTitle}>{topic.tenDeTai}</Text>
      </View>

      <View style={styles.cardRow}>
        <Ionicons name="person-outline" size={18} color="#555" />
        <Text style={styles.cardInfo}>
          Người hướng dẫn: {formatHocVi(topic.lecturer.academicTitle)}
          {topic.lecturer.user.fullName}
        </Text>
      </View>

      <View style={styles.cardRow}>
        <Ionicons name="people-outline" size={18} color="#555" />
        <Text style={styles.cardInfo}>
          Chủ nhiệm: {topic.group.leader.user.fullName}
        </Text>
      </View>

      <View style={styles.cardRow}>
        <Ionicons name="school-outline" size={18} color="#555" />
        <Text style={styles.cardInfo}>Khoa: {topic.khoa}</Text>
      </View>

      <View style={styles.statusContainer}>
        {topic.tinhTrang === "Đã duyệt" ? (
          <Ionicons name="checkmark-circle" size={22} color="#4CAF50" />
        ) : (
          <Ionicons name="close-circle" size={22} color="#E53935" />
        )}
        <Text style={styles.statusText}>{topic.tinhTrang}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate("SuaDeTai", { topic })}
        >
          <Ionicons name="pencil" size={30} color="#66BB6A" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => handleDeleteTopic(topic.id)} // Truyền ID của đề tài vào
        >
          <Ionicons name="trash" size={30} color="#FF6B60" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const QuanLyDeTai = () => {
  const [searchText, setSearchText] = useState("");
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get("/topics");
        setTopics(response.data.results);
        //console.log("de tai:", response.data.results);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Không thể tải dữ liệu. Vui lòng thử lại!");
        setTopics([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const loadTopics = async () => {
    try {
      const response = await api.get("/topics");
      setTopics(response.data.results);
    } catch (error) {
      Alert.alert("Lỗi", "Không thể tải lại danh sách đề tài");
    }
  };

  const filteredTopics = topics.filter(
    (topic) =>
      topic.tenDeTai.toLowerCase().includes(searchText.toLowerCase()) ||
      topic.khoa.toLowerCase().includes(searchText.toLowerCase()) ||
      topic.linhVucNghienCuu.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon
          name="search"
          size={19}
          color="#64B5F6"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="  Lọc theo người hướng dẫn, chủ nhiệm đề tài,..."
          placeholderTextColor="#64B5F6"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {loading ? (
        <Text>Đang tải dữ liệu...</Text>
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {filteredTopics.length > 0 ? (
            filteredTopics.map((topic, index) => (
              <TopicCard
                key={index}
                topic={topic}
                onDeleteSuccess={loadTopics}
              />
            ))
          ) : (
            <Text>Không tìm thấy đề tài nào!</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
};
export default QuanLyDeTai;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    paddingHorizontal: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: 10,
    borderRadius: 20,
    paddingHorizontal: 12,
    elevation: 3,
    borderWidth: 2,
    borderColor: "#64B5F6",
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    height: 42,
    fontSize: 16,
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    borderLeftWidth: 6,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#64B5F6",
    marginLeft: 10,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  cardInfo: {
    fontSize: 14,
    color: "#333",
    marginLeft: 6,
  },
  statusContainer: {
    flexDirection: "row",
    marginTop: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: "#F2F2F9",
    alignSelf: "flex-start",
  },
  statusText: {
    fontSize: 15,
    marginLeft: 6,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 12,
  },
  iconButton: {
    padding: 8,
  },
});
