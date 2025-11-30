# MyHomeFinApp 프로젝트 분석 보고서

## 📌 프로젝트 개요

**MyHomeFin**은 **개인 자산 및 투자 포트폴리오 관리 웹 애플리케이션**으로, Toss 스타일의 깔끔하고 직관적인 UI로 설계되었습니다. 주식(국내/해외), 부동산, 예적금, 금융상품 등의 자산을 모니터링하고 관리할 수 있습니다.

**현재 상태**: 부분 완성 - 주식 모듈만 완전히 구현되어 있고, 나머지 모듈(부동산, 은행, 카드, 가계부)은 플레이스홀더 상태입니다.

---

## 🛠️ 기술 스택

### Frontend
- **React 19.2.0** + **TypeScript 5.9.3**
- **Vite 7.2.4** (빌드 도구)
- **Tailwind CSS 4.1.17** (스타일링)
- **Recharts 3.5.1** (차트 라이브러리)
- **Lucide React** (아이콘)

### 배포
- **Docker** + **Nginx Alpine**
- Multi-stage 빌드로 최적화

---

## 📁 주요 디렉토리 구조

```
myHomeFinApp/
├── src/
│   ├── components/          # React 컴포넌트
│   │   ├── StockDashboard.tsx    # 주식 모듈 (핵심)
│   │   ├── Sidebar.tsx           # 데스크톱 네비게이션
│   │   ├── BottomNav.tsx         # 모바일 네비게이션
│   │   ├── AssetChart.tsx        # 자산 차트
│   │   └── StockItem.tsx         # 개별 주식 항목
│   ├── data/mockData.ts     # 목 데이터
│   ├── types/index.ts       # TypeScript 타입 정의
│   └── App.tsx              # 루트 컴포넌트
├── Dockerfile               # Docker 설정
├── docker-compose.yml
└── PROJECT_GUIDE.md         # 한글 프로젝트 가이드
```

---

## 🎯 주요 기능

### ✅ 완전히 구현된 기능

1. **반응형 디자인**
   - Mobile-first 접근 (768px 브레이크포인트)
   - 모바일은 하단 네비게이션, 데스크톱은 사이드바

2. **주식 포트폴리오 관리**
   - 국내/해외 주식 탭 분리
   - 확장 가능한 주식 항목 (클릭 시 상세 정보)
   - 실시간 포트폴리오 요약 (수익/손실)

3. **다중 통화 지원**
   - KRW/USD 전환 표시
   - 환율 설정 가능 (기본값: 1400원)
   - 모든 계산은 KRW 기준으로 정규화

4. **데이터 시각화**
   - Area 차트로 자산 추이 표시
   - 수익은 빨강, 손실은 파랑 색상 구분
   - 기간 필터 버튼 (1주/1개월/1년 - UI만 구현)

5. **금융 계산**
   - `useMemo`를 사용한 포트폴리오 요약 계산 최적화
   - 주식별 수익/손실 자동 계산
   - 환율 기반 통화 자동 변환

### ⏳ 미구현 기능
- 홈/부동산/은행/카드/가계부 모듈 (플레이스홀더만)
- 거래 추가 기능 (FAB 버튼은 alert만 표시)
- 백엔드 API 연동 (목 데이터만 사용)
- 데이터 영구 저장 (데이터베이스 없음)
- 사용자 인증
- 차트 기간 필터 실제 동작

---

## 🏗️ 아키텍처 특징

### 상태 관리
- **Props 기반**: Redux/Context API 대신 단순한 prop drilling
- **로컬 상태**: React hooks (useState, useMemo)
- **단방향 데이터 플로우**: 부모 → 자식

### 컴포넌트 구조
```
App.tsx (전역 상태)
  ↓
StockDashboard.tsx (모듈 상태)
  ├→ Header.tsx (환율 표시)
  ├→ TabMenu.tsx (탭 선택)
  ├→ SummaryCard.tsx (포트폴리오 요약)
  ├→ AssetChart.tsx (차트)
  └→ StockList.tsx
      └→ StockItem.tsx (개별 주식)
```

### 통화 변환 로직
- **정규화 전략**: 모든 계산을 먼저 KRW로 수행
- **2단계 변환**: USD 주식 → KRW (곱하기) → 필요시 USD 표시 (나누기)

---

## 📊 데이터 모델

### 핵심 TypeScript 인터페이스

**src/types/index.ts**:

