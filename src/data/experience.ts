export interface Experience {
  company: string
  role: string
  type: string
  period: string
  location: string
  current?: boolean
  highlights: string[]
  stack: string[]
}

export const experiences: Experience[] = [
  {
    company: 'SteamCube AI',
    role: 'Junior AI Engineer',
    type: 'Full-time',
    period: 'Jun 2026 — Present',
    location: 'Chennai',
    current: true,
    highlights: [
      'Building an Agentic AI-powered LMS assistant — LLMs, RAG pipelines, and VectorDB retrieval for context-aware learning support.',
      'Orchestrating, deploying, and evaluating generative AI solutions on Microsoft Azure AI Foundry inside enterprise-grade workflows.',
      'Driving prompt engineering, AI safety mechanisms, and MCP-compatible integrations for reliable, schema-enforced model behavior.',
    ],
    stack: ['Azure AI Foundry', 'LLMs', 'RAG', 'VectorDB', 'MCP', 'Python'],
  },
  {
    company: 'NextWealth',
    role: 'Full-Stack AI Engineer',
    type: 'Internship · Onsite',
    period: 'Aug 2025 — Apr 2026',
    location: 'Bengaluru',
    highlights: [
      'Architected end-to-end AI evaluation systems: deterministic LLM pipelines, strict JSON schema validation, and hallucination mitigation for automated PASS/FAIL grading.',
      'Built a multimodal Image Annotation & Evaluation System — LLaVA vision-language models with RAG and Agentic AI workflows over REST APIs and a React frontend.',
      'Engineered prompt strategies, AI safety mechanisms, and MCP-compatible output constraints for schema-enforced behavior at scale.',
    ],
    stack: ['LLaVA', 'RAG', 'Agentic AI', 'React', 'REST APIs', 'JSON Schema'],
  },
  {
    company: 'Greatify AI',
    role: 'AI Engineer',
    type: 'Internship · Onsite',
    period: 'May 2025 — Jun 2025',
    location: 'Chennai',
    highlights: [
      'Built an AI-powered exam evaluation system using OCR, NLP, and Generative AI to automate grading, deployed with Streamlit dashboards.',
      'Worked Agile/Scrum with CI/CD workflows aligned to ITSM best practices; improved model accuracy through iterative stakeholder feedback.',
    ],
    stack: ['OCR', 'NLP', 'GenAI', 'Streamlit', 'CI/CD'],
  },
]
