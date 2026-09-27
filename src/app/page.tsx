import Image from 'next/image';
import { Header } from '@/components/Header';
import { HeroScene } from '@/components/HeroScene';
import { Motion } from '@/components/Motion';
import { Icon } from '@/components/Icon';
import { businesses, email, faqs } from '@/lib/content';

export default function Home() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Motion/>
    <div id="home" className="dark-intro">
      <Header/>
      <main id="main">
        <section className="hero wrap" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow"><span className="pink-line"/> ONE GROUP. SHARED POSSIBILITIES.</p>
            <h1 id="hero-title">Connecting<br/>businesses.<br/>Empowering<br/><em>communities.</em></h1>
            <p className="hero-description">Across industries. Beyond boundaries.<br/>We bring people, businesses and opportunities together.</p>
            <a className="button button-pink" href="#businesses">Discover our businesses <Icon name="northeast"/></a>
          </div>
          <div className="hero-art"><HeroScene/><div className="art-caption"><span>FIVE BUSINESSES</span><span>ONE CONNECTED VISION</span></div></div>
          <div className="hero-bottom"><span><Icon name="globe"/> ROOTED IN NIGERIA. CONNECTED TO THE WORLD.</span><a href="#about">Scroll to explore <span aria-hidden="true">↓</span></a></div>
        </section>
        <div className="sector-strip" aria-label="Our areas of focus"><div className="wrap sector-inner"><span>Trade & logistics</span><i aria-hidden="true">✳</i><span>Travel & discovery</span><i aria-hidden="true">✳</i><span>Community impact</span><i aria-hidden="true">✳</i><span>Heritage & education</span></div></div>
        <section id="about" className="about-section light-section">
          <div className="wrap about-grid">
            <div className="section-label" data-reveal><span className="section-index">01 /</span><p>THE AYZAN GROUP</p></div>
            <div><h2 className="statement" data-reveal>Different industries.<br/>A shared belief in<br/><em>what’s possible.</em></h2>
              <div className="about-bottom" data-reveal><p>We are a diversified business group headquartered in Nigeria. From moving goods and opening new horizons to preserving heritage and equipping the next generation, our businesses share one ambition: to create meaningful opportunity.</p><a className="text-link" href="#purpose">What drives us <Icon name="northeast"/></a></div>
              <div className="group-facts" data-reveal><div><strong>05</strong><span>Specialist businesses</span></div><div><strong>01</strong><span>Shared vision</span></div><div className="fact-words"><strong>Local roots.<br/>Global outlook.</strong></div></div>
            </div>
          </div>
        </section>
        <section id="businesses" className="business-section light-section">
          <div className="wrap">
            <div className="section-top" data-reveal><div><p className="eyebrow dark-eyebrow">02 / OUR BUSINESSES</p><h2>A world of opportunity.<br/><em>Under one name.</em></h2></div><p>Specialist expertise.<br/>A collective commitment to progress.</p></div>
            <div className="business-list">
              {businesses.map(b => <details className="business" id={b.id} key={b.id} name="businesses" data-reveal>
                <summary><span className="business-number">{b.number}</span><span className="business-icon"><Icon name={b.icon}/></span><span className="business-heading"><span className="business-category">{b.category}</span><span className="business-name">{b.name}</span></span><span className="business-more"><span className="explore-label">Explore</span><Icon name="plus"/></span></summary>
                <div className="business-detail"><div className="business-intro"><p className="business-tagline">{b.tagline}</p><p>{b.description}</p><span className="business-location"><Icon name="globe"/>{b.location}</span><a className="text-link" href={`mailto:${email}?subject=${encodeURIComponent(`Enquiry: ${b.name}`)}`}>Connect with this team <Icon name="northeast"/></a></div><div className="service-list">{b.services.map(([title, description]) => <div key={title}><h3>{title}</h3><p>{description}</p></div>)}</div></div>
              </details>)}
            </div>
            <div className="portfolio-note"><span>Trade. Travel. Care. Create. Educate.</span><span>Different paths. Shared progress.</span></div>
          </div>
        </section>
        <section id="purpose" className="purpose-section">
          <div className="wrap purpose-grid"><div className="purpose-art" data-reveal><Image src="/assets/connected-sculpture.webp" width={1254} height={1254} sizes="(max-width: 800px) 100vw, 50vw" alt="Five interconnected pink and silver sculptural loops, representing Ayzan’s shared purpose"/><span className="image-caption">CONNECTED BY PURPOSE.</span></div><div className="purpose-copy"><p className="eyebrow" data-reveal>03 / BEYOND BUSINESS</p><h2 data-reveal>Progress means<br/>more when it’s<br/><em>shared.</em></h2><p className="purpose-description" data-reveal>Business growth and community wellbeing belong together. Through our foundation, school and heritage work, we invest our efforts in people, knowledge and the possibilities ahead.</p><div className="purpose-values" data-reveal><div><span>01</span><h3>Opportunity for people.</h3><p>Supporting access to health, education and economic empowerment.</p></div><div><span>02</span><h3>Knowledge for tomorrow.</h3><p>Connecting Islamic learning, digital skills and cultural heritage.</p></div><div><span>03</span><h3>Partnerships with purpose.</h3><p>Working with organizations and communities to create lasting value.</p></div></div><a href={`mailto:${email}?subject=Partnership%20with%20Ayzan%20Group`} className="text-link light-link">Build something meaningful with us <Icon name="northeast"/></a></div></div>
        </section>
        <section className="principles-section light-section"><div className="wrap"><p className="eyebrow dark-eyebrow" data-reveal>OUR COMMON GROUND</p><div className="principles-heading" data-reveal><h2>Many capabilities.<br/><em>The same commitment.</em></h2><p>The values that connect every Ayzan business, every partnership and every new opportunity.</p></div><div className="principles-grid"><article data-reveal><span>01 /</span><h3>Integrity, always.</h3><p>Building trust through quality, accountability and a commitment to doing things well.</p></article><article data-reveal><span>02 /</span><h3>Ideas into action.</h3><p>Combining specialist knowledge and innovation to create practical solutions.</p></article><article data-reveal><span>03 /</span><h3>People at the heart.</h3><p>Keeping community empowerment and meaningful social impact close to our work.</p></article></div></div></section>
        <section className="faq-section light-section"><div className="wrap faq-grid"><div data-reveal><p className="eyebrow dark-eyebrow">A LITTLE MORE ABOUT US</p><h2>Good questions.<br/><em>Clear answers.</em></h2></div><div className="faq-list">{faqs.map(([question, answer]) => <details key={question} data-reveal><summary>{question}<Icon name="plus"/></summary><p>{answer}</p></details>)}</div></div></section>
        <section id="contact" className="contact-section"><div className="wrap"><div className="contact-top" data-reveal><p className="eyebrow">04 / LET’S CONNECT</p><span>YOUR NEXT CHAPTER STARTS WITH A CONVERSATION.</span></div><div className="contact-main" data-reveal><h2>What can we<br/><em>build together?</em></h2><a className="contact-arrow" href={`mailto:${email}?subject=Let%E2%80%99s%20connect%20with%20Ayzan%20Group`} aria-label="Email Ayzan Group"><Icon name="northeast"/></a></div><div className="contact-bottom"><p>A business idea. A journey. A partnership.<br/>Let’s find the right possibilities for you.</p><a href={`mailto:${email}`}>{email}<Icon name="northeast"/></a></div></div></section>
      </main>
      <footer className="footer wrap"><div className="footer-top"><a className="brand" href="#home" aria-label="Back to Ayzan Group home"><span className="brand-mark">A</span><span>ayzan<span className="brand-sub">GROUP</span></span></a><p>Connecting businesses.<br/>Empowering communities.</p><a className="back-top" href="#home">Back to top <span aria-hidden="true">↑</span></a></div><div className="footer-word" aria-hidden="true">AYZAN<span>✳</span></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Ayzan Group. All rights reserved.</span><span>Nigeria · Global outlook</span></div></footer>
    </div>
  </>;
}
