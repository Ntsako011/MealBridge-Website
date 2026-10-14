import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

console.log("1. Script started loading...");

const supabase = createClient(
  'https://onjlnwbhwhfmjkizlaiv.supabase.co',
  'sb_publishable_PzkYbTjxnMyPPeImKAJLbw_MFgGLbMq'
);

console.log("2. Supabase client created");

async function loadDonations() {
  console.log("3. Trying to fetch donations...");
  const { data, error } = await supabase.from('donations').select('*');

  if (error) {
    console.error('4. Error received:', error);
    document.getElementById('donation-list').innerText = 'Error: ' + error.message;
    return;
  }

  console.log("5. Data received:", data);
  const list = document.getElementById('donation-list');
  
  if (!data || data.length === 0) {
    list.innerText = 'No donations found.';
    return;
  }

  list.innerHTML = data.map(d => `
    <div class="donation-card">
      <strong>${d.donor_name}</strong> — ${d.item || 'R' + d.amount}
      <span class="${d.status === 'RECEIVED' ? 'status-received' : 'status-pending'}">
        (${d.status})
      </span>
    </div>
  `).join('');
}

loadDonations();
