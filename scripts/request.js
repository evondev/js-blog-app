import axios from "axios";
import { API_URL, POST_PER_PAGE } from "./utils";

async function fetchPostsCount() {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    return response.data.length || 0;
  } catch (error) {
    console.log(error);
  }
}
async function fetchPosts(page = 1, title = "") {
  try {
    const response = await axios.get(
      `${API_URL}/posts?_limit=${POST_PER_PAGE}&_page=${page}&title_like=${title}`
    );
    return response.data || [];
  } catch (error) {
    console.log(error);
  }
}
async function getSinglePost(id) {
  if (!id) return;
  try {
    const response = await axios.get(`${API_URL}/posts/${id}`);
    return response.data || {};
  } catch (error) {
    console.log("getSinglePost ~ error:", error);
  }
}
async function deletePost(id) {
  if (!id) return;
  try {
    await axios.delete(`${API_URL}/posts/${id}`);
  } catch (error) {
    console.log(error);
  }
}
async function addNewPost(data) {
  try {
    const response = await axios.post(`${API_URL}/posts`, {
      ...data,
    });
    return response.data || null;
  } catch (error) {
    console.log("addNewPost ~ error:", error);
  }
}
async function getPostById(id) {
  try {
    const response = await axios.get(`${API_URL}/posts/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
async function updatePost(id, data) {
  try {
    const response = await axios.patch(`${API_URL}/posts/${id}`, {
      ...data,
    });
    console.log("updatePost ~ response:", response);
  } catch (error) {
    console.log("updatePost ~ error:", error);
  }
}
export {
  fetchPosts,
  getSinglePost,
  deletePost,
  fetchPostsCount,
  addNewPost,
  getPostById,
  updatePost,
};
