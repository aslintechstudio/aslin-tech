import { useLanguage } from '../context/LanguageContext'
import projects from '../data/projects'
import ProjectShowcase from '../components/ProjectShowcase'

const services = [
  ['Marka kimliği', 'Brand identity', 'Konumlandırma, görsel kimlik, tipografi ve tutarlı bir marka dili.', 'Positioning, visual identity, typography and a coherent brand language.'],
  ['Web tasarımı', 'Web design', 'İçeriği öne çıkaran, her ekranda anlaşılır ve özgün web siteleri.', 'Distinctive websites that put content first and feel intuitive on every screen.'],
  ['Dijital deneyimler', 'Digital experiences', 'İnsan odaklı arayüzler, etkileşimli anlatılar ve dijital ürünler.', 'Human-centred interfaces, interactive stories and digital products.'],
  ['Sanat yönetimi', 'Art direction', 'Fotoğraf, hareket ve editoryal kompozisyonla bütünlüklü hikâyeler.', 'Complete stories told through photography, motion and editorial composition.'],
]
const steps = [
  ['Keşif', 'Discovery', 'Dinler, araştırır ve doğru soruları sorarız. Hedefleri, kullanıcıları ve bağlamı birlikte tanımlarız.', 'We listen, research and ask the right questions. Together, we define the goals, audiences and context.'],
  ['Strateji', 'Strategy', 'Araştırmayı net bir yön ve ortak bir yaratıcı çerçeveye dönüştürürüz.', 'We turn research into a clear direction and a shared creative framework.'],
  ['Tasarım', 'Design', 'Fikirleri prototiplerle sınar; tipografi, görsel ve etkileşimi tek bir dilde buluştururuz.', 'We test ideas through prototypes and bring typography, imagery and interaction into one language.'],
  ['Teslim', 'Delivery', 'Her ekranı ve detayı kontrol eder, uygulama dosyalarını ve kullanım rehberini birlikte teslim ederiz.', 'We review every screen and detail, then deliver the implementation and a practical guide.'],
]

function EditorialHeading({ number, label, title }) {
  return <header className="editorial-heading"><p className="section-eyebrow">{number} / {label}</p><h2>{title}</h2></header>
}

