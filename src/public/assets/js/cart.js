let Table = document.getElementsByName("cart");
let table = Table[0];
let cartId = table.id;

let deleteProduct = document.getElementsByName("deleteProduct");
console.log(deleteProduct);

deleteProduct.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("hola");
    let productId = event.target.id;
    fetch(`http://localhost:8080/api/carts/${cartId}/products/${productId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        let productHtml = document.getElementById("product-" + productId);
        if (res) {
          productHtml.remove();
        }
      })
      .catch((err) => console.log(err));
  });
});
