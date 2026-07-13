import Hero from '../components/home/Hero'
import Marquee from '../components/ui/Marquee'
import About from '../components/home/About'
import WorkGrid from '../components/home/WorkGrid'
import ExperienceTimeline from '../components/home/ExperienceTimeline'
import SkillsMatrix from '../components/home/SkillsMatrix'
import EducationCerts from '../components/home/EducationCerts'
import ContactCTA from '../components/home/ContactCTA'
import { profile } from '../data/profile'

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee items={profile.signals} />
      <About />
      <WorkGrid />
      <ExperienceTimeline />
      <SkillsMatrix />
      <EducationCerts />
      <ContactCTA />
    </>
  )
}
