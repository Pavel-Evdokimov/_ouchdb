(async () => {
  let currentUser = await fetch("http://localhost:5984/_session", {
    credentials: "include"
  }).then(res => res.json());
  if (!currentUser.userCtx.name) {
    window.location.assign("/login");
  }

  // Registering Service Worker
  // if ("serviceWorker" in navigator) {
  //   navigator.serviceWorker.register("sw.js");
  // }
  // const db = new PouchDB("http://localhost:5984/test");
  const db = new PouchDB("test");
  let docs = await db.allDocs({
    include_docs: true,
    attachments: true,
    binary: true,
    limit: 5
  });

  const renderRows = rows => {
    let content = document.getElementById("content");
    return rows.map(value => {
      let { _id, _attachments, ...doc } = value.doc;
      if (!_attachments) {
        return;
      }
      let imageName = Object.getOwnPropertyNames(_attachments)[0];
      let article = document.createElement("article");
      article.setAttribute("id", _id);
      let template = `<img><h3>${doc.title}</h3><p>${doc.text}</p>`;
      article.innerHTML = template;
      let blob = _attachments[imageName].data;
      let url = URL.createObjectURL(blob);
      article.querySelector("img").src = url;
      content.appendChild(article);
    });
  };
  const rerenderArticle = doc => {
    let imageName = Object.getOwnPropertyNames(doc._attachments)[0];
    let article = document.getElementById(doc._id);
    if (article && imageName) {
      let url = URL.createObjectURL(doc._attachments[imageName].data);
      article.querySelector("h3").innerText = doc.title;
      article.querySelector("p").innerText = doc.text;
      article.querySelector("img").src = url;
    }
  };

  let articles = renderRows(docs.rows);

  const addContent = async docId => {
    let content = document.getElementById("content");
    let article = document.createElement("article");

    let { _id, _attachments, ...doc } = await db.get(docId);
    let imageName = Object.getOwnPropertyNames(_attachments)[0];

    article.setAttribute("id", _id);

    let template = `
    <img>
    <h3>${doc.title}</h3>
    <p>${doc.text}</p>
    `;
    article.innerHTML = template;
    let blob = await db.getAttachment(_id, imageName);
    let url = URL.createObjectURL(blob);
    article.querySelector("img").src = url;
    content.appendChild(article);
  };
  const showList = async () => {
    let content = document.getElementById("content");
    //Get allDocuments
  };
  //Sync
  const sync = e => {
    // db.replicate.from("http://localhost:5984/test", { filter: "app/user" });
    let syncEvents = PouchDB.sync("test", "http://localhost:5984/test", {
      pull: { filter: "app/user" },
      live: true,
      retry: true
    });
    syncEvents
      .on("change", info => {
        console.log(info);
        if (info.change.ok) {
          info.change.docs.forEach(doc => {
            rerenderArticle(doc);
          });
        }
      })
      .on("paused", err => {
        console.log(err);
      })
      .on("active", () => {
        console.log("active");
      })
      .on("denied", err => {
        console.log(err);
      })
      .on("complete", info => {
        console.log(info);
      })
      .on("error", err => {
        console.log(err);
      });
  };
  const addNewArticle = async e => {
    const addForm = document.getElementById("addForm");
    const photo = addForm.photo.files[0];
    try {
      let result = await db.post({
        title: addForm.title.value,
        text: addForm.text.value,
        shareWith: addForm.shareWith.value,
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
  };
  const generateError = () => {
    setTimeout(() => {
      // error
      const a = b * b;
    }, 1000);
  };
  //get current rout
  if (window.location.pathname === "/") {
    document.getElementById("userName").innerText = currentUser.userCtx.name;
    const addButton = document.getElementById("addButton");
    const syncButton = document.getElementById("syncButton");
    syncButton.addEventListener("click", sync);
    addButton.addEventListener("click", addNewArticle);
    // Получить все записи пользователя и отрисовать их
    console.log("current name", currentUser);
    generateError();
  }
})();
