// ============================================================
// 포트폴리오 콘텐츠 데이터
// 수정이 필요하면 이 파일만 편집하세요.
// 수치·사실은 00_프로필/강승준_총정리.md 검증 기록과 맞춰 둘 것 (2026.09.17 갱신)
// ============================================================

const PORTFOLIO_DATA = {
  meta: {
    title: "강승준 | Backend Developer · Product Builder",
    description: "기술의 WHY에서 사업의 WHY까지 묻는 백엔드 개발자 강승준의 포트폴리오",
  },

  hero: {
    label: "Backend Developer · Product Builder",
    name: "강승준",
    nickname: "Jayden",
    tagline: "기술의 WHY에서, 사업의 WHY까지",
    description:
      "IoT 공유 자전거 플랫폼에서 3인 백엔드 팀을 이끌며 V1→V4 아키텍처 전환을 주도했습니다. 블로킹 폴링을 이벤트 구조로, 거대한 서비스 클래스를 도메인 단위로 바꾸며 기술 선택마다 이유를 물었습니다. 회사가 문을 닫는 과정에서 사업의 방향은 묻지 않았다는 걸 알았고, 이후 두 번의 공동창업에서 만든 것을 데이터로 검증하고 판단하는 일까지 맡았습니다.",
    profileImage: "images/profile.png",
    contacts: {
      email: "kangseung1110@gmail.com",
      github: "https://github.com/jjuuuunnii",
    },
  },

  experience: {
    company: "(주)발켄모빌리티",
    role: "백엔드 개발팀장",
    period: "2024.04 — 2025.12",
    product: "플로드(Fload)",
    productDescription:
      "IoT 기반 공유 자전거 플랫폼 — 3개 지역(포항공대·힐스테이트 검단·김천) 운영",
    stats: [
      { value: "186대", label: "IoT 자전거" },
      { value: "약 1만 명", label: "누적 사용자" },
      { value: "4개", label: "플랫폼 백엔드" },
      { value: "약 21만 줄", label: "4세대 코드베이스" },
    ],
    summary:
      "유저앱·오너앱·어드민웹·슈퍼바이저앱 4개 플랫폼의 백엔드를 3인 팀으로 개발·운영하며 기술 스택 선정, 아키텍처 의사결정, 코드 리뷰 문화를 주도했습니다.",
    note:
      "퇴사 후에도 2026.03까지 회사와 합의해 폐업 마무리를 맡아, 고객 계약 기능이던 자전거 재배치(리밸런싱) 도메인을 3주 만에 완성하고 운영 문제를 정리해 인계했습니다.",
    achievements: [
      {
        version: "V1 → V2",
        title: "IoT 명령·응답 구조 전환: 블로킹 폴링 → 이벤트 소비",
        problem:
          "대여 요청 스레드가 MQTT 명령을 보낸 뒤, 장비 응답이 Redis에 기록되기를 2초 간격·최대 11회(22초) 폴링하며 기다리는 구조였습니다. 대여 한 건에 명령이 4번 오가 스레드 하나가 1분 반 가까이 묶였고, 동시 대여가 늘면 스레드 풀이 고갈돼 새 요청을 받지 못할 위험이 있었습니다.",
        solution: [
          "명령을 발행한 뒤 요청 스레드를 바로 반환하고, 장비 응답은 이벤트로 소비해 상태 갱신·SSE 앱 푸시로 이어지게 전환",
          "장비 통신용으로만 쓰이던 Kafka를 서버 5개 분리와 함께 서버 간 비동기 통신으로 확장 — 서버별 토픽·컨슈머 그룹 설계",
          "명령 발행 시 보상 작업을 예약하고 정상 응답이 오면 취소하는 타임아웃 보상 (ExecutorService 10초 → Quartz 12초·보상 Job 5종)",
          "기체·명령 단위 상태 키로 중복 실행 방지",
          "RabbitMQ·Redis Pub/Sub과 비교해 '유실된 명령을 다시 소비할 수 있는가'를 기준으로 선택",
        ],
        result:
          "전 서버에서 폴링 루프 0건 — 응답을 기다리며 요청 스레드를 점유하던 구조를 제거하고, 응답이 오지 않는 경우는 보상 작업으로 처리",
        tags: ["Kafka", "MQTT", "SSE", "Quartz"],
      },
      {
        version: "V2 → V3",
        title: "Layered → 도메인 단위 이벤트 구조 + 무중단 배포",
        problem:
          "핵심 서비스 클래스 하나가 1,419줄·의존성 25개로 커져, 한 기능을 고치면 다른 도메인에 영향이 번졌고 3인 팀이 같은 파일을 동시에 수정하며 충돌이 잦았습니다.",
        solution: [
          "도메인 패키지 + 유스케이스 단위로 재편하고, 도메인 간 직접 호출을 Spring ApplicationEvent로 분리",
          "역할별 커스텀 어노테이션과 검증기로 아키텍처 규칙을 강제 — 규칙을 어긴 코드는 서버가 기동되지 않음",
          "Nginx Blue-Green 배포 + Route 53 가중치 라우팅으로 무중단 배포",
        ],
        result:
          "핵심 서비스 1,419줄·의존 25개 → 유스케이스 단위 153~221줄·의존 3개, 팀원이 서로 다른 도메인을 동시에 작업할 수 있는 구조",
        tags: ["DDD", "ApplicationEvent", "Blue-Green"],
      },
      {
        version: "V3 → V4",
        title: "CQRS · 헥사고날 전환",
        problem:
          "실시간 위치·상태 조회와 대여·반납 명령이 같은 모델을 공유해, 조회를 확장할 때마다 명령 쪽 정합성을 함께 신경 써야 했습니다.",
        solution: [
          "Command/Query 컨트롤러 분리(3세대 11개 도메인)에서 시작해, 4세대에서 조회 전용 모델로 분리",
          "헥사고날 구조로 외부 의존을 포트·어댑터 뒤로 격리 — 5개 서비스·약 21만 줄 규모의 설계와 코드 리뷰 주도",
          "트랜잭션 커밋 전에 이벤트가 먼저 처리되던 문제를 '커밋 후 비동기 처리' 메타 어노테이션으로 정리",
        ],
        result:
          "조회 확장이 명령 정합성에 영향을 주지 않는 구조, 조회·명령 영역을 독립적으로 개발",
        tags: ["CQRS", "Hexagonal", "MSA"],
      },
      {
        version: "",
        title: "결제 실패 처리 자동화",
        problem:
          "잔액 부족·정지된 카드 등 PG 결제 실패 사유가 다양했고, 사용자가 실패를 제때 알지 못하면 미수금이 쌓였습니다.",
        solution: [
          "아임포트(PortOne v1) 빌링키 기반 재결제·취소 연동",
          "실패 이력을 사유와 함께 기록하고, 실패 즉시 FCM 푸시로 사용자에게 알림 — 앱 이용내역에서 사유 확인",
          "매일 13시 미수금 재결제 배치, 성공 시 실패 이력 정리",
          "결제수단 미등록·미납 사용자는 대여 단계에서 차단",
        ],
        result:
          "결제 실패를 사용자가 즉시 알고, 미수금은 배치로 자동 재청구되는 흐름 확보",
        tags: ["아임포트", "Batch", "FCM"],
      },
      {
        version: "",
        title: "장애 알림 체계 구축",
        problem:
          "장애를 사용자 문의로 알게 되는 경우가 많아, 인지까지 1시간 이상 걸렸습니다.",
        solution: [
          "IoT 장비 명령 실패를 13가지 유형으로 분류",
          "운영자 웹훅(Discord)·SSE·앱 푸시 3개 경로로 전파",
        ],
        result: "장애 인지 1시간 이상 → 1분 이내",
        tags: ["Webhook", "SSE", "모니터링"],
      },
      {
        version: "PoC",
        title: "외부 파트너 연동 — 제어권 경계를 지킨 API 설계",
        problem:
          "타사 공유 모빌리티 기업의 스테이션에 자사 자전거가 호환되면서 PoC를 진행했고, 상대측이 자기 앱으로 자전거를 직접 제어할 권한을 요청했습니다. 하지만 모든 자전거 제어는 MQTT로 자사 서버를 거치는 구조였습니다.",
        solution: [
          "제어권을 넘기는 대신 상대 앱이 자사 서버를 통해 명령하는 전용 연동 API 설계 (전원·일시 잠금·모터 잠금 등 명령 6종)",
          "스테이션 도킹 이벤트·슬롯 상태를 받는 양방향 연동",
          "파트너별 API 키 인증 필터 + PoC 지정 기체 6대 화이트리스트",
          "상대 개발사와의 기술 협의·명세 교환 담당",
        ],
        result: "인증·기체·기능 3중 경계로 최소 권한만 노출하며 PoC 완수",
        tags: ["Partner API", "인증", "PoC"],
      },
    ],
  },

  projects: [
    {
      title: "포게티",
      subtitle: "AI 일정 관리 앱 · App Store 출시",
      period: "2026.03 ~ 2026.06",
      team: "공동창업 · 백엔드 전담",
      image: "images/forget_card.jpg",
      description:
        "자연어 한 줄로 일정을 등록하면 AI가 알림 시점을 정하고, 전날·당일 푸시와 직전 AI 음성 전화로 알려주는 캘린더",
      role: "백엔드 전담·기획 (협업: 프론트엔드 1인) — Claude Code 기반 AI 개발 하네스 설계",
      highlights: [
        "72일간 커밋 1,138건 · 프로덕션 43,792줄 + 테스트 42,704줄 (약 1:1)",
        "Claude Code 하네스: Phase→세션→태스크 3계층 분해(121 Phase·602 태스크, 태스크 1개 = PR 1개), 규칙 문서 23개·자동 훅 4종",
        "ArchUnit 아키텍처 테스트 15개 — AI가 반복한 실수를 테스트로 고정",
        "Anthropic·OpenAI API로 자연어 일정 파싱, 호출 비용 전건 DB 계측",
        "Quartz 리마인드 스케줄링 · FCM 푸시 · Twilio VoIP 음성 전화",
      ],
      tech: ["Java 21", "Spring Boot 4", "MySQL", "Redis", "Quartz", "Flyway", "Claude Code"],
    },
    {
      title: "Giggle",
      subtitle: "공개 소프트웨어 개발자 대회 우수작 선정",
      period: "2024.10 ~ 2025.07",
      team: "Team-inglo",
      image: "images/giggle.jpg",
      description: "외국인 유학생을 위한 아르바이트 신청 관리 플랫폼",
      role: "복합 동적 필터링 쿼리 설계 (10종+ 필터)",
      highlights: [
        "IS NULL 패턴 활용 선택적 필터 적용 — 파라미터가 null이면 조건 무시",
        "오전/오후/저녁/풀타임/새벽 5개 시간대를 BETWEEN 매칭",
        "N+1 해결: 2-step 조회 패턴 (ID 목록 → 배치 Fetch)",
        "인기순/최신순 정렬 전략 분리 + 페이지네이션",
      ],
      tech: ["Java", "Spring Boot", "JPA", "QueryDSL", "MySQL", "Docker"],
    },
    {
      title: "Wave",
      subtitle: "2024 GDSC Solution Challenge",
      period: "2024.01 ~ 2024.02",
      team: "Team wave",
      image: "images/wave.jpeg",
      description: "전쟁에 대한 뉴스를 지역별로 보여주며, 기부와 연결하는 서비스",
      role: "전쟁 관련 뉴스를 지역별로 크롤링하여 지도 기반으로 시각화하는 백엔드 설계·구현",
      highlights: [
        "크롤링 서버(Flask)와 API 서버(Spring Boot) 분리 설계",
        "크롤링 장애가 메인 API에 영향을 주지 않도록 서버 간 책임 격리",
      ],
      tech: ["Java", "Spring Boot", "JPA", "MySQL", "Flask"],
    },
    {
      title: "Pengdolli",
      subtitle: "GDSC 눈꽃톤 금상",
      period: "2024.01",
      team: "",
      image: "images/pengdolli.png",
      description: "당신의 옷차림 고민을 해결해줄 귀여운 펭귄 서비스",
      role: "날씨 기반 옷차림 추천 및 베스트 착장 투표 기능 개발",
      highlights: [
        "날씨 API를 활용하여 하루를 아침·점심·저녁·새벽으로 나누어 시간대별 옷차림 추천",
        "사용자 투표 기반 오늘의 베스트 착장 추천 기능 개발",
      ],
      tech: ["Java", "Spring Boot", "Spring Security", "MySQL", "Docker"],
    },
    {
      title: "Mooco",
      subtitle: "구름톤 Univ 1기 대상작",
      period: "2023.11",
      team: "Team 사우르스",
      image: "images/mooco.png",
      description: "일상의 순간들을 담은 바코드아트를 제공하는 서비스",
      role: "월간 포토 컬러 바코드 생성",
      highlights: [
        "원본 이미지 1/4 리사이즈 후 RGB 집계 → 최빈 색상(Dominant Color) 추출",
        "ConcurrentHashMap + parallel stream으로 픽셀 순회 병렬 처리",
        "BufferedImage + Graphics API로 추출 색상을 바코드 이미지로 합성",
      ],
      tech: ["Java", "Spring Boot", "JPA", "Java AWT/ImageIO"],
    },
    {
      title: "우편함 시리즈",
      subtitle: "총 사용자 약 3,000명",
      period: "2023",
      team: "개인 프로젝트",
      images: [
        "images/maple_box.png",
        "images/blossom_mailbox.jpg",
        "images/snow.png",
      ],
      description:
        "서로의 마음을 전달하는 익명 편지 서비스. 시즌별로 운영한 단기 프로젝트",
      role: "전체 서비스 기획·설계·개발",
      highlights: [
        "익명성이 보장된 편지 전달 서비스",
        "시즌별 테마 (단풍, 벚꽃, 크리스마스) 적용",
        "약 3,000명의 실사용자 확보",
      ],
      tech: ["Java", "Spring Boot", "Spring Security", "MySQL"],
    },
  ],

  // 창업 — 만든 것을 데이터로 검증하고 판단한 기록
  ventures: {
    intro: {
      eyebrow: "From Tech WHY to Business WHY",
      lesson:
        "발켄에서 기술의 왜는 끝까지 물었지만, 이 사업의 방향이 맞는지는 묻지 않았습니다. 그래서 다음 두 번은 직접 창업해, 만든 것을 데이터로 검증하고 멈출 때를 판단하는 일을 맡았습니다.",
      delta: {
        from: { value: "약 3개월", label: "포게티 · 실패를 알아차리기까지" },
        to: { value: "19일", label: "OFF STAGE · 런칭 후 종료 판단까지" },
      },
      formula: "리텐션 = 빈도 × 가치",
    },
    program: {
      name: "아산나눔재단 아산 두어스",
      description: "포게티로 선발 · 2026.06–08 교육 기간 중 OFF STAGE 창업",
    },
    items: [
      {
        index: "01",
        name: "포게티",
        period: "2026.03 — 2026.06",
        role: "공동창업 · PM · 백엔드",
        oneLiner: "언제 알려줄지 AI가 정해주는 캘린더",
        status: "App Store 출시 후 종료",
        image: "images/forget_duo.jpg",
        who: "언제 잊을지 모르는데 알림 시점은 직접 정해야 했던 ADHD 경향의 사람들",
        metrics: [
          { value: "72일", label: "개발 기간", tone: "neutral" },
          { value: "11개", label: "사전등록 가설", tone: "neutral" },
          { value: "0건", label: "고객 인터뷰", tone: "miss" },
          { value: "6순위", label: "망각의 통점 순위", tone: "miss" },
        ],
        sections: [
          {
            label: "설계한 것",
            tone: "solution",
            items: [
              "PRD 3판 · North Star KPI(AI 전화 후 7일 내 일정 재등록 비율) · 사전등록 가설 11개",
              "App Store 출시까지 백엔드 전담 (개발 상세는 Projects 참고)",
            ],
          },
          {
            label: "검증하지 못한 것",
            tone: "problem",
            items: [
              "고객 인터뷰 0건 · 분석 이벤트 호출 0회 · 계획한 지표 73개 중 67% 미착수",
              "만드는 속도가 검증하는 속도를 앞질렀다",
            ],
          },
          {
            label: "데이터가 말해준 것 → 판단",
            tone: "result",
            items: [
              "성인 ADHD 커뮤니티 가입인사 195건 분류 — 망각은 6건(약 3%)으로 6순위 통점",
              "유저당 제휴 수익 21원 < AI 원가 64원",
              "통점이 약하고 무료 대체재가 있어 종료 — 알아차리기까지 약 3개월",
            ],
          },
        ],
        learned: "다음에는 출시 전에 인터뷰 → 합격선 → 계측을 먼저 둔다",
      },
      {
        index: "02",
        name: "OFF STAGE",
        period: "2026.07 — 2026.08",
        role: "공동창업 · PM",
        oneLiner: "친구들과 단체사진을 동시에 같이 보정하는 앱",
        status: "런칭 19일 · 가입 220명 · 종료",
        image: "images/offstage_trio.jpg",
        who: "단톡방에서 한 명씩 돌려가며 보정하느라 올릴 타이밍을 놓치는 20대 초반",
        metrics: [
          { value: "71~73%", label: "초대 수락률 (합격선 60%)", tone: "ok" },
          { value: "94.7%", label: "전원 보정 완료 (합격선 70%)", tone: "ok" },
          { value: "₩864", label: "CAC (1차 ₩1,745)", tone: "ok" },
          { value: "1.7%", label: "D7 잔존 (D1 14.5%)", tone: "miss" },
        ],
        sections: [
          {
            label: "출시 전에 둔 것",
            tone: "solution",
            items: [
              "유저 인터뷰 10명으로 '릴레이 보정' 문제 정의",
              "합격선 5개를 런칭 전에 고정 (초대 수락 60% · 전원 완료 70% 등)",
              "읽기 전용 DB와 GA4·광고·스토어 데이터를 AI 분석 하네스에 연결 — 근거 태그([실측]/[추정])와 반론 의무를 규칙으로",
            ],
          },
          {
            label: "데이터로 내린 결정",
            tone: "solution",
            items: [
              "광고 소재 교체로 랜딩→스토어 클릭률 7.5% → 36.3%, CAC ₩1,745 → ₩864",
              "AI가 완성한 '저장 직후 초대 권유' 기능을 실측(저장 후 초대 0건)으로 당일 기각",
              "과금 조건 도달 0명 → 크레딧 과금 보류 제안",
              "홍대 포토부스 앞 오프라인 검증 104명 → 가입 0명, 채널이 아니라 전제의 문제로 판단",
              "방문 로그 나흘치 유실 사고 — AI의 오진을 용량 증설 테스트로 직접 교정하고, 이중 수집한 GA4 Data API로 일별 수치 복원",
            ],
          },
          {
            label: "결과 → 판단",
            tone: "result",
            items: [
              "코어 루프는 작동: 초대 수락 71~73% · 전원 완료 94.7%",
              "다시 오지 않음: D1 14.5% → D7 1.7%, 참여자 다운로드 23.4%, 재완성 14.8%",
              "합격선 5개 중 통과 2 · 미달 1 · 판정 불가 2 — 페인은 확인됐지만 끊긴 곳은 사용 주기라고 보고 19일 만에 종료 판단",
            ],
          },
        ],
        learned: "리텐션 = 빈도 × 가치 — 좋은 경험도 자주 생기지 않으면 돌아오지 않는다",
      },
    ],
  },

  skills: [
    { category: "Language", items: ["Java", "SQL", "Python"] },
    {
      category: "Framework",
      items: ["Spring Boot", "Spring MVC", "Spring Security", "Spring Data JPA", "QueryDSL", "Quartz"],
    },
    { category: "Database", items: ["MySQL", "Redis", "MongoDB"] },
    { category: "Messaging", items: ["Kafka", "MQTT", "SSE"] },
    {
      category: "Infra / DevOps",
      items: ["AWS (EC2, S3, RDS, Route 53)", "Docker", "Nginx", "GitHub Actions"],
    },
    {
      category: "AI · Data",
      items: ["Claude Code (개발 하네스 설계)", "Anthropic · OpenAI API", "ArchUnit", "GA4", "Meta 광고"],
    },
  ],

  education: {
    university: "동국대학교",
    major: "멀티미디어공학과 (학사)",
    period: "2019.03 — 2025.02",
  },

  military: {
    title: "육군 병장 만기전역",
    role: "통신병",
    period: "2021.03.29 — 2022.09.28",
  },

  languages: [
    { title: "TOEIC Speaking IH (140)", description: "2024.12" },
  ],

  activities: [
    {
      title: "아산나눔재단 아산 두어스",
      description: "포게티로 선발 · 2026.06 ~ 2026.08 창업 교육",
    },
    {
      title: "GDSC Dongguk 1기 Server/Cloud Member",
      description: "2023.09 ~ 2024.08 · 교내 축제 웹사이트 서버 개발, 기술 세미나 발표",
    },
    {
      title: "구름톤 UNIV. 2기 운영팀장 / 동국대 대표",
      description: "해커톤 전반 기획·진행, 동국대 멤버 선발 및 운영",
    },
    {
      title: "카카오 × 구름 벚꽃톤 STAFF 운영팀장",
      description: "2024.03 · 운영 기획·진행 총괄, 기술 질의 응대, 팀빌딩 매칭",
    },
    {
      title: "SW개발자 양성과정 이수 (벤처스타트업아카데미)",
      description: "2024.03 ~ 2025.02",
    },
    {
      title: "Clipper 0기 백엔드 멘토",
      description: "2팀(6명) 대상 Spring Security 인증/인가 설계 멘토링 및 코드 리뷰",
    },
    {
      title: "HI-SW 봉사단 신서중학교 특수학급 멘토링",
      description: "2023.09 ~ 2023.11",
    },
  ],

  awards: [
    "구름톤 UNIV. 1기 대상",
    "동국톤 대상",
    "GDSC 눈꽃톤 금상",
    "2024 여름 ICIP & 캡스톤디자인 우수상",
    "공개 소프트웨어 개발자 대회 우수작 (Giggle)",
    "2024 동국 CD 59초 영화제 장려상",
    "HI-SW봉사단 교육봉사 콘텐츠 제작 경진대회 3등",
  ],
};
