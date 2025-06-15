/**
 * 카테고리 관리 페이지
 * MZ세대의 식습관 블로그 카테고리 업데이트를 위한 관리자 페이지
 */

'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Loader2, Save, RefreshCw } from 'lucide-react';
import { useUser } from '@clerk/nextjs';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  color: string;
}

// MZ세대 식습관 블로그에 맞는 새로운 카테고리 정보
const newCategoryData = [
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

export default function CategoryManagePage() {
  const { user, isSignedIn } = useUser();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState('');

  // 카테고리 목록 조회
  const loadCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/categories');
      if (!response.ok) {
        throw new Error('카테고리 조회 실패');
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('카테고리 로드 오류:', error);
      setMessage('카테고리를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 카테고리 업데이트
  const updateCategories = async () => {
    try {
      setUpdating(true);
      setMessage('카테고리를 업데이트하는 중...');

      for (const update of newCategoryData) {
        const category = categories.find(cat => cat.slug === update.oldSlug);
        if (!category) {
          console.log(`카테고리 ${update.oldSlug}를 찾을 수 없습니다.`);
          continue;
        }

        const response = await fetch(`/api/categories/${category.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(update.newData),
        });

        if (!response.ok) {
          throw new Error(`${update.oldSlug} 업데이트 실패`);
        }

        console.log(`✅ ${update.oldSlug} → ${update.newData.name} 업데이트 완료`);
      }

      setMessage('🎉 모든 카테고리가 성공적으로 업데이트되었습니다!');
      await loadCategories(); // 업데이트 후 다시 로드
    } catch (error) {
      console.error('카테고리 업데이트 오류:', error);
      setMessage('❌ 카테고리 업데이트 중 오류가 발생했습니다.');
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  if (!isSignedIn) {
    return (
      <div className="py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">접근 권한이 없습니다</h1>
          <p className="text-muted-foreground">관리자 권한이 필요합니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">카테고리 관리</h1>
          <p className="text-muted-foreground">
            MZ세대의 식습관 블로그에 맞게 카테고리를 업데이트합니다.
          </p>
        </div>

        {/* 현재 카테고리 상태 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              현재 카테고리
              <Button
                variant="outline"
                size="sm"
                onClick={loadCategories}
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                새로고침
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin mr-2" />
                카테고리를 불러오는 중...
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: category.color }}
                      />
                      <h3 className="font-medium">{category.name}</h3>
                      <Badge variant="secondary">{category.slug}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {category.description || '설명 없음'}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* 업데이트 계획 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>업데이트 계획</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {newCategoryData.map((update) => (
                <div key={update.oldSlug} className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">
                        "{update.oldSlug}" → "{update.newData.name}"
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {update.newData.description}
                      </p>
                    </div>
                    <div
                      className="w-6 h-6 rounded"
                      style={{ backgroundColor: update.newData.color }}
                    />
                  </div>
                </div>
              ))}
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-800">
                  "daily" (일상) → 변경 없음
                </h4>
                <p className="text-sm text-green-600 mt-1">
                  일상 카테고리는 그대로 유지됩니다.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 업데이트 실행 */}
        <Card>
          <CardHeader>
            <CardTitle>카테고리 업데이트 실행</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {message && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-800">{message}</p>
                </div>
              )}
              
              <Button
                onClick={updateCategories}
                disabled={updating || loading}
                className="w-full"
              >
                {updating ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                카테고리 업데이트 실행
              </Button>
              
              <p className="text-sm text-muted-foreground">
                이 작업은 기존 카테고리의 이름, 슬러그, 설명, 색상을 변경합니다. 
                게시물과의 연결은 유지됩니다.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
