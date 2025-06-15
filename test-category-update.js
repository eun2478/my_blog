require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Try with service role key if available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Service key available:', !!supabaseServiceKey);
console.log('Anon key available:', !!supabaseAnonKey);

// Use service key if available, otherwise anon key
const supabase = createClient(
  supabaseUrl, 
  supabaseServiceKey || supabaseAnonKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

async function testCategoryUpdate() {
  try {
    // First, fetch one category to update
    const { data: categories, error: fetchError } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', 'general')
      .limit(1);

    if (fetchError) {
      console.error('Fetch error:', fetchError);
      return;
    }

    if (!categories || categories.length === 0) {
      console.log('No categories found with slug "general"');
      return;
    }

    const category = categories[0];
    console.log('Original category:', category);

    // Try to update it
    const { data: updateResult, error: updateError } = await supabase
      .from('categories')
      .update({
        name: '영양',
        slug: 'nutrition',
        description: '영양소와 건강한 식품에 대한 정보',
        color: '#10b981'
      })
      .eq('id', category.id)
      .select();

    if (updateError) {
      console.error('Update error:', updateError);
    } else {
      console.log('Update successful:', updateResult);
    }

    // Verify the update
    const { data: verifyResult, error: verifyError } = await supabase
      .from('categories')
      .select('*')
      .eq('id', category.id);

    if (verifyError) {
      console.error('Verify error:', verifyError);
    } else {
      console.log('Verification result:', verifyResult);
    }

  } catch (error) {
    console.error('Exception:', error);
  }
}

testCategoryUpdate();
