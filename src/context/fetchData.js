import axios from "axios";
import { API_URL, getTokens } from "../utils/api";
import api from "../utils/api"; // Sử dụng axios instance đã cấu hình sẵn
import AsyncStorage from "@react-native-async-storage/async-storage";
// export const fetchGetTopicList = async () => {
//   try {
//     // Sử dụng api instance thay vì axios trực tiếp để tự động gắn token
//     const response = await api.get(`${API_URL}/topics`);
//     console.log("Danh sách đề tài:", response.data?.results);
//     return response.data?.results || []; // Trả về mảng rỗng nếu không có data
//   } catch (error) {
//     console.error("Lỗi khi lấy danh sách đề tài:", error);
//     throw error; // Ném lỗi để component có thể bắt
//   }
// };
export const fetchGetTopicList = async () => {
  try {
    // Lấy token từ AsyncStorage
    const tokens = await getTokens(); // tokens là object chứa access_token và refresh_token
    const accessToken = tokens?.access_token; // Chỉ lấy access_token

    // console.log("Access Token:", accessToken); // Debug token

    if (!accessToken) {
      throw new Error("Không tìm thấy access_token. Vui lòng đăng nhập lại.");
    }

    // Gửi request với token đúng
    const response = await axios.get(`${API_URL}/topics`, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Đúng định dạng
      },
    });

    console.log("Response full:", response); // In toàn bộ response
    console.log("Response data:", response.data.results); // Chỉ lấy data
    return response.data.results;
  } catch (error) {
    console.error(
      "Lỗi khi lấy danh sách đề tài:",
      error.response || error.message
    );
    throw error;
  }
};
export const postTopicList = async (data) => {
  try {
    // Lấy token từ AsyncStorage
    const tokens = await getTokens();
    const accessToken = tokens?.access_token;

    if (!accessToken) {
      throw new Error("Không tìm thấy access_token. Vui lòng đăng nhập lại.");
    }

    // Gửi request với token
    const response = await axios.post(`${API_URL}/topics`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Lỗi khi thêm đề tài:",
      error.response?.data || error.message
    );
    throw error;
  }
};
export const putTopicList = async (data) => {
  try {
    // Lấy token từ AsyncStorage
    const tokens = await getTokens();
    const accessToken = tokens?.access_token;

    if (!accessToken) {
      throw new Error("Không tìm thấy access_token. Vui lòng đăng nhập lại.");
    }

    // Gửi request với token
    const response = await axios.put(`${API_URL}/topics`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Lỗi khi thêm đề tài:",
      error.response?.data || error.message
    );
    throw error;
  }
};
export const deleteTopic = async (topicId) => {
  try {
    // Lấy token từ AsyncStorage
    const tokens = await getTokens();
    const accessToken = tokens?.access_token;

    if (!accessToken) {
      throw new Error("Không tìm thấy access_token. Vui lòng đăng nhập lại.");
    }

    // Gửi request DELETE với token
    const response = await axios.delete(`${API_URL}/topics/${topicId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log("Xóa đề tài thành công:", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi xóa đề tài:", error.response?.data || error.message);
    throw error;
  }
};
