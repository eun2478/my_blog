/**
 * 소개 페이지 컴포넌트
 * 블로그 운영자의 정보와 블로그 목적을 소개
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Heart, Users, BookOpen } from 'lucide-react';
import type { Metadata } from 'next';

// 페이지 메타데이터
export const metadata: Metadata = {
  title: '소개 | MZ세대의 식습관',
  description: '한신대학교 공공인재학부 김성은의 건강 블로그 소개',
  openGraph: {
    title: '소개 | MZ세대의 식습관',
    description: '한신대학교 공공인재학부 김성은의 건강 블로그 소개',
  },
};

export default function AboutPage() {
  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto">
        {/* 페이지 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            소개
          </h1>
          <p className="text-lg text-muted-foreground">
            건강한 식습관을 함께 만들어가는 공간입니다
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* 프로필 카드 */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                프로필
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">김성은</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">한신대학교</Badge>
                    <span className="text-sm text-muted-foreground">공공인재학부</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">2학년</Badge>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span className="font-medium">관심 분야</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  건강한 생활습관과 올바른 식습관에 대해 관심이 많습니다.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 블로그 소개 카드 */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                블로그 소개
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                안녕하세요! 건강에 관심이 있는 대학생 김성은입니다. 
                이 블로그는 MZ세대의 식습관과 건강한 라이프스타일에 대해 
                함께 이야기하고 정보를 공유하는 공간입니다.
              </p>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                바쁜 대학생활 속에서도 건강을 챙기는 방법, 
                합리적인 가격으로 영양가 있는 식사를 하는 팁, 
                그리고 건강한 습관을 만들어가는 과정을 함께 나누고 싶습니다.
              </p>

              <div className="border-t pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">함께해요!</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  건강에 관심이 있는 분들은 함께 건강 지식에 대해 공유해보아요. 
                  댓글이나 메시지를 통해 소통하며 서로의 건강한 습관을 
                  응원하고 격려하는 커뮤니티를 만들어가고 싶습니다.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 추가 정보 섹션 */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>블로그 목표</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl mb-2">🥗</div>
                <h3 className="font-medium mb-1">건강한 식습관</h3>
                <p className="text-xs text-muted-foreground">
                  MZ세대에게 맞는 실용적인 식습관 정보 공유
                </p>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl mb-2">💪</div>
                <h3 className="font-medium mb-1">건강 관리</h3>
                <p className="text-xs text-muted-foreground">
                  바쁜 일상 속에서도 실천 가능한 건강 관리법
                </p>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl mb-2">🤝</div>
                <h3 className="font-medium mb-1">정보 공유</h3>
                <p className="text-xs text-muted-foreground">
                  서로의 경험과 지식을 나누는 소통의 장
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
