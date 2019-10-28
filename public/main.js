(async () => {
  //get current rout
  if (window.location.pathname === "/") {
    let currentUser = await fetch("http://localhost:5984/_session").then(res =>
      res.json()
    );
    if (!currentUser.userCtx.name) {
      window.location.assign("/login");
    }
  }
  console.log("current name", currentUserName);
})();
