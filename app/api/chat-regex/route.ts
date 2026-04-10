import { NextResponse } from 'next/server'
import languagesData from '@/app/enum/languages.json'
import { Languages } from '@/app/enum/global'

type LangKey = keyof typeof languagesData
type TransKey = keyof (typeof languagesData)[Languages.ENGLISH]

// dockita_features must come BEFORE the general dockita rule
const RULES: { patterns: RegExp[]; key: TransKey }[] = [
    { patterns: [/hello|hi|hey|good (morning|afternoon|evening)|howdy/i], key: 'chatbot_reply_greeting' },
    { patterns: [/dockita.*feature|feature.*dockita|what.*dockita.*do/i], key: 'chatbot_reply_dockita_features' },
    { patterns: [/dockita|doc kita|document management|document.*system/i], key: 'chatbot_reply_dockita' },
    { patterns: [/cyber.?security|cybersecurity|security solution|data.*protect|network.*secur/i], key: 'chatbot_reply_cybersecurity' },
    { patterns: [/robot|robotic|automation|automated.*machine|industrial.*robot/i], key: 'chatbot_reply_robotics' },
    { patterns: [/ai.*predict|predict.*optim|machine learn|artificial intel|ai.*optim|smart.*analytic/i], key: 'chatbot_reply_ai' },
    { patterns: [/industrial.*design|product.*design|design.*service|prototype/i], key: 'chatbot_reply_industrial_design' },
    { patterns: [/manufactur|production.*line|smart.*factory|factory.*digital/i], key: 'chatbot_reply_manufacturing' },
    { patterns: [/digitize|digitize.*record|paper.*digital|record.*management|scan.*document/i], key: 'chatbot_reply_digitize' },
    { patterns: [/price|pricing|cost|how much|quote|budget/i], key: 'chatbot_reply_pricing' },
    { patterns: [/contact|reach|email|phone|speak.*human|talk.*person|sales team/i], key: 'chatbot_reply_contact' },
    { patterns: [/technical.*support|tech.*help|bug|issue|problem.*with|not.*working/i], key: 'chatbot_reply_technical_support' },
    { patterns: [/partner|distributor|resell|overseas/i], key: 'chatbot_reply_partners' },
    { patterns: [/about.*ashisuto|who.*ashisuto|what.*ashisuto|company.*info/i], key: 'chatbot_reply_about' },
    { patterns: [/thank|thanks|appreciate|great|awesome|nice|perfect|helpful/i], key: 'chatbot_reply_thanks' },
    { patterns: [/bye|goodbye|see you|take care|that.*all|no.*more/i], key: 'chatbot_reply_bye' },
    { patterns: [/demo|trial|try|test/i], key: 'chatbot_reply_demo' },
]

const FALLBACK_KEYS: TransKey[] = ['chatbot_fallback_1', 'chatbot_fallback_2', 'chatbot_fallback_3']

export async function POST(req: Request) {
  try {
    const { message, lang = Languages.ENGLISH } = await req.json()
    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Invalid message' }, { status: 400 })
    }
    const validLang: LangKey = lang in languagesData ? (lang as LangKey) : Languages.ENGLISH
    const t = languagesData[validLang] as Record<string, string>
    const lower = message.trim().slice(0, 500).toLowerCase()
    await new Promise((r) => setTimeout(r, 600 + Math.random() * 600))
    for (const rule of RULES) {
      if (rule.patterns.some((p) => p.test(lower))) {
        return NextResponse.json({ reply: t[rule.key] ?? '' })
      }
    }
    const fallbackKey = FALLBACK_KEYS[Math.floor(Math.random() * FALLBACK_KEYS.length)]
    return NextResponse.json({ reply: t[fallbackKey] ?? '' })
  } catch {
    return NextResponse.json({ error: 'Failed to process message' }, { status: 500 })
  }
}