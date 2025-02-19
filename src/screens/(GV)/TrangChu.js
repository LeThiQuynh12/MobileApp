import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import color from "../../utils/color";

const daysOfWeek = [
    "Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"
];

const today = new Date();

const SupervisionTopics = () => {
    const [expandedTopic1, setExpandedTopic1] = useState(false);
    const [expandedTopic2, setExpandedTopic2] = useState(false);

    return (
        <View style={styles.container}>
            {/* Header */}
            <Text style={styles.greeting}>
                Xin chào, <Text style={{ fontWeight: "bold" }}>TênGV</Text>
            </Text>
            <Text>Mã giảng viên: &lt;mãGV&gt;</Text>

            {/* Ngày tháng */}
            <View style={styles.dateSection}>
                <FontAwesome name="calendar" size={24} color="#007AFF" />
                <View>
                    <Text style={styles.dateText}>
                        {`${daysOfWeek[today.getDay()]}, ${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`}
                    </Text>
                    <Text style={styles.normalText}>Có &lt;?&gt; cập nhật mới</Text>
                </View>
            </View>

            {/* Danh sách đề tài */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Đề tài đang hướng dẫn:</Text>

                {/* Đề tài 1 */}
                <TouchableOpacity style={styles.topicItem} onPress={() => setExpandedTopic1(!expandedTopic1)}>
                    <Text>Đề tài 1</Text>
                    <MaterialIcons name={expandedTopic1 ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={24} color="black" />
                </TouchableOpacity>
                {expandedTopic1 && <Text style={styles.subText}>Nhiệm vụ: 5/10</Text>}

                {/* Đề tài 2 */}
                <TouchableOpacity style={styles.topicItem} onPress={() => setExpandedTopic2(!expandedTopic2)}>
                    <Text>Đề tài 2</Text>
                    <MaterialIcons name={expandedTopic2 ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={24} color="black" />
                </TouchableOpacity>
                {expandedTopic2 && <Text style={styles.subText}>Nhiệm vụ: 3/8</Text>}
            </View>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        padding: 20
    },
    greeting: {
        fontSize: 18,
        color: color.mainColor
    },
    subText: {
        fontSize: 14,
        color: color.gray,
        marginBottom: 10
    },
    dateSection: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 25,
        marginTop: 10
    },
    dateText: {
        fontSize: 16,
        fontWeight: "bold",
        color: color.mainColor
    },
    card: {
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        marginBottom: 20
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
        color: color.mainColor
    },
    topicItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10
    },
    normalText: {
        color: color.textColor, // Hoặc sử dụng color.textColor nếu có biến màu chung
    },
});

export default SupervisionTopics;
