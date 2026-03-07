import { Outlet } from 'react-router'
import NavbarComponent from './components/navbar.component'
import Footer from './components/footer.component'

function App() {
  return (
    <>
      <NavbarComponent />
      <main>
        <Outlet />
      </main>
      <Footer/>
    </>
  )
}

export default App
