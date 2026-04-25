import { useState, useEffect, useRef } from 'react'

const PHONE_HREF = 'tel:7604029087'
const YELP_URL   = 'https://www.yelp.com/biz/african-hair-braiding-by-mamy-san-diego-3?osq=mamys+hair+braiding&override_cta=Request+an+appointment'
const LOGO_URL = 'https://mamyshairbraiding.com/wp-content/uploads/2019/05/Mamy-Hair-Braiding-San-DIego-Logo-2.png'

/* shift the pink logo hue to terracotta */
const LOGO_FILTER_NAV    = 'hue-rotate(150deg) saturate(1.4) brightness(0.85)'
const LOGO_FILTER_FOOTER = 'hue-rotate(150deg) saturate(1.2) brightness(1.6)'

const services = [
  { icon: '🪢', name: 'Box Braids',        desc: 'A timeless protective style — customized in length, thickness, and color to fit your vision.' },
  { icon: '✨', name: 'Cornrows',           desc: 'Classic flat braids styled in straight lines or creative patterns, perfect for everyday wear.' },
  { icon: '👑', name: 'Goddess Braid',     desc: 'Voluminous, flowing braids with a regal finish — every head tells a story.' },
  { icon: '🌿', name: 'Faux Locs',         desc: 'Get the dreadlock look without the commitment — elegant, lightweight, and long-lasting.' },
  { icon: '🔄', name: 'Senegalese Twists', desc: 'Sleek, silky twists that combine beauty and protection in one stunning style.' },
  { icon: '💫', name: 'Kinky Twists',      desc: 'Full, textured twists with a natural look — great for embracing your curl pattern.' },
  { icon: '🎀', name: 'Micros Braid',      desc: 'Tiny, precise braids crafted with expert hands. The ultimate in intricate protective styling.' },
  { icon: '🧵', name: 'Single Braids',     desc: 'Individual braids that offer maximum versatility — style them up, down, or anywhere in between.' },
  { icon: '🪡', name: 'Sewing Weave',      desc: 'Professional weave installations using a sew-in technique for a natural, seamless finish.' },
  { icon: '🌊', name: 'Lemonade Braids',   desc: 'Side-swept cornrows with a bold, statement-making style inspired by iconic looks.' },
  { icon: '🌺', name: 'Halo Braid',        desc: 'A stunning crown braid that wraps elegantly around the head — perfect for any occasion.' },
  { icon: '🔒', name: 'Dreadlocks',        desc: 'New installations, maintenance, and styling for natural or starter locs at every stage.' },
  { icon: '🪮', name: 'Crochet Braids',    desc: 'Fast, versatile crochet styles in any texture — straight, curly, or wavy.' },
  { icon: '💇', name: 'Custom Wigs',       desc: 'Handcrafted, fully customized wigs built to your exact specifications — fit, length, and style.' },
]

/* ─── Icons ─────────────────────────────────────────── */
const PhoneIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
  </svg>
)
const PinIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
  </svg>
)
const ClockIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
  </svg>
)
const CalIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
  </svg>
)
const ChatIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
  </svg>
)

/* ─── Fade-up animation hook ─────────────────────────── */
function useFadeUp() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.unobserve(el) } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function FadeUp({ children, style, className = '' }) {
  const ref = useFadeUp()
  return <div ref={ref} className={`fade-up ${className}`} style={style}>{children}</div>
}

/* ─── Nav ────────────────────────────────────────────── */
function Nav() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return (
    <>
      <nav>
        <div className="container nav-inner">
          <a href="#" className="nav-logo">
            <img src={LOGO_URL} alt="Mamy's Hair Braiding" style={{ height: 48, width: 'auto', filter: LOGO_FILTER_NAV }} />
          </a>
          <ul className="nav-links">
            <li><a href="#services">Services</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#locations">Locations</a></li>
            <li><a href="#social">Social</a></li>
            <li><a href="#contact-form">Contact</a></li>
          </ul>
          <div className="nav-cta">
            <a href={PHONE_HREF} className="btn btn-primary"><PhoneIcon /> Call Now</a>
          </div>
          <button className={`nav-toggle${open ? ' open' : ''}`} onClick={() => setOpen(o => !o)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>
      <div className={`nav-mobile${open ? ' open' : ''}`}>
        <a href="#services"    onClick={close}>Services</a>
        <a href="#about"       onClick={close}>About Mamy</a>
        <a href="#locations"   onClick={close}>Locations</a>
        <a href="#social"      onClick={close}>Social</a>
        <a href="#contact-form" onClick={close}>Contact Us</a>
        <a href={PHONE_HREF} style={{ color: 'var(--terra)', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '1rem' }}>
          Call Now
        </a>
      </div>
    </>
  )
}

