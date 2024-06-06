const menuIcon = document.querySelector(".menu-icon");
const container = document.querySelector(".container");

menuIcon.addEventListener("click", () => {
  container.classList.toggle("change");
});

// particules, fond background :

particlesJS.load("particles-js", "/particles.json", function () {
  console.log("callback - particles.js config loaded");
});

// Animation sur competences :

let words = document.querySelectorAll(".word");
words.forEach((word) => {
  let letters = word.textContent.split("");
  (word.textContent = ""),
    letters.forEach((letter) => {
      let span = document.createElement("span");
      span.textContent = letter;
      span.className = "letter";
      word.append(span);
    });
});

let currentWordIndex = 0;
let maxWordIndex = words.length - 1;
words[currentWordIndex].style.opacity = "1";

let changeText = () => {
  let currentWord = words[currentWordIndex];
  let nextWord =
    currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

  Array.from(currentWord.children).forEach((letter, i) => {
    setTimeout(() => {
      letter.className = "letter out";
    }, i * 80);
  });
  nextWord.style.opacity = "1";
  Array.from(nextWord.children).forEach((letter, i) => {
    letter.className = "letter behind";
    setTimeout(() => {
      letter.className = "letter in";
    }, 340 + i * 80);
  });
  currentWordIndex =
    currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
};

changeText();
setInterval(changeText, 3000);
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("contact-form")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Impede o envio padrão do formulário

      // Captura dos dados do formulário
      const formData = new FormData(this);

      // Preparação dos parâmetros para o EmailJS
      const emailParams = {
        name: formData.get("name"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message"),
      };

      // Envio do email usando EmailJS
      emailjs
        .send(
          "service_14rx95h",
          "template_bpyc5qo",
          emailParams,
          "DLAgdhqfC-tkfAkTA"
        )
        .then(
          function (response) {
            console.log("Email enviado com sucesso!", response);
            alert("Mensagem enviada com sucesso!");
            // Opcionalmente, limpa os campos do formulário após o envio bem-sucedido
            this.reset();
          },
          function (error) {
            console.error("Falha ao enviar o email:", error);
            alert(
              "Erro ao enviar a mensagem. Por favor, tente novamente mais tarde."
            );
          }
        );
    });
});
