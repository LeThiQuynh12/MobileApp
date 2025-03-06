import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Modal } from 'react-native';

const ThongBao = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Lịch họp admin', content: 'Lịch họp của các admin vào lúc 10h sáng.', read: false, important: true },
    { id: 2, title: 'Cập nhật hệ thống', content: 'Hệ thống đã được cập nhật vào 3h chiều qua.', read: true, important: false },
    { id: 3, title: 'Quy định mới', content: 'Có quy định mới về việc quản lý người dùng.', read: false, important: true },
    { id: 4, title: 'Thông báo bảo trì', content: 'Hệ thống sẽ bảo trì vào cuối tuần này.', read: false, important: false },
    { id: 5, title: 'Cập nhật tài liệu', content: 'Tài liệu hướng dẫn cập nhật đã có phiên bản mới.', read: true, important: true },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRead, setFilterRead] = useState('');
  const [filterImportant, setFilterImportant] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  // Lọc thông báo theo các điều kiện
  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.includes(searchTerm) || notification.content.includes(searchTerm);
    const matchesRead = filterRead === '' || (filterRead === 'read' ? notification.read : !notification.read);
    const matchesImportant = filterImportant === '' || notification.important === (filterImportant === 'important');
    return matchesSearch && matchesRead && matchesImportant;
  });

  // Chuyển đổi trạng thái đọc của thông báo
  const toggleRead = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: !notification.read } : notification
    ));
  };

  // Hiển thị modal lọc
  const handleFilterOption = (option) => {
    if (option === 'read' || option === 'unread') {
      setFilterRead(option);
    } else if (option === 'important' || option === 'not-important') {
      setFilterImportant(option);
    }
    setModalVisible(false); 
  };

  // Hủy bộ lọc và quay lại trạng thái ban đầu
  const clearFilters = () => {
    setFilterRead('');
    setFilterImportant('');
    setModalVisible(false); 
  };

  return (
    <View style={styles.container}>
      {/* Thanh tìm kiếm */}
      <TextInput
        style={styles.input}
        placeholder="Tìm kiếm thông báo..."
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
      />

      {/* Nút Lọc */}
      <TouchableOpacity style={styles.filterButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.filterText}>Lọc</Text>
      </TouchableOpacity>

      {/* Modal lọc */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.modalOption} onPress={() => handleFilterOption('read')}>
              <Text style={styles.modalText}>Đã đọc</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={() => handleFilterOption('unread')}>
              <Text style={styles.modalText}>Chưa đọc</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={() => handleFilterOption('important')}>
              <Text style={styles.modalText}>Quan trọng</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={() => handleFilterOption('not-important')}>
              <Text style={styles.modalText}>Không quan trọng</Text>
            </TouchableOpacity>

            {/* Nút Hủy */}
            <TouchableOpacity style={styles.modalCancelButton} onPress={clearFilters}>
              <Text style={styles.modalCancelText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Hiển thị danh sách thông báo */}
      {filteredNotifications.length === 0 ? (
        <Text style={styles.noNotifications}>Không có thông báo phù hợp.</Text>
      ) : (
        <FlatList
          data={filteredNotifications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={[
                styles.notificationContainer,
                { backgroundColor: item.read ? '#f9f9f9' : '#e3f7e5' }
              ]}
            >
              <Text style={styles.title}>
                {item.title}
                {item.important && <Text style={styles.important}> ⭐</Text>}
                {!item.read && <Text style={styles.unread}> •</Text>}
              </Text>
              <Text>{item.content}</Text>
              <TouchableOpacity onPress={() => toggleRead(item.id)}>
                <Text style={styles.toggleButton}>
                  {item.read ? 'Đánh dấu chưa đọc' : 'Đánh dấu đã đọc'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  input: { height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, paddingLeft: 10, marginBottom: 20 },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#4CAF50', 
    alignItems: 'center',
    marginBottom: 20,
  },
  filterText: { color: '#fff', fontSize: 16 },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContainer: { width: '80%', backgroundColor: '#fff', borderRadius: 8, padding: 20 },
  modalOption: { paddingVertical: 10, width: '100%', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ddd' },
  modalText: { fontSize: 16 },
  modalCancelButton: {
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: '#FF5722', 
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  modalCancelText: { color: '#fff', fontSize: 16 },
  notificationContainer: { padding: 10, marginBottom: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 },
  title: { fontWeight: 'bold' },
  important: { color: 'gold' },
  unread: { color: 'red' },
  toggleButton: { color: 'blue', marginTop: 10 },
  noNotifications: { fontSize: 16, color: 'gray', textAlign: 'center' },
});

export default ThongBao;
