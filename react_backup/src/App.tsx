import Navbar from './components/ui/Navbar'
import Hero from './components/ui/Hero'
import Features from './components/ui/Features'
import Testimonials from './components/ui/Testimonials'
import FAQ from './components/ui/FAQ'
import Footer from './components/ui/Footer'

function App() {
  return (
    <div className="min-h-screen bg-beige-50 text-gray-800 selection:bg-beige-200 selection:text-beige-900">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}

export default App
