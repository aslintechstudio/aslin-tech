import { useLanguage } from '../context/LanguageContext'

function Hero() {
  const { language } = useLanguage()
  const en = language === 'en'
  return (
    <section className="agency-hero portfolio-section" id="top" aria-labelledby="hero-title">
      <div className="hero-kicker"><span>{en ? 'Independent creative studio' : 'Bağımsız kreatif stüdyo'}</span><span>Art direction / Digital / Identity</span></div>
      <h1 id="hero-title">ZERON<span className="type-serif">Studio.</span></h1>
      <div className="hero-bottom"><p>{en ? 'We turn bold ideas into identities, spaces and digital experiences that leave a lasting impression.' : 'Cesur fikirleri iz bırakan kimliklere, mekânlara ve dijital deneyimlere dönüştürüyoruz.'}</p><a className="agency-button" href="#projeler">{en ? 'Explore our work' : 'Projeleri keşfet'} <span aria-hidden="true">↘</span></a></div>
      <div className="hero-rule"><span>{en ? 'Less noise. More meaning.' : 'Daha az gürültü. Daha çok anlam.'}</span><span>01 — 08</span></div>
    </section>
  )
}

export default Hero
