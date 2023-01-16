const butInstall = document.getElementById("buttonInstall");

// Functions for installing the application

// Run if the application is not installed
window.addEventListener('beforeinstallprompt', (event) => {
    // Store the event
    window.deferredPrompt = event;
    // Get rid of the hidden class for the "install" button.
    butInstall.classList.toggle('hidden', false);
});

// Run if a user click the "install" button
butInstall.addEventListener('click', async () => {
    
    // Deffered prompt
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        return;
    }
    // Show prompt
    promptEvent.prompt();
    // Define prompt as null value
    window.deferredPrompt = null;

    // Remain the hidden class for the button.
    butInstall.classList.toggle('hidden', true);
});

// Run if the user has already installed this application.
window.addEventListener('appinstalled', (event) => {
    // Define prompt as null value
    window.deferredPrompt = null;
}); 