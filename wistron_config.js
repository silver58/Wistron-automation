/* ═══════════════════════════════════════════════════════════════════════
 * WISTRON — Supabase configuration
 *
 * This file is configured for the Wistron Supabase project.
 * The publishable key below is client-side safe to commit.
 * ═══════════════════════════════════════════════════════════════════════ */

window.WISTRON_SB_URL = 'https://dijmfzwosmdmfggqpbko.supabase.co';

// Supabase now offers two key formats:
//   - Legacy "anon" JWT (eyJhbGc...)
//   - New "publishable" key (sb_publishable_...)
// Both go into the apikey + Authorization headers the same way.
window.WISTRON_SB_KEY = 'sb_publishable_sTGej7eI9mWQs16mkYeU7Q_x0sY6Rv7';

window.wistronHeaders = function(){
  return {
    'apikey': window.WISTRON_SB_KEY,
    'Authorization': 'Bearer ' + window.WISTRON_SB_KEY,
  };
};

// Master password for engineer-only screens (parts master, machine editing).
// Default password is '7012'. To change it, generate a SHA-256 hash of your
// new password (e.g. at https://emn178.github.io/online-tools/sha256.html)
// and paste it as WISTRON_PW_HASH. Until then, '7012' works.
window.WISTRON_PW_HASH = 'REPLACE_WITH_HASH_OF_YOUR_PASSWORD';
window.WISTRON_PW_PLAINTEXT_DEFAULT = '7012';
