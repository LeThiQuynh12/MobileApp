import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

// export const API_URL = "http://10.0.2.2:8080/api";

export const API_URL = "http://172.20.10.4:8080/api";

// export const API_URL = "http://172.20.10.4:8080/api/";
// Lưu token
export const saveTokens = async ({
  access_token,
  refresh_token,
  access_expires_in = 1000,
  refresh_expires_in = 1000,
}) => {
  try {
    // console.log("token: ", access_token, refresh_token);
    const access_expires_at = Date.now() + access_expires_in * 1000; // Tính thời gian hết hạn (millisecond)
    const refresh_expires_at = Date.now() + refresh_expires_in * 1000; // Tính thời gian hết hạn (millisecond)
    const tokens = JSON.stringify({
      access_token,
      refresh_token,
      access_expires_at,
      refresh_expires_at,
    });
    // console.log(access_token, refresh_token);
    await AsyncStorage.setItem("authTokens", tokens);
    // console.log("save token success");
    // const tokens1 = await getTokens(); // Lấy access token từ AsyncStorage
    // console.log("tokens.access_token:", tokens1);
  } catch (error) {
    console.error("Lỗi khi lưu token:", error);
  }
};

// Lấy token
export const getTokens = async () => {
  try {
    const tokens = await AsyncStorage.getItem("authTokens");
    if (!tokens) return null;

    const {
      access_token,
      refresh_token,
      access_expires_at,
      refresh_expires_at,
    } = JSON.parse(tokens);

    if (Date.now() > refresh_expires_at) {
      console.warn("Refresh token đã hết hạn! Yêu cầu đăng nhập lại.");
      await removeTokens();
      return null;
    }

    if (Date.now() > access_expires_at) {
      console.warn("Access token hết hạn! Đang làm mới...");
      const newTokens = await refreshTokens(refresh_token);
      return newTokens || null;
    }

    return { access_token, refresh_token };
  } catch (error) {
    console.error("Lỗi khi lấy token:", error);
    return null;
  }
};

export const refreshTokens = async (refresh_token) => {
  try {
    const response = await axios.post(`${API_URL}/auth/refresh`, {
      refresh_token,
    });

    if (response.data && response.data.access_token) {
      const { access_token, refresh_token, expires_in } = response.data;
      await saveTokens({ access_token, refresh_token, expires_in });
      return { access_token, refresh_token };
    }
  } catch (error) {
    console.error("Lỗi khi refresh token:", error);
    await removeTokens(); // Xóa token nếu refresh thất bại
    return null;
  }
};

// Xóa token
export const removeTokens = async () => {
  try {
    await AsyncStorage.removeItem("authTokens");
  } catch (error) {
    console.error("Lỗi khi xóa token:", error);
  }
};

// AXIOS INSTANT

// Tạo instance axios với cấu hình sẵn
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
// ✨ Thêm interceptor để tự động gắn access token vào mỗi request
api.interceptors.request.use(
  async (config) => {
    const tokens = await getTokens(); // Lấy access token từ AsyncStorage
    // console.log("tokens.access_token:", tokens?.access_token);
    if (tokens?.access_token) {
      config.headers.Authorization = `Bearer ${tokens.access_token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✨ Thêm interceptor để tự động refresh token khi bị lỗi 401
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Nếu gặp lỗi 401 và chưa thử refresh token lần nào
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const tokens = await getTokens();

//       if (tokens?.refresh_token) {
//         const newTokens = await refreshTokens(tokens.refresh_token);
//         if (newTokens?.access_token) {
//           originalRequest.headers.Authorization = `Bearer ${newTokens.access_token}`;
//           return api(originalRequest); // Gửi lại request cũ với token mới
//         }
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default api;
