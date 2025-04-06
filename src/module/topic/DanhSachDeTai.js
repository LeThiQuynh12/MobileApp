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
import api from "../../utils/api";
import { AuthContext } from "../../context/AuthContext";

const TopicCard = ({ topic }) => {
  const navigation = useNavigation();

  // Safe data access with optional chaining
  const tinhTrang = topic?.tinhTrang;
  const tenDeTai = topic?.tenDeTai || "Không có tên đề tài";
  const lecturerTitle = topic?.lecturer?.academicTitle;
  const lecturerName = topic?.lecturer?.user?.fullName || "Không rõ";
  const leaderName = topic?.group?.leader?.user?.fullName || "Không rõ";
  const khoa = topic?.khoa || "Không rõ khoa";

  const formatHocVi = (hocVi) => {
    if (!hocVi) return "";
    if (hocVi === "Tiến sĩ") return "TS.";
    if (hocVi === "Thạc sĩ") return "ThS.";
    if (hocVi === "Phó giáo sư, Tiến sĩ") return "PGS.TS.";
    return hocVi;
  };

  if (!topic || !topic.group) {
    return (
      <View style={[styles.card, { borderLeftColor: "#E53935" }]}>
        <Text style={styles.cardTitle}>Thông tin đề tài không hợp lệ</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          borderLeftColor: tinhTrang === "Đã duyệt" ? "#4CAF50" : "#E53935",
        },
      ]}
      activeOpacity={0.9}
      onPress={() => navigation.navigate("ChiTietDeTai", { topic })}
    >
      <View style={styles.cardHeader}>
        <Ionicons name="book-outline" size={24} color="#64B5F6" />
        <Text style={styles.cardTitle}>{tenDeTai}</Text>
      </View>

      <View style={styles.cardRow}>
        <Ionicons name="person-outline" size={18} color="#555" />
        <Text style={styles.cardInfo}>
          Người hướng dẫn: {formatHocVi(lecturerTitle)}
          {lecturerName}
        </Text>
      </View>

      <View style={styles.cardRow}>
        <Ionicons name="people-outline" size={18} color="#555" />
        <Text style={styles.cardInfo}>Chủ nhiệm: {leaderName}</Text>
      </View>

      <View style={styles.cardRow}>
        <Ionicons name="school-outline" size={18} color="#555" />
        <Text style={styles.cardInfo}>Khoa: {khoa}</Text>
      </View>

      <View style={styles.statusContainer}>
        {tinhTrang === "Đã duyệt" ? (
          <Ionicons name="checkmark-circle" size={22} color="#4CAF50" />
        ) : (
          <Ionicons name="close-circle" size={22} color="#E53935" />
        )}
        <Text style={styles.statusText}>
          {tinhTrang || "Không rõ trạng thái"}
        </Text>
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get("/topics");
        setTopics(response.data.results || []);
      } catch (err) {
        // console.error("Fetch error:", err);
        setError(err.message);
        setTopics([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.id]);

  const role = user?.role || "";

  const isMyTopic = (topic) => {
    try {
      if (!topic?.group) return false;

      if (role === "LECTURER") {
        return topic.lecturer?.user?.id === user?.id;
      } else if (role === "STUDENT") {
        return (
          topic.group.leader?.user?.id === user?.id ||
          topic.group.members?.some((member) => member?.user?.id === user?.id)
        );
      }
      return false;
    } catch (error) {
      console.error("Error checking my topic:", error);
      return false;
    }
  };

  const myTopics = topics.filter((topic) => isMyTopic(topic));

  const otherTopics = topics.filter((topic) => {
    try {
      if (!topic?.group) return false;

      const isNotMyTopic = !isMyTopic(topic);

      const matchesSearch =
        topic.tenDeTai?.toLowerCase()?.includes(searchText.toLowerCase()) ||
        topic.khoa?.toLowerCase()?.includes(searchText.toLowerCase()) ||
        topic.linhVucNghienCuu
          ?.toLowerCase()
          ?.includes(searchText.toLowerCase()) ||
        topic.group.leader?.user?.fullName
          ?.toLowerCase()
          ?.includes(searchText.toLowerCase());

      return isNotMyTopic && matchesSearch;
    } catch (error) {
      console.error("Error filtering other topics:", error);
      return false;
    }
  });

  const filteredMyTopics = myTopics.filter((topic) => {
    try {
      return (
        topic.tenDeTai?.toLowerCase()?.includes(searchText.toLowerCase()) ||
        topic.khoa?.toLowerCase()?.includes(searchText.toLowerCase()) ||
        topic.linhVucNghienCuu
          ?.toLowerCase()
          ?.includes(searchText.toLowerCase()) ||
        topic.group.leader?.user?.fullName
          ?.toLowerCase()
          ?.includes(searchText.toLowerCase())
      );
    } catch (error) {
      console.error("Error filtering my topics:", error);
      return false;
    }
  });

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
          placeholder="   Lọc theo tên đề tài, khoa, lĩnh vực nghiên cứu..."
          placeholderTextColor="#64B5F6"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Phần đề tài của bạn */}
        <Text style={styles.sectionTitle}>Đề tài của bạn</Text>
        {loading ? (
          <Text style={styles.noDataText}>Đang tải...</Text>
        ) : error ? (
          <Text style={styles.noDataText}>Có lỗi xảy ra: {error}</Text>
        ) : filteredMyTopics.length > 0 ? (
          filteredMyTopics.map((topic, index) => (
            <TopicCard key={`my-${index}`} topic={topic} />
          ))
        ) : (
          <Text style={styles.noDataText}>Bạn chưa có đề tài nào</Text>
        )}

        {/* Phần các đề tài khác */}
        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
          Các đề tài khác
        </Text>
        {loading ? null : otherTopics.length > 0 ? (
          otherTopics.map((topic, index) => (
            <TopicCard key={`other-${index}`} topic={topic} />
          ))
        ) : (
          <Text style={styles.noDataText}>Không có đề tài nào phù hợp</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: "#64B5F6",
  },
  scrollView: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
    color: "#333",
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  cardInfo: {
    fontSize: 14,
    marginLeft: 8,
    color: "#555",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  statusText: {
    fontSize: 14,
    marginLeft: 6,
  },
  detailButton: {
    alignSelf: "flex-end",
    marginTop: 8,
  },
  detailButtonText: {
    color: "#64B5F6",
    fontWeight: "bold",
  },
  noDataText: {
    textAlign: "center",
    color: "#888",
    marginVertical: 16,
  },
});

export default DanhSachDeTai;
