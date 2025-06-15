/**
 * MZ세대의 식습관 블로그 카테고리 업데이트 스크립트
 * 작성일: 2025-01-27
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// 환경변수에서 Supabase 설정 가져오기
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ 환경변수가 설정되지 않았습니다.');
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '설정됨' : '누락');
  console.error('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '설정됨' : '누락');
  process.exit(1);
}

// Supabase 클라이언트 생성 (서비스 키 사용)
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// 새로운 카테고리 정보
const categoryUpdates = [
  {
    oldSlug: 'general',
    newData: {
      name: '영양',
      slug: 'nutrition',
      description: '영양소와 건강한 식품에 대한 정보',
      color: '#10b981'
    }
  },
  {
    oldSlug: 'tech',
    newData: {
      name: '레시피',
      slug: 'recipe',
      description: '간단하고 건강한 요리 레시피',
      color: '#f59e0b'
    }
  },
  {
    oldSlug: 'development',
    newData: {
      name: '건강관리',
      slug: 'health',
      description: '운동과 건강한 생활습관 팁',
      color: '#ef4444'
    }
  }
  // 'daily' 카테고리는 그대로 유지
];

async function updateCategories() {
  console.log('🚀 MZ세대의 식습관 블로그 카테고리 업데이트 시작...');
  console.log('');

  try {
    // 현재 카테고리 상태 확인
    console.log('📋 현재 카테고리 상태 확인 중...');
    const { data: currentCategories, error: selectError } = await supabase
      .from('categories')
      .select('*')
      .order('created_at');

    if (selectError) {
      throw new Error(`카테고리 조회 실패: ${selectError.message}`);
    }

    console.log('현재 카테고리:', currentCategories.map(cat => `${cat.name} (${cat.slug})`).join(', '));
    console.log('');

    // 각 카테고리 업데이트
    for (const update of categoryUpdates) {
      console.log(`🔄 "${update.oldSlug}" 카테고리를 "${update.newData.name}"으로 업데이트 중...`);
      
      const { data, error } = await supabase
        .from('categories')
        .update(update.newData)
        .eq('slug', update.oldSlug)
        .select();

      if (error) {
        console.error(`❌ ${update.oldSlug} 업데이트 실패:`, error.message);
        continue;
      }

      if (data && data.length > 0) {
        console.log(`✅ ${update.oldSlug} → ${update.newData.name} (${update.newData.slug}) 업데이트 완료`);
      } else {
        console.log(`⚠️ ${update.oldSlug} 카테고리를 찾을 수 없습니다.`);
      }
    }

    console.log('');

    // 업데이트 후 상태 확인
    console.log('📋 업데이트 후 카테고리 상태 확인 중...');
    const { data: updatedCategories, error: finalSelectError } = await supabase
      .from('categories')
      .select('*')
      .order('created_at');

    if (finalSelectError) {
      throw new Error(`최종 조회 실패: ${finalSelectError.message}`);
    }

    console.log('');
    console.log('🎉 카테고리 업데이트 완료!');
    console.log('📊 최종 카테고리 목록:');
    updatedCategories.forEach(cat => {
      console.log(`  • ${cat.name} (${cat.slug}) - ${cat.description}`);
    });

  } catch (error) {
    console.error('❌ 카테고리 업데이트 중 오류 발생:', error.message);
    process.exit(1);
  }
}

// 스크립트 실행
updateCategories();
