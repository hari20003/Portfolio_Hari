// Case-study content. Facts (stack, dates, metrics, links) come from the
// resume; prose expands those bullets without inventing new claims.
export const projects = [
  {
    slug: 'llm-ecommerce-content-evaluation',
    title: 'LLM-Powered E-Commerce Content Evaluation',
    subtitle: 'Agentic AI platform for generating and grading product content at scale — Flipkart use case',
    date: 'Mar 2026',
    flagship: true,
    accent: '#7C6BFF',
    stack: ['Python', 'Ollama', 'LLaMA 3.1 (8B)', 'Agentic AI', 'Prompt Engineering', 'Automation', 'MLOps'],
    overview:
      'An Agentic AI platform that generates e-commerce product content and then evaluates it with rubric-based LLM scoring — built around a Flipkart-style catalog use case where thousands of product listings need consistent, trustworthy copy.',
    problem:
      'Manually writing and reviewing product content does not scale, and naive LLM generation is worse: outputs drift from the rubric, hallucinate product attributes, and no two evaluations agree. The platform needed generation AND grading that behave deterministically across an entire catalog.',
    solution:
      'A pipeline of cooperating agents: one generates content, another evaluates it against an explicit rubric, and a hybrid scoring layer combines the LLM judgment with deterministic rule-based validation. Anti-hallucination safeguards check generated claims against the source product data before anything passes.',
    features: [
      'Rubric-based LLM evaluation with hybrid scoring (LLM judgment + deterministic rules)',
      'Anti-hallucination safeguards validating generated claims against source data',
      'Bulk automation pipelines for per-product scoring across large catalogs',
      'Threshold-based decision logic for automated accept / reject / review routing',
      'MCP-compatible structured outputs for downstream integration',
    ],
    architecture: [
      ['Content agent', 'LLaMA 3.1 (8B) via Ollama generates product copy from catalog attributes'],
      ['Evaluator agent', 'Rubric-driven LLM scoring with strict structured output'],
      ['Rule layer', 'Deterministic validators — schema, attribute grounding, length, tone'],
      ['Decision engine', 'Hybrid score + thresholds route each product to pass / fail / human review'],
      ['Batch runner', 'Automation pipeline iterating the full catalog with per-product reports'],
    ],
    role: 'Sole designer and builder — agent design, prompt engineering, scoring logic, and the bulk automation pipeline.',
    challenges: [
      'Making two LLM calls agree: identical content had to receive identical verdicts, which meant pinning temperature, constraining outputs to schemas, and moving every check that could be deterministic out of the LLM.',
      'Catching hallucinated attributes cheaply — solved by grounding checks against the source product data rather than a second LLM opinion.',
    ],
    outcome:
      'A platform that scores product content at catalog scale with reproducible verdicts and structured, MCP-compatible outputs — demonstrating that LLM evaluation can be an engineering discipline rather than a vibe check.',
    github: null,
    codeNote: 'Code available on request',
    live: null,
  },
  {
    slug: 'multimodal-image-quality-assessment',
    title: 'AI-Driven Image Description & Quality Assessment',
    subtitle: 'Full-stack multimodal system pairing vision-language models with deterministic PASS/FAIL scoring',
    date: 'Feb 2026',
    flagship: true,
    accent: '#4CC9F0',
    stack: ['Python', 'Flask', 'React', 'LLaVA', 'LLaMA 3.1 (8B)', 'Ollama', 'VectorDB', 'MLOps'],
    overview:
      'A full-stack multimodal AI system that looks at images, writes structured captions with vision-language models, and then grades caption quality against a rubric with PASS/FAIL scoring — with a React dashboard for watching evaluations happen in real time.',
    problem:
      'Image annotation pipelines produce captions of wildly varying quality, and human review of every caption is the bottleneck. The system needed to both generate descriptions and judge them — reliably enough that a PASS actually means something.',
    solution:
      'LLaVA handles vision-to-text; LLaMA 3.1 evaluates the result against a structured rubric. Every model output must survive JSON schema validation, and a hallucination-detection pipeline flags captions describing things that are not in the image. REST APIs expose the pipeline and a React frontend visualizes evaluations live.',
    features: [
      'Structured caption generation from images via LLaVA',
      'Rubric-based quality evaluation with PASS/FAIL scoring',
      'JSON schema validation on every model output',
      'Hallucination detection pipeline for ungrounded captions',
      'REST API + React frontend for real-time evaluation visualization',
    ],
    architecture: [
      ['Vision layer', 'LLaVA via Ollama converts images to structured captions'],
      ['Evaluation layer', 'LLaMA 3.1 (8B) scores captions against the rubric'],
      ['Validation layer', 'JSON schema enforcement + hallucination checks'],
      ['API layer', 'Flask REST endpoints orchestrating the pipeline'],
      ['Frontend', 'React dashboard streaming evaluation results'],
    ],
    role: 'Full-stack owner — model integration, evaluation design, validation pipelines, REST APIs, and the React frontend.',
    challenges: [
      'Vision-language models hallucinate confidently; the fix was a dedicated detection pass and schema-constrained outputs rather than trusting the caption.',
      'Keeping evaluation deterministic enough that PASS/FAIL results were reproducible run-to-run.',
    ],
    outcome:
      'A working multimodal evaluation system where AI grades AI — captions are generated, validated, and scored automatically, with humans only reviewing flagged failures.',
    github: 'https://github.com/hari20003/Image-Annotations',
    live: null,
  },
  {
    slug: 'code-assessment-platform',
    title: 'Online Exam-Oriented Code Assessment Platform',
    subtitle: 'Secure full-stack coding examination platform — 500+ concurrent students, zero downtime',
    date: 'Jan 2026',
    flagship: true,
    accent: '#FF7AC6',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'React', 'Docker', 'Render', 'Netlify', 'Automation'],
    overview:
      'A production coding-exam platform where students write, submit, and run code under exam conditions — with automated test-case validation, integrity controls, and infrastructure that held up under a real 500+ student load.',
    problem:
      'Running coding exams online means handling untrusted code, bursty load when an entire class submits at once, and cheating pressure — all while grading instantly and never going down mid-exam.',
    solution:
      'A FastAPI backend with PostgreSQL manages exams, submissions, and automated test-case validation pipelines; automation-driven integrity controls watch exam sessions; the React frontend delivers the exam experience. Deployed on Render + Netlify with CI/CD.',
    features: [
      'Real-time code submission and automated test-case validation',
      'Automation-driven integrity controls for exam sessions',
      'Exam management with per-question test suites',
      'CI/CD deployment pipeline to Render (API) + Netlify (frontend)',
      'Scales to 500+ concurrent students',
    ],
    architecture: [
      ['Frontend', 'React exam interface deployed on Netlify'],
      ['API', 'FastAPI service on Render handling submissions and sessions'],
      ['Grader', 'Automated test-case validation pipeline per submission'],
      ['Data', 'PostgreSQL for exams, users, submissions, and results'],
      ['Delivery', 'Docker + CI/CD for repeatable deploys'],
    ],
    role: 'Architect and full-stack developer — schema design, submission/grading pipeline, integrity controls, deployment.',
    challenges: [
      'Surviving the submission stampede in the final minutes of an exam — load-tested and tuned the grading pipeline so 500+ concurrent students produced zero downtime.',
      'Balancing strict integrity controls with an exam UI that stays fast and unobtrusive.',
    ],
    outcome:
      'Deployed to production and used at real scale: 500+ concurrent students, zero downtime, fully automated grading.',
    github: 'https://github.com/hari20003/CodeEval_NW_Assiment',
    live: 'https://codeeval1.netlify.app/',
  },
  {
    slug: 'agentic-lms-assistant',
    title: 'Agentic AI-Powered LMS Assistant',
    subtitle: 'RAG-powered natural-language assistant over course materials',
    date: 'Feb 2026',
    flagship: false,
    accent: '#7C6BFF',
    stack: ['Python', 'FastAPI', 'Flask', 'React', 'LangChain', 'RAG', 'VectorDB', 'Embeddings', 'AI Agents'],
    overview:
      'An Agentic AI assistant for learning management: students ask questions in natural language and get contextual answers grounded in their actual course materials, via a RAG pipeline over VectorDB embeddings.',
    problem:
      'Course content is scattered across materials students do not want to dig through. Keyword search fails on conceptual questions; a raw LLM answers from its own training data instead of the course.',
    solution:
      'Course materials are chunked and embedded into a VectorDB; a LangChain-based RAG pipeline retrieves relevant context for each question and the LLM answers grounded in that context. REST APIs (FastAPI/Flask) serve a React chat interface with MCP-compatible integrations.',
    features: [
      'Natural-language querying of course materials',
      'RAG pipeline with VectorDB embeddings and contextual response generation',
      'Agentic behaviors for multi-step queries',
      'REST APIs with a real-time React chat interface',
      'MCP-compatible integration surface',
    ],
    architecture: [
      ['Ingestion', 'Course materials chunked, embedded, stored in VectorDB'],
      ['Retrieval', 'Semantic search selects context per query'],
      ['Generation', 'LLM answers grounded in retrieved context (LangChain)'],
      ['API', 'FastAPI/Flask endpoints, MCP-compatible'],
      ['Frontend', 'React chat interface'],
    ],
    role: 'Designed and built the full pipeline — ingestion, retrieval, agent orchestration, APIs, and frontend.',
    challenges: [
      'Retrieval quality decides answer quality: tuning chunking and embedding strategy so the right course passages surface for conceptual questions.',
    ],
    outcome:
      'A working AI learning assistant that answers from the course, not from the model’s imagination — the foundation for the agentic LMS work I now do professionally.',
    github: 'https://github.com/hari20003/lms',
    live: null,
  },
  {
    slug: 'speech-emotion-recognition',
    title: 'Speech-Based Emotion Recognition',
    subtitle: 'Classical ML pipeline classifying emotional state from voice, for post-trauma monitoring',
    date: 'Jan 2025',
    flagship: false,
    accent: '#4CC9F0',
    stack: ['Python', 'Scikit-learn', 'Librosa', 'NumPy', 'SVM'],
    overview:
      'A machine-learning system that classifies emotional state from speech audio — built for post-trauma monitoring scenarios where tracking a patient’s emotional trajectory over time matters.',
    problem:
      'Emotional state is audible before it is visible in behavior, but clinicians cannot listen to everything. An automated classifier over speech gives monitoring programs a consistent signal.',
    solution:
      'An SVM classifier over rich audio features — MFCC, chroma, and spectral features extracted with Librosa — trained to map short speech samples to emotional state classes.',
    features: [
      'MFCC, chroma, and spectral feature extraction pipelines via Librosa',
      'SVM classification of emotional states',
      'Reproducible preprocessing and training pipeline in NumPy/Scikit-learn',
    ],
    architecture: [
      ['Feature extraction', 'Librosa — MFCC, chroma, spectral features'],
      ['Model', 'SVM classifier (Scikit-learn)'],
      ['Pipeline', 'NumPy-based preprocessing and evaluation'],
    ],
    role: 'Built the complete ML pipeline from feature engineering to classification.',
    challenges: [
      'Choosing features that carry emotion rather than speaker identity — MFCC + chroma + spectral combinations outperformed any single feature family.',
    ],
    outcome:
      'A working emotion classifier demonstrating end-to-end classical ML: signal processing, feature engineering, and model evaluation.',
    github: 'https://github.com/hari20003/SPEECH-BASED-EMOTION-RECOGNITION-SYSTEMEM',
    live: null,
  },
  {
    slug: 'amazon-rating-analysis',
    title: 'Amazon Product Rating Analysis',
    subtitle: 'ML + Tableau analysis of review data for rating prediction and sentiment insight',
    date: '2024',
    flagship: false,
    accent: '#FF7AC6',
    stack: ['Python', 'Machine Learning', 'Pandas', 'Tableau'],
    overview:
      'A data-science project analyzing Amazon review datasets — predicting product ratings with machine learning and surfacing customer sentiment insights through interactive Tableau dashboards.',
    problem:
      'Raw review data hides the patterns that matter: which factors drive ratings, and what customers actually feel beyond the star number.',
    solution:
      'Cleaned and engineered features from review datasets in Python, trained ML models to predict product ratings, and built interactive Tableau dashboards to make sentiment and rating patterns explorable.',
    features: [
      'Rating prediction models over review features',
      'Customer sentiment extraction from review text',
      'Interactive Tableau dashboards for exploration',
    ],
    architecture: [
      ['Data prep', 'Pandas cleaning + feature engineering over review datasets'],
      ['Models', 'ML rating-prediction models'],
      ['Visualization', 'Interactive Tableau dashboards'],
    ],
    role: 'End-to-end analysis — data preparation, modeling, and dashboard design.',
    challenges: [
      'Turning noisy, skewed review data into features with real predictive signal.',
    ],
    outcome:
      'A complete analytics story from raw reviews to interactive insight — the data-science foundation under the AI engineering work.',
    github: 'https://github.com/hari20003/Amazon-Sales-Data-Analysis',
    live: null,
  },
]

export const getProject = (slug) => projects.find((p) => p.slug === slug)
