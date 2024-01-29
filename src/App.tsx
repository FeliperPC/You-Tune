import './App.css'
import Home from './pages/Home'
import Search from './pages/Search'
import Favorites from './pages/Favorites'
import { Route,Routes } from 'react-router-dom'
import Album from './pages/Album'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/album/:id' element={<Album/>}/>
        <Route path='/favorites' element={<Favorites/>}/>
        {/* <Route path='/profile' element={<Profile/>}/>
        <Route path='/profile/edit' element={<ProfileEdit/>}/> */}
        <Route path='/*' element={<NotFound/>}/>
      </Routes>
    </div>
  )
}

export default App
