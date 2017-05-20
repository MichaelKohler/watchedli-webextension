const DEFAULT_URL = 'https://google.com/?q=%S';

const saveOptions = (e) => {
  e.preventDefault();

  const configValue = document.querySelector("#url").value;
  browser.storage.local.set({
    url: configValue
  });
}

const restoreOptions = () => {
  var getting = browser.storage.local.get({
    "url": DEFAULT_URL
  });
  getting.then(({ url: restoredValue }) => {
    document.querySelector("#url").value = restoredValue;
  }, (err) => {
    console.log(`Error: ${error}`);
  });
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
