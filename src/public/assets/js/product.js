let cartId;
fetch("http://localhost:8080/api/carts/user/get")
  .then((res) => res.json())
  .then((res) => (cartId = res._id))
  .catch((err) => console.log(err));

let Form = document.getElementsByName("itemCount");
let form = Form[0];
let productId = form.id;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let quantity = event.target[0].value;
  if (!cartId) {
    fetch(`http://localhost:8080/api/carts/user`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        cartId = res._id;
        console.log(res._id);
        fetch(
          `http://localhost:8080/api/carts/${cartId.toString()}/products/${productId.toString()}?quantity=${quantity}`,
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
      })
      .catch((err) => console.log(err));
  } else {
    fetch(
      `http://localhost:8080/api/carts/${cartId.toString()}/products/${productId.toString()}?quantity=${quantity}`,
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
  }
});
