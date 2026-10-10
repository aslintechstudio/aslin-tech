import { MainLayout, PageWrapper } from './layouts'
import Navigation from './components/Navigation'
import Hero from './sections/Hero'
import Portfolio from './sections/Portfolio'
import { LanguageProvider } from './context/LanguageContext'

function App() {
  return (
    <LanguageProvider>
      <MainLayout>
        <Navigation />
        <PageWrapper>
          <Hero />
          <Portfolio />
        </PageWrapper>
      </MainLayout>
    </LanguageProvider>
  )
}

export default App
