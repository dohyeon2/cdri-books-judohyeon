## 프로젝트 개요

- Daum 검색 API 기반 도서 검색 및 도서 찜 목록 관리 CSR 웹 어플리케이션
- 브라우저 재시작 시 기억되어야 하는 데이터는 localStorage로 간결하게 관리

## 실행 방법 및 환경 설정

- Vite 8 버전으로 개발되었습니다.
- pnpm으로 모듈을 관리합니다.
- 아래 스크립트를 실행하면 `http://localhost:5173/`로 개발서버가 시작됩니다.

```sh
  pnpm i &&
  pnpm dev
```

- .env를 통해 VITE_KAKAO_REST_API_KEY를 주입해야 검색기능이 동작합니다.

```env
  VITE_KAKAO_REST_API_KEY=SOME_KEY
```

## 폴더 구조 및 주요 코드 설명

```
src/
├── App.tsx               # 라우터 및 React Query Provider 설정
├── main.tsx              # 앱 진입점
├── index.css             # Tailwind 테마, 폰트 및 Figma 스타일 정의
├── asset/                # 정적 이미지
├── component/            # 페이지간 재사용 컴포넌트 모음
│   ├── BookItem.tsx      # 도서 카드 (상세 토글, 찜 버튼, 구매 링크)
│   └── ListEdgeObserver.tsx  # IntersectionObserver 기반 무한 스크롤 트리거
├── hook/                 # 사용자 정의 훅 모음
│   ├── useSearchBook.ts  # TanStack Query useInfiniteQuery로 도서 검색
│   ├── useFavorite.ts    # localStorage 기반 찜 목록 CRD
│   └── useSearchHistory.ts   # 검색 히스토리 저장/삭제 (최대 8개)
├── icon/                 # SVG 기반 아이콘 리액트 컴포넌트 모음
├── layout/               # 레이아웃 관련 컴포넌트 모음
│   ├── RootLayout.tsx    # 어플리케이션 공통 레이아웃, GNB, Outlet(React Route Dom 종속)
│   └── PageLayout.tsx    # 페이지 공통 레이아웃 (max-width, padding)
├── lib/                  # 유틸리티 스크립트 모음
│   ├── api/              # api 관련 스크립트 모음
│   │   ├── api.ts        # axios 인스턴스, Kakao API Authorization 헤더 주입 인터셉터 정의
│   │   └── query.ts      # React Query queryKey 팩토리
│   └── consts.ts         # API URL 등 공통 상수 정의
└── page/                 # 페이지 관리, 컨텍스트 별로 강하게 결합된 컴포넌트는 하나의 파일에서 정의하여 유지보수성 향상
    ├── SearchPage.tsx    # 검색 입력, 상세검색, 결과 목록
    └── FavoritePage.tsx  # 찜한 책 목록
```

## 라이브러리 선택 이유

| 라이브러리                      | 선택 이유                                                  |
| ------------------------------- | ---------------------------------------------------------- |
| **Vite 8**                      | 빠른 HMR, ESM 기반 번들링                                  |
| **@floating-ui/react**          | 플로팅 메뉴 위치 계산 안정성을 고려하여 도입               |
| **use-json-localstorage**       | localStorage + JSON 직렬화, React 상태로 subscription 구현 |
| **Tailwind CSS v4**             | 클래스 기반 스타일링으로 빠른 PoC를 위해 도입              |
| **axios**                       | 모던 HTTP 인터페이스, 인터셉터로 Kakao API 키 주입 자동화  |
| **react-router v7**             | SPA 라우팅, `createBrowserRouter` 기반 데이터 라우팅       |
| **babel-plugin-react-compiler** | React Compiler로 React환경 최적화(memo 등)                 |

## 강조 하고 싶은 기능

1. **검색 히스토리**: 포커스 시 최근 검색어 드롭다운, 개별 삭제, 최대 8개 유지, Set을 사용한 중복관리
2. **찜 목록**: localStorage 저장, 검색/찜 페이지에서 동일 `BookItem`으로 찜 토글, API fetch 문제 해결을 위해 Book 데이터를 그대로 저장
3. **무한 스크롤**: `IntersectionObserver`로 스크롤 하단 도달 시 자동 다음 페이지 로드, 컴포넌트 기반 이벤트 컨트롤