function Portfolio() {
  const { language, copy } = useLanguage()
  const en = language === 'en'
  const t = (tr, english) => en ? english : tr
  return <>
    <section id="projeler" className="portfolio-section works" aria-labelledby="works-title">
      <div className="editorial-heading"><p className="section-eyebrow">02 / {copy.selectedWorks}</p><h2 id="works-title">{t('Fikirden iz bırakan işe.', 'From idea to lasting impact.')}</h2></div>
      <ProjectShowcase />
      <div className="project-card-grid">
        {projects.map(project => <article className="project-card" id={project.id} key={project.id}>
          <a className="project-card__image" href={`#${project.id}-story`} aria-label={`${project.title} — ${t('proje özeti', 'project summary')}`}><img src={project.images[0].url} alt={en ? `${project.title}, ${project.locationEn}` : project.images[0].alt} loading="lazy" decoding="async" width="1200" height="900" style={{ objectPosition: project.images[0].position }} /><span aria-hidden="true">↗</span></a>
          <div className="project-card__meta"><span>{project.number} / {en ? project.typeEn : project.type}</span><span>{project.year}</span></div>
          <div id={`${project.id}-story`} className="project-card__story"><h3>{project.title}</h3><p>{en ? project.descriptionEn : project.description}</p></div>
        </article>)}
      </div>
    </section>
    <section id="studio" className="portfolio-section studio-section">
      <EditorialHeading number="03" label={t('Stüdyo', 'Studio')} title={t('Bakış açısı fark yaratır.', 'Perspective makes the difference.')} />
      <div className="studio-grid"><figure><img src={projects[0].images[2].url} alt={t('Stüdyonun ışık ve form araştırması', 'A studio study of light and form')} loading="lazy" width="900" height="1100" /><figcaption>ZERON / {t('Işık, form ve ritim üzerine', 'On light, form and rhythm')}</figcaption></figure><div className="studio-copy"><p className="studio-lead type-serif">{t('Bir markanın nasıl göründüğünden önce, ne hissettirdiğiyle ilgileniyoruz.', 'Before asking how a brand looks, we ask how it feels.')}</p><p>{t('ZERON Studio; strateji, görsel kimlik ve dijital tasarımı aynı masada buluşturan bağımsız bir kreatif stüdyo. Mimarlığın oranlarından, sanatın cesaretinden ve gündelik hayatın küçük detaylarından besleniyoruz.', 'ZERON Studio is an independent creative practice bringing strategy, visual identity and digital design to the same table. We draw on the proportions of architecture, the courage of art and the small details of everyday life.')}</p><p>{t('Her projeye hazır bir stil uygulamak yerine, kendine ait bir dil arıyoruz. Az ama yerinde kararlar, güçlü tipografi ve malzemeye duyarlı görsellerle açık, karakterli ve uzun ömürlü deneyimler tasarlıyoruz.', 'Rather than applying a ready-made style, we find a language unique to each project. Considered decisions, expressive typography and material-sensitive imagery create clear, distinctive and enduring experiences.')}</p><a className="text-link" href="#hizmetler">{t('Birlikte neler yapabiliriz?', 'What can we create together?')} ↗</a></div></div>
    </section>
    <section id="hizmetler" className="portfolio-section services-section">
      <EditorialHeading number="04" label={t('Hizmetler', 'Services')} title={t('Tek vizyon. Birçok disiplin.', 'One vision. Many disciplines.')} />
      <div className="service-list">{services.map(([tr, english, detail, detailEn], index) => <article key={english}><span className="section-eyebrow">0{index + 1}</span><h3>{t(tr, english)}</h3><p>{t(detail, detailEn)}</p><span className="service-arrow" aria-hidden="true">↗</span></article>)}</div>
    </section>
    <section id="yaklasim" className="portfolio-section approach-section">
      <EditorialHeading number="05" label={t('Yaklaşım', 'Approach')} title={t('İyi iş, iyi bir süreçle başlar.', 'Great work starts with a thoughtful process.')} />
      <div className="approach-grid">{steps.map(([tr, english, detail, detailEn], index) => <article key={english}><span className="step-number">0{index + 1}</span><h3>{t(tr, english)}</h3><p>{t(detail, detailEn)}</p></article>)}</div>
    </section>
    <section id="arsiv" className="portfolio-section archive-section">
      <EditorialHeading number="06" label={t('Arşiv', 'Archive')} title={t('Görsel notlar, yeni olasılıklar.', 'Visual notes. New possibilities.')} />
      <p className="section-intro">{t('Projelerimizin çevresinde biriken ışık, doku ve mekân araştırmaları. Yaratıcı sürecin içinden bir seçki.', 'Studies of light, texture and space gathered around our projects. A selection from the creative process.')}</p>
      <div className="archive-gallery">{projects.flatMap(project => project.images.slice(1, 3).map((image, index) => <figure key={image.url}><img src={image.url} alt={en ? `${project.title} — visual study ${index + 1}` : image.alt} loading="lazy" decoding="async" width="800" height="1000" style={{ objectPosition: image.position }} /><figcaption><span>{project.title}</span><span>0{index + 1} / {project.year}</span></figcaption></figure>))}</div>
    </section>
    <section id="iletisim" className="portfolio-section contact-section">
      <p className="section-eyebrow">07 / {t('Birlikte başlayalım', 'Let’s begin together')}</p><h2>{t('Sıradaki fikir', 'Your next idea')}<br /><span className="type-serif">{t('sizin olsun.', 'starts here.')}</span></h2>
      <div className="contact-bottom"><p>{t('Yeni bir marka, dijital bir deneyim ya da henüz adı konmamış bir fikir. Konuşalım ve doğru başlangıcı birlikte bulalım.', 'A new brand, a digital experience or an idea still taking shape. Let’s talk and find the right starting point together.')}</p><a className="agency-button" href="mailto:info@aslintech.com?subject=ZERON%20Studio%20proje%20talebi">{t('Projenizi konuşalım', 'Let’s discuss your project')} ↗</a></div><a className="contact-email" href="mailto:info@aslintech.com">info@aslintech.com</a>
    </section>
    <footer className="portfolio-section agency-footer"><div className="footer-top"><a className="footer-brand" href="#top">ZERON Studio.</a><nav aria-label={t('Alt navigasyon', 'Footer navigation')}>{copy.navigation.map((label, i) => <a key={label} href={['#projeler', '#studio', '#yaklasim', '#arsiv', '#iletisim'][i]}>{label}</a>)}<a href="#hizmetler">{t('Hizmetler', 'Services')}</a></nav><div className="footer-social"><span>{t('İlham kaynakları', 'Creative communities')}</span><a href="https://www.behance.net/" target="_blank" rel="noopener noreferrer">Behance ↗</a><a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">Instagram ↗</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} ZERON Studio. {t('Tüm hakları saklıdır.', 'All rights reserved.')}</span><a href="#top">{t('Başa dön', 'Back to top')} ↑</a></div></footer>
  </>
}

export default Portfolio
