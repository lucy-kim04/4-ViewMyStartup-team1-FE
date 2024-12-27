# 🐈 1팀 프로젝트 🫶🏻

<pre>
   _        ______                                  
 /' \      /\__  _\                                 
/\_, \     \/_/\ \/     __      __       ___ ___    
\/_/\ \       \ \ \   /'__`\  /'__`\   /' __` __`\  
   \ \ \       \ \ \ /\  __/ /\ \L\.\_ /\ \/\ \/\ \ 
    \ \_\       \ \_\\ \____\\ \__/.\_\\ \_\ \_\ \_\
     \/_/        \/_/ \/____/ \/__/\/_/ \/_/\/_/\/_/
/**
*               🍄 1 TEAM PROJECT
*           🛠️ View My Startup Service
*           ⏰ 2024.12.12 ~ 2025.01.08
**/
</pre>

#### 목차

- [Team Members](#t1)
- [Project Information](#t2)
- [기술 스택](#t3)
- [팀원별 구현 기능 상세](#t4)
- [파일 구조](#t5)
- [구현 홈페이지](#t6)
- [회고록](#t7)

## Team Members<a id="t1"></a>

| 이름   | Github URL FE           | Github URL BE          |
| ------ | ----------------------- | ---------------------- |
| 구은모 | [FrontEnd repository]() | [BackEnd repository]() |
| 김경호 | [FrontEnd repository]() | [BackEnd repository]() |
| 김세환 | [FrontEnd repository]() | [BackEnd repository]() |
| 김주영 | [FrontEnd repository]() | [BackEnd repository]() |
| 김희주 | [FrontEnd repository]() | [BackEnd repository]() |
| 조형민 | [FrontEnd repository]() | [BackEnd repository]() |

===

## Project Information<a id="t2"></a>

### 스타트업 정보 확인 및 모의 투자 서비스

| Title | 스타트업 정보 확인 및 모의 투자 서비스 |
| --- | --- |
| Description | 최근에는 벤처 캐피탈에 비해 개인 투자자들의 스타트업에 대한 관심이 증가하고 있습니다. 하지만 스타트업에 관한 정보 접근성에는 여전히 큰 격차가 존재합니다. 이러한 상황을 개선하기 위해, 개인 투자자들이 스타트업을 선택하여 그들의 누적 투자 금액, 매출액 등을 확인하고 비교할 수 있는 모의 투자 서비스를 제작합니다. |
| Project Link | Git Url : [View My Startup](https://github.com/surya-teja-sai/team1/4-ViewMyStartup-team1-FE) |

===

## 기술 스택<a id="t3"></a>

| Frontend | Backend | Database | 협업툴 |
| --- | --- | --- | --- |
| - JavaScript</br>- React.js</br>- scss</br>- Netlify(배포) | - Express.js</br>- Node.js</br>- JavaScript</br>- Render(배포) | - postgreSQL</br>- prisma(ORM) | - Git & Github</br>- Discord</br>- Notion |

===

## 팀원별 구현 기능 상세<a id="t4"></a>

#### [구은모 - 기업 상세 정보 조회 바로가기](#a-1)

#### [김경호 - 나의 기업 비교 결과 바로가기](#a-2)

#### [김세환 - 공통 모듈 바로가기 ](#a-3)

#### [김주영 - 기업 상세 정보 조회 바로가기 ](#a-4)

#### [김희주 - 비교현황 바로가기 ](#a-5)

#### [조형민 - 나의 기업 비교 바로가기](#a-6)

===

### 🍄 구은모<a id="a-1"></a>

#### 기업 상세 정보 조회

1. 프론트엔드
   1. 검색창 및 데이터 전송
   2. 정렬 버튼(custom dropdown)
   3. 페이지네이션
2. 백엔드
   1. 기업 전체 목록 조회 API
      1. 검색 키워드, 정렬, 페이징

---

### 🍄 김경호<a id="a-2"></a>

#### 나의 기업 비교 결과

1. 프론트엔드
   1. [팝업 모달]기업에 투자하기
   2. 정렬 버튼(custom dropdown)
2. 백엔드
   1. 비교 대상 기업들과의 비교 결과 조회 API
      1. 정렬
   2. 나의 기업과 근접한 순위의 기업 목록 조회 API
      1. 정렬

---

### 🍄 김세환<a id="a-3"></a>

#### 공통 모듈

1. 페이지네이션
2. 정렬 버튼(custom dropdown)
3. [팝업 모달]기업에 투자하기(생성, 수정, 삭제)
   1. 프론트엔드
      1. form - validation
         1. 생성/수정 모드
   2. 백엔드
      1. 특정 기업에 투자 생성 API
      2. 투자 수정 API
      3. 투자 삭제 API

---

### 🍄 김주영<a id="a-4"></a>

#### 기업 상세 정보 조회

1. 프론트엔드
   1. [팝업 모달]기업에 투자하기
   2. View My Startup에서 받은 투자 목록
      1. 수정/삭제 버튼(custom dropdown)
         1. 수정: [팝업 모달]기업에 투자하기
         2. 삭제: [팝업 모달]삭제 권한(비밀번호) 확인
            1. [팝업 모달]삭제 실패
      2. 페이지네이션
2. 백엔드
   1. 기업 정보 조회 API
      1. 해당 기업 투자 현황 조회 연결

---

### 🍄 김희주<a id="a-5"></a>

#### 비교현황

1. 프론트엔드
   1. 정렬 버튼(custom dropdown)
   2. 페이지네이션
2. 백엔드
   1. 기업 선택 횟수를 반영한 기업 목록 조회 API
      1. 정렬, 페이징

---

### 🍄 조형민<a id="a-6"></a>

#### 나의 기업 비교 바로가기

1. 프론트엔드
   1. [팝업 모달] 나의 기업 선택하기
      1. 검색창 및 데이터 전송
      2. 기업 선택 횟수 누적
      3. 페이지네이션
   2. [팝업 모달] 비교 기업 선택하기(복수)
      1. 검색창 및 데이터 전송
      2. 기업 선택 횟수 누적
      3. 페이지네이션
2. 백엔드
   1. 최근 선택 기업 목록 조회 API
   2. 전체 기업 목록 조회 API
      1. 검색, 페이징
   3. 기업 선택 횟수 누적 저장 API

===

## 파일 구조<a id="t5"></a>

<pre>
 /** 
 *
 * 프로젝트 폴더 구조 업데이트 예정
 * 
 **/

 📦src
</pre>

## 구현 홈페이지<a id="t6"></a>

- 미배포 추후 업데이트 예정

## 프로젝트 회고록<a id="t7"></a>

### 회고록은 ![notion](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgf-SjuiaItPWDDxCP8aXglYkKlgvs8VwckPtmk63NIQ_lobtUgGQzZ2axl5MPiHl5O1qZ57lItys_igglPbFZ_PCgOsAio_mlGa6hphp_m8PFbGnnDa5kCiRELsXmwsxobymhIGt5KkdX38TTSQ4D3FysGhd5suxicGwHdoPnCrEuCj-HmTkSTEEn7X_3t/s1600/9796017_notion_icon.png) 공유로 진행 됩니다
