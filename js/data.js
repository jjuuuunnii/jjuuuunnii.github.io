// ============================================================
// 포트폴리오 콘텐츠 데이터
// 수정이 필요하면 이 파일만 편집하세요.
// 수치·사실은 00_프로필/강승준_총정리.md 검증 기록과 덱_수정_태스크/00_README_공통가이드.md 7절 기준표에 맞춰 둘 것 (2026.09.18 갱신: 창업 동기 추가)
// 문체: 기록형(명사형·개조식)이 기본이고, 설명·판단이 필요한 곳에만 짧은 완전문을 섞는다 (통합 덱 2차 수정과 동일)
// ============================================================

const PORTFOLIO_DATA = {
  meta: {
    title: "강승준 | Backend Engineer · Product Builder",
    description: "운영 중인 서비스의 백엔드를 책임지고, 두 번의 공동창업에서 제품을 검증한 강승준의 포트폴리오",
  },

  hero: {
    label: "Backend Engineer · Product Builder",
    name: "강승준",
    nickname: "Jayden",
    tagline: "코드로 만들고, 데이터로 판단합니다",
    description:
      "IoT 공유 자전거 스타트업에서 1년 9개월간 백엔드 개발팀장으로 3인 팀을 이끌며, 운영 중인 4개 플랫폼의 서버를 개발·운영했습니다. 그 과정에서 드러난 장애 위험·협업 문제 → 구조 개선 3회(V1 → V4). 이후 두 번의 공동창업에서는 PM으로 제품을 출시하고 데이터로 검증해 종료까지 판단했으며, 첫 창업에서는 백엔드 개발도 전담했습니다.",
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
    productDescription: "IoT 공유 자전거 플랫폼 · 포항공대·힐스테이트 검단·김천 3개 지역 운영",
    stats: [
      { value: "186대", label: "IoT 자전거" },
      { value: "약 1만 명", label: "누적 사용자" },
      { value: "4개", label: "운영 플랫폼 (앱·웹)" },
      { value: "3인", label: "백엔드 개발팀" },
    ],
    summary:
      "유저앱·오너앱·어드민웹·슈퍼바이저앱 백엔드 담당 · 기술 스택 선정, 아키텍처 결정, 코드 리뷰까지 책임. 운영과 협업에서 드러난 문제를 계기로 V1에서 V4까지 세 차례 구조 개선을 이끌었습니다.",
    note:
      "퇴사 후에도 고객 계약을 지키기 위해 2026년 3월까지 폐업 마무리 담당 · 계약에 포함된 자전거 재배치(리밸런싱) 기능 3주 만에 완성 · 운영 이슈 정리 후 인계",
    achievements: [
      {
        version: "V1 → V2",
        title: "장비 응답을 기다리느라 서버 스레드가 묶이던 구조 개선",
        subtitle: "블로킹 폴링 → SSE 푸시 · Kafka 서버 간 통신",
        problem:
          "대여 요청 스레드가 장비 응답을 기다리며 명령 1회에 최대 22초, 대여 1건(명령 4회)에 최대 88초 묶임. 동시 대여가 늘면 새 요청을 받지 못할 위험이 있었습니다. 원인: 서버가 앱에 결과를 먼저 보낼 수단 없음",
        solution:
          "결과가 나오면 서버가 앱으로 보내는 SSE 구조를 팀에 먼저 제안 · 운영과 병행해 SSE·Kafka를 2주간 학습해 구현 · 장비 통신 전용이던 Kafka를 서버 간 통신으로 확장",
        result:
          "전 서버 폴링 루프 0건 · 요청 스레드가 장비 응답을 기다리지 않음 · 결과는 장비 회신 도착 즉시 SSE로 앱에 전달",
        details: [
          "기존 구조: 명령 후 장비 응답이 Redis에 기록되기를 2초 간격·최대 11회 폴링",
          "SSE 전용 서버를 직접 신설·구현(해당 모듈 커밋의 98%) — 성공·오류 토픽을 구독해 SseEmitter로 앱에 전달",
          "요청에는 접수만 응답하고 스레드 즉시 반환, 회신을 소비한 서버가 상태 갱신 후 SSE로 전달",
          "서버를 역할별 5개로 분리하고 서버별 토픽·컨슈머 그룹 설계",
          "서버 간 통신에 Kafka를 계속 쓸지 RabbitMQ·Redis Pub/Sub과 비교해 재검토 — '유실된 메시지를 다시 소비할 수 있는가'를 기준으로 확장 결정",
          "보상 Job(응답이 없으면 상태를 되돌리는 작업): 명령 발행 시 예약 → 정상 응답이면 취소, 응답이 없으면 실행 (2세대 ExecutorService 10초 → 3세대 Quartz 12초 · 보상 Job 5종)",
          "기체·명령 단위 상태 키로 중복 실행 방지",
          "서비스 내 채팅 도입 논의로 양방향 통신이 필요해져 4세대에서 WebSocket으로 전환 — STOMP 없이 순수 WebSocket으로 충분하다고 판단",
        ],
        tags: ["SSE", "Kafka", "MQTT", "Quartz", "WebSocket"],
      },
      {
        version: "V2 → V3",
        title: "한 곳을 고치면 다른 기능까지 흔들리던 코드를 도메인 단위로 분리",
        subtitle: "Layered → 도메인·유스케이스 + 이벤트 · 무중단 배포",
        problem:
          "핵심 서비스 클래스 1개가 1,419줄 · 의존성 25개 — 한 기능을 고치면 다른 도메인까지 영향. 서비스 하나에 유스케이스가 집중돼 3명이 같은 파일을 수정해야 했습니다.",
        solution:
          "도메인·유스케이스 단위로 분리 · 도메인 간 직접 호출은 이벤트로 대체해 서로 직접 의존하지 않는 구조 · 정한 구조 규칙은 코드로 강제",
        result:
          "1,419줄 · 의존성 25개 → 유스케이스당 153~221줄 · 의존성 3개 · 팀원이 서로 다른 도메인을 동시에 작업하는 구조",
        details: [
          "도메인 간 직접 호출 → Spring ApplicationEvent로 분리",
          "역할별 커스텀 어노테이션 + 검증기로 아키텍처 규칙 강제 — 규칙을 어긴 코드는 서버가 기동되지 않음",
          "Nginx Blue-Green 배포 + Route 53 가중치 라우팅으로 무중단 배포",
        ],
        tags: ["DDD", "ApplicationEvent", "Blue-Green"],
      },
      {
        version: "V3 → V4",
        title: "조회 기능을 늘려도 대여·반납 처리가 흔들리지 않게 읽기와 쓰기 분리",
        subtitle: "CQRS · 헥사고날 아키텍처",
        problem:
          "실시간 위치·상태 조회와 대여·반납 명령이 같은 모델을 공유해, 조회를 늘릴 때마다 명령 쪽 정합성까지 함께 신경 써야 했습니다.",
        solution:
          "읽기(조회)·쓰기(명령) 모델 분리 · 외부 의존은 포트·어댑터 뒤로 격리",
        result:
          "조회 확장이 명령 경로에 영향을 주지 않는 구조 · 조회 API를 늘려도 대여·반납 명령 코드는 그대로",
        details: [
          "3세대 11개 도메인의 Command/Query 컨트롤러 분리 → 4세대 조회 전용 모델로 확장",
          "5개 서비스·약 21만 줄 규모 4세대 코드베이스의 설계와 코드 리뷰 주도",
          "트랜잭션 커밋 전에 이벤트가 처리되던 문제를 '커밋 후 비동기 처리' 메타 어노테이션으로 정리",
          "퇴사 후 마무리 기간(~2026.03)에 AI 협업 규칙과 아키텍처 템플릿을 도입해 인계",
        ],
        tags: ["CQRS", "Hexagonal"],
      },
      {
        version: "",
        title: "결제가 실패해도 사용자가 몰라 쌓이던 미수금 처리 자동화",
        subtitle: "실패 사유 기록 · 즉시 알림 · 자동 재결제 배치",
        problem:
          "잔액 부족, 정지된 카드 등 결제 실패 사유가 다양했고, 사용자가 실패를 제때 알지 못하면 미수금이 쌓였습니다.",
        solution:
          "실패 사유 기록 → 사용자에게 즉시 알림 → 매일 미수금 재결제 배치",
        result:
          "결제 실패와 사유가 사용자에게 바로 전달 · 미수금은 배치로 자동 재청구 · 미등록·미납 사용자는 대여 단계에서 차단",
        details: [
          "아임포트(PortOne v1) 빌링키 기반 재결제·취소 연동",
          "실패 이력(FailHistory)을 사유와 함께 기록하고 결제 성공 시 정리",
          "실패 즉시 FCM 푸시, 앱 이용내역에서 실패 사유 확인",
          "매일 13시 미수금 재결제 배치",
          "결제수단 미등록·미납 사용자는 대여 단계에서 차단",
        ],
        tags: ["아임포트", "Batch", "FCM"],
      },
      {
        version: "",
        title: "사용자 문의가 와야 알던 장비 명령 장애를 알림으로 먼저 인지",
        subtitle: "명령 실패 13종 분류 · 웹훅·SSE·푸시 3경로 전파",
        problem:
          "IoT 장비 명령이 실패해도 사용자 문의가 들어오기 전에는 장애를 알지 못했습니다.",
        solution:
          "장비 명령 실패를 13종으로 분류 · 실패가 나면 알림 3경로로 바로 전파",
        result:
          "사용자 문의보다 먼저 알림으로 장애 인지 · 인지 시간 1시간 이상 → 1분 이내 (운영 경험 기준, 측정치 아님)",
        details: [
          "IoT 장비 명령 실패 유형 13종 분류",
          "운영자 웹훅(Discord)·SSE·앱 푸시 3경로 전파",
        ],
        tags: ["Webhook", "SSE", "모니터링"],
      },
      {
        version: "PoC",
        title: "파트너가 요구한 자전거 제어권을 넘기지 않고 API로 연동",
        subtitle: "외부 파트너 PoC · 최소 권한 연동 API (인증·기체·기능 경계)",
        problem:
          "타사 공유 모빌리티 기업의 스테이션에 자사 자전거를 연동하는 PoC · 상대측은 자기 앱으로 자전거를 직접 제어할 권한을 요청했지만, 모든 자전거 제어는 MQTT로 자사 서버를 거쳐야 했습니다.",
        solution:
          "제어권은 자사 서버에 유지 · 상대 앱은 자사 서버를 거쳐 명령하는 전용 연동 API 설계",
        result: "필요한 권한만 열어 둔 최소 권한 연동으로 PoC 완수",
        details: [
          "전원·일시 잠금·모터 잠금 등 명령 6종 API",
          "스테이션 도킹 이벤트·슬롯 상태 수신으로 양방향 연동",
          "파트너별 API 키 인증 필터 + PoC 지정 기체 6대 화이트리스트",
          "상대 개발사와의 기술 협의·명세 교환 담당",
        ],
        tags: ["Partner API", "인증", "PoC"],
      },
    ],
  },

  // 창업 — 공동창업 2회: 만든 것과 그것을 데이터로 판단한 기록
  ventures: {
    intro: {
      eyebrow: "From Tech WHY to Business WHY",
      lesson:
        "발켄에서는 개발에만 집중해, 기술을 고르는 이유는 끝까지 물었지만 이 사업이 풀어야 할 문제인지는 묻지 않았습니다. 창업을 택한 이유는 그 질문을 직접 맡고 싶어서였습니다. 문제를 분석하고, 고객의 목소리를 듣고, 고객 입장에서 집중할 퍼널을 정해 제품을 고치는 과정 — 그 반복에 치열하게 몰입하는 것.",
      // 창업 동기(본인 구술 2026.09.18) 4단계와 실제로 한 일. 사실은 공통가이드 7절 기준표 안에서만
      whyLabel: "하고 싶었던 과정 → 실제로 한 일",
      why: [
        { no: "01", title: "문제 분석", desc: "포게티 · 커뮤니티 가입인사 195건 분류 → '망각' 호소 약 3% · 유저당 수익(계산) 21원 < AI 원가 64원" },
        { no: "02", title: "고객의 목소리", desc: "OFF STAGE · 출시 전 유저 인터뷰 10명 → '단톡방 릴레이 보정' 문제 정의 · 홍대 포토부스 104명 소개 → 가입 0명" },
        { no: "03", title: "집중할 퍼널 결정", desc: "OFF STAGE · 출시 전 합격선 5개로 단계별 기준 설정 · 저장 후 초대 0건 → 초대 노출을 작업 시작 시점으로" },
        { no: "04", title: "개선 반복", desc: "OFF STAGE · 광고 소재 교체로 클릭률 7.5% → 36.3% · CAC ₩1,745 → ₩864 · 과금 조건 도달 0명 → 크레딧 과금 보류" },
      ],
      delta: {
        from: { value: "약 3개월", label: "포게티 · 착수부터 실패를 알아차리기까지 (개발 포함)" },
        to: { value: "19일", label: "OFF STAGE · 런칭부터 종료 판단까지" },
      },
      takeaway:
        "포게티는 만든 뒤에 검증(착수부터) · OFF STAGE는 출시 전 합격선·계측부터 설정(런칭부터) → 운영 데이터로 판단",
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
        role: "공동창업 · PM · 백엔드 전담",
        oneLiner: "AI가 알림 시점을 정해주는 일정 앱",
        status: "App Store 출시 후 종료",
        image: "images/forget_duo.jpg",
        who: "타깃: ADHD 성향 성인 — 실행기능 저하 자기보고 + 평생 깜빡 패턴 (진단 불문)",
        metrics: [
          { value: "86,000줄", label: "72일간 Claude Code와 함께 작성한 백엔드 코드 (절반이 테스트)", tone: "neutral" },
          { value: "602개", label: "Claude Code 하네스로 나눈 개발 태스크 (1개 = PR 1개)", tone: "neutral" },
          { value: "약 3%", label: "성인 ADHD 커뮤니티 가입인사 195건(자기선택 표본) 중 '망각'을 어려움으로 꼽은 글", tone: "miss" },
          { value: "21원 < 64원", label: "유저당 제휴 수익(계산) < 유저당 AI 원가", tone: "miss" },
        ],
        tech: ["Java 21", "Spring Boot 4", "MySQL", "Redis", "Quartz", "Flyway", "Claude Code", "Anthropic · OpenAI API"],
        sections: [
          {
            label: "만든 것",
            tone: "solution",
            items: [
              "PM · PRD 3판까지 개정 · North Star KPI 설정(AI 전화 후 7일 안에 일정을 다시 등록하는 비율)",
              "백엔드 전담 · 8개 도메인 서버 설계·구현 · 72일간 프로덕션 43,792줄 + 테스트 42,704줄(Claude Code와 함께 작성) · App Store 출시",
              "Claude Code 개발 하네스 설계: 121 Phase · 602 태스크(태스크 1개 = PR 1개)",
              "규칙 문서 23개 · 자동 훅 4종 · ArchUnit 15개 규칙으로 구조 강제 — 반복된 AI 오류는 테스트 규칙으로 고정",
              "자동 실행 환경에 사용량 한도 · 이상 반복 감지 가드 적용",
              "Anthropic·OpenAI API로 자연어 일정 파싱(호출 비용 전건 DB 기록) · Quartz 리마인드 → FCM 푸시 · Twilio VoIP 음성 전화",
            ],
          },
          {
            label: "놓친 것",
            tone: "problem",
            items: [
              "분석 이벤트 호출 0회 · 계획한 지표 73개 중 약 67%는 측정 미착수",
            ],
          },
          {
            label: "데이터 → 판단",
            tone: "result",
            items: [
              "성인 ADHD 커뮤니티 가입인사 195건 분류: 미루기·착수 실패 약 111건 · '망각'을 어려움으로 꼽은 글 약 6건(약 3%)",
              "질문이 '바꾸고 싶은 습관'이라 미루기가 유도되기 쉬운 자기선택 표본이어서, 결론이 아니라 '망각'이 핵심이라는 가설에 대한 사전 반대 신호로 기록했습니다.",
              "유저당 제휴 수익(계산) 21원 < 유저당 AI 원가 64원 · 실제 매출이 아닌 계산값",
              "종료 이유: 약한 통점 · 무료 대체재 · 맞지 않는 수익 구조",
            ],
          },
        ],
        learned: "개발이 검증을 앞지르면 실패 인지가 늦어짐 — 포게티에서는 착수부터 판단까지 약 3개월",
      },
      {
        index: "02",
        name: "OFF STAGE",
        period: "2026.07 — 2026.08",
        role: "공동창업 · PM",
        oneLiner: "친구들과 단체사진을 동시에 보정하는 앱",
        status: "런칭 19일 · 가입 220명 · 종료",
        image: "images/offstage_trio.jpg",
        who: "단톡방에서 한 명씩 돌려가며 보정하느라 사진 올릴 타이밍을 놓치던 20대 초반",
        metrics: [
          { value: "71~73%", label: "초대장 수락률 (합격선 60%)", tone: "ok" },
          { value: "94.7%", label: "저장 → 전원 승인 도달률 · 저장 단계 세션 중 참여자 전원 승인까지 간 비율 · 합격선 70%", tone: "ok" },
          { value: "₩864", label: "3차 광고 집행 CAC (1차 ₩1,745의 절반)", tone: "ok" },
          { value: "1.7%", label: "광고 집행 기간 가입자 117명의 D7 잔존율 (D1 14.5%)", tone: "miss" },
        ],
        tech: ["SQL", "GA4", "Meta 광고", "App Store Connect", "Claude Code"],
        sections: [
          {
            label: "출시 전에 정한 것",
            tone: "solution",
            items: [
              "유저 인터뷰 10명 → '단톡방 릴레이 보정' 문제 정의",
              "런칭 전 합격선 5개(가안): 초대 수락 60% · 첫 세션 경험 40% · 저장 → 전원 완료 70% · 30일 재소환 35% · 개인 Plus 전환 3%",
            ],
          },
          {
            label: "측정 체계",
            tone: "solution",
            items: [
              "읽기 전용 DB 계정(SELECT 전용 · 타임아웃 30초) · 어드민 API · GA4 · Meta 픽셀 · 스토어 · 광고 데이터를 AI 분석 하네스에 연결",
              "지표 정의서 단일 기준 · 분석 결과마다 [실측]/[추정] 근거 태그와 반론 필수",
              "방문 로그가 나흘간 유실됐을 때 AI의 오진을 용량 증설 테스트로 바로잡고, 이중 수집해 둔 GA4 데이터(Data API)로 일별 수치를 복원한 뒤 재발 방지 장치를 추가했습니다.",
            ],
          },
          {
            label: "데이터로 내린 결정",
            tone: "solution",
            items: [
              "광고 소재 교체: 랜딩→스토어 클릭률 7.5% → 36.3% · CAC ₩1,745 → ₩864",
              "AI가 구현까지 마친 '저장 직후 초대 권유' → 저장 후 초대 0건 실측으로 적용 전 당일 기각 · 초대는 작업 시작 시점에 노출",
              "과금 조건 도달 사용자 0명 → 크레딧 과금 보류 제안",
              "홍대 포토부스 앞에서 104명에게 직접 소개했지만 가입은 0명이었고, 채널이 아니라 제품 전제의 문제로 판단했습니다.",
            ],
          },
          {
            label: "결과 → 판단",
            tone: "result",
            items: [
              "합격선 5개 판정: 통과 2(초대장 수락률 71~73% · 저장 → 전원 승인 도달률 94.7%) · 미달 1(첫 세션 경험 7일 신호 20.8%, 합격선 40%) · 판정 불가 2(30일 재소환 · Plus 전환)",
              "재방문: D1 14.5% → D7 1.7%(광고 집행 기간 가입자 117명) · 재완성 사용자 8명(사진을 완성해 본 54명 중 14.8%)",
              "단체사진을 함께 보정할 일 자체가 자주 생기지 않는다고 보고 종료를 결정했습니다.",
            ],
          },
        ],
        learned: "런칭 19일 만에 종료 — 핵심 흐름은 합격선 통과, 재방문이 끊긴 지점은 D7 1.7% · 재사용 주기가 제품 밖(단체사진 촬영)에 있다고 판단",
      },
    ],
  },

  projects: [
    {
      title: "Giggle",
      subtitle: "공개SW 개발자대회 우수작",
      period: "2024.10 ~ 2025.07",
      team: "Team-inglo",
      image: "images/giggle.jpg",
      description: "외국인 유학생의 아르바이트 지원을 관리하는 플랫폼",
      role: "지역·업종·근무시간·비자 등 10종 이상 조건으로 공고를 찾는 검색 API 설계·구현",
      highlights: [
        "선택한 조건만 적용되는 검색 필터를 단일 JPQL로 구현 — IS NULL 조건으로 값이 없는 필터는 건너뜀",
        "오전·오후·저녁·풀타임·새벽 5개 시간대를 BETWEEN으로 근무시간과 매칭",
        "N+1 조회 → ID 목록 조회 후 일괄 Fetch하는 2단계 조회로 변경",
        "인기순·최신순 정렬 전략 분리, 페이지네이션",
      ],
      tech: ["Java", "Spring Boot", "JPA (JPQL)", "MySQL", "Docker"],
      repo: "https://github.com/Team-inglo/Giggle-Server",
    },
    {
      title: "Wave",
      subtitle: "2024 GDSC Solution Challenge",
      period: "2024.01 ~ 2024.02",
      team: "Team wave",
      image: "images/wave.jpeg",
      description: "지역별 전쟁 뉴스를 지도에서 보여주고 기부로 연결하는 서비스",
      role: "뉴스를 지역별로 수집해 지도에 보여주는 백엔드 설계·구현",
      highlights: [
        "크롤링 서버(Flask)는 스케줄에 따라 뉴스를 수집해 API로 보내고, 저장·조회는 API 서버(Spring Boot)가 맡도록 분리 — 크롤링이 실패해도 메인 API는 영향받지 않는 구조",
      ],
      tech: ["Java", "Spring Boot", "JPA", "MySQL", "Flask"],
      repo: "https://github.com/GDSC-DGU/2024-SolutionChallenge-Wave",
    },
    {
      title: "Pengdolli",
      subtitle: "GDSC 눈꽃톤 금상",
      period: "2024.01",
      team: "",
      image: "images/pengdolli.png",
      description: "날씨에 맞는 옷차림을 추천하고, 투표로 오늘의 베스트 착장을 고르는 서비스",
      role: "날씨 기반 옷차림 추천 · 착장 투표 기능 개발",
      highlights: [
        "날씨 API로 하루를 아침·점심·저녁·새벽으로 나눠 시간대별 옷차림 추천",
        "사용자 투표 결과로 오늘의 베스트 착장 선정",
      ],
      tech: ["Java", "Spring Boot", "Spring Security", "MySQL", "Docker"],
    },
    {
      title: "Mooco",
      subtitle: "구름톤 UNIV. 1기 대상",
      period: "2023.11",
      team: "Team 사우르스",
      image: "images/mooco.png",
      description: "사진의 주요 색상을 뽑아 월간 바코드 아트로 만드는 서비스",
      role: "한 달 치 사진을 색상 바코드로 만드는 기능 개발",
      highlights: [
        "이미지를 1/4로 줄인 뒤 RGB를 집계해 최빈 색상 추출",
        "ConcurrentHashMap + parallel stream으로 픽셀 순회 병렬 처리",
        "BufferedImage·Graphics API로 추출한 색상을 바코드 이미지로 합성",
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
      description: "시즌마다 테마를 바꿔 운영한 익명 편지 서비스",
      role: "기획·설계·개발 1인 전담",
      highlights: [
        "익명으로 편지를 주고받는 서비스",
        "단풍·벚꽃·크리스마스 시즌 테마로 운영",
      ],
      tech: ["Java", "Spring Boot", "Spring Security", "MySQL"],
    },
  ],

  skills: [
    {
      category: "Backend",
      items: ["Java", "Spring Boot", "Spring MVC", "Spring Security", "Spring Data JPA", "QueryDSL", "Quartz", "ArchUnit", "Python"],
    },
    { category: "Data & Storage", items: ["MySQL", "Redis", "MongoDB"] },
    { category: "Messaging & Realtime", items: ["Kafka", "MQTT", "SSE", "WebSocket"] },
    {
      category: "Infrastructure",
      items: ["AWS (EC2, S3, RDS, Route 53)", "Docker", "Nginx", "GitHub Actions"],
    },
    { category: "AI Development", items: ["Claude Code (개발 하네스 설계)", "Anthropic · OpenAI API"] },
    { category: "Product Analytics", items: ["SQL", "GA4", "Meta 광고", "App Store Connect"] },
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
      description: "포게티로 선발 · 2026.06–08 창업 교육",
    },
    {
      title: "GDSC Dongguk 1기 Server/Cloud",
      description: "2023.09–2024.08 · 교내 축제 웹사이트 서버 개발, 기술 세미나 발표",
    },
    {
      title: "구름톤 UNIV. 2기 운영팀장",
      description: "동국대 대표 · 해커톤 기획·진행, 교내 멤버 선발",
    },
    {
      title: "카카오 × 구름 벚꽃톤 운영팀장 (STAFF)",
      description: "2024.03 · 운영 총괄, 기술 질의 응대, 팀빌딩 매칭",
    },
    {
      title: "Clipper 0기 백엔드 멘토",
      description: "2팀 6명 대상 Spring Security 인증·인가 설계 멘토링, 코드 리뷰",
    },
    {
      title: "그 밖의 활동",
      description: "SW개발자 양성과정 이수(2024.03–2025.02) · HI-SW 봉사단 특수학급 코딩 멘토링(2023.09–11)",
    },
  ],

  awards: [
    "구름톤 UNIV. 1기 대상 (Mooco)",
    "공개SW 개발자대회 우수작 (Giggle)",
    "GDSC 눈꽃톤 금상 (Pengdolli)",
    "동국톤 대상",
    "2024 여름 ICIP & 캡스톤디자인 우수상",
    "2024 동국 CD 59초 영화제 장려상",
    "HI-SW봉사단 교육봉사 콘텐츠 제작 경진대회 3등",
  ],
};