```typescript
type Currency = 'KRW' | 'USD';

interface Stock {
  id: string;           // 고유 ID
  name: string;         // 주식명
  ticker: string;       // 티커 심볼
  currentPrice: number; // 현재가
  currency: Currency;   // 'KRW' 또는 'USD'
  quantity: number;     // 보유 수량
  avgPrice: number;     // 평균 매입가
  changeRate: number;   // 등락률
  logoUrl?: string;     // 선택적 로고 URL
}

interface AssetHistory {
  date: string;         // 'YYYY-MM-DD' 형식
  value: number;        // KRW 기준 총 자산 가치
}

interface PortfolioSummary {
  totalValue: number;        // 총 평가액
  totalProfitLoss: number;   // 총 손익
  totalReturnRate: number;   // 수익률
}
```

### 목 데이터

**src/data/mockData.ts**:
- **국내 주식 4개**: 삼성전자, SK하이닉스, 네이버, 카카오
- **해외 주식 4개**: 애플, 테슬라, 마이크로소프트, 엔비디아
- **자산 추이 데이터**: 2023년 11월 1일~29일 (7개 데이터 포인트)

---

## 🎨 주요 컴포넌트 상세

### 1. App.tsx (루트 컴포넌트)
- 전역 상태 관리 (`useState` 사용)
- 간단한 라우터 로직 (`activeModule` 상태)
- Sidebar, Layout, BottomNav 렌더링
- 모듈 전환 처리 (주식, 부동산, 은행 등)

### 2. 네비게이션 컴포넌트
- **Sidebar.tsx**: 데스크톱 전용 고정 네비게이션 (6개 메뉴, 로고, 프로필)
- **BottomNav.tsx**: 모바일 전용 하단 고정 네비게이션 (홈, 주식, 부동산, 더보기)

### 3. Layout.tsx (레이아웃 래퍼)
- 반응형 래퍼 (Mobile-first)
- **모바일**: 전체 너비, 흰색 배경, BottomNav용 하단 패딩
- **데스크톱**: 좌측 패딩(pl-64, Sidebar용), 중앙 정렬 콘텐츠 (max-w-4xl)

### 4. 주식 모듈 (완전 구현)

**StockDashboard.tsx** (중앙 상태 컨테이너):
- 활성 탭 관리 (국내 vs 해외)
- 환율 관리 (USD-KRW 환전)
- 통화 표시 모드 (KRW vs USD)

**Header.tsx**:
- 상단 고정 헤더
- 환율 편집기 (클릭하여 수정 가능)

**TabMenu.tsx**:
- 국내/해외 주식 탭 전환

**SummaryCard.tsx**:
- 포트폴리오 지표 표시
- 통화 토글 기능

**AssetChart.tsx**:
- Area 차트 시각화
- 기간 필터 (1주/1개월/1년)

**StockList.tsx**:
- 주식 항목 컨테이너

**StockItem.tsx** (확장 가능한 개별 주식 행):
- **기본 정보**: 이름, 티커, 현재가, 일일 변동
- **확장 상세**: 수량, 평균가, 평가액, 손익

### 5. 기타 컴포넌트
- **FAB.tsx**: Floating Action Button (현재는 alert만 표시)
- **PlaceholderPage.tsx**: 미구현 모듈용 재사용 가능한 플레이스홀더

---

## 🚀 빌드 및 배포

### 개발 환경
```bash
npm install    # 의존성 설치
npm run dev    # Vite 개발 서버 시작 (핫 리로드)
npm run lint   # ESLint 실행
```

### 프로덕션 배포
```bash
npm run build           # TypeScript 컴파일 + Vite 빌드 → dist/
docker build .          # Docker 이미지 빌드
docker-compose up       # Compose로 배포 (포트 8080:80)
```

### 빌드 출력
- Rollup을 사용한 최적화된 JavaScript 번들
- Tailwind로 CSS 인라인/압축
- dist/ 디렉토리에 자산 출력

---

## 🐳 Docker 설정

### Dockerfile (Multi-stage 빌드)
- **Stage 1 (Builder)**: Node 20 Alpine
- **Stage 2 (Runner)**: Nginx Alpine
- 빌드된 dist/를 /usr/share/nginx/html로 복사

### docker-compose.yml
- **서비스**: myhomefin-app
- **포트 매핑**: 8080:80
- **외부 네트워크**: proxy_net
- **재시작 정책**: always

### nginx.conf
- try_files 폴백으로 SPA 라우팅
- Gzip 압축 활성화
- 정적 자산에 1년 캐시 (.js, .css, 이미지)
- 보안 헤더

---

## 📝 설정 파일 개요

### package.json
- **개발 서버**: `npm run dev` (Vite)
- **프로덕션 빌드**: `npm run build` (TypeScript + Vite)
- **린트**: `npm run lint` (ESLint)
- **미리보기**: `npm run preview` (Vite preview)

### tsconfig.app.json
- **Target**: ES2022
- **Module**: ESNext
- **Strict mode**: 활성화
- **미사용 변수/파라미터**: 허용 안 함
- **JSX**: react-jsx (자동)

