import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import color from "../../utils/color";

const ProjectDetailScreen = () => {
    return (
        <View style={styles.container}>
            {/* Tiêu đề */}
            <Text style={styles.title}>
                NGHIÊN CỨU CÁC VẤN ĐỀ BẢO MẬT VÀ THỬ NGHIỆM CÁC TÍNH NĂNG BẢO MẬT KHI PHÁT TRIỂN MOBILE APP DỰA TRÊN NỀN TẢNG
                NATIVE REACT VÀ KOTLIN.
            </Text>

            {/* Chi tiết */}
            <View style={styles.detailContainer}>
                <Text style={styles.detailText}>
                    <Text style={styles.boldText}>Chủ nhiệm đề tài:</Text> Hoàng Thị Thảo
                </Text>
                <Text style={styles.detailText}>
                    <Text style={styles.boldText}>Người hướng dẫn:</Text> TS. Trần Trung
                </Text>
                <Text style={styles.detailText}>
                    <Text style={styles.boldText}>Khoa:</Text> Công nghệ thông tin
                </Text>
                <Text style={styles.detailText}>
                    <Text style={styles.boldText}>Trạng thái:</Text> Được duyệt
                </Text>
                <Text style={styles.detailText}>
                    <Text style={styles.boldText}>Thời gian thực hiện:</Text> 15/12/2024 - 3/5/2025
                </Text>
                <Text style={styles.detailText}>
                    <Text style={styles.boldText}>Lĩnh vực:</Text> Phát triển Mobile App
                </Text>
                <Text style={styles.detailText}>
                    <Text style={styles.boldText}>Số lượng người tham gia:</Text> 5
                </Text>
            </View>

            {/* Danh sách nhiệm vụ */}
            <View style={styles.taskContainer}>
                <Text style={styles.taskHeader}>Nhiệm vụ cần làm:</Text>
                <View style={styles.taskItem}>
                    <Text style={styles.taskText}>Nhiệm vụ 2</Text>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Xem chi tiết</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.taskContainer}>
                <Text style={styles.taskHeader}>Đã hoàn thành:</Text>
                <View style={styles.taskItem}>
                    <Text style={styles.taskText}>Nhiệm vụ 1</Text>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Xem chi tiết</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Nút giao nhiệm vụ */}
            <TouchableOpacity style={styles.assignButton}>
                <Text style={styles.assignButtonText}>Giao nhiệm vụ</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.background,
        padding: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: color.darkBlue,
        textAlign: "center",
        marginBottom: 15,
    },
    detailContainer: {
        marginBottom: 20,
    },
    detailText: {
        fontSize: 14,
        color: color.textColor,
        marginBottom: 5,
    },
    boldText: {
        fontWeight: "bold",
        color: color.mainColor
    },
    taskContainer: {
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: color.gray,
        paddingBottom: 10,
    },
    taskHeader: {
        fontSize: 14,
        fontWeight: "bold",
        color: color.mainColor,
        marginBottom: 5,
    },
    taskItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    taskText: {
        fontSize: 14,
        color: color.textColor,
    },
    button: {
        backgroundColor: color.mainColor,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: "white",
        fontSize: 12,
    },
    assignButton: {
        backgroundColor: color.mainColor,
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10,
    },
    assignButtonText: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
    },
});

export default ProjectDetailScreen;
