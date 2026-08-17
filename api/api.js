import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { getDeviceId } from "../utils/DeviceId";

const api = axios.create({
  // TROQUE PELO IP DO SEU COMPUTADOR
  baseURL: "http://192.168.0.100:3000",
});

api.interceptors.request.use(
  async (config) => {
    const accessToken = await AsyncStorage.getItem("accessToken");

    if (accessToken) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = await AsyncStorage.getItem("refreshToken");

      if (!refreshToken) {
        await AsyncStorage.multiRemove([
          "accessToken",
          "refreshToken",
        ]);

        return Promise.reject(error);
      }

      try {
        const { data } = await api.post("/auth/refresh", {
          refreshToken,
        });

        await AsyncStorage.setItem(
          "accessToken",
          data.accessToken
        );

        await AsyncStorage.setItem(
          "refreshToken",
          data.refreshToken
        );

        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        await AsyncStorage.multiRemove([
          "accessToken",
          "refreshToken",
        ]);

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export async function loginWithGoogle(idToken) {
  const deviceId = await getDeviceId();

  const { data } = await api.post("/auth/google", {
    idToken,
    deviceId,
  });

  return data;
}

export async function loginWithApple(appleId, email) {
  const deviceId = await getDeviceId();

  const { data } = await api.post("/auth/apple", {
    appleId,
    email,
    deviceId,
  });

  return data;
}

export async function completePhoneSignup(
  phone,
  email,
  password
) {
  const deviceId = await getDeviceId();

  const { data } = await api.post(
    "/auth/complete-phone-signup",
    {
      phone,
      email,
      password,
      deviceId,
    }
  );

  return data;
}

export async function sendSMSCode(phone) {
  const { data } = await api.post("/auth/send-sms-code", {
    phone,
  });

  return data;
}

export async function verifySMSCode(phone, code) {
  const { data } = await api.post("/auth/verify-sms-code", {
    phone,
    code,
  });

  return data;
}

export async function verifyEmailOTP(email, code) {
  const { data } = await api.post("/auth/verify-email-otp", {
    email,
    code,
  });

  return data;
}

export default api;