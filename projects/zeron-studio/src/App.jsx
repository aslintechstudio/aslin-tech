import { MainLayout, PageWrapper } from './layouts'
import Navigation from './components/Navigation'
import Hero from './sections/Hero'
import { LanguageProvider } from './context/LanguageContext'

function App() {
  return (
    <LanguageProvider>
      <MainLayout>
        <Navigation />
        <PageWrapper>
          <Hero />
        </PageWrapper>
      </MainLayout>
    </LanguageProvider>
  )
}

export default App
