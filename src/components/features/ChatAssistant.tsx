import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bot, Send, Sparkles, X } from 'lucide-react'
import { profile, education, certifications } from '@/data/profile'
import { experiences } from '@/data/experience'
import { projects } from '@/data/projects'
import { skillStacks } from '@/data/skills'

interface Msg {
  role: 'user' | 'bot'
  text: string
}

/**
 * Local retrieval assistant over the resume data — no external API.
 * Keyword-matches the question against structured resume facts.
 */
function answer(q: string): string {
  const s = q.toLowerCase()
  const has = (...keys: string[]) => keys.some((k) => s.includes(k))

  if (has('what agent', 'what model', 'which model', 'what llm', 'are you an', 'gpt', 'claude', 'api key', 'openai'))
    return 'Honest answer: I\'m not an LLM at all. I\'m a tiny deterministic keyword-matcher over Hari\'s resume, shipped inside this page\'s JavaScript — no model, no API calls, no data leaving your browser. Hari builds the real thing (Agentic AI, RAG, MCP) at work; ask me about "projects" or "experience" to see that.'
  if (has('experience', 'work', 'job', 'company', 'steamcube', 'nextwealth', 'greatify'))
    return `Hari has ${experiences.length} AI engineering roles:\n\n${experiences
      .map((e) => `• ${e.company} — ${e.role} (${e.period}, ${e.location})`)
      .join('\n')}\n\nCurrently at SteamCube AI building an Agentic AI-powered LMS assistant on Azure AI Foundry.`
  if (has('project', 'built', 'ship', 'portfolio', 'flipkart', 'lms', 'exam'))
    return `Hari has shipped ${projects.length} significant projects:\n\n${projects
      .slice(0, 4)
      .map((p) => `• ${p.title} — ${p.subtitle}`)
      .join('\n')}\n\nThe code assessment platform handled 500+ concurrent students with zero downtime. Open any project card for the full case study.`
  if (has('skill', 'stack', 'tech', 'know', 'language'))
    return `Hari's stack spans ${skillStacks.length} layers:\n\n${skillStacks
      .map((st) => `• ${st.label}: ${st.skills.slice(0, 4).join(', ')}…`)
      .join('\n')}`
  if (has('rag', 'vector', 'embedding'))
    return 'RAG is one of Hari\'s core strengths — he\'s built production RAG pipelines with VectorDB embeddings, semantic retrieval, and grounded generation for both an LMS assistant and evaluation systems at NextWealth and SteamCube AI.'
  if (has('azure', 'cloud', 'foundry'))
    return 'Hari works with Microsoft Azure AI Foundry professionally at SteamCube AI — model orchestration, deployment, and evaluation of generative AI in enterprise workflows. Also: Azure OpenAI Service, Docker, Kubernetes, CI/CD.'
  if (has('mcp'))
    return 'Hari builds MCP (Model Context Protocol)–compatible integrations: schema-enforced structured outputs used in his evaluation platforms and agent systems at NextWealth and SteamCube AI.'
  if (has('safety', 'hallucination', 'eval'))
    return 'AI safety is Hari\'s signature: deterministic LLM pipelines, strict JSON schema validation, hallucination-detection layers, and PASS/FAIL evaluation gates — shipped in production grading and annotation systems.'
  if (has('education', 'degree', 'college', 'university', 'cgpa', 'study'))
    return `• ${education[0].degree}, ${education[0].school} (${education[0].period}) — ${education[0].score}\n• ${education[1].degree}, ${education[1].school} (${education[1].period}) — ${education[1].score}`
  if (has('cert'))
    return `Certifications:\n${certifications.map((c) => `• ${c}`).join('\n')}`
  if (has('contact', 'email', 'reach', 'hire', 'phone'))
    return `Reach Hari at ${profile.email} or ${profile.phone}. He's ${profile.availability.toLowerCase()} — the contact form below works too.`
  if (has('resume', 'cv', 'download'))
    return 'You can download the resume with the "Download Resume" button in the hero, the navbar, or via Ctrl+K → "Download resume".'
  if (has('who', 'about', 'hari', 'summary', 'yourself'))
    return profile.summary
  if (has('hello', 'hi', 'hey'))
    return 'Hey! I\'m a local assistant trained on Hari\'s resume (no API calls — everything runs in your browser). Ask me about his experience, projects, skills, or how to get in touch.'
  return 'I index Hari\'s resume — try asking about "experience", "projects", "skills", "RAG", "Azure", "AI safety", "education", or "contact".'
}

