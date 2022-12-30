const orderId = getOrderId();
insertOrderId(orderId);
clearLocalStorage();
function getOrderId() {
  const orderIdString = window.location.search;
  const urlSearch = new URLSearchParams(orderIdString);
  const orderId = urlSearch.get("orderId");
  return orderId;
}

function insertOrderId(orderId) {
  const orderIdElement = document.getElementById("orderId");
  orderIdElement.textContent = orderId;
}

function clearLocalStorage() {
  localStorage.clear();
}
