require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('URL:', supabaseUrl);
console.log('Key length:', supabaseServiceKey ? supabaseServiceKey.length : 0);

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testConnection() {
  try {
    const { data, error } = await supabase.from('categories').select('count');
    if (error) {
      console.log('Error:', error.message);
    } else {
      console.log('Connection successful!');
    }
  } catch (e) {
    console.log('Exception:', e.message);
  }
}

testConnection();
