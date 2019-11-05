(async () => {
  const db = new PouchDB("http://localhost:5984/test");

  const addContent = async docId => {
    let content = document.getElementById("content");
    let article = document.createElement("article");

    let { _id, _attachments, ...doc } = await db.get(docId);
    let imageName = Object.getOwnPropertyNames(_attachments)[0];

    article.setAttribute("id", _id);

    let template = `
    <img src="http://localhost:5984/test/${_id}/${imageName}">
    <h3>${doc.title}</h3>
    <p>${doc.text}</p>
    `;
    article.innerHTML = template;
    content.appendChild(article);
  };
  //get current rout
  if (window.location.pathname === "/") {
    let currentUser = await fetch("http://localhost:5984/_session", {
      credentials: "include"
    }).then(res => res.json());
    if (!currentUser.userCtx.name) {
      window.location.assign("/login");
    }
    document.getElementById("userName").innerText = currentUser.userCtx.name;
    const addForm = document.getElementById("addForm");
    const addButton = document.getElementById("addButton");
    addButton.addEventListener("click", async e => {
      const photo = addForm.photo.files[0];
      try {
        let result = await db.post({
          title: addForm.title.value,
          text: addForm.text.value,
          userName: currentUser.userCtx.name,
          _attachments: {
            [photo.name]: {
              content_type: photo.type,
              data: photo
            }
          }
        });
        addContent(result.id);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    });
    // Получить все записи пользователя и отрисовать их
    console.log("current name", currentUser);
    setTimeout(() => {
      // error
      const a = b * b;
    }, 1000);
  }
})();
