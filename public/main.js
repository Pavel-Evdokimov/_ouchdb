(async () => {
  //get current rout
  if (window.location.pathname === "/") {
    let currentUser = await fetch("http://localhost:5984/_session", {
      credentials: "include"
    }).then(res => res.json());
    if (!currentUser.userCtx.name) {
      window.location.assign("/login");
    }
    document.getElementById("userName").innerText = currentUser.userCtx.name;
    const db = new PouchDB("http://localhost:5984/test");
    const addForm = document.getElementById("addForm");
    const addButton = document.getElementById("addButton");
    addButton.addEventListener("click", async e => {
      const photo = addForm.photo.files[0];
      try {
        let result = await db.put({
          _id: addForm.text.value,
          text: "hello",
          _attachments: {
            [photo.name]: {
              content_type: photo.type,
              data: photo
            }
          }
        });
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    });
    console.log("current name", currentUser.userCtx.name);
    setTimeout(() => {
      // error
      const a = b * b;
    }, 1000);
  }
})();
