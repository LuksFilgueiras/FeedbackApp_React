import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from "./components/Header"
import About from './pages/About'
import Home from './pages/Home'
import AboutIconLink from './components/AboutIconLink'

function App(){
    return (
        <>
        <Router>
            <Header/>
            <div className="container">
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/about' element={<About/>}/>
                </Routes>
                <AboutIconLink/>
            </div>
        </Router>
        </>
    )
}

export default App