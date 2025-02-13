// File to retrieve the user's motivational message, or display a random one

// random messages
const motivationalMessages = [
    "Keep going, you're already further than you were yesterday.",
    "Not all who wander are lost.",
    "Progress is progress, no matter how small.",
    "The best time to start was yesterday, the next best time is now.",
    "You don't have to have it all figured out to take the next step.",
    "Some days are slow, but slow is still moving.",
    "The only real failure is never trying.",
    "Small steps still get you there.",
    "Mistakes mean you're trying. Keep at it.",
    "You don't need to be perfect, just consistent.",
    "Every expert was once a beginner.",
    "No rush, just direction.",
    "Growth isn't always obvious, but it's happening.",
    "You're stronger than you think, but no pressure.",
    "Hard days don't last forever.",
    "No one's keeping score but you.",
    "Take the win, even if it's small.",
    "Success is just a bunch of small wins stacked together.",
    "Done is better than perfect.",
    "You're doing better than you give yourself credit for."
];

// set the default message to something random
let index = Math.floor(Math.random() * motivationalMessages.length);
const defaultMessage = motivationalMessages[index];

document.addEventListener('DOMContentLoaded', () => {
    // Retrieve and display the custom motivational message
    chrome.storage.local.get(['motivationalMessage'], (result) => {
    
        // Randomly generate default message from a list
        let message = result.motivationalMessage;
        if (!message) message = defaultMessage;
        document.getElementById('custom-message').textContent = message;
    });

    // clean up the url
    history.replaceState(null, '', '#blocked');
});