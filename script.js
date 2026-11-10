const surpriseButton = document.querySelector("#surprise-button");
const pickMessage = document.querySelector("#pick-message");
const dogCards = document.querySelectorAll(".dog-card");

surpriseButton.addEventListener("click", () => {
  const previousPick = document.querySelector(".dog-card.is-picked");
  if (previousPick) {
    previousPick.classList.remove("is-picked");
  }

  const randomIndex = Math.floor(Math.random() * dogCards.length);
  const chosenDog = dogCards[randomIndex];
  const dogName = chosenDog.querySelector("h3").textContent;

  chosenDog.classList.add("is-picked");
  pickMessage.textContent = `Today's park pal: ${dogName}!`;
  chosenDog.scrollIntoView({ behavior: "smooth", block: "center" });
});