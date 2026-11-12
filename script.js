const surpriseButton = document.querySelector("#surprise-button");
const pickMessage = document.querySelector("#pick-message");
const dogCards = document.querySelectorAll(".dog-card");
const adoptForm = document.querySelector("#adopt-form");
const nameInput = document.querySelector("#dog-name");
const breedSelect = document.querySelector("#dog-breed");
const formMessage = document.querySelector("#form-message");
const dogProfile = document.querySelector("#dog-profile");
const careMessage = document.querySelector("#care-message");
const storageKey = "virtualDogParkPetV1";
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
  const growthStage = getGrowthStage(virtualDog.day);
  const growthProgress = Math.min(virtualDog.day, 4) / 4 * 100;

  document.querySelector("#profile-name").textContent = virtualDog.name;
  document.querySelector("#profile-breed").textContent = virtualDog.breed;
  document.querySelector("#profile-day").textContent = `Day ${virtualDog.day}`;
  document.querySelector("#profile-stage").textContent = growthStage;
  document.querySelector("#profile-happiness").textContent = `${virtualDog.happiness} / 100`;
  document.querySelector("#growth-fill").style.width = `${growthProgress}%`;
  document.querySelector("#growth-track").setAttribute("aria-valuenow", Math.min(virtualDog.day, 4));
  document.querySelector("#growth-track").setAttribute("aria-valuetext", growthStage);
}

function getGrowthStage(day) {
  if (day === 1) {
    return "Puppy";
  }

  if (day <= 3) {
    return "Young Dog";
  }

  return "Adult Dog";
}

function saveDog() {
  const savedDog = {
    name: virtualDog.name,
    breed: virtualDog.breed,
    day: virtualDog.day,
    happiness: virtualDog.happiness
  };

  localStorage.setItem(storageKey, JSON.stringify(savedDog));
}

function restoreDog() {
  const savedData = localStorage.getItem(storageKey);
  if (!savedData) {
    return;
  }

  try {
    const savedDog = JSON.parse(savedData);
    const knownBreeds = ["Beagle", "Golden Retriever", "Poodle"];
    const validDog = savedDog &&
      typeof savedDog.name === "string" && savedDog.name.trim().length > 0 && savedDog.name.length <= 20 &&
      knownBreeds.includes(savedDog.breed) &&
      Number.isInteger(savedDog.day) && savedDog.day >= 1 &&
      Number.isInteger(savedDog.happiness) && savedDog.happiness >= 0 && savedDog.happiness <= 100;

    if (!validDog) {
      localStorage.removeItem(storageKey);
      return;
    }

    virtualDog = savedDog;
    updateDogProfile();
    dogProfile.hidden = false;
    careMessage.textContent = "Welcome back! Your dog's progress has been restored.";
  } catch {
    localStorage.removeItem(storageKey);
  }
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
    happiness: 50
  };

  saveDog();
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
  saveDog();
  updateDogProfile();
  careMessage.textContent = `${virtualDog.name} ${activity}. Happiness: ${virtualDog.happiness} / 100.`;
}

function advanceDay() {
  if (!virtualDog) {
    return;
  }

  virtualDog.day += 1;
  virtualDog.happiness = Math.max(0, virtualDog.happiness - 5);
  saveDog();
  updateDogProfile();
  careMessage.textContent = `Day ${virtualDog.day}: ${virtualDog.name} is now a ${getGrowthStage(virtualDog.day)}. Happiness: ${virtualDog.happiness} / 100.`;
}

function startOver() {
  const confirmed = window.confirm("Are you sure you want to delete your dog's saved progress and start over?");
  if (!confirmed) {
    return;
  }

  localStorage.removeItem(storageKey);
  virtualDog = null;
  dogProfile.hidden = true;
  adoptForm.reset();
  careMessage.textContent = "";
  showProfileMessage("Saved progress cleared. You can adopt a new dog.");
}

adoptForm.addEventListener("submit", adoptDog);
document.querySelector("#feed-button").addEventListener("click", () => increaseHappiness("enjoyed a meal"));
document.querySelector("#play-button").addEventListener("click", () => increaseHappiness("had fun playing"));
document.querySelector("#next-day-button").addEventListener("click", advanceDay);
document.querySelector("#start-over-button").addEventListener("click", startOver);
restoreDog();