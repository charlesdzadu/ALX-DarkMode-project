const toggleDark = function () {
  addClasses(fetch("body"));
  addClasses(
    fetch(".navbar.navbar-default.navbar-fixed-top.topbar.visible-xs"),
  );
  addClasses(fetch(".hidden-xs.navigation.sidebar"));

  function fetch(selector) {
    return document.querySelectorAll(selector);
  }

  function addClass(element) {
    element.classList.add("dark");
  }

  function addClasses(elements) {
    elements.forEach((element) => {
      addClass(element);
    });
  }
};

const toggleLight = function () {
  removeClasses(fetch("body"));
  removeClasses(
    fetch(".navbar.navbar-default.navbar-fixed-top.topbar.visible-xs"),
  );
  removeClasses(fetch(".hidden-xs.navigation.sidebar"));

  function fetch(selector) {
    return document.querySelectorAll(selector);
  }

  function removeClass(element) {
    element.classList.remove("dark");
  }

  function removeClasses(elements) {
    elements.forEach((element) => {
      removeClass(element);
    });
  }
};

(async () => {
  let mode;

  const updateUI = (mode) => {
    if (mode === "dark") {
      toggleDark();
    } else {
      toggleLight();
    }
  };

  // set mode on page load
  await chrome.storage.sync.get(["mode"]).then((result) => {
    mode = result.mode;
    document.addEventListener("DOMContentLoaded", () => {
      updateUI(result.mode);
    });
  });

  // listen for change in mode
  await chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "sync") {
      mode = changes.mode.newValue;
      updateUI(mode);
    }
  });
})();
