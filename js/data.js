// ============================================================
// 포트폴리오 콘텐츠 데이터
// 수정이 필요하면 이 파일만 편집하세요.
// ============================================================

const PORTFOLIO_DATA = {
  meta: {
    title: "강승준 | Backend Developer",
    description: "항상 WHY?를 먼저 고민하는 백엔드 개발자 강승준의 포트폴리오",
  },

  hero: {
    greeting: "안녕하세요,",
    name: "강승준",
    nickname: "Jayden",
    tagline: "항상 WHY?를 먼저 고민하는 백엔드 개발자",
    description:
      "어떤 기술을 쓸지보다, 왜 이 기술이어야 하는지를 먼저 묻습니다. IoT 기반 공유 모빌리티 서비스에서 3인 백엔드 팀을 리드하며, 코드 리뷰에서도 \"이게 맞아?\"보다 \"왜 이 방식을 선택했어?\"를 먼저 물었고, 팀원 각자가 자신의 기술 의사결정에 근거를 갖는 문화를 만들고자 했습니다.주어진 기능을 구현하는 데 그치지 않고, 하나의 서비스에 깊이 몰입하여 그 성장을 함께 만들어가는 개발자이고 싶습니다.",
    profileImage: "images/profile.png",
    contacts: {
      email: "kangseung1110@gmail.com",
      github: "https://github.com/jjuuuunnii",
    },
  },

  skills: [
    { category: "Language", items: ["Java"] },
    {
      category: "Framework",
      items: ["Spring Boot", "Spring MVC", "Spring Security", "Spring Data JPA"],
    },
    { category: "Database", items: ["MySQL", "Redis", "MongoDB"] },
    { category: "Messaging", items: ["Kafka"] },
    {
      category: "Infra / DevOps",
      items: ["AWS (EC2, S3, RDS, Route 53)", "Docker", "Nginx", "GitHub Actions"],
    },
  ],

  experience: {
    company: "(주)발켄모빌리티",
    role: "백엔드 개발팀장",
    period: "2024.04 — 2025.12",
    product: "플로드(Fload)",
    productDescription:
      "IoT 기반 공유 자전거 플랫폼 — 3개 지역(포항공대·힐스테이트 검단·김천) 운영",
    summary:
      "유저앱·오너앱·어드민웹·슈퍼바이저앱 4개 플랫폼의 백엔드를 3인 팀으로 개발·운영하며, 기술 스택 선정, 아키텍처 의사결정, 코드 리뷰 문화를 주도했습니다.",
    achievements: [
      {
        version: "V1 → V2",
        title: "IoT 통신 아키텍처 개선",
        problem:
          "MQTT QoS 0 환경에서 응답 보장 없이 500ms 주기 폴링으로 상태 대기. 네트워크 불안정 시 운행 명령 유실 → 대여/반납 실패 직결. 디바이스 증가에 따라 폴링 부하도 선형 증가",
        solution: [
          "IoT 디바이스 통신(MQTT)은 유지하되, 서버 내부 명령/응답 처리를 Kafka 기반 비동기 이벤트 스트림으로 전환",
          "Kafka 선택 이유: Offset 기반 재처리로 명령 유실 방지 + 디바이스 증가에 따른 수평 확장 적합",
          "MQTT 명령 발송 시 Quartz 기반 스케줄러 서버에 보상 트리거 예약 — 일정 시간 내 응답 없으면 실패 보상 로직 실행",
          "10초 TTL 필터로 서버 재기동 후 지연된 잠금해제 명령 차단, 재시도 없는 에러 핸들러로 중복 실행 방지",
        ],
        result:
          "폴링 루프 제거로 idle CPU 연산 해소, 네트워크 재연결 시 자동 재처리로 명령 유실 해소, TTL·중복 방지 설계로 안전사고 리스크 제거",
        tags: ["Kafka", "MQTT", "Quartz"],
      },
      {
        version: "V2 → V3",
        title: "Layered → 이벤트 기반 DDD 전환 및 무중단 배포",
        problem:
          "핵심 서비스 클래스 800줄 이상, 4개 플랫폼의 유사 로직 중복 구현. 도메인 간 직접 의존 10개 이상으로 한 도메인 수정이 연쇄 side effect 유발, 3인 팀의 PR 충돌 빈발",
        solution: [
          "외부 의존성(IoT 브로커·결제)을 Adapter 패턴으로 격리",
          "도메인 간 직접 호출 → Spring ApplicationEvent 기반 비동기 이벤트로 전환하여 결합 제거",
          "Kafka 계층과 도메인 계층을 커스텀 어노테이션·이벤트 디스패처로 분리, 인프라 변경이 도메인에 영향 없는 구조 확보",
          "Nginx Blue-Green 배포 + Route 53 가중치 라우팅으로 무중단 배포 구현",
        ],
        result:
          "서비스 클래스 800줄 → 200줄 이하, 도메인 간 직접 의존 10개 → 2개 이하, 팀원이 서로 다른 도메인을 동시에 작업 가능한 구조 확보",
        tags: ["DDD", "Event-Driven", "Blue-Green"],
      },
      {
        version: "V3 → V4",
        title: "CQRS 도입",
        problem:
          "실시간 위치·상태 조회(트래픽의 ~90%)와 운행 명령이 동일 모델을 공유하여, 조회 최적화(캐싱·프로젝션)가 명령의 트랜잭션 무결성과 충돌",
        solution: [
          "QueryService / CommandService 완전 분리",
          "조회: MongoDB 집계 파이프라인 + Redis 캐싱 활용",
          "명령: 트랜잭션 무결성 + 도메인 이벤트 발행에 집중",
        ],
        result:
          "조회 API 평균 응답시간 40% 개선(MongoDB 쿼리 프로파일러 기준), 조회/명령 영역 독립 개발·배포 가능",
        tags: ["CQRS", "MongoDB", "Redis"],
      },
      {
        version: "",
        title: "결제 연동 및 PG사 제약 대응",
        problem:
          "PortOne v1 API 기반 본인인증 시 PASS 앱으로 외부 이동이 발생하여 사용자 이탈 유발. 다날 PG사를 통한 빌링키 발급 API·비인증 일회성 결제 API가 미제공되어 정기결제 플로우 구현 불가",
        solution: [
          "PortOne v1 → v2 전환으로 PASS 본인인증을 앱 내에서 처리하도록 개선",
          "PortOne IP 차단 정책(1시간 30건 / 24시간 200건) 대응을 위한 요청 제한 로직 구현",
          "다날 PG사의 API 미제공 제약 내에서 결제창 기반 플로우로 재설계",
          "결제 실패 이력을 FailHistory로 별도 관리, 매일 오후 1시 스케줄러를 통한 자동 재결제 로직 구현",
        ],
        result:
          "본인인증 시 앱 외부 이동 제거, PG사 제약 조건 내에서 안정적인 결제 시스템 확보, IP 차단 사전 방지로 서비스 중단 리스크 제거",
        tags: ["PortOne", "PG 연동", "결제"],
      },
      {
        version: "",
        title: "웹훅 기반 에러 모니터링 체계 구축",
        problem:
          "모니터링 부재로 장애 인지까지 30분~2시간 소요, 야간·주말은 인지 자체 불가. 운행 불가 자전거가 반납 미처리되어 후속 유저에게 피해 전파",
        solution: [
          "비즈니스 임팩트 기준 3단계 분류 설계로 알림 피로도 최소화",
          "주의: 단발성 비정상 응답 → 로그 기록",
          "경고: 동일 에러 3회 반복 → 개발자 Discord 알림",
          "긴급: 운행 불가·결제 실패 → 전 직원 즉시 알림",
        ],
        result:
          "장애 인지 시간 1시간+ → 1분 이내, MTTR 70% 감소(장애 티켓 기록 기준)",
        tags: ["Discord Webhook", "모니터링"],
      },
    ],
  },

  projects: [
    {
      title: "Giggle",
      subtitle: "공개 소프트웨어 개발자 대회 우수작 선정",
      period: "2024.10 ~ 2025.07",
      team: "Team-inglo",
      image: "images/giggle.png",
      description: "외국인 유학생을 위한 아르바이트 신청 관리 플랫폼",
      role: "복합 동적 필터링 쿼리 설계 (10종+ 필터)",
      highlights: [
        "IS NULL 패턴 활용 선택적 필터 적용 — 파라미터가 null이면 조건 무시",
        "오전/오후/저녁/풀타임/새벽 5개 시간대를 BETWEEN 매칭",
        "N+1 해결: 2-step 조회 패턴 (ID 목록 → 배치 Fetch)",
        "인기순/최신순 정렬 전략 분리 + 페이지네이션",
      ],
      tech: ["Java", "Spring Boot", "JPA", "MySQL", "Docker"],
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
      subtitle: "GDSC 눈꽃톤 최우수상",
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

  education: {
    university: "동국대학교",
    major: "멀티미디어공학과 (학사)",
    period: "2019.03 — 2025.02",
    highschool: "경문고등학교",
    highschoolPeriod: "2015.03 — 2018.02",
  },

  military: {
    title: "육군 병장 만기전역",
    role: "통신병",
    period: "2021.03.29 — 2022.09.28",
  },

  activities: [
    {
      title: "구름톤 UNIV. 2기 운영팀장 / 동국대 대표",
      description: "해커톤 전반 기획·진행, 동국대 멤버 선발 및 운영",
    },
    {
      title: "GDSC Dongguk 1기 Server/Cloud Member",
      description: "2023.09 ~ 2024.08",
    },
    {
      title: "Clipper 0기 백엔드 멘토",
      description:
        "2팀(6명) 대상 Spring Security 인증/인가 설계 멘토링 및 코드 리뷰",
    },
    {
      title: "HI-SW 봉사단 주관 신서중학교 특수학급 멘토링",
      description: "2023.09 ~ 2023.11",
    },
  ],

  awards: [
    "구름톤 UNIV. 1기 대상",
    "동국톤 대상",
    "GDSC 눈꽃톤 금상",
    "2024년도 여름 ICIP&캡스톤디자인 우수상",
    "공개 소프트웨어 개발자 대회 우수작",
  ],
};
