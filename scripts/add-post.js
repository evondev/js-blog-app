import slugify from "slugify";
import { addNewPost } from "./request";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const addPostForm = document.getElementById("add-post-form");
addPostForm && addPostForm.addEventListener("submit", handleAddNewPost);
async function handleAddNewPost(event) {
  event.preventDefault();
  const title = this.title.value;
  const description = this.description.value;
  const image = this.image.value;
  const slug = this.slug.value || slugify(title, { lower: true });
  if (!title || !description || !image || !slug) {
    Toastify({
      text: "Please fill all fields!",
    }).showToast();
    return;
  }
  const data = {
    title,
    description,
    image,
    slug,
    status: "pending",
  };
  const response = await addNewPost(data);
  if (response.title) {
    this.reset();
    Toastify({
      text: "Add new post successfully!",
    }).showToast();
  } else {
    Toastify({
      text: "Unable to add new post!",
    }).showToast();
  }
}
