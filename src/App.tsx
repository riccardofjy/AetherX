import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Services from './components/Services'
import WhyUs from './components/WhyUs'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div style={{ backgroundColor: '#03070F', minHeight: '100vh' }}>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Services />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
