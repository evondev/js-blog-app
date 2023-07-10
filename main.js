import { fetchPosts } from "./request";
const postList = document.getElementById("home-post-list");

function renderPostItem(post) {
  const template = `<a class="block post-item" href="/post-details.html?id=${post.id}">
  <div class="post-image h-[200px]">
    <img
      class="object-cover w-full h-full rounded-lg"
      src="${post.image}"
      alt="alt"
    />
  </div>
  <div class="py-5 post-content">
    <h3 class="mb-3 text-2xl font-semibold post-title">
     ${post.title}
    </h3>
    <div class="post-desc text-sm text-gray-600">${post.description}</div>
  </div></a
>`;
  postList && postList.insertAdjacentHTML("afterbegin", template);
}
window.addEventListener("load", async function () {
  try {
    const posts = await fetchPosts();
    posts.forEach((post) => {
      renderPostItem(post);
    });
  } catch (error) {
    console.log(error);
  }
});
