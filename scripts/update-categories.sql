-- ========================================
-- MZ세대의 식습관 블로그 카테고리 업데이트
-- 작성일: 2025-01-27
-- ========================================

-- 기존 카테고리 업데이트 (일상 카테고리는 유지)
UPDATE categories SET 
    name = '영양',
    slug = 'nutrition',
    description = '영양소와 건강한 식품에 대한 정보',
    color = '#10b981'
WHERE slug = 'general';

UPDATE categories SET 
    name = '레시피',
    slug = 'recipe',
    description = '간단하고 건강한 요리 레시피',
    color = '#f59e0b'
WHERE slug = 'tech';

UPDATE categories SET 
    name = '건강관리',
    slug = 'health',
    description = '운동과 건강한 생활습관 팁',
    color = '#ef4444'
WHERE slug = 'development';

-- 일상 카테고리는 그대로 유지
-- UPDATE categories SET 
--     name = '일상',
--     slug = 'daily',
--     description = '일상적인 이야기와 경험 공유',
--     color = '#8b5cf6'
-- WHERE slug = 'daily';

-- 업데이트 확인
SELECT name, slug, description, color FROM categories ORDER BY created_at;

-- 완료 메시지
DO $$
BEGIN
    RAISE NOTICE '========================================';
    RAISE NOTICE '✅ MZ세대의 식습관 블로그 카테고리 업데이트 완료!';
    RAISE NOTICE '📊 업데이트된 카테고리:';
    RAISE NOTICE '  • 영양 (nutrition) - 영양소와 건강한 식품';
    RAISE NOTICE '  • 레시피 (recipe) - 간단하고 건강한 요리';
    RAISE NOTICE '  • 일상 (daily) - 일상 이야기 (기존 유지)';
    RAISE NOTICE '  • 건강관리 (health) - 운동과 생활습관';
    RAISE NOTICE '========================================';
END $$;
