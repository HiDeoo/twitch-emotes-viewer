/**
 * Triggered when the emote url input is modified.
 * @param  {Event} event The associated event.
 */
function emoteUrlHandler(event) {
  var url = event.target.value.length > 0 ? event.target.value : 'https://static-cdn.jtvnw.net/emoticons/v1/12/1.0';

  var customEmotes = document.getElementsByClassName('customEmote');

  for(var i = 0; i < customEmotes.length; i++) {
    customEmotes[i].src = url;
  }
}

/**
 * Triggered when the icon url input is modified.
 * @param  {event} event The associated event.
 */
function iconUrlHandler(event) {
  var url = event.target.value.length > 0 ? event.target.value : 'https://static-cdn.jtvnw.net/jtv_user_pictures/subscriber-star.png';

  var customIcons = document.getElementsByClassName('subscriber');

  for(var i = 0; i < customIcons.length; i++) {
    customIcons[i].style.backgroundImage = 'url(' + url + ')';
  }
}

/**
 * Shares a ready-to-use url contaning the icon & emote URLs.
 *
 * The generated url is copied to the clipboard if possible.
 */
function shareHandler() {
  var url = window.location.origin + window.location.pathname;

  var iconUrl = document.getElementById('iconUrlInput').value;
  var emoteUrl = document.getElementById('emoteUrlInput').value;

  if (iconUrl.length === 0 && emoteUrl.length === 0) {
    log('Nothing to share. Change the icon or emote URLs.');

    return;
  }

  var queryString = '';

  if (iconUrl.length > 0) {
    queryString += 'icon=' + encodeURIComponent(iconUrl);
  }

  if (emoteUrl.length > 0) {
    if (queryString.length > 0) {
      queryString += '&';
    }

    queryString += 'emote=' + encodeURIComponent(emoteUrl);
  }

  copyTextToClipboard(url + '?' + queryString);
}

/**
 * Copies text to the clipboard.
 * @param  {string} text The text to copy to the clipboard.
 */
function copyTextToClipboard(text) {
  var textArea = document.createElement("textarea");

  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;
  textArea.style.width = '2em';
  textArea.style.height = '2em';
  textArea.style.padding = 0;
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';
  textArea.style.background = 'transparent';

  textArea.value = text;

  document.body.appendChild(textArea);

  textArea.select();

  var errorMessage = 'Sorry, unable to copy to your clipboard.';

  try {
    var successful = document.execCommand('copy');

    log(successful ? 'Successfully copied the URL to you clipboard.' : errorMessage);
  } catch (err) {
    log(errorMessage);
  }

  document.body.removeChild(textArea);
}

/**
 * Logs a message.
 * @param  {string} message The message to log.
 */
function log(message) {
  var logElement = document.getElementById('log');

  logElement.innerHTML = message;

  setTimeout(function () {
    logElement.innerHTML = '';
  }, 3000);
}

/**
 * Here we go!
 */
document.addEventListener("DOMContentLoaded", function() {
  var iconUrlInput = document.getElementById('iconUrlInput');
  iconUrlInput.oninput = iconUrlHandler;

  var emoteUrlInput = document.getElementById('emoteUrlInput');
  emoteUrlInput.oninput = emoteUrlHandler;

  var parameters = new URLSearchParams(window.location.search);

  if (parameters.has('icon')) {
    iconUrlInput.value = parameters.get('icon');
    iconUrlInput.dispatchEvent(new Event('input'));
  }

  if (parameters.has('emote')) {
    emoteUrlInput.value = parameters.get('emote');
    emoteUrlInput.dispatchEvent(new Event('input'));
  }
});
