let albums = JSON.parse(localStorage.getItem("albums")) || {};
let currentAlbum = null;

const albumsDiv = document.getElementById("albums");
const gallery = document.getElementById("gallery");
const title = document.getElementById("currentAlbumTitle");

function save() {
  localStorage.setItem("albums", JSON.stringify(albums));
}

function renderAlbums() {
  albumsDiv.innerHTML = "";
  for (let name in albums) {
    let btn = document.createElement("button");
    btn.innerText = name;
    btn.onclick = () => selectAlbum(name);
    albumsDiv.appendChild(btn);
  }
}

function createAlbum() {
  let name = document.getElementById("albumName").value;
  if (!name) return alert("Enter album name");

  if (!albums[name]) {
    albums[name] = [];
    save();
    renderAlbums();
  }
}

function selectAlbum(name) {
  currentAlbum = name;
  title.innerText = "Album: " + name;
  renderImages();
}

function renderImages() {
  gallery.innerHTML = "";
  if (!currentAlbum) return;

  albums[currentAlbum].forEach((img, index) => {
    let div = document.createElement("div");
    div.className = "photo";

    div.innerHTML = `
      <img src="${img}">
      <button class="delete-btn" onclick="deleteImage(${index})">X</button>
    `;

    gallery.appendChild(div);
  });
}

function deleteImage(index) {
  albums[currentAlbum].splice(index, 1);
  save();
  renderImages();
}

document.getElementById("upload").addEventListener("change", function () {
  if (!currentAlbum) {
    alert("Select an album first!");
    return;
  }

  const files = this.files;

  for (let file of files) {
    let reader = new FileReader();

    reader.onload = function (e) {
      albums[currentAlbum].push(e.target.result);
      save();
      renderImages();
    };

    reader.readAsDataURL(file);
  }
});

renderAlbums();