/* ─── Hero ───────────────────────────────────────────── */
function Hero() {
  return (
    <section className="hero">
      <div className="hero-pattern" />
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="container">
        <div className="hero-content">
          <div className="hero-eyebrow">
            <div className="hero-eyebrow-line" />
            <span className="hero-eyebrow-text">San Diego &amp; Orange County</span>
          </div>
          <h1 className="hero-title">
            African Hair<br /><em>Braiding</em><br />by Mamy
          </h1>
          <p className="hero-sub">
            15+ years of artistry. Expert braids, custom wigs, microblading, and eyelash extensions — crafted with care for every client.
          </p>
          <div className="hero-actions">
            <a href="#contact-form" className="btn btn-primary"><CalIcon /> Book Appointment</a>
            <a href="#services" className="btn btn-outline">View Services</a>
          </div>
        </div>
      </div>
      <div className="hero-scroll">
        <span>Scroll</span>
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </div>
    </section>
  )
}

/* ─── Stats ──────────────────────────────────────────── */
function Stats() {
  return (
    <section className="stats">
      <div className="container">
        <div className="stats-grid">
          {[
            { n: '15+',    l: 'Years of Experience' },
            { n: '20+',    l: 'Braid Styles' },
            { n: '2',      l: 'Locations' },
            { n: '★★★★★', l: 'Yelp Reviews' },
          ].map(({ n, l }) => (
            <div key={l} className="stat-item">
              <div className="stat-number">{n}</div>
              <div className="stat-label">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── About ──────────────────────────────────────────── */
function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-grid">
          <FadeUp>
            <div className="about-img-wrap">
              <div className="about-img-frame">
                <div className="about-img-placeholder">
                  <svg width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="0.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                  <span style={{ fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase' }}>Add Photo of Mamy</span>
                </div>
              </div>
              <div className="about-badge">
                <span className="about-badge-num">15+</span>
                <span className="about-badge-text">Years<br />Expert</span>
              </div>
            </div>
          </FadeUp>
          <FadeUp style={{ transitionDelay: '0.15s' }}>
            <div className="about-body">
              <span className="section-label">Meet the Artist</span>
              <h2 className="section-heading">Mamy M.</h2>
              <div className="divider" />
              <p>
                With over 15 years of experience, Mamy is a master braider and licensed beauty stylist serving clients throughout San Diego, Oceanside, Orange County, and the surrounding area.
              </p>
              <p>
                Her passion for African hair artistry, attention to detail, and warm chair-side manner have built a loyal clientele who trust her with their most precious accessory. Whether you come in for intricate box braids or a microblading session, you leave feeling like your best self.
              </p>
              <div className="about-tags">
                {['Master Braider', 'Licensed Microblading', 'Eyelash Extensions', 'Custom Wigs', '15+ Years'].map(t => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
              <a href="#contact-form" className="btn btn-dark-outline">Book a Free Consultation</a>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

/* ─── Services ───────────────────────────────────────── */
function Services() {
  return (
    <section className="services" id="services">
      <div className="container">
        <FadeUp className="services-header">
          <span className="section-label">What We Offer</span>
          <h2 className="section-heading">Hair &amp; Beauty Services</h2>
          <div className="divider" />
          <p className="services-intro">From classic African braids to modern beauty treatments — if you don't see a style you love, just ask. Free consultations available.</p>
        </FadeUp>
        <div className="services-grid">
          {services.map(({ icon, name, desc }) => (
            <FadeUp key={name} className="service-card">
              <div className="service-icon">{icon}</div>
              <h3 className="service-name">{name}</h3>
              <p className="service-desc">{desc}</p>
            </FadeUp>
          ))}
          <FadeUp className="service-card featured">
            <div className="service-icon">🎨</div>
            <h3 className="service-name">Microblading &amp; Eyelash Extensions</h3>
            <p className="service-desc">Mamy is licensed for microblading and eyelash extensions. Enhance your natural features with precision brow work and custom lash sets. Call for current pricing and specials.</p>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

/* ─── Social ─────────────────────────────────────────── */
function Social() {
  return (
    <section className="social-section" id="social">
      <div className="container">
        <span className="section-label">Follow Along</span>
        <h2 className="section-heading">Find Us on Social</h2>
        <p className="social-sub">Follow Mamy for style inspiration, behind-the-scenes looks, and exclusive specials.</p>
        <div className="social-cards">
          <a className="social-card" href="https://www.tiktok.com/@mamybenju1" target="_blank" rel="noopener noreferrer">
            <div className="social-icon-wrap tiktok">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.67a8.18 8.18 0 004.78 1.52V6.74a4.85 4.85 0 01-1.01-.05z"/>
              </svg>
            </div>
            <span className="social-card-name">TikTok</span>
            <span className="social-card-handle">@mamybenju1</span>
            <span className="social-coming">Follow Us →</span>
          </a>

          <a className="social-card" href="https://www.instagram.com/touche_sd/" target="_blank" rel="noopener noreferrer">
            <div className="social-icon-wrap instagram">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </div>
            <span className="social-card-name">Instagram</span>
            <span className="social-card-handle">@touche_sd</span>
            <span className="social-coming">Follow Us →</span>
          </a>

          <a className="social-card" href={YELP_URL} target="_blank" rel="noopener noreferrer">
            <div className="social-icon-wrap yelp">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                <path d="M20.16 12.73l-4.417 1.22c-.934.26-1.645-.8-1.094-1.596l2.454-3.593a1.063 1.063 0 011.664-.124c.718.737 1.86 2.348 1.66 3.425a.95.95 0 01-.267.668zM12.24 9.38l-.8-4.544c-.17-.957.869-1.65 1.698-1.145 1.037.625 2.627 1.91 2.9 3.003.08.32.018.658-.17.924L13.81 9.74c-.56.786-1.74.437-1.57-.36zm-1.638 2.382l-4.338-1.8c-.918-.38-.924-1.666-.009-2.054 1.131-.48 3.048-.928 4.101-.434.306.143.534.41.624.733l.578 2.073c.245.878-.612 1.653-1.462 1.117l.506.365zm.48 2.038l-1.2 4.427c-.254.936-1.453 1.09-1.916.236-.574-1.063-1.15-2.99-.765-4.062.11-.306.34-.553.638-.677l1.983-.804c.84-.34 1.712.46 1.26 1.13v-.25zm2.41 1.2l3.214 3.292c.68.698.157 1.82-.798 1.776-1.172-.055-3.075-.505-3.79-1.419a1.063 1.063 0 01-.2-.97l.6-2.108c.253-.892 1.424-1.02 1.974-.57z"/>
              </svg>
            </div>
            <span className="social-card-name">Yelp</span>
            <span className="social-card-handle">African Hair Braiding by Mamy</span>
            <span className="social-coming">Read Reviews →</span>
          </a>
        </div>
      </div>
    </section>
  )
}

/* ─── Location Card ──────────────────────────────────── */
function LocationCard({ city, address, mapsUrl, label, delay }) {
  return (
    <FadeUp className="location-card" style={delay ? { transitionDelay: delay } : undefined}>
      <div className="location-map">
        <svg className="map-pin" width="40" height="48" viewBox="0 0 40 48" fill="none">
          <path d="M20 0C9 0 0 9 0 20C0 33 20 48 20 48C20 48 40 33 40 20C40 9 31 0 20 0Z" fill="#C4622D" opacity="0.9"/>
          <circle cx="20" cy="20" r="8" fill="white"/>
        </svg>
        <div style={{ position: 'absolute', bottom: 16, left: 16, fontSize: '.8rem', letterSpacing: '.05em', textTransform: 'uppercase', color: 'rgba(255,255,255,.3)' }}>{label}</div>
      </div>
      <div className="location-body">
        <h3 className="location-city">{city}</h3>
        <div className="location-detail"><PinIcon /><span>{address}</span></div>
        <div className="location-detail"><PhoneIcon /><a href={PHONE_HREF}><strong>Call Now</strong></a></div>
        <div className="location-detail"><ClockIcon /><span>8AM – 10:30PM &nbsp;<strong>· By Appointment Only</strong></span></div>
        <div style={{ marginTop: 24 }}>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark-outline" style={{ fontSize: 12, padding: '10px 20px' }}>
            Get Directions →
          </a>
        </div>
      </div>
    </FadeUp>
  )
}

function Locations() {
  return (
    <section className="locations" id="locations">
      <div className="container">
        <FadeUp className="locations-header">
          <span className="section-label">Where to Find Us</span>
          <h2 className="section-heading">Our Locations</h2>
          <div className="divider" />
          <p style={{ color: 'var(--muted)', maxWidth: 480 }}>We serve clients across San Diego County and Orange County. All appointments are by appointment only.</p>
        </FadeUp>
        <div className="locations-grid">
          <LocationCard city="San Diego" address="3651 Midway Dr #40, San Diego, CA 92110" mapsUrl="https://maps.google.com/?q=3651+Midway+Dr+%2340+San+Diego+CA+92110" label="San Diego" />
          <LocationCard city="Mission Viejo" address="23162 Los Alivos Blvd Suite 220, Mission Viejo, CA 92691" mapsUrl="https://maps.google.com/?q=23162+Los+Alivos+Blvd+Suite+220+Mission+Viejo+CA+92691" label="Orange County" delay="0.15s" />
        </div>
      </div>
    </section>
  )
}

/* ─── Payment ────────────────────────────────────────── */
function Payment() {
  const methods = [
    { label: 'Venmo', cls: 'venmo', icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M19.5 2c.6 1 .9 2.1.9 3.4 0 3.5-3 8-5.4 11.2H9.6L7 2.7l5-.5 1.4 7.2c1.3-2.1 2.9-5.4 2.9-7.6 0-.7-.1-1.3-.3-1.8H19.5z"/>
      </svg>
    )},
    { label: 'Zelle', cls: 'zelle', icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M13.1 3H21v2.5l-9.6 13H21V21H3v-2.5l9.6-13H3V3z"/>
      </svg>
    )},
    { label: 'Apple Pay', cls: 'apple', icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M18.7 12.4c0-2.5 2-3.7 2.1-3.8-1.2-1.7-3-1.9-3.6-1.9-1.5-.2-3 .9-3.8.9-.8 0-2-.9-3.3-.8-1.7 0-3.2 1-4 2.5-1.7 3-.5 7.4 1.2 9.8.8 1.2 1.8 2.4 3 2.4 1.2 0 1.7-.8 3.2-.8s1.9.8 3.2.7c1.3 0 2.1-1.2 2.9-2.3.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.2-.9-2.2-3.9zM16.3 4.9c.7-.8 1.1-2 1-3.1-1 0-2.1.6-2.8 1.4-.6.7-1.1 1.8-1 2.9 1.1.1 2.1-.5 2.8-1.2z"/>
      </svg>
    )},
    { label: 'Cash', cls: 'cash', icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--mid)" strokeWidth="1.8">
        <rect x="2" y="6" width="20" height="12" rx="2"/>
        <circle cx="12" cy="12" r="3"/>
        <path d="M6 6v12M18 6v12"/>
      </svg>
    )},
  ]
  return (
    <section className="payment-section" id="payment">
      <div className="container">
        <FadeUp>
          <span className="section-label">Payment Options</span>
          <h2 className="section-heading">We Accept</h2>
          <div className="divider" style={{ margin: '20px auto 32px' }} />
          <p className="payment-sub">Pay with your preferred method — we keep it simple and convenient.</p>
          <div className="payment-cards">
            {methods.map(({ label, cls, icon }) => (
              <div key={label} className="payment-card">
                <div className={`payment-icon ${cls}`}>{icon}</div>
                <span className="payment-name">{label}</span>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

/* ─── Contact Form ───────────────────────────────────── */
function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' })
  const [sent, setSent] = useState(false)
  const change = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const submit = e => { e.preventDefault(); setSent(true) }

  return (
    <section className="contact-section" id="contact-form">
      <div className="container">
        <FadeUp>
          <span className="section-label">Get in Touch</span>
          <h2 className="section-heading">Contact Us</h2>
          <div className="divider" />
          <p style={{ color: 'var(--muted)', marginBottom: 40, maxWidth: 520 }}>
            Send us a message and we'll get back to you as soon as possible.
          </p>
        </FadeUp>

        {sent ? (
          <FadeUp>
            <div className="form-success">
              <div style={{ fontSize: '2.4rem', marginBottom: 16, color: 'var(--terra)' }}>✓</div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--deep)', marginBottom: 12 }}>Message Received!</h3>
              <p style={{ color: 'var(--muted)' }}>Thank you for reaching out. We'll be in touch soon.</p>
            </div>
          </FadeUp>
        ) : (
          <FadeUp style={{ transitionDelay: '0.1s' }}>
            <form onSubmit={submit} style={{ maxWidth: 580, display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Name</label>
                  <input className="form-input" name="name" required value={form.name} onChange={change} placeholder="Your name" />
                </div>
                <div className="form-field">
                  <label className="form-label">Email</label>
                  <input className="form-input" name="email" type="email" required value={form.email} onChange={change} placeholder="your@email.com" />
                </div>
              </div>
              <div className="form-field">
                <label className="form-label">Service Interested In</label>
                <select className="form-input" name="service" value={form.service} onChange={change}>
                  <option value="">Select a service…</option>
                  {services.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                  <option value="Microblading">Microblading</option>
                  <option value="Eyelash Extensions">Eyelash Extensions</option>
                  <option value="Other">Other / Not sure yet</option>
                </select>
              </div>
              <div className="form-field">
                <label className="form-label">Message</label>
                <textarea className="form-input" name="message" required value={form.message} onChange={change} rows={5} placeholder="Tell us what you're looking for, preferred dates, any questions…" style={{ resize: 'vertical' }} />
              </div>
              <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                Send Message
              </button>
            </form>
          </FadeUp>
        )}
      </div>
    </section>
  )
}

/* ─── Booking CTA ────────────────────────────────────── */
function Booking() {
  return (
    <section className="booking" id="contact">
      <div className="booking-pattern" />
      <div className="container booking-content">
        <span className="section-label">Ready to Book?</span>
        <h2 className="section-heading">Let's Create Something Beautiful</h2>
        <p className="booking-sub">Call or message us to schedule your appointment. Free consultations available for first-time clients.</p>
        <div className="booking-actions">
          <a href={PHONE_HREF} className="btn btn-primary"><PhoneIcon /> Call Now</a>
          <a href="#contact-form" className="btn btn-outline"><ChatIcon /> Send a Message</a>
        </div>
        <p className="booking-note">By appointment only · San Diego &amp; Orange County</p>
      </div>
    </section>
  )
}

/* ─── Footer ─────────────────────────────────────────── */
function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <div style={{ marginBottom: 20 }}>
              <img src={LOGO_URL} alt="Mamy's Hair Braiding" style={{ height: 52, width: 'auto', filter: LOGO_FILTER_FOOTER }} />
            </div>
            <p className="footer-brand-text">
              African Hair Braiding by Mamy — San Diego and Orange County's trusted destination for expert braiding, custom wigs, microblading, and eyelash extensions. 15+ years of artistry.
            </p>
            <div className="footer-socials">
              <a className="footer-social-btn" href="https://www.tiktok.com/@mamybenju1" target="_blank" rel="noopener noreferrer" title="TikTok">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.67a8.18 8.18 0 004.78 1.52V6.74a4.85 4.85 0 01-1.01-.05z"/>
                </svg>
              </a>
              <a className="footer-social-btn" href="https://www.instagram.com/touche_sd/" target="_blank" rel="noopener noreferrer" title="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a className="footer-social-btn" href={YELP_URL} target="_blank" rel="noopener noreferrer" title="Yelp reviews">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.16 12.73l-4.417 1.22c-.934.26-1.645-.8-1.094-1.596l2.454-3.593a1.063 1.063 0 011.664-.124c.718.737 1.86 2.348 1.66 3.425a.95.95 0 01-.267.668zM12.24 9.38l-.8-4.544c-.17-.957.869-1.65 1.698-1.145 1.037.625 2.627 1.91 2.9 3.003.08.32.018.658-.17.924L13.81 9.74c-.56.786-1.74.437-1.57-.36zm-1.638 2.382l-4.338-1.8c-.918-.38-.924-1.666-.009-2.054 1.131-.48 3.048-.928 4.101-.434.306.143.534.41.624.733l.578 2.073c.245.878-.612 1.653-1.462 1.117l.506.365zm.48 2.038l-1.2 4.427c-.254.936-1.453 1.09-1.916.236-.574-1.063-1.15-2.99-.765-4.062.11-.306.34-.553.638-.677l1.983-.804c.84-.34 1.712.46 1.26 1.13v-.25zm2.41 1.2l3.214 3.292c.68.698.157 1.82-.798 1.776-1.172-.055-3.075-.505-3.79-1.419a1.063 1.063 0 01-.2-.97l.6-2.108c.253-.892 1.424-1.02 1.974-.57z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <div className="footer-col-title">Hair Styles</div>
            <ul className="footer-links">
              {['Box Braids','Cornrows','Goddess Braid','Faux Locs','Kinky Twists','Senegalese Twists','Single Braids','Lemonade Braids'].map(s => (
                <li key={s}><a href="#services">{s}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <div className="footer-col-title">More Styles</div>
            <ul className="footer-links">
              {['Micros Braid','Dreadlocks','Halo Braid','Crochet Braids','Sewing Weave','Custom Wigs'].map(s => (
                <li key={s}><a href="#services">{s}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Beauty</div>
            <ul className="footer-links">
              <li><a href="#services">Microblading</a></li>
              <li><a href="#services">Eyelash Extensions</a></li>
            </ul>
            <div className="footer-col-title" style={{ marginTop: 32 }}>Contact</div>
            <ul className="footer-links">
              <li><a href={PHONE_HREF}>Call Now</a></li>
              <li><a href="#locations">San Diego Location</a></li>
              <li><a href="#locations">Orange County Location</a></li>
              <li><a href="#contact-form">Send a Message</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© 2025 African Hair Braiding by Mamy · San Diego &amp; Orange County</p>
          <p className="footer-copy">Designed with ♥ · <a href="#contact-form">Book an Appointment</a></p>
        </div>
      </div>
    </footer>
  )
}

/* ─── Reviews ────────────────────────────────────────── */
const reviews = [
  {
    name: 'Nancy E.',
    stars: 5,
    text: 'Mamy is the real deal. My hair is on point! I have had my hair done by 2 ladies at this location so far. My goal is to rotate in the shop, because they are honestly good at what they do.',
  },
  {
    name: 'Jazmin D.',
    stars: 5,
    text: 'I have been going to Mamy since I was in high school (10 years). My sister and mother also have gone to her for that long and she is by far the best braiding stylist in SD!',
  },
  {
    name: 'Micah S.',
    stars: 5,
    text: 'I went to Mamy for a touch up and once again, she got me looking right. I had the front half of my braids redone and she had me in and out in about an hour and a half.',
  },
  {
    name: 'Gail B.',
    stars: 5,
    text: 'This was the 1st time I had gotten my hair braided in a very long time so believe me I did research before choosing a stylist. I loved my experience here with Mamy. She is an amazing professional.',
  },
  {
    name: 'Akeela B.',
    stars: 5,
    text: 'Awesome service, beautiful braids! Very comfortable setting! Will definitely return soon!',
  },
  {
    name: 'Verified Yelp Reviewer',
    stars: 5,
    text: 'Add your 6th favorite Yelp review here — just open src/App.jsx and update this entry with the real name and text.',
  },
]

function Stars({ count }) {
  return (
    <span style={{ color: '#d32323', fontSize: '1rem', letterSpacing: 2 }}>
      {'★'.repeat(count)}{'☆'.repeat(5 - count)}
    </span>
  )
}

function Reviews() {
  return (
    <section className="reviews-section" id="reviews">
      <div className="container">
        <FadeUp className="reviews-header">
          <span className="section-label">What Clients Say</span>
          <h2 className="section-heading">Yelp Reviews</h2>
          <div className="divider" />
          <div className="reviews-rating-row">
            <Stars count={5} />
            <span className="reviews-rating-text">5.0 · 5-star rated on Yelp</span>
            <a href={YELP_URL} target="_blank" rel="noopener noreferrer" className="reviews-yelp-link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.16 12.73l-4.417 1.22c-.934.26-1.645-.8-1.094-1.596l2.454-3.593a1.063 1.063 0 011.664-.124c.718.737 1.86 2.348 1.66 3.425a.95.95 0 01-.267.668zM12.24 9.38l-.8-4.544c-.17-.957.869-1.65 1.698-1.145 1.037.625 2.627 1.91 2.9 3.003.08.32.018.658-.17.924L13.81 9.74c-.56.786-1.74.437-1.57-.36zm-1.638 2.382l-4.338-1.8c-.918-.38-.924-1.666-.009-2.054 1.131-.48 3.048-.928 4.101-.434.306.143.534.41.624.733l.578 2.073c.245.878-.612 1.653-1.462 1.117l.506.365zm.48 2.038l-1.2 4.427c-.254.936-1.453 1.09-1.916.236-.574-1.063-1.15-2.99-.765-4.062.11-.306.34-.553.638-.677l1.983-.804c.84-.34 1.712.46 1.26 1.13v-.25zm2.41 1.2l3.214 3.292c.68.698.157 1.82-.798 1.776-1.172-.055-3.075-.505-3.79-1.419a1.063 1.063 0 01-.2-.97l.6-2.108c.253-.892 1.424-1.02 1.974-.57z"/>
              </svg>
              See all reviews on Yelp
            </a>
          </div>
        </FadeUp>

        <div className="reviews-grid">
          {reviews.map((r, i) => (
            <FadeUp key={r.name} className="review-card" style={{ transitionDelay: `${i * 0.07}s` }}>
              <div className="review-top">
                <div className="review-avatar">{r.name.charAt(0)}</div>
                <div className="review-name">{r.name}</div>
                <Stars count={r.stars} />
              </div>
              <p className="review-text">"{r.text}"</p>
              <a href={YELP_URL} target="_blank" rel="noopener noreferrer" className="review-source">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.16 12.73l-4.417 1.22c-.934.26-1.645-.8-1.094-1.596l2.454-3.593a1.063 1.063 0 011.664-.124c.718.737 1.86 2.348 1.66 3.425a.95.95 0 01-.267.668zM12.24 9.38l-.8-4.544c-.17-.957.869-1.65 1.698-1.145 1.037.625 2.627 1.91 2.9 3.003.08.32.018.658-.17.924L13.81 9.74c-.56.786-1.74.437-1.57-.36zm-1.638 2.382l-4.338-1.8c-.918-.38-.924-1.666-.009-2.054 1.131-.48 3.048-.928 4.101-.434.306.143.534.41.624.733l.578 2.073c.245.878-.612 1.653-1.462 1.117l.506.365zm.48 2.038l-1.2 4.427c-.254.936-1.453 1.09-1.916.236-.574-1.063-1.15-2.99-.765-4.062.11-.306.34-.553.638-.677l1.983-.804c.84-.34 1.712.46 1.26 1.13v-.25zm2.41 1.2l3.214 3.292c.68.698.157 1.82-.798 1.776-1.172-.055-3.075-.505-3.79-1.419a1.063 1.063 0 01-.2-.97l.6-2.108c.253-.892 1.424-1.02 1.974-.57z"/>
                </svg>
                Posted on Yelp
              </a>
            </FadeUp>
          ))}
        </div>

        <FadeUp style={{ textAlign: 'center', marginTop: 48 }}>
          <a href={YELP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-dark-outline">
            Read All Reviews on Yelp →
          </a>
        </FadeUp>
      </div>
    </section>
  )
}

/* ─── App ────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <div className="announcement">
        <span>Now Serving</span> San Diego &amp; Orange County &nbsp;·&nbsp; By Appointment Only &nbsp;·&nbsp;
        <a href={PHONE_HREF} style={{ color: 'var(--terra-light)' }}>Call Now</a>
      </div>
      <Nav />
      <Hero />
      <Stats />
      <Reviews />
      <About />
      <Services />
      <Social />
      <Locations />
      <Payment />
      <ContactForm />
      <Booking />
      <Footer />
      <a href={PHONE_HREF} className="sticky-call">
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
        </svg>
        <span>Call Now</span>
      </a>
    </>
  )
}
