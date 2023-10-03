const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
  window.deferredPrompt = event;

  butInstall.classList.toggle('hidden', false);
});

//Event handler for `butInstall` element
butInstall.addEventListener('click', async () => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    return;
  }

  promptEvent.promt();

  window.deferredPrompt = null;

  butInstall.deferredPrompt = null;

  butInstall.classList.toggle('hidden', true);
});

// Handler for the `appinstalled` event that clears prompt
window.addEventListener('appinstalled', (event) => {
  window.defferedPrompt = null;
});
