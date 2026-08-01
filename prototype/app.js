const screens = document.querySelectorAll(".screen");
const navigation = document.querySelectorAll("[data-go]");
const navButtons = document.querySelectorAll(".bottom-nav [data-go]");

function showScreen(name) {
  screens.forEach((screen) => screen.classList.toggle("active", screen.dataset.screen === name));
  navButtons.forEach((button) => button.classList.toggle("active", button.dataset.go === name));
  document.querySelector(".phone").scrollTo({ top: 0, behavior: "smooth" });
}

navigation.forEach((button) => {
  button.addEventListener("click", () => showScreen(button.dataset.go));
});
