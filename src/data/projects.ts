export interface Project {
  slug: string
  title: string
  subtitle: string
  date: string
  tech: string[]
  problem: string
  solution: string
  features: string[]
  architecture: string[]
  metrics: { label: string; value: string }[]
  github: string | null
  live: string | null
  accent: 'violet' | 'blue' | 'cyan'
  flagship?: boolean
}

export const projects: Project[] = [
  {
    slug: 'llm-ecommerce-content-evaluation',
    title: 'LLM E-Commerce Content Evaluation',
    subtitle: 'Agentic AI platform generating and grading product content at scale — Flipkart use case',
    date: 'Mar 2026',
    tech: ['Python', 'Ollama', 'LLaMA 3.1 8B', 'Agentic AI', 'Prompt Engineering', 'MLOps'],
    problem:
      'Marketplace product content is produced at massive scale with wildly inconsistent quality — manual review cannot keep up, and naive LLM grading hallucinates scores.',
    solution:
      'An Agentic AI platform that both generates product content and evaluates it against rubrics, using hybrid scoring: deterministic rule-based validation fused with LLM judgment and anti-hallucination safeguards.',
    features: [
      'Rubric-based LLM evaluation with hybrid deterministic + model scoring',
      'Bulk automation pipelines for per-product scoring at scale',
      'Threshold-based decision logic for automated accept/reject',
      'MCP-compatible structured outputs — every response schema-enforced',
    ],
    architecture: [
      'Content Agent → generates product copy from specs',
      'Evaluation Agent → rubric scoring via LLaMA 3.1 (8B) on Ollama',
      'Rule Engine → deterministic validation + anti-hallucination checks',
      'Decision Layer → thresholds emit PASS/FAIL with structured JSON',
    ],
    metrics: [
      { label: 'Scoring mode', value: 'Hybrid' },
      { label: 'Output contract', value: 'MCP JSON' },
      { label: 'Pipeline', value: 'Bulk automated' },
    ],
    github: null,
    live: null,
    accent: 'violet',
    flagship: true,
  },
  {
    slug: 'multimodal-image-quality-assessment',
    title: 'Multimodal Image Quality Assessment',
    subtitle: 'Vision-language models paired with deterministic PASS/FAIL scoring',
    date: 'Feb 2026',
    tech: ['Python', 'Flask', 'React', 'LLaVA', 'LLaMA 3.1 8B', 'Ollama', 'VectorDB', 'MLOps'],
    problem:
      'Image datasets need structured captions and quality verdicts, but vision-language models freely describe things that are not in the image.',
    solution:
      'A full-stack multimodal system: LLaVA handles vision-to-text, LLaMA 3.1 evaluates output against a structured rubric, and a hallucination-detection pipeline flags fabricated details before they ship.',
    features: [
      'Structured caption generation with rubric-based quality evaluation',
      'JSON schema validation on every model output',
      'Hallucination detection pipeline for fabricated visual claims',
      'REST APIs + React frontend for real-time evaluation visualization',
    ],
    architecture: [
      'Vision Layer → LLaVA converts images to structured descriptions',
      'Judge Layer → LLaMA 3.1 scores captions against rubric',
      'Validation Layer → JSON schema + hallucination detectors',
      'Delivery → Flask REST APIs feeding a live React dashboard',
    ],
    metrics: [
      { label: 'Verdicts', value: 'PASS / FAIL' },
      { label: 'Models', value: 'LLaVA + LLaMA' },
      { label: 'Validation', value: 'Schema-enforced' },
    ],
    github: 'https://github.com/hari20003/Image-Annotations',
    live: null,
    accent: 'blue',
    flagship: true,
  },
  {
    slug: 'code-assessment-platform',
    title: 'Code Assessment Platform',
    subtitle: 'Secure coding examinations — 500+ concurrent students, zero downtime',
    date: 'Jan 2026',
    tech: ['Python', 'FastAPI', 'PostgreSQL', 'React', 'Docker', 'Render', 'Netlify'],
    problem:
      'Online coding exams collapse under concurrent load and are trivially easy to cheat without automated integrity controls.',
    solution:
      'A secure full-stack examination platform with real-time code submission, automated test-case validation pipelines, and automation-driven integrity controls — deployed through CI/CD and battle-tested at scale.',
    features: [
      'Real-time code submission with automated test-case validation',
      'Automation-driven exam integrity controls',
      'FastAPI + PostgreSQL backend, React exam experience',
      'CI/CD deploys to Render + Netlify with Docker',
    ],
    architecture: [
      'Exam API → FastAPI + PostgreSQL for sessions and submissions',
      'Runner → automated test-case validation pipelines',
      'Integrity Layer → automated session monitoring',
      'Edge → React SPA on Netlify, API on Render, Docker CI/CD',
    ],
    metrics: [
      { label: 'Concurrent users', value: '500+' },
      { label: 'Downtime', value: 'Zero' },
      { label: 'Deploys', value: 'CI/CD' },
    ],
    github: 'https://github.com/hari20003/CodeEval_NW_Assiment',
    live: 'https://codeeval1.netlify.app/',
    accent: 'cyan',
    flagship: true,
  },
  {
    slug: 'agentic-lms-assistant',
    title: 'Agentic LMS Assistant',
    subtitle: 'RAG-powered natural-language assistant over course materials',
    date: 'Feb 2026',
    tech: ['Python', 'FastAPI', 'Flask', 'React', 'LangChain', 'RAG', 'VectorDB', 'Embeddings'],
    problem:
      'Students dig through fragmented course materials; keyword search cannot answer real questions with context.',
    solution:
      'An Agentic AI assistant with a full RAG pipeline — VectorDB embeddings over course content, contextual response generation, and MCP-compatible integrations for real-time AI-assisted learning.',
    features: [
      'Natural-language querying over entire course corpora',
      'RAG pipeline with VectorDB embeddings + contextual generation',
      'REST APIs on FastAPI/Flask with a real-time React interface',
      'MCP-compatible integration surface',
    ],
    architecture: [
      'Ingest → course materials chunked and embedded into VectorDB',
      'Retrieve → semantic search selects grounded context',
      'Generate → LLM composes cited, contextual answers',
      'Serve → FastAPI/Flask APIs + React chat surface',
    ],
    metrics: [
      { label: 'Retrieval', value: 'Semantic' },
      { label: 'Grounding', value: 'RAG' },
      { label: 'Interface', value: 'Real-time' },
    ],
    github: 'https://github.com/hari20003/lms',
    live: null,
    accent: 'violet',
  },
  {
    slug: 'speech-emotion-recognition',
    title: 'Speech Emotion Recognition',
    subtitle: 'Classifying emotional state from voice for post-trauma monitoring',
    date: 'Jan 2025',
    tech: ['Python', 'Scikit-learn', 'Librosa', 'NumPy', 'SVM'],
    problem:
      'Post-trauma emotional monitoring needs objective, repeatable signals — self-reporting is unreliable and clinical time is scarce.',
    solution:
      'A classical ML pipeline classifying emotional state from speech using SVM over MFCC, chroma, and spectral features extracted with Librosa.',
    features: [
      'MFCC, chroma, and spectral feature extraction pipelines',
      'SVM classification of emotional state from raw audio',
      'Reproducible scikit-learn training workflow',
    ],
    architecture: [
      'Audio In → Librosa feature extraction (MFCC/chroma/spectral)',
      'Model → SVM classifier over engineered features',
      'Output → emotional state classification for monitoring',
    ],
    metrics: [
      { label: 'Approach', value: 'Classical ML' },
      { label: 'Features', value: 'MFCC + chroma' },
      { label: 'Domain', value: 'Healthcare' },
    ],
    github: 'https://github.com/hari20003/SPEECH-BASED-EMOTION-RECOGNITION-SYSTEMEM',
    live: null,
    accent: 'blue',
  },
  {
    slug: 'amazon-rating-analysis',
    title: 'Amazon Product Rating Analysis',
    subtitle: 'ML + Tableau analysis of review data for rating prediction',
    date: '2024',
    tech: ['Python', 'Pandas', 'Scikit-learn', 'Tableau'],
    problem:
      'Raw marketplace review data hides the drivers behind product ratings and sentiment shifts.',
    solution:
      'An analysis pipeline combining ML rating prediction with Tableau dashboards for sentiment insight over Amazon product review data.',
    features: [
      'Rating prediction models over review features',
      'Sentiment analysis of review text',
      'Tableau dashboards for exploration',
    ],
    architecture: [
      'ETL → Pandas cleaning and feature engineering',
      'Model → scikit-learn rating predictors',
      'Visualize → Tableau sentiment dashboards',
    ],
    metrics: [
      { label: 'Stack', value: 'ML + BI' },
      { label: 'Surface', value: 'Tableau' },
      { label: 'Data', value: 'Reviews' },
    ],
    github: 'https://github.com/hari20003/Amazon-Sales-Data-Analysis',
    live: null,
    accent: 'cyan',
  },
]
