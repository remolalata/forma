import { useState } from 'react'
import type { FormEvent } from 'react'
import { Brand, Button, Plus, SectionHeading } from './components/ui'
import { Modal } from './components/Modal'
import content from './data/content.json'
import projects from './data/projects.json'
import './App.css'

type Project = (typeof projects)[number]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [filter, setFilter] = useState('All work')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [contactOpen, setContactOpen] = useState(false)
  const [saved, setSaved] = useState(false)
  const [formError, setFormError] = useState('')
  const [selectedService, setSelectedService] = useState('Brand strategy')
  const [expandedWork, setExpandedWork] = useState(false)
  const visibleProjects = projects.filter(project => filter === 'All work' || project.category === filter)
  const shownProjects = expandedWork ? visibleProjects : visibleProjects.slice(0, 3)

  function openContact() {
    setMenuOpen(false)
    setSaved(false)
    setFormError('')
    setContactOpen(true)
  }

  function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const fields = Object.fromEntries(new FormData(event.currentTarget))
    try {
      localStorage.setItem('forma-inquiry', JSON.stringify({ ...fields, savedAt: new Date().toISOString() }))
      setFormError('')
      setSaved(true)
    } catch {
      setFormError('Your browser could not save this inquiry. Please enable local storage and try again.')
    }
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header container">
        <a href="#" className="brand-link" aria-label="Forma home"><Brand /></a>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <Plus className="close-icon" /> : <span className="menu-lines" />}</button>
        <nav id="main-navigation" className={menuOpen ? 'navigation is-open' : 'navigation'} aria-label="Main navigation">
          {content.navigation.map(item => <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
          <Button onClick={openContact} className="nav-contact">Let’s talk <Plus /></Button>
        </nav>
      </header>
      <main id="main">
        <section className="hero container" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="small-asterisk" aria-hidden="true">✳</span> Independent minds. Shared ambition.</p>
            <h1 id="hero-title">Good design.<br />Great <span className="possibilities">possibilities<span className="heading-period">.</span></span></h1>
            <p className="hero-description">We bring clarity to bold ideas. A small, independent design studio building brands and digital experiences that move things forward.</p>
            <div className="hero-actions"><Button href="#work">Explore our work <Plus /></Button><a href="#about" className="text-link">A little about us <span className="link-dot" aria-hidden="true" /></a></div>
            <div className="hero-note"><span className="note-line" /><span>Thoughtful by nature.<br />Different by design.</span></div>
          </div>
          <div className="hero-visual">
            <img src="/images/hero-architecture.jpg" alt="Sculptural white architecture framed by a clear blue sky" width="1400" height="1400" fetchPriority="high" />
            <div className="hero-image-shade" />
            <div className="image-topline"><span>A fresh perspective.</span><span>Always.</span></div>
            <span className="image-asterisk" aria-hidden="true">✳</span>
            <div className="image-caption"><span>Less noise.<br />More meaning.</span><span className="caption-label">THE FORMA APPROACH</span></div>
          </div>
        </section>
        <section className="studio-strip container" aria-label="Our philosophy"><p>Small studio.<br /><strong>Big-picture thinking.</strong></p><span>Strategy meets creativity.<br />Good people meet good ideas.</span><div className="studio-wordmark">Ideas into <span>impact.</span><span className="mini-star" aria-hidden="true">✳</span></div></section>
        <section className="work-section container section-space" id="work" aria-labelledby="work-title">
          <SectionHeading eyebrow="SELECTED WORK" title="Made with purpose." id="work-title" description="A few ideas we’ve helped bring to life. Each one different. All of them considered." />
          <div className="work-toolbar"><div className="filters" role="group" aria-label="Filter projects by discipline">{content.filters.map(category => <button key={category} type="button" className={filter === category ? 'filter is-active' : 'filter'} aria-pressed={filter === category} onClick={() => { setFilter(category); setExpandedWork(false) }}>{category}</button>)}</div><span className="project-count" aria-live="polite">{visibleProjects.length} projects</span></div>
          <div className="project-grid">{shownProjects.map(project => <ProjectCard key={project.id} project={project} onSelect={() => setSelectedProject(project)} />)}</div>
          <div className="work-bottom"><span>Good things come from a fresh perspective.</span>{!expandedWork && visibleProjects.length > 3 ? <Button variant="outline" onClick={() => setExpandedWork(true)}>View all projects <Plus /></Button> : <span className="work-note">A collection of concept projects</span>}</div>
        </section>
        <section className="services-section" id="services" aria-labelledby="services-title"><div className="container services-layout"><div className="services-intro"><p className="eyebrow">WHAT WE DO</p><h2 id="services-title">The right thinking.<br />The right feeling.</h2><p>From the first question to the final detail, we connect the dots between your business and the people who matter.</p><a href="#contact" className="text-link">Find your starting point <Plus /></a><span className="services-asterisk" aria-hidden="true">✳</span></div><div className="service-list">{content.services.map(service => <div key={service.title} className={selectedService === service.title ? 'service is-expanded' : 'service'}><h3><button type="button" aria-expanded={selectedService === service.title} aria-controls={service.id} onClick={() => setSelectedService(selectedService === service.title ? '' : service.title)}><span>{service.title}</span><Plus className={selectedService === service.title ? 'close-icon' : ''} /></button></h3><div id={service.id} hidden={selectedService !== service.title}><p>{service.description}</p><div className="service-tags">{service.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div></div>)}</div></div></section>
        <section className="about-section container section-space" id="about" aria-labelledby="about-title"><p className="eyebrow">A LITTLE ABOUT FORMA</p><div className="about-content"><h2 id="about-title">Curious minds.<br />Careful hands.<br /><span>A personal approach.</span></h2><div><p>We’re a fictional independent studio with a simple belief: the best design makes the complicated feel effortless.</p><p>We’re here for the ambitious ideas, the thoughtful conversations, and the details that make all the difference. Small by choice, collaborative by nature.</p><div className="about-signoff"><span className="small-asterisk" aria-hidden="true">✳</span> Good work starts with a good conversation.</div></div></div></section>
        <section className="contact-section container" id="contact" aria-labelledby="contact-title"><div><p className="eyebrow">SOMETHING ON YOUR MIND?</p><h2 id="contact-title">Let’s make<br />something matter<span>.</span></h2></div><div className="contact-aside"><p>A new idea. A fresh start.<br />We’d love to hear what you’re thinking.</p><Button onClick={openContact}>Start a conversation <Plus /></Button><span>No big pitch. Just a little hello.</span></div><span className="contact-star" aria-hidden="true">✳</span></section>
      </main>
      <footer className="site-footer container"><a href="#" className="brand-link" aria-label="Forma home"><Brand /></a><p>Independent by design.</p><div><span>© {new Date().getFullYear()} Forma Studio</span><span className="footer-demo">A concept studio · Built with care</span></div><a href="https://unsplash.com" target="_blank" rel="noreferrer">Photography by Unsplash</a></footer>
      {selectedProject && <Modal title={selectedProject.title} onClose={() => setSelectedProject(null)}><div className={`project-detail-visual project-visual ${selectedProject.visual}`}>{selectedProject.image ? <img src={selectedProject.image} alt={selectedProject.alt} width="1000" height="700" /> : <BrandArtwork />}</div><p className="eyebrow detail-category">{selectedProject.category} · CONCEPT PROJECT</p><h2>{selectedProject.title}</h2><p>{selectedProject.description}</p><div className="detail-tags">{selectedProject.tags.map(tag => <span key={tag}>{tag}</span>)}</div><h3>The approach</h3><p>{selectedProject.approach}</p><Button onClick={() => { setSelectedProject(null); openContact() }}>Create something together <Plus /></Button></Modal>}
      {contactOpen && <Modal title={saved ? 'Your inquiry is saved' : 'Let’s start with hello.'} onClose={() => setContactOpen(false)}>{saved ? <div className="success-state"><span className="success-mark" aria-hidden="true">✓</span><p className="eyebrow">A GOOD START</p><h2>Your idea has a home.</h2><p>Your inquiry is saved in this browser. This is a demo, so nothing has been sent to a studio.</p><Button onClick={() => setContactOpen(false)}>Back to exploring</Button></div> : <><p className="eyebrow">LET’S MAKE SOMETHING MATTER</p><h2>Let’s start with hello.</h2><p>Tell us a little about yourself and your idea.</p><form className="contact-form" onSubmit={submitInquiry}><label>Your name<input name="name" autoComplete="name" placeholder="Alex Morgan" required maxLength={100} /></label><label>Email address<input name="email" type="email" autoComplete="email" placeholder="alex@company.com" required maxLength={200} /></label><label>What do you have in mind?<textarea name="message" rows={4} placeholder="The idea, the ambition, the what-if…" required minLength={10} maxLength={3000} /></label><p className="form-disclaimer">Demo form. Your inquiry stays in this browser and is never sent.</p>{formError && <p className="form-error" role="alert">{formError}</p>}<Button type="submit">Save my inquiry <Plus /></Button></form></>}</Modal>}
    </>
  )
}

function BrandArtwork() {
  return <div className="brand-artwork" aria-label="Olive wellness brand concept on a green background" role="img"><div className="olive-card"><span className="olive-symbol" aria-hidden="true">✳</span><span className="olive-name">olive.</span><span className="olive-tagline">A LITTLE MORE YOU.</span></div><span className="artwork-caption">A fresh take on feeling good.</span></div>
}

function ProjectCard({ project, onSelect }: { project: Project; onSelect: () => void }) {
  return <article className="project-card"><button type="button" className="project-button" onClick={onSelect} aria-label={`Explore ${project.title} concept project`}><div className={`project-visual ${project.visual}`}>{project.image ? <img src={project.image} alt={project.alt} width="1000" height="850" loading="lazy" /> : <BrandArtwork />}{project.visual === 'architecture' && <span className="project-image-wordmark">MONO<span>ARCHITECTURE, CONSIDERED.</span></span>}{project.visual === 'interior' && <span className="interior-wordmark">still<span>ROOM TO JUST BE.</span></span>}<span className="project-open" aria-hidden="true"><Plus /></span></div><div className="project-info"><h3>{project.title}</h3><span>{project.category}</span></div><p>{project.subtitle}</p></button></article>
}

export default App
