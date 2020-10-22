import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const delButton = commentList.querySelector("button");

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const addComment = (comment, data) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const button = document.createElement("button");
  const img = document.createElement("img");
  span.innerHTML = comment;
  button.innerHTML = "❌";
  button.addEventListener("click", sendDelComment);
  img.src = data;
  li.appendChild(span);
  li.appendChild(button);
  li.appendChild(img);
  commentList.prepend(li);
  increaseNumber();
};

const sendDelComment = async (event) => {
  const btn = event.target;
  const li = btn.parentNode;
  const comment = li.querySelector("span").innerHTML;
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment/delete`,
    method: "POST",
    data: {
      comment,
    },
  });
  if (response.status === 200) {
    delComment(li);
  }
};

const delComment = (li) => {
  commentList.removeChild(li);
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const sendComment = async (comment) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment,
    },
  });
  const data = response.data.userImg;
  if (response.status === 200) {
    addComment(comment, data);
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
  delButton.addEventListener("click", sendDelComment);
}

if (addCommentForm) {
  init();
}
