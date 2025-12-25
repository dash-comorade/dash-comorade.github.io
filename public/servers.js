import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Supabase client
const supabase = createClient(
  "https://rdjswpbdqxmhrajcosfp.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." // your anon key
);

// DOM target
const guildsContainer = document.getElementById("guilds");

// Load user + guilds
(async () => {
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    guildsContainer.innerHTML = `<p>Not logged in. Please <a href="/">login</a>.</p>`;
    return;
  }

  const { data: session } = await supabase.auth.getSession();
  const accessToken = session?.session?.provider_token;

  if (!accessToken) {
    guildsContainer.innerHTML = `<p>Missing Discord token. Try logging in again.</p>`;
    return;
  }

  // Fetch guilds from Discord
  const res = await fetch("https://discord.com/api/users/@me/guilds", {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  const guilds = await res.json();

  if (!Array.isArray(guilds)) {
    guildsContainer.innerHTML = `<p>Failed to load servers.</p>`;
    return;
  }

  // Render guild cards
  guildsContainer.innerHTML = guilds.map(guild => `
    <div class="guild-card">
      <h3>${guild.name}</h3>
      <p>ID: ${guild.id}</p>
      <a class="manage-button" href="/dashboard/${guild.id}">Manage</a>
    </div>
  `).join("");
})();