const surpriseButton = document.querySelector("#surprise-button");
const pickMessage = document.querySelector("#pick-message");
const dogCards = document.querySelectorAll(".dog-card");
const adoptForm = document.querySelector("#adopt-form");
const nameInput = document.querySelector("#dog-name");
const breedSelect = document.querySelector("#dog-breed");
const formMessage = document.querySelector("#form-message");
const dogProfile = document.querySelector("#dog-profile");
const careMessage = document.querySelector("#care-message");
let virtualDog = null;

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

function showProfileMessage(message, isError = false) {
  formMessage.textContent = message;
  formMessage.classList.toggle("is-error", isError);
}

function updateDogProfile() {
  document.querySelector("#profile-name").textContent = virtualDog.name;
  document.querySelector("#profile-breed").textContent = virtualDog.breed;
  document.querySelector("#profile-day").textContent = `Day ${virtualDog.day}`;
  document.querySelector("#profile-stage").textContent = virtualDog.stage;
  document.querySelector("#profile-happiness").textContent = `${virtualDog.happiness} / 100`;
}

function adoptDog(event) {
  event.preventDefault();
  const dogName = nameInput.value.trim();

  if (dogName.length === 0) {
    showProfileMessage("Please enter a name before adopting your dog.", true);
    nameInput.focus();
    return;
  }

  if (dogName.length > 20) {
    showProfileMessage("Please use a name with 20 characters or fewer.", true);
    nameInput.focus();
    return;
  }

  virtualDog = {
    name: dogName,
    breed: breedSelect.value,
    day: 1,
    stage: "Puppy",
    happiness: 50
  };

  updateDogProfile();
  dogProfile.hidden = false;
  careMessage.textContent = "Your new virtual dog is ready for some care.";
  showProfileMessage(`${virtualDog.name} has been adopted!`);
}

function increaseHappiness(activity) {
  if (!virtualDog) {
    return;
  }

  virtualDog.happiness = Math.min(100, virtualDog.happiness + 10);
  updateDogProfile();
  careMessage.textContent = `${virtualDog.name} ${activity}. Happiness: ${virtualDog.happiness} / 100.`;
}

adoptForm.addEventListener("submit", adoptDog);
document.querySelector("#feed-button").addEventListener("click", () => increaseHappiness("enjoyed a meal"));
document.querySelector("#play-button").addEventListener("click", () => increaseHappiness("had fun playing"));