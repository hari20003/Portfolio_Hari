export interface SkillStack {
  id: string
  label: string
  accent: string
  skills: string[]
}

export const skillStacks: SkillStack[] = [
  {
    id: 'ai',
    label: 'AI / ML',
    accent: '#a78bfa',
    skills: [
      'LLMs (GPT · Gemini · Ollama)',
      'Agentic AI & AI Agents',
      'RAG & Semantic Search',
      'MCP (Model Context Protocol)',
      'Prompt Engineering',
      'Multimodal AI',
      'LLM Fine-Tuning',
      'Model Evaluation & AI Safety',
      'Hallucination Mitigation',
      'NLP · Computer Vision',
      'Transformers · Hugging Face',
      'MLOps',
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    accent: '#60a5fa',
    skills: [
      'Python',
      'FastAPI',
      'Flask',
      'Django',
      'Java',
      'REST APIs',
      'Microservices',
      'LangChain',
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    accent: '#22d3ee',
    skills: ['React', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Streamlit'],
  },
  {
    id: 'cloud',
    label: 'Cloud & DevOps',
    accent: '#818cf8',
    skills: [
      'Microsoft Azure AI Foundry',
      'Azure OpenAI Service',
      'OpenAI API',
      'Docker',
      'Kubernetes',
      'CI/CD',
      'Git',
      'Render · Netlify',
    ],
  },
  {
    id: 'data',
    label: 'Data & Databases',
    accent: '#34d399',
    skills: [
      'PostgreSQL',
      'MySQL',
      'Vector Databases',
      'Embeddings',
      'Pandas · NumPy',
      'Scikit-learn',
      'Tableau',
      'SQL',
    ],
  },
]

/** Technologies shown in the rotating orbit — keep short labels. */
export const orbitTech = [
  'Python',
  'FastAPI',
  'React',
  'LangChain',
  'RAG',
  'MCP',
  'Azure AI',
  'Docker',
  'LLaMA',
  'VectorDB',
  'PostgreSQL',
  'Kubernetes',
  'Ollama',
  'TypeScript',
]
