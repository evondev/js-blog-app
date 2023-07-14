import { deletePost, fetchPosts, fetchPostsCount } from "./request";
import { POST_PER_PAGE } from "./utils";
let page = 1;
function renderStatus(status) {
  let classNames = "";
  switch (status) {
    case "publish":
      classNames = "text-green-800 bg-green-100";
      break;
    case "pending":
      classNames = "text-orange-800 bg-orange-100";
      break;
    default:
      classNames = "text-red-800 bg-red-100";
      break;
  }
  return classNames;
}
function renderPostItem(post) {
  const template = `<tr>
  <td class="p-3">${post.id}</td>
  <td class="p-3">
    <div class="flex items-center gap-3">
      <div class="flex-shrink-0 w-12 h-12"><img class="object-cover w-full h-full rounded" src="${
        post.image
      }" alt=""></div>
      <h3 class="text-base font-medium">${post.title}</h3>
    </div>
  </td>
  <td class="p-3"><span class="inline-block p-2 px-4 text-sm rounded-md capitalize ${renderStatus(
    post.status
  )}">${post.status}</span></td>
  <td class="p-3">
    <button class="px-3 py-2 mx-1 text-sm text-gray-600 rounded-md cursor-pointer hover:bg-gray-100 post-delete" data-id="${
      post.id
    }">Delete</button>
    <a href="/update-post.html?id=${
      post.id
    }" class="px-3 py-2 mx-1 text-sm text-gray-600 rounded-md cursor-pointer hover:bg-gray-100 post-edit">Edit</a>
  </td>
</tr>`;

  return template;
}
async function init(page = 1) {
  try {
    const posts = await fetchPosts(page);
    const tablePost = document.querySelector("#table-manage-posts tbody");
    posts.forEach((post) => {
      const postItem = renderPostItem(post);
      tablePost.insertAdjacentHTML("beforeend", postItem);
    });
  } catch (error) {
    console.log(error);
  }
  const deleteBtn = document.querySelectorAll(".post-delete");
  deleteBtn.forEach((btn) => {
    btn.addEventListener("click", handleDeletePost);
  });
}
window.addEventListener("load", async () => {
  init();
  const postsCount = await fetchPostsCount();
  const loadMoreBtn = document.querySelector(".load-more-post");
  loadMoreBtn.addEventListener("click", function (event) {
    handleLoadMorePost(event, postsCount);
  });
});
async function handleDeletePost(event) {
  const id = event.target.dataset.id * 1;
  if (!id) return;
  let text = "Are you sure you want to delete this post?";
  if (confirm(text) == true) {
    try {
      await deletePost(id);
      window.location.reload();
    } catch (error) {
      console.log("handleDeletePost ~ error:", error);
    }
  } else {
    console.log("You are not delete post");
  }
}
async function handleLoadMorePost(event, postsCount) {
  if (page >= postsCount || POST_PER_PAGE * page >= postsCount) {
    event.target.setAttribute("disabled", true);
    return;
  }
  init(++page);
}
