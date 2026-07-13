import React from "react";
import { motion } from "framer-motion";

const nameText = "HARIHARASUDAN";

const profileImage = "/hari.jpg";
const resumeFile = "/Hariharasudan_Resume.pdf";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const letterContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.25,
    },
  },
};

const letterVariant = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const skills = {
  languages: ["Python", "Java", "JavaScript", "SQL", "PostgreSQL"],
  ai: [
    "LLMs (GPT, Gemini, Ollama)",
    "Prompt Engineering",
    "Multimodal AI",
    "Model Evaluation",
    "AI Safety",
    "Hallucination Mitigation",
  ],
  frameworks: ["Flask", "Django","Fast API","React", "NumPy", "Pandas", "Matplotlib"],
  tools: ["Docker", "Git", "Postman", "Render", "Netlify", "VS Code", "JMeter"],
};

const experiences = [
  {
    company: "Next Wealth",
    role: "Full-Stack AI Engineer Intern",
    period: "Sep 2025 — Present",
    location: "Bengaluru",
    points: [
      "Designed, developed, and deployed end-to-end AI systems across the full lifecycle, including architecture design, model integration, deployment, and maintenance in production environments.",
      "Built an AI-powered code evaluation platform using rubric-driven scoring, structured JSON outputs, and automated PASS/FAIL grading for scalable candidate assessment.",
      "Engineered deterministic LLM evaluation pipelines with strict schema validation, improving response reliability and significantly reducing hallucinations.",
      "Developed a multimodal image annotation and evaluation system leveraging vision-language models to compare AI-generated and human-written descriptions.",
      "Built scalable backend systems using Python and Flask, and integrated with React-based frontend applications for real-time AI evaluation workflows.",
      "Implemented advanced prompt engineering techniques and AI safety mechanisms, including hallucination mitigation, output validation, and consistency checks for production-grade systems.",
    ],
  },
  {
    company: "Greatify AI",
    role: "AI Engineer Intern",
    period: "May 2025 — Jun 2025",
    location: "Chennai",
    points: [
      "Built an AI-powered exam evaluation system using Python, OCR, and NLP to automate manual grading workflows.",
      "Applied machine learning and Generative AI techniques and deployed solutions with Streamlit for rapid experimentation and usability.",
      "Created dashboards for tracking grading accuracy, model behavior, and evaluation performance.",
      "Collaborated in Agile workflows aligned with ITSM best practices and continuously improved system quality through mentor feedback.",
    ],
  },
];

const projects = [
  // Add your GitHub links below

  {
    title: "Online Exam-Oriented Code Assessment Platform",
    stack: ["Python", "FastAPI", "PostgreSQL", "React", "Render", "Netlify"],
    description:
      "Built a secure full-stack coding examination platform with real-time code execution, automated test case validation, and scalable architecture supporting 500+ concurrent users without performance degradation.",
    github: "https://github.com/hari20003/CodeEval_NW_Assiment",
  },
  {
    title: "AI-Driven Image Description and Quality Assessment System",
    stack: ["Python", "Flask", "React", "LLaVA", "LLaMA 3.1", "Ollama"],
    description:
      "Developed a multimodal AI system for image caption generation and evaluation using vision-language models, with structured outputs, hallucination detection, and deterministic scoring pipelines.",
    github: "https://github.com/hari20003/Image-Annotations",
  },
  {
    title: "Speech-Based Emotion Recognition System",
    stack: ["Python", "Scikit-learn", "Librosa", "NumPy"],
    description:
      "Built a machine learning system to detect human emotions from speech using MFCC and audio features, enabling applications in mental health monitoring and human-computer interaction.",
    github: "https://github.com/hari20003/SPEECH-BASED-EMOTION-RECOGNITION-SYSTEMEM",
  },
  {
    title: "LLM-Powered E-Commerce Product Content Evaluation",
    stack: ["Python", "Ollama", "LLaMA 3.1", "Prompt Engineering"],
    description:
      "Created an AI-driven platform for generating and evaluating e-commerce product content using LLMs, with rule-based validation, structured outputs, and hallucination mitigation.",
    github: "https://codeeval1.netlify.app/",
  },
  {
    title: "Amazon Product Rating Analysis",
    stack: ["Python", "Machine Learning", "Tableau"],
    description:
      "Performed data analysis and machine learning on Amazon review datasets to predict product ratings and extract customer sentiment insights, visualized using interactive Tableau dashboards.",
    github: "https://github.com/hari20003/Amazon-Sales-Data-Analysis",
  },
  {
    title: "Agentic AI-Powered LMS Assistant",
    stack: ["Python", "FastAPI", "Flask", "React", "LLMs", "Vector Search"],
    description:
      "Developed an AI-powered LMS assistant enabling natural language queries over course materials using LLMs and retrieval pipelines, with real-time responses through a React interface.",
    github: "https://github.com/hari20003/lms",
  },
];

