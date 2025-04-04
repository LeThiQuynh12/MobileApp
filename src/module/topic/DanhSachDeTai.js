import React, { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { fetchGetTopicList } from "../../context/fetchData";
import api from "../../utils/api";
import { AuthContext } from "../../context/AuthContext";

// Giả lập hàm fetch từ backend

const TopicCard = ({ topic }) => {
  const navigation = useNavigation();
  const formatHocVi = (hocVi) => {
    if (hocVi === "Tiến sĩ") return "TS.";
    if (hocVi === "Thạc sĩ") return "ThS.";
    if (hocVi === "Phó giáo sư, Tiến sĩ") return "PGS.TS.";
    return hocVi; // Giữ nguyên nếu không thuộc các trường hợp trên
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
      onPress={() => navigation.navigate("ChiTietDeTai")}
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

      <TouchableOpacity
        style={styles.detailButton}
        onPress={() => navigation.navigate("ChiTietDeTai", { topic })}
      >
        <Text style={styles.detailButtonText}>Chi tiết</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const DanhSachDeTai = () => {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const [searchText, setSearchText] = useState("");
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log("user nè: ", user);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get("/topics");
        setTopics(response.data.results);
        console.log("de tai:", response.data.results);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
        setTopics([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredTopics = topics.filter(
    (topic) =>
      topic.tenDeTai.toLowerCase().includes(searchText.toLowerCase()) ||
      topic.khoa.toLowerCase().includes(searchText.toLowerCase()) ||
      topic.linhVucNghienCuu.toLowerCase().includes(searchText.toLowerCase()) ||
      topic.idSinhVien.toLowerCase().includes(searchText.toLowerCase())
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
          placeholder="   Lọc theo người hướng dẫn, chủ nhiệm đề tài,..."
          placeholderTextColor="#64B5F6"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Danh sách đề tài</Text>
        {filteredTopics.length > 0 ? (
          filteredTopics.map((topic, index) => (
            <TopicCard key={index} topic={topic} />
          ))
        ) : (
          <Text style={styles.noDataText}>Không có đề tài nào phù hợp</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default DanhSachDeTai;

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
  },
  searchInput: {
    flex: 1,
    height: 42,
    fontSize: 16,
    color: "#333",
  },
  scrollView: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginVertical: 15,
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    marginHorizontal: 70,
    paddingBottom: 10,
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
    flex: 1,
    marginLeft: 10,
  },
  cardInfo: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  statusText: {
    fontSize: 14,
    marginLeft: 6,
  },
  detailButton: {
    marginTop: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#64B5F6",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    height: 35,
    width: 120,
  },
  detailButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  noDataText: {
    textAlign: "center",
    color: "#888",
    marginTop: 20,
    fontSize: 14,
  },
});
