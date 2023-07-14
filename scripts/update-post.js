import slugify from "slugify";
import { fetchPosts, getPostById, updatePost } from "./request";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
hljs.configure({
  // optionally configure hljs
  languages: ["javascript", "ruby", "python", "typescript"],
});
var quill = new Quill("#editor", {
  theme: "snow",
  modules: {
    syntax: true,
    toolbar: [
      ["bold", "italic", "underline", "strike", "code"],
      ["blockquote"],
      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["link", "image"],
      ["code-block"],
    ],
  },
});
const updateForm = document.getElementById("update-post-form");
updateForm && updateForm.addEventListener("submit", handleUpdatePost);

async function handleUpdatePost(event) {
  event.preventDefault();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id") * 1;
  const posts = await fetchPosts();
  const post = posts.find((post) => post.id === id);
  if (!post) return;
  const title = this.title.value;
  const slug = slugify(title);
  const image = this.image.value;
  const description = this.description.value;
  const status = this.status.value;
  const content = quill.root.innerHTML;
  try {
    await updatePost(id, {
      title: title || post.title,
      slug: slug || post.slug,
      image: image || post.image,
      description: description || post.description,
      status: status || post.status,
      content: content || post.content,
    });
    Toastify({
      text: "Updated post successfully!",
      duration: 3000,
      stopOnFocus: true, // Prevents dismissing of toast on hover
    }).showToast();
  } catch (error) {
    console.log(error);
  }
}

async function displayPost() {
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id") * 1;
  const post = await getPostById(id);
  if (!post) return;
  const { title, image, description, slug, status, content } = post;
  updateForm.title.value = title;
  updateForm.slug.value = slug;
  updateForm.image.value = image;
  updateForm.description.value = description;
  quill.root.innerHTML = content;
  const checkboxes = updateForm.status;
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].value === status) {
      checkboxes[i].checked = true;
    }
  }
}
window.addEventListener("load", displayPost);
