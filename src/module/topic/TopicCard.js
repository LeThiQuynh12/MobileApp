import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export const TopicCard = ({ topic, destination = "" }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.card}>
      <View style={styles.cardTitleContainer}>
        <Icon
          name="bar-chart"
          size={22}
          color="#64B5F6"
          style={styles.cardTitleIcon}
        />
        <Text style={styles.cardTitle}>{topic.title}</Text>
      </View>
      <Text style={styles.cardInfo}>Người hướng dẫn: {topic.instructor}</Text>
      <Text style={styles.cardInfo}>Chủ nhiệm đề tài: {topic.leader}</Text>
      <Text style={styles.cardInfo}>Khoa: {topic.faculty}</Text>
      <Text style={styles.cardInfo}>Tình trạng: {topic.status}</Text>
      <TouchableOpacity
        style={styles.detailButton}
        onPress={() => navigation.navigate(destination)}
      >
        <Text style={styles.detailButtonText}>Chi tiết</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    elevation: 2, // bongs
  },
  cardTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardTitleIcon: {
    marginRight: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 6,
    marginRight: 25,
    color: "#64B5F6",
    paddingHorizontal: 13,
    textAlign: "justify",
  },
  cardInfo: {
    fontSize: 14,
    color: "#333",
    marginBottom: 2,
    paddingHorizontal: 30,
  },
  detailButton: {
    marginTop: 8,
    alignSelf: "center",
    borderColor: "#64B5F6",
    borderWidth: 2,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    height: 35,
    width: 120,
  },
  detailButtonText: {
    color: "#64B5F6",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});
