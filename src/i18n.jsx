// i18n.jsx — Yaksok homepage strings (ko / en) + language context
// Exports to window: STRINGS, LangCtx, useI18n

const STRINGS = {
  ko: {
    htmlLang: 'ko',
    metaTitle: '약속 (Yaksok) — 모두를 위한 의약품 식별 · 복약 가이드',
    nav: { problem: '필요성', features: '사용법', accessibility: '접근성', download: '다운로드' },
    a11y: {
      skip: '본문으로 건너뛰기',
      themeToLight: '밝은 테마로 전환',
      themeToDark: '어두운 테마로 전환',
      langToEn: 'Switch to English',
      langToKo: '한국어로 보기',
      langToggle: '언어',
      menu: '메뉴 열기',
      phoneShowcase: '약속 앱 화면 미리보기',
    },
    store: { apple1: 'Download on the', apple2: 'App Store', google1: 'GET IT ON', google2: 'Google Play' },

    hero: {
      eyebrow: 'YAKSOK · iFeel',
      headline: ['보이지 않아도,', '의약품 식별', '어렵지 않아요.'],
      sub: "'약속'은 시각장애인과 정보 취약계층의 안전한 약 식별 및 복용을 돕는 배리어프리 복약 가이드 앱입니다.",
      trust: '',
      scroll: '스크롤해서 살펴보기',
    },

    problem: {
      eyebrow: '약은 안전해야 합니다',
      heading: ['시각장애인에게도, 고령층에게도,', '약은 안전해야 해요.'],
      intro: '4만개가 넘는 의약품 중 점자 표기 의약품은 35개 뿐이고,\n10종 이상 다제약물 복용 만성질환자가 171만명으로 늘었지만, 전문 용어가 가득한 의약품 설명서는 아무리 읽어봐도 함께 복약하면 안되는 약물조차 식별하기 어렵습니다.',
      stats: [
        { n: '0.1%', l: '의약품 4만여 종 중\n점자 표기가 된 의약품 비율' },
        { n: '54%', l: '의약품을 구별하지 못해\n먹는 걸 포기한 경험이 있는 비율' },
        { n: '60%', l: '의약품을 잘못 구별하여\n오투약한 경험이 있는 비율' },
      ],
      closing: '',
    },

    features: {
      eyebrow: '비추면, 읽어드려요',
      heading: ['비추기만 하면,', '나머지는 약속이.'],
      sub: '카메라로 약을 비추는 단 한 번의 동작으로, 약속은 4만여 종의 의약품을 식별하고 누구나 이해할 수 있는 쉬운 말로 설명해 드려요.',
      modes: ['의약품 식별', '사용기한 확인', '사진 읽기'],
      items: [
        {
          tag: '01 · 의약품 식별',
          title: '바코드를 비추면, 정확히 식별해요',
          body: 'AI가 의약품 포장의 바코드를 인식하고, 식품의약품안전처 의약품 허가정보와 대조해 어떤 약인지 정확하게 식별합니다.',
        },
        {
          tag: '02 · 사용기한 확인',
          title: '사용기한도, 비추기만 하면 알려줄게요',
          body: '포장지에 적힌 날짜를 찾아 헤맬 필요 없어요. 카메라로 비추기만 하면 AI가 사용기한을 정확히 인식해 음성으로 읽어드립니다.',
        },
        {
          tag: '03 · 사진 읽기',
          title: '사진 한 장이면 어떤 모습인지 알 수 있어요.',
          body: '눈앞의 풍경이나 사물을 사진으로 찍어보세요. AI가 사진 속 상황과 모습을 자세히 분석해 오디오로 친절하게 설명해 드립니다.',
        },
        {
          tag: '04 · AI 쉬운 설명',
          title: '어려운 복약 안내를, 쉬운 말로',
          body: 'AI가 식약처 원문 안내를 어린아이도 이해할 수 있는 쉬운 말로 다시 써서 들려드려요. 4만여 종의 모든 의약품을, 빠짐없이요.',
        },
      ],
      soonTag: '곧 만나요',
      soonTitle: '함께 먹으면 안 되는 약, 미리 알려드릴게요',
      soonBody: '식약처 DUR(의약품안전사용서비스) 데이터와 RAG 기술을 결합해, 여러 약을 함께 복용할 때의 병용금기와 중복 투여 위험을 분석하는 기능을 준비하고 있습니다.',
      soonNote: '향후 업데이트로 제공될 예정입니다',
    },

    demo: {
      eyebrow: '직접 보기',
      heading: ['같은 약,', '세 가지 설명.'],
      sub: '약속은 식약처 원문, ‘e약은요’ 요약, 그리고 AI 쉬운 설명을 한 화면에서 전환할 수 있어요. 아래에서 직접 바꿔보고, 읽어주기도 눌러보세요.',
      modes: ['원문', 'e약은요', 'AI 쉬운 설명'],
      modeHint: '설명 방식을 선택하세요',
      read: '읽어주기',
      stop: '멈추기',
      reading: '읽어드리고 있어요',
      drug: { cat: '해열 · 진통 · 소염제', name: '타이레놀정500mg' },
      sections: {
        '원문': [
          { label: '약의 효과', body: '해열·진통제로, 두통·치통·근육통·생리통 및 발열의 완화에 사용합니다.' },
          { label: '복용 방법', body: '성인 기준 1회 1정, 1일 3회 식후 30분에 복용합니다. 복용 간격은 4시간 이상 두세요.' },
          { label: '주의할 점', body: '매일 세 잔 이상 정기적으로 음주하는 사람이 복용할 경우 전문가와 상의하세요.' },
          { label: '보관 방법', body: '직사광선을 피해 습기가 적고 서늘한 곳에 보관하세요.' },
        ],
        'e약은요': [
          { label: '이 약의 효능', body: '감기로 인한 발열 및 두통, 치통, 근육통, 신경통에 사용하는 의약품입니다.' },
          { label: '이 약의 사용법', body: '만 12세 이상 소아 및 성인은 1회 1~2정씩, 1일 3~4회 필요시 복용합니다.' },
          { label: '사용상 주의사항', body: '정해진 용법과 용량을 지키고, 1일 최대 4,000mg을 초과하지 마세요.' },
        ],
        'AI 쉬운 설명': [
          { label: '약의 효과', body: '아프거나 열이 날 때 먹는 약이에요. 머리·이·근육이 아프거나 열이 날 때 도움이 돼요.', ai: true },
          { label: '복용 방법', body: '어른은 한 번에 한 알, 하루 세 번 드세요. 밥을 먹고 30분 뒤에 드시고, 다음 약까지 네 시간은 기다리세요.', ai: true },
          { label: '주의할 점', body: '술을 자주 드시는 분은 이 약을 드시기 전에 의사나 약사와 먼저 이야기하세요.', ai: true },
          { label: '보관 방법', body: '햇빛이 닿지 않고 습하지 않은 시원한 곳에 두세요.', ai: true },
        ],
      },
    },

    access: {
      eyebrow: '누구도 빼놓지 않아요',
      heading: ['누구도 빼놓지 않는 것,', '그게 기본값이에요.'],
      intro: '약속의 접근성은 ‘나중에 더한 기능’이 아닙니다. 첫 화면부터 접근성을 중심에 두고 만들어졌습니다.',
      items: [
        { icon: 'accessibility_new', title: '스크린리더 최적화', body: '보이스오버·톡백의 논리적 초점 순서로, 화면 전체를 더듬지 않고도 빠르게 파악할 수 있어요.' },
        { icon: 'graphic_eq', title: '화면 읽어주기', body: '정보가 많은 화면에는 음성 안내 버튼을 더해, 한 번에 전체 내용을 들려드려요.' },
        { icon: 'format_size', title: '다이나믹 폰트', body: '시스템 글자 크기에 맞춰 화면 글꼴이 유연하게 확대·축소됩니다.' },
        { icon: 'vibration', title: '햅틱 & 음성 인터페이스', body: '진동과 음성 안내로, 화면을 보지 않고도 또렷하게 사용할 수 있어요.' },
        { icon: 'cloud_off', title: '오프라인에서도', body: '한 번 식별한 약은 기기에 저장하고, 온디바이스 AI로 통신이 끊겨도 작동합니다.' },
        { icon: 'lock', title: '개인정보 보호', body: '온디바이스 처리로 민감한 건강 정보를 기기 밖으로 내보내지 않아요.' },
      ],
      siteNote: '이 홈페이지도 스크린리더와 키보드 탐색에 맞춰 만들었습니다.',
    },

    cta: {
      heading: ['지금, 약속과', '함께 시작하세요.'],
      sub: 'iPhone과 Android에서 무료로 내려받을 수 있어요.',
    },

    footer: {
      team: 'iFeel',
      tagline: '시각장애인과 고령자를 포함한 모두를 위한 의약품 식별 및 복약 가이드.',
      contactLabel: '문의',
      contact: 'ifeel.devstory.co.kr@gmail.com',
      disclaimerLabel: '의료 면책 조항',
      disclaimer: '약속은 식품의약품안전처 공공데이터를 기반으로 한 의약품 식별 보조 서비스입니다. 제공되는 정보는 참고용이며, 정확한 복용은 반드시 전문가와 상의하세요.',
      dataLabel: '활용 공공데이터',
      data: '의약품 제품 허가정보 · 의약품안전사용서비스(DUR) · e약은요 (식품의약품안전처)',
      navLabel: '바로가기',
      copyright: '© 2026 iFeel. All rights reserved.',
    },
  },

  en: {
    htmlLang: 'en',
    metaTitle: 'Yaksok (약속) — Medicine identification & medication guide for everyone',
    nav: { problem: 'Why', features: 'Usage', accessibility: 'Accessibility', download: 'Download' },
    a11y: {
      skip: 'Skip to main content',
      themeToLight: 'Switch to light theme',
      themeToDark: 'Switch to dark theme',
      langToEn: 'Switch to English',
      langToKo: '한국어로 보기',
      langToggle: 'Language',
      menu: 'Open menu',
      phoneShowcase: 'Preview of the Yaksok app screens',
    },
    store: { apple1: 'Download on the', apple2: 'App Store', google1: 'GET IT ON', google2: 'Google Play' },

    hero: {
      eyebrow: 'YAKSOK · iFeel',
      headline: ['Identifying your medicine', 'is easy — even', 'without sight.'],
      sub: "'Yaksok' is a barrier-free medication guide app that helps blind and information-vulnerable people safely identify and take their medicine.",
      trust: '',
      scroll: 'Scroll to explore',
    },

    problem: {
      eyebrow: 'Why Yaksok',
      heading: ['For the blind, for older adults —', 'medicine should be safe.'],
      intro: 'Tiny print and look-alike pills are made for people who can see and manage them on their own. Yaksok is built for blind and older adults: point your phone at a medicine, and it identifies the drug and reads the dosage and warnings aloud, in plain language.',
      stats: [
        { n: '0.1%', l: 'of the 40,000+ medicines on the market carry braille labelling' },
        { n: '54%', l: 'have given up on taking a medicine because they could not tell it apart' },
        { n: '60%', l: 'have taken the wrong medicine after misidentifying it' },
      ],
      closing: '',
    },

    features: {
      eyebrow: 'What Yaksok does',
      heading: ['Just point.', 'Yaksok does the rest.'],
      sub: 'From a single gesture — pointing your camera at a medicine — Yaksok carries you all the way from identification to a plain-language explanation.',
      modes: ['Identify', 'Check expiry', 'Read a photo'],
      items: [
        {
          tag: '01 · IDENTIFY',
          title: 'Point at the barcode — get an exact match',
          body: 'AI reads the barcode on the package and matches it against the MFDS drug-approval database to identify exactly what you’re holding.',
        },
        {
          tag: '02 · CHECK EXPIRY',
          title: 'Point at the date — Yaksok reads it for you',
          body: 'No more hunting for the printed date. Just point your camera at it — AI recognizes the expiry date precisely and reads it aloud.',
        },
        {
          tag: '03 · READ A PHOTO',
          title: 'One photo tells you what’s in front of you.',
          body: 'Take a photo of the scene or object in front of you. AI analyzes what’s in the picture in detail and describes it to you, out loud.',
        },
        {
          tag: '04 · AI EASY MODE',
          title: 'Hard instructions, in words anyone gets',
          body: 'AI rewrites the official instructions into plain language a child could follow — for all 40,000+ medicines, without exception.',
        },
      ],
      soonTag: 'Coming soon',
      soonTitle: 'We’ll warn you about drugs that shouldn’t mix',
      soonBody: 'We’re building a feature that combines the MFDS DUR drug-safety database with RAG to flag contraindications and duplicate-dosing risks when you take several medicines together.',
      soonNote: 'Planned for a future update',
    },

    demo: {
      eyebrow: 'Try it',
      heading: ['One medicine,', 'three ways to read it.'],
      sub: 'Yaksok lets you switch between the official text, the “e-yak-eun-yo” summary, and the AI plain-language version — all on one screen. Switch below, and try read-aloud.',
      modes: ['Origin', 'e-yak-eun-yo', 'AI Easy'],
      modeHint: 'Choose how it’s explained',
      read: 'Read aloud',
      stop: 'Stop',
      reading: 'Reading aloud',
      drug: { cat: 'Fever · pain · anti-inflammatory', name: 'Tylenol 500mg Tablet' },
      sections: {
        '원문': [
          { label: 'What it does', body: 'A fever reducer and pain reliever, used to ease headache, toothache, muscle pain, menstrual pain, and fever.' },
          { label: 'How to take it', body: 'Adults take 1 tablet at a time, 3 times a day, 30 minutes after meals. Leave at least 4 hours between doses.' },
          { label: 'Things to watch', body: 'If you regularly drink three or more alcoholic drinks a day, consult a professional before taking it.' },
          { label: 'Storage', body: 'Keep in a cool, dry place away from direct sunlight.' },
        ],
        'e약은요': [
          { label: 'What it’s for', body: 'Used for fever and headache from a cold, as well as toothache, muscle pain, and nerve pain.' },
          { label: 'How to use it', body: 'Children 12 and over and adults take 1–2 tablets, 3–4 times a day as needed.' },
          { label: 'Precautions', body: 'Follow the dose and timing, and do not exceed 4,000 mg per day.' },
        ],
        'AI 쉬운 설명': [
          { label: 'What it does', body: 'It’s medicine for when you hurt or have a fever. It helps with a sore head, teeth, or muscles, and brings a fever down.', ai: true },
          { label: 'How to take it', body: 'Adults take one tablet at a time, three times a day. Take it 30 minutes after eating, and wait at least four hours before the next one.', ai: true },
          { label: 'Things to watch', body: 'If you often drink alcohol, talk to a doctor or pharmacist before taking it.', ai: true },
          { label: 'Storage', body: 'Keep it somewhere cool and dry, out of the sunlight.', ai: true },
        ],
      },
    },

    access: {
      eyebrow: 'Built for everyone',
      heading: ['Leaving no one out —', 'that’s the default.'],
      intro: 'Accessibility in Yaksok was never bolted on later. It was built into the center of the product, from the very first screen.',
      items: [
        { icon: 'accessibility_new', title: 'Screen-reader first', body: 'A logical focus order for VoiceOver and TalkBack lets you grasp a whole screen in seconds — no hunting around.' },
        { icon: 'graphic_eq', title: 'Read the screen aloud', body: 'On information-dense screens, a read-aloud button speaks the entire page at once.' },
        { icon: 'format_size', title: 'Dynamic type', body: 'The interface scales fluidly to match your system font size.' },
        { icon: 'vibration', title: 'Haptics & voice', body: 'Vibration and voice guidance make the app clear and usable without looking.' },
        { icon: 'cloud_off', title: 'Works offline', body: 'Identified medicines are saved on device, and on-device AI keeps working even with no connection.' },
        { icon: 'lock', title: 'Private by design', body: 'On-device processing keeps sensitive health data from ever leaving your phone.' },
      ],
      siteNote: 'This website is built for screen readers and keyboard navigation, too.',
    },

    cta: {
      heading: ['Start with Yaksok', 'today.'],
      sub: 'Free to download on iPhone and Android.',
    },

    footer: {
      team: 'iFeel',
      tagline: 'Medicine identification and medication guidance for everyone — including blind and older adults.',
      contactLabel: 'Contact',
      contact: 'ifeel.devstory.co.kr@gmail.com',
      disclaimerLabel: 'Medical disclaimer',
      disclaimer: 'Yaksok is an identification aid built on public data from Korea’s Ministry of Food and Drug Safety (MFDS). All information is for reference only — always consult a professional for accurate dosing.',
      dataLabel: 'Public data sources',
      data: 'Drug approval info · DUR drug-safety service · e-yak-eun-yo (MFDS)',
      navLabel: 'Quick links',
      copyright: '© 2026 iFeel. All rights reserved.',
    },
  },
};

const LangCtx = React.createContext({ lang: 'ko', S: STRINGS.ko, theme: 'light' });
function useI18n() { return React.useContext(LangCtx); }

Object.assign(window, { STRINGS, LangCtx, useI18n });
