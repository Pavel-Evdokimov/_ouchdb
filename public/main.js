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
    console.log("current name", currentUser.userCtx.name);
  }
})();