const education = [
  {
    school: "SRM Institute of Science and Technology, Ramapuram",
    degree: "MCA, Computer Applications",
    period: "2024 — 2026",
    score: "CGPA: 9.8",
    logo: "/srmist.jpg",
  },
  {
    school: "Saveetha College of Liberal Arts and Sciences",
    degree: "BCA, Computer Applications",
    period: "2021 — 2024",
    score: "CGPA: 8.3",
    logo: "/saveetha.jpg",
  },
];

const certifications = [
  "Data Science and ML with GenAI Advanced Program - NIIT",
  "Python Programming - NIIT",
  "Programming Using Java - NIIT",
  "Privacy and Security in Online Social Media - NPTEL",
  "Developing Web Applications Using Servlets and JSP - NIIT",
  "Programming Using C and C++ - NIIT",
];

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-700 shadow-sm">
      {children}
    </span>
  );
}

function SectionHeading({ eyebrow, title }) {
  return (
    <div className="mb-8">
      <div className="mb-3 inline-flex rounded-full border border-gray-200 bg-gray-100 px-3 py-1 text-xs uppercase tracking-[0.3em] text-gray-600">
        {eyebrow}
      </div>
      <h2 className="text-2xl font-semibold text-gray-900 md:text-3xl">{title}</h2>
    </div>
  );
}

function GlassCard({ children, className = "" }) {
  return (
    <div className={`rounded-xl border border-gray-200 bg-white shadow-md ${className}`}>
      {children}
    </div>
  );
}

