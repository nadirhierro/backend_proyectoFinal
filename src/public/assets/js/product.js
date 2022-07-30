let cart;
fetch("http://localhost:8080/carts/user")
  .then((res) => res.json())
  .then((res) => (cart = res))
  .catch((err) => console.log(err));

let Form = document.getElementsByName("itemCount");
let form = Form[0];
let productId = form.id;
let cartId = cart.id;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let quantity = event.target[0].value;

  fetch(
    `http://localhost:8080/api/carts/${cartId}/products/${productId}?quantity=${quantity}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    }
  )
    .then((res) => res.json())
    .then((res) => {
      let itemCount = document.getElementsByClassName("itemCount")[0];
      if (res) {
        itemCount.innerHTML = `<h4>Producto agregado al carrito</h4>`;
      } else {
        itemCount.innerHTML = `<h4>Producto ya estaba en el carrito</h4>`;
      }
    })
    .catch((err) => console.log(err));
});