### vite.config.ts
- **플러그인**: @vitejs/plugin-react, @tailwindcss/vite
- 커스텀 플러그인이나 최적화 없음

---

## 🎯 주요 설계 패턴

### 반응형 디자인 전략
- **Mobile-first CSS**: 기본 스타일은 모바일 최적화
- **Tailwind 브레이크포인트**: 데스크톱 오버라이드에 `md:` (768px+) 사용
- **조건부 컴포넌트 렌더링**: 모바일/데스크톱에 다른 네비게이션
- **Safe area 패딩**: 모바일 노치 지원을 위한 `pb-safe`

### 컴포넌트 구성
- **플랫 컴포넌트 구조**: 모든 컴포넌트가 단일 components/ 디렉토리에
- **함수형 컴포넌트**: React hooks 사용 (클래스 컴포넌트 없음)
- **TypeScript 인터페이스**: prop 검증용
- **재사용 가능한 유틸리티 함수**: 컴포넌트 내부 (formatNumber, calculatePrice)

### 통화 변환 로직
- **정규화 전략**: 모든 계산을 먼저 KRW로 수행
- **2단계 변환**: USD 주식 → KRW (곱하기), 필요시 KRW → USD (나누기)
- **일관된 소수점 처리**: KRW는 floor 함수, USD는 소수점 2자리

### UI/UX 패턴
- **Toss 스타일 미학**: 미니멀리스트, 깔끔한 디자인, 충분한 여백
- **색상 코딩**: 수익은 빨강(#EF4444), 손실은 파랑(#3B82F6)
- **인터랙티브 요소**: 확장 가능한 카드, 호버 상태, 부드러운 전환
- **접근성**: 시맨틱 HTML, ARIA 레이블, 명확한 시각적 계층

---

## 📊 Git 히스토리

총 3개의 커밋:
1. `84faef8` - First commit (프로젝트 초기화)
2. `b6469de` - React project setup
3. `d58ab01` - Docker configuration

---

## 💡 주요 특징 요약

✅ **Frontend 전용**: 백엔드/API 없음 (목 데이터만)
✅ **프로덕션급 UI**: 세련되고 모바일 반응형 디자인
✅ **Type-safe**: 완전한 TypeScript 커버리지
✅ **모듈식 아키텍처**: 새 모듈 추가 용이
✅ **깔끔한 코드베이스**: 주석 잘 달림, 일관된 패턴
✅ **Docker 준비 완료**: 쉬운 배포를 위한 컨테이너화
✅ **한국어 우선**: 모든 UI 레이블과 문서가 한국어
✅ **확장 가능**: 새 기능 추가에 잘 구조화됨 (모듈, 주식 등)
✅ **성능 중심**: 메모이제이션 계산, 최소 CSS를 위한 Tailwind

---

## 📂 주요 파일 절대 경로

- `/home/docker/myHomeFinApp/src/App.tsx` - 루트 애플리케이션
- `/home/docker/myHomeFinApp/src/components/StockDashboard.tsx` - 메인 모듈 (가장 복잡)
- `/home/docker/myHomeFinApp/src/data/mockData.ts` - 데이터 소스
- `/home/docker/myHomeFinApp/src/types/index.ts` - 타입 정의
- `/home/docker/myHomeFinApp/package.json` - 의존성
- `/home/docker/myHomeFinApp/Dockerfile` - 컨테이너 설정
- `/home/docker/myHomeFinApp/PROJECT_GUIDE.md` - 상세 한글 문서

---

## 🔮 향후 개발 방향

### 우선순위 높음
1. **백엔드 API 개발**: REST 또는 GraphQL API 구축
2. **데이터베이스 통합**: PostgreSQL 또는 MongoDB로 데이터 영구 저장
3. **사용자 인증**: JWT 기반 로그인/회원가입
4. **나머지 모듈 구현**: 부동산, 은행, 카드, 가계부

### 우선순위 중간
5. **거래 추가 기능**: 주식 매수/매도 기록
6. **차트 기간 필터 실제 구현**: 1주/1개월/1년 데이터 필터링
7. **실시간 주가 연동**: 외부 API (Yahoo Finance, Alpha Vantage 등)
8. **알림 기능**: 목표가 도달, 손익 알림

### 우선순위 낮음
9. **다크 모드**: 테마 전환 기능
10. **PDF 리포트 생성**: 포트폴리오 리포트 다운로드
11. **소셜 공유**: 포트폴리오 성과 공유
12. **다국어 지원**: 영어, 일본어 등

---

## 📞 문의 및 기여

이 프로젝트는 개인 자산 관리를 위한 오픈소스 프로젝트입니다.

**프로젝트 위치**: `/home/docker/myHomeFinApp`

---

*마지막 업데이트: 2025년 11월 30일*