const SUGGESTIONS = ['What has Hari shipped?', 'Tell me about AI safety', 'Which cloud stack?', 'How do I contact him?']

export function ChatAssistant() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: 'bot', text: 'Hi — I\'m Hari\'s resume assistant, running fully in your browser. What would you like to know?' },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [msgs, typing])

  const ask = (q: string) => {
    if (!q.trim() || typing) return
    setMsgs((m) => [...m, { role: 'user', text: q }])
    setInput('')
    setTyping(true)

    const full = answer(q)
    // typewriter streaming effect
    window.setTimeout(() => {
      setMsgs((m) => [...m, { role: 'bot', text: '' }])
      let i = 0
      const iv = window.setInterval(() => {
        i = Math.min(full.length, i + 3)
        setMsgs((m) => {
          const copy = [...m]
          copy[copy.length - 1] = { role: 'bot', text: full.slice(0, i) }
          return copy
        })
        if (i >= full.length) {
          window.clearInterval(iv)
          setTyping(false)
        }
      }, 14)
    }, 450)
  }

  return (
    <>
      {/* launcher */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.2, duration: 0.5 }}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close AI assistant' : 'Open AI assistant'}
        className="fixed bottom-6 left-6 z-[85] flex h-13 cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-aurora-violet to-aurora-blue px-4 py-3 text-sm font-medium text-white shadow-[0_0_30px_-6px_rgb(139_92_246/0.8)] transition-shadow hover:shadow-[0_0_44px_-4px_rgb(34_211_238/0.8)]"
      >
        <Bot size={18} />
        <span className="hidden sm:inline">Ask my AI</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label="AI resume assistant"
            className="glass-strong gradient-border fixed bottom-24 left-4 z-[85] flex h-[460px] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-3xl sm:left-6"
          >
            <div className="flex items-center gap-2.5 border-b border-[rgb(var(--line)/0.08)] px-5 py-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-aurora-violet to-aurora-cyan text-white">
                <Sparkles size={14} />
              </span>
              <div className="flex-1">
                <p className="font-display text-sm font-semibold">Resume Assistant</p>
                <p className="font-mono text-[10px] text-emerald-300">● local — zero API calls</p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close" className="cursor-pointer text-muted hover:text-[rgb(var(--fg))]">
                <X size={16} />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
              {msgs.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-aurora-violet/80 to-aurora-blue/80 text-white'
                        : 'glass text-[rgb(var(--fg))]'
                    }`}
                  >
                    {msg.text}
                    {msg.role === 'bot' && i === msgs.length - 1 && typing && (
                      <span className="ml-0.5 inline-block h-3 w-[2px] animate-pulse-glow bg-aurora-cyan align-middle" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {msgs.length <= 1 && (
              <div className="flex flex-wrap gap-1.5 px-4 pb-2">
                {SUGGESTIONS.map((sug) => (
                  <button
                    key={sug}
                    onClick={() => ask(sug)}
                    className="cursor-pointer rounded-full border border-aurora-violet/30 bg-aurora-violet/10 px-3 py-1 text-[11px] text-aurora-violet transition-colors hover:bg-aurora-violet/20"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault()
                ask(input)
              }}
              className="flex items-center gap-2 border-t border-[rgb(var(--line)/0.08)] p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about experience, RAG, safety…"
                aria-label="Ask the assistant"
                className="h-10 flex-1 rounded-xl border border-[rgb(var(--line)/0.1)] bg-[rgb(var(--card)/0.04)] px-3.5 text-[13px] outline-none transition-colors focus:border-aurora-violet/50"
              />
              <button
                type="submit"
                aria-label="Send"
                disabled={typing}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-gradient-to-r from-aurora-violet to-aurora-blue text-white transition-opacity disabled:opacity-40"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
