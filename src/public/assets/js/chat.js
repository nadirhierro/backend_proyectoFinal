let formChat = document.getElementById("messages");
let userEmail = document.getElementById("email").innerHTML;

// template para chat
let templateChat = `
    {{#each messages}}
    <div class="message">
    <b>{{this.type}}</b> <span class="time">{{this.timestamp}} :</span> <span class="mensaje">{{this.message}}</span> </br></div>
    {{/each}}
`;

// Listener para el form
formChat.addEventListener("submit", (event) => {
  event.preventDefault();
  let message = event.target[0].value;

  let data = { message: message };

  if (data.message == "") {
    window.location.reload();
  } else {
    fetch("http://localhost:8080/api/messages/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        socket.emit("chat", res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

socket.on("chat", (data) => {
  fetch(`http://localhost:8080/api/messages/${userEmail}`)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      const template = Handlebars.compile(templateChat);
      const html = template({
        messages: res,
      });
      document.getElementById("mensajes").innerHTML = html;
    })
    .catch((err) => {
      console.log(err);
    });
});
