// automod.js – placeholder logic for saving settings

document.getElementById('saveAutomod').onclick = () => {
  const settings = {
    wordDetect: document.getElementById('wordDetectToggle').checked,
    blockedWords: document.getElementById('blockedWords').value.split(',').map(w => w.trim()),

    spamDetect: document.getElementById('spamDetectToggle').checked,
    spamLimit: parseInt(document.getElementById('spamLimit').value, 10),

    linkFilter: document.getElementById('linkFilterToggle').checked,
    allowedDomains: document.getElementById('allowedDomains').value.split(',').map(d => d.trim()),

    capsLock: document.getElementById('capsLockToggle').checked,
    capsPercent: parseInt(document.getElementById('capsPercent').value, 10)
  };

  console.log('Automod settings:', settings);
  alert('Settings saved (placeholder).');
};