import axios from "axios";
import "./style.css";
import { API_URL } from "./utils";
function renderPostDetails(post) {
  const template = `<h1 class="mb-10 text-4xl font-semibold text-center">${post.title}</h1>
<div class="post-image h-[500px] mb-10"><img class="object-cover w-full h-full rounded-lg" src="${post.image}"></div>
<div class="post-content">${post.description}</div>`;
  return template;
}
async function getSinglePost(id) {
  try {
    const response = await axios.get(`${API_URL}/posts/${id}`);
    return response.data || {};
  } catch (error) {
    console.log("getSinglePost ~ error:", error);
  }
}
window.addEventListener("load", async function () {
  const postDetails = document.getElementById("post-details");
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") * 1;
  if (!id) return;
  const post = await getSinglePost(id);
  postDetails && (postDetails.innerHTML = renderPostDetails(post));
});
