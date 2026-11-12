# Virtual Dog Park

A beginner-friendly static website project for AIE1101, built with HTML, CSS, and vanilla JavaScript. Visitors can explore a dog encyclopedia and adopt and care for one virtual dog.

## Features
- Browse notes about Beagles, Golden Retrievers, and Poodles.
- Adopt one virtual dog by choosing a breed and entering a name.
- Feed and play with the dog to increase happiness.
- Advance days to see the dog's growth stage change.
- Save one dog's progress in the browser and restore it after a refresh.
- View project-created SVG illustrations. These are original illustrations, not real dog photographs.

## Preview

1. Open this project folder in Visual Studio Code.
2. Install the **Live Server** extension if it is not already installed.
3. Right-click `index.html` in the Explorer and select **Open with Live Server**.
4. The page opens in your browser. Live Server will refresh it when you save changes.

## Growth and Happiness Rules

- A new dog starts on Day 1 as a Puppy with 50 happiness.
- Days 2 and 3 are the Young Dog stage. Day 4 and later are the Adult Dog stage.
- Each Feed or Play action adds 10 happiness, up to a maximum of 100.
- Each Next Day action adds one day and removes 5 happiness, down to a minimum of 0.

## Saved Progress

The dog's name, breed, day, and happiness are saved in this browser's local storage under `virtualDogParkPetV1`. The progress stays in this browser on this device; it is not uploaded to or saved in a GitHub account. Clearing the browser's site data or using another browser may remove or not show the saved dog.

## Manual Testing Checklist

- [ ] Open the page with Live Server and check that all three encyclopedia illustrations appear with useful alternative text.
- [ ] Use **Pick for me** and confirm that a dog card is selected and named in the message.
- [ ] Try adopting with an empty name and a name containing only spaces; confirm that a helpful message appears.
- [ ] Adopt a dog with a name that has spaces at either end; confirm the displayed name is trimmed and the profile starts on Day 1 with 50 happiness.
- [ ] Feed and Play; confirm happiness increases by 10 each time and never exceeds 100.
- [ ] Advance from Day 1 to Day 2, Day 3, and Day 4; confirm the stage text changes from Puppy to Young Dog to Adult Dog.
- [ ] Continue advancing days until happiness reaches 0; confirm it does not become negative.
- [ ] Refresh the page and confirm the same dog's progress returns.
- [ ] Choose **Start Over**, cancel the confirmation, and confirm progress remains; repeat and confirm to clear the saved dog.
- [ ] Check that the page and controls remain usable at phone and laptop widths.

## My First Update

Learning Git version control.

## Development Notes

I have learned how to use Git and GitHub.