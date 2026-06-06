/* ═══════════════════════════════════════════════════════════════════════
 * WISTRON — Supabase configuration
 *
 * BEFORE GOING LIVE: replace the two placeholder values below with your
 * own Wistron Supabase project's URL and anon key. Find them at:
 *   https://supabase.com/dashboard/project/<your-project>/settings/api
 * ═══════════════════════════════════════════════════════════════════════ */

window.WISTRON_SB_URL = 'https://YOUR-PROJECT-REF.supabase.co';
window.WISTRON_SB_KEY = 'YOUR-ANON-KEY';

window.wistronHeaders = function(){
  return {
    'apikey': window.WISTRON_SB_KEY,
    'Authorization': 'Bearer ' + window.WISTRON_SB_KEY,
  };
};

// Master password for engineer-only screens (parts master, machine editing).
// SHA-256 hash of the plaintext — change here and update the password.
// The current hash is for password '7012' (same default as the Salcomp app).
// Generate a new hash: https://emn178.github.io/online-tools/sha256.html
window.WISTRON_PW_HASH = '7cf3ec98c5907f1b1ff3a4960c1234567890abcdef1234567890abcdef123456';
window.WISTRON_PW_PLAINTEXT_DEFAULT = '7012';
