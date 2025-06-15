require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function updateCategories() {
  console.log('🚀 MZ세대의 식습관 블로그 카테고리 업데이트 시작...');
  
  try {
    // 1. Check current categories
    console.log('📋 현재 카테고리 상태 확인 중...');
    const { data: currentCategories, error: fetchError } = await supabase
      .from('categories')
      .select('*')
      .order('created_at', { ascending: true });

    if (fetchError) {
      throw new Error(`카테고리 조회 실패: ${fetchError.message}`);
    }

    console.log('현재 카테고리:', currentCategories);

    // 2. Category updates mapping
    const categoryUpdates = {
      'general': {
        name: '영양',
        slug: 'nutrition',
        description: '영양소와 건강한 식품에 대한 정보',
        color: '#10b981'
      },
      'tech': {
        name: '레시피',
        slug: 'recipe',
        description: '간단하고 건강한 요리 레시피',
        color: '#f59e0b'
      },
      'development': {
        name: '건강관리',
        slug: 'health',
        description: '운동과 건강한 생활습관 팁',
        color: '#ef4444'
      }
    };

    // 3. Update each category
    for (const category of currentCategories) {
      if (categoryUpdates[category.slug]) {
        const updateData = categoryUpdates[category.slug];
        
        console.log(`🔄 카테고리 업데이트: ${category.name} -> ${updateData.name}`);
          const { data, error } = await supabase
          .from('categories')
          .update(updateData)
          .eq('id', category.id)
          .select();

        if (error) {
          console.error(`❌ ${category.name} 업데이트 실패:`, error.message);
        } else {
          console.log(`✅ ${updateData.name} 업데이트 성공`);
        }
      }
    }

    // 4. Final verification
    console.log('📋 업데이트 후 카테고리 상태 확인 중...');
    const { data: updatedCategories, error: finalError } = await supabase
      .from('categories')
      .select('*')
      .order('created_at', { ascending: true });

    if (finalError) {
      throw new Error(`최종 확인 실패: ${finalError.message}`);
    }

    console.log('🎉 카테고리 업데이트 완료!');
    console.log('업데이트된 카테고리:', updatedCategories);

  } catch (error) {
    console.error('❌ 카테고리 업데이트 중 오류 발생:', error.message);
    process.exit(1);
  }
}

updateCategories();
