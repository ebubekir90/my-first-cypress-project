const SUPABASE_URL = 'https://rjjnqfkldqarppskdwwl.supabase.co';
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqam5xZmtsZHFhcnBwc2tkd3dsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2MTE0OTksImV4cCI6MjA5NzE4NzQ5OX0.bAI1TUA6Xrtk7I5r5a5QUsjPry_5EYg9z1au6xWL94Q';

async function login(email, password) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: {
      'apikey': ANON_KEY,
      'authorization': `Bearer ${ANON_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const body = await res.json();
  return { status: res.status, body };
}

async function restGet(token, path) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    method: 'GET',
    headers: {
      'apikey': ANON_KEY,
      'authorization': `Bearer ${token}`,
    },
  });
  const text = await res.text();
  console.log(`\n[GET /rest/v1/${path}] status=${res.status}`);
  console.log(text.slice(0, 800));
}

(async () => {
  const ok = await login('student01@zinc.test', '9pJolA7GBQec');
  const token = ok.body.access_token;

  const candidates = [
    'transfers', 'bill_payments', 'statements', 'card_statements',
    'scheduled_payments', 'support_tickets', 'notifications',
    'applications', 'account_requests', 'savings_accounts',
    'checking_accounts', 'transactions', 'payees', 'accounts',
    'profiles', 'user_roles', 'cards', 'card_applications',
    'recipients', 'beneficiaries', 'transfers_out', 'external_accounts',
    'tags', 'categories', 'budgets', 'transfers_in', 'pending_transfers',
  ];
  for (const t of candidates) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${t}?select=*&limit=1`, {
      method: 'GET',
      headers: { 'apikey': ANON_KEY, 'authorization': `Bearer ${token}` },
    });
    console.log(`${res.status === 200 ? 'OK ' : '   '} /rest/v1/${t} -> ${res.status}`);
  }
})();