export default function HariharasudanPortfolio() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 pb-20 text-gray-900">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.08),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(99,102,241,0.05),_transparent_24%)]" />
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute right-0 top-20 h-[28rem] w-[28rem] rounded-full bg-indigo-200/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-sky-200/30 blur-3xl" />
      </div>

      <motion.main
        className="relative mx-auto max-w-7xl px-6 py-10 md:px-10 lg:px-16"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.section
          className="grid min-h-[90vh] items-center gap-10 lg:grid-cols-[1.25fr_0.75fr]"
          variants={fadeUp}
          custom={0.1}
        >
          <div>
            <motion.div
              className="mb-6 inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-6 py-3 text-base font-semibold text-blue-700 shadow-sm"
              variants={fadeUp}
              custom={0.2}
            >
              ✨ AI • Full-Stack • Data Science
            </motion.div>

            <motion.h1
              className="max-w-4xl text-5xl font-black leading-tight tracking-tight md:text-7xl"
              variants={fadeUp}
              custom={0.3}
            >
              <motion.span
                className="inline-flex flex-wrap"
                variants={letterContainer}
                initial="hidden"
                animate="visible"
                aria-label={nameText}
              >
                {nameText.split("").map((letter, index) => (
                  <motion.span
                    key={`${letter}-${index}`}
                    variants={letterVariant}
                    className="inline-block"
                  >
                    {letter === " " ? " " : letter}
                  </motion.span>
                ))}
              </motion.span>{" "}
              <motion.span
                className="inline-block bg-gradient-to-r from-sky-400 via-blue-500 to-purple-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
              >
                S
              </motion.span>
            </motion.h1>

            <motion.p
              className="mt-5 max-w-3xl text-lg leading-8 text-gray-600 md:text-xl"
              variants={fadeUp}
              custom={0.4}
            >
              Full-Stack AI Engineer and Data Scientist building intelligent,
              production-ready systems with React, Python, multimodal AI, and
              deterministic LLM pipelines.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap gap-3 text-sm text-gray-600"
              variants={fadeUp}
              custom={0.5}
            >
              <Pill>📍 Chennai, India</Pill>
              <Pill>📞 +91 73388 34982</Pill>
              <Pill>✉️ sureshhariharasudhan7@gmail.com</Pill>
            </motion.div>

            <motion.div
              className="mt-10 flex flex-wrap gap-4"
              variants={fadeUp}
              custom={0.6}
            >
              <a
                href="#projects"
                className="rounded-2xl bg-gray-900 px-6 py-3 font-medium text-white transition hover:bg-gray-800"
              >
                View Projects
              </a>
              <a
                href="mailto:sureshhariharasudhan7@gmail.com"
                className="rounded-2xl border border-gray-200 bg-white px-6 py-3 font-medium text-gray-900 transition hover:bg-gray-50"
              >
                Contact Me
              </a>
            </motion.div>
          </div>

          <motion.div variants={fadeUp} custom={0.7}>
            <GlassCard className="overflow-hidden">
              <div className="p-6">
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                  <div className="mx-auto flex max-w-sm flex-col items-center text-center">
                    <div className="mb-5 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                      <img
                        src={profileImage}
                        alt="Hariharasudan profile"
                        className="h-[360px] w-[290px] object-cover"
                      />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">Hariharasudan S</h3>
                    <p className="mt-2 text-sm font-medium uppercase tracking-[0.2em] text-gray-600">
                      Full-Stack AI Engineer
                    </p>
                    <p className="mt-4 text-sm leading-7 text-gray-600">
                      Building production-ready AI products with React, Python,
                      multimodal systems, and reliable LLM pipelines.
                    </p>

                    <div className="mt-6 flex w-full flex-col gap-3">
                      <a
                        href="mailto:sureshhariharasudhan7@gmail.com"
                        className="w-full rounded-xl bg-gray-900 px-5 py-3 text-center text-sm font-medium text-white transition hover:bg-gray-800"
                      >
                        Hire Me
                      </a>
                      <a
                        href="/HARIHARASUDAN_Resume.pdf"
                        download="HARIHARASUDAN_Resume.pdf"
                        className="w-full rounded-xl border border-gray-300 bg-white px-5 py-3 text-center text-sm font-medium text-gray-900 transition hover:bg-gray-50"
                      >
                        Download Resume
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </motion.section>

        <motion.section className="py-14" variants={fadeUp} custom={0.2}>
          <SectionHeading eyebrow="Skills" title="Tools, frameworks, and AI capabilities" />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              ["Languages", skills.languages, "💻"],
              ["AI / ML", skills.ai, "🧠"],
              ["Frameworks", skills.frameworks, "🧩"],
              ["Tools", skills.tools, "🛠️"],
            ].map(([title, items, emoji]) => (
              <GlassCard key={title}>
                <div className="p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-2xl bg-gray-100 p-3 text-gray-900">{emoji}</div>
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <Pill key={item}>{item}</Pill>
                    ))}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </motion.section>

        <motion.section className="py-14" variants={fadeUp} custom={0.25}>
          <SectionHeading eyebrow="Experience" title="Professional journey" />
          <div className="grid gap-6">
            {experiences.map((exp) => (
              <div
                key={exp.company}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{exp.role}</h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {exp.company} • {exp.location}
                    </p>
                  </div>

                  <div className="text-sm font-medium text-gray-500">{exp.period}</div>
                </div>

                <div className="mt-5 h-px w-full bg-gray-200" />

                <ul className="mt-5 space-y-3">
                  {exp.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm text-gray-600">
                      <span className="mt-1 h-2 w-2 rounded-full bg-gray-900" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section id="projects" className="py-14" variants={fadeUp} custom={0.3}>
          <SectionHeading eyebrow="Projects" title="Selected work and product builds" />
          <div className="grid gap-6 lg:grid-cols-2">
            {projects.map((project) => (
              <GlassCard key={project.title} className="h-full">
                <div className="p-7">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                    <span className="text-gray-900">↗</span>
                  </div>
                  <p className="text-gray-600">{project.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block rounded-lg bg-gray-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
                    >
                      View on GitHub
                    </a>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="grid gap-6 py-14 lg:grid-cols-2"
          variants={fadeUp}
          custom={0.35}
        >
          <GlassCard>
            <div className="p-7">
              <SectionHeading eyebrow="Education" title="Academic background" />
              <div className="space-y-4">
                {education.map((item) => (
                  <div
                    key={item.school}
                    className="rounded-2xl border border-gray-200 bg-gray-50 p-5 flex items-start gap-4"
                  >
                    <img
                      src={item.logo}
                      alt={`${item.school} logo`}
                      className="h-14 w-14 rounded-full border border-gray-200 bg-white object-contain p-1 shadow-sm"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{item.school}</h3>
                      <p className="mt-1 text-gray-600">{item.degree}</p>
                      <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-500">
                        <span>{item.period}</span>
                        <span>{item.score}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="p-7">
              <SectionHeading eyebrow="Certifications" title="Learning and credentials" />
              <div className="grid gap-3">
                {certifications.map((cert) => (
                  <div
                    key={cert}
                    className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-600"
                  >
                    {cert}
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.section>

        <motion.section className="pb-10 pt-14" variants={fadeUp} custom={0.4}>
          <GlassCard className="overflow-hidden bg-gray-100">
            <div className="flex flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-gray-600">Let’s build</p>
                <h2 className="mt-3 text-3xl font-semibold text-gray-900 md:text-4xl">
                  AI products with real-world impact
                </h2>
                <p className="mt-3 max-w-2xl text-gray-600">
                  Open to full-stack AI engineering, product development, and
                  intelligent automation opportunities.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:sureshhariharasudhan7@gmail.com"
                  className="rounded-2xl bg-gray-900 px-6 py-3 font-medium text-white transition hover:bg-gray-800"
                >
                  Contact Me
                </a>
                <a
                  href="#"
                  className="rounded-2xl border border-gray-300 bg-white px-6 py-3 font-medium text-gray-900 transition hover:bg-gray-50"
                >
                  Connect
                </a>
              </div>
            </div>
          </GlassCard>
        </motion.section>
      </motion.main>
    </div>
  );
}
