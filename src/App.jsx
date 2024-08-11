import './App.css'
import Footer from './components/footer'
import Navbar from './components/navbar'
import SerchSidebar from './pages/serchSidebar'
import SerchResult from './pages/serchResult'

function App() {


  return (
    <>
      <Navbar />
      <div className='lg:flex bg-gray-100 lg:space-x-10 lg:px-20 pb-44'>
        <div className='basis-1/4'><SerchSidebar /></div>
        <div className='basis-[70%]'><SerchResult /></div>
      </div>

      <Footer />
    </>
  )
}

export default App
