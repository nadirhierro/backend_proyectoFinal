let cart;
let sendOrder = document.getElementById("sendOrder");

sendOrder.addEventListener("click", (event) => {
  event.preventDefault();
  fetch("http://localhost:8080/api/carts/user/get")
    .then((res) => res.json())
    .then((res) => {
      cart = res;
      cart.products.forEach((product) => {
        delete product.thumbnail;
      });

      let order = {
        state: "generated",
        email: cart.email,
        products: cart.products,
        address: cart.address,
      };
      console.log(order.address);
      fetch(`http://localhost:8080/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res) {
            let carrito = document.getElementById("cart");
            carrito.remove();
            let main = document.getElementById("main");
            let generated = document.createElement("div");
            generated.innerHTML = `
            <h2 class="text-center"> Orden generada</h2>
            <a class="text-center btn" href="http://localhost:8080/products">Volver a la tienda </a>
            `;
            main.appendChild(generated);
          }
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});
