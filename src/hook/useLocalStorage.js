export function saveSearchValue(value) {
  localStorage.setItem("searchValue", JSON.stringify(value));
}

export function getSearchValue() {
  const searchValue = localStorage.getItem("searchValue");
  if (!searchValue || searchValue === "undefined") {
    return "";
  }

  try {
    return JSON.parse(searchValue) || "";
  } catch {
    return searchValue || "";
  }
}
