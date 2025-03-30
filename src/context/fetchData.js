import axios from "axios";
import { API_URL } from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const fetchGetTopicList = async () => {
  const response = await axios.get(`${API_URL}/topics`);
  console.log(response.data.results);
  return response.data.results;
};
export const postTopicList = async (data) => {
  // Lấy token từ nơi bạn lưu trữ (AsyncStorage, Redux, Context...)
  const token = await AsyncStorage.getItem("userToken"); // Ví dụ

  const response = await axios.post(`${API_URL}/topics`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`, // Thêm token vào header
    },
  });
  return response.data;
};
