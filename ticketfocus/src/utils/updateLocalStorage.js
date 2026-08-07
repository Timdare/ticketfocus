export function updateLocalStorage(name, variable) {
  localStorage.setItem(name, JSON.stringify(variable));
}
