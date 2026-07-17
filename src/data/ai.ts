import {
  Bot,
  BrainCircuit,
  Database,
  FileJson,
  GitBranch,
  Layers,
  MessageSquareText,
  Network,
  ShieldCheck,
  Workflow,
  type LucideIcon,
} from 'lucide-react'

export interface AICapability {
  id: string
  title: string
  desc: string
  icon: LucideIcon
  tags: string[]
}

export const aiCapabilities: AICapability[] = [
  {
    id: 'llm',
    title: 'LLM Engineering',
    desc: 'Deterministic pipelines around GPT, Gemini, and LLaMA — schema-first outputs that behave the same on run 1 and run 10,000.',
    icon: BrainCircuit,
    tags: ['GPT', 'Gemini', 'LLaMA 3.1', 'Ollama'],
  },
  {
    id: 'agents',
    title: 'Agentic AI',
    desc: 'Multi-step agents that plan, call tools, and recover from failure — shipped in production LMS and evaluation systems.',
    icon: Bot,
    tags: ['Tool use', 'Planning', 'Recovery'],
  },
  {
    id: 'rag',
    title: 'RAG Pipelines',
    desc: 'Chunking, embedding, semantic retrieval, and grounded generation over real course corpora and product catalogs.',
    icon: Layers,
    tags: ['Chunking', 'Embeddings', 'Grounding'],
  },
  {
    id: 'prompt',
    title: 'Prompt Engineering',
    desc: 'Prompt strategies with measurable accuracy gains — rubric injection, few-shot calibration, and output constraints.',
    icon: MessageSquareText,
    tags: ['Rubrics', 'Few-shot', 'Constraints'],
  },
  {
    id: 'vectordb',
    title: 'Vector Databases',
    desc: 'Embedding stores powering semantic search and retrieval for RAG systems at production scale.',
    icon: Database,
    tags: ['Semantic search', 'Similarity'],
  },
  {
    id: 'azure',
    title: 'Azure AI Foundry',
    desc: 'Model orchestration, deployment, and evaluation of generative AI inside enterprise-grade Azure workflows.',
    icon: Network,
    tags: ['Orchestration', 'Deployment', 'Evaluation'],
  },
  {
    id: 'langchain',
    title: 'LangChain',
    desc: 'Chains, retrievers, and agent toolkits wiring LLMs into real application backends.',
    icon: GitBranch,
    tags: ['Chains', 'Retrievers', 'Tools'],
  },
  {
    id: 'mcp',
    title: 'MCP Integration',
    desc: 'Model Context Protocol–compatible outputs and integrations — structured, schema-enforced model behavior.',
    icon: FileJson,
    tags: ['Structured output', 'Schema'],
  },
  {
    id: 'safety',
    title: 'AI Safety',
    desc: 'Hallucination detection, JSON schema validation, and deterministic evaluation gates before anything reaches users.',
    icon: ShieldCheck,
    tags: ['Hallucination checks', 'Validation'],
  },
  {
    id: 'mlops',
    title: 'MLOps',
    desc: 'CI/CD for model-backed systems — Docker, automated evaluation pipelines, and zero-downtime deploys.',
    icon: Workflow,
    tags: ['Docker', 'CI/CD', 'Monitoring'],
  },
]

/** Animated architecture diagram: a production RAG + evaluation pipeline. */
export const pipelineStages = [
  { id: 'ingest', label: 'Ingest', sub: 'Docs · Images · Code' },
  { id: 'embed', label: 'Embed', sub: 'VectorDB' },
  { id: 'retrieve', label: 'Retrieve', sub: 'Semantic search' },
  { id: 'agent', label: 'Agent', sub: 'Plan + tools' },
  { id: 'llm', label: 'LLM', sub: 'Generate' },
  { id: 'guard', label: 'Guardrails', sub: 'Schema + safety' },
  { id: 'ship', label: 'Ship', sub: 'PASS / FAIL' },
]
