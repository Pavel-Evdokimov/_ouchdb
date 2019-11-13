(() => {
  window.onerror = (msg, url, line, col, error) => {
    window.navigator.sendBeacon(
      "https://couchdb.ml/api/beacons/_design/app/_update/beacon",
      JSON.stringify({ error: { msg, url, line, col, error } })
    );
  };
  window.onunload = () => {
    window.navigator.sendBeacon(
      "https://couchdb.ml/api/beacons/_design/app/_update/beacon",
      JSON.stringify({ entries: window.performance.getEntries() })
    );
  };
})();
