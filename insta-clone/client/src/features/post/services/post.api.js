import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export async function getFeed() {
  try {
    const response = await api.get("/api/post/feed");

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Get Feed failed. Please try again.";
    return { success: false, error: message, status: error.response?.status };
  }
}
