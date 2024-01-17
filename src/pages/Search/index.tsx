import Aside from '../../components/Aside'
import './style.css'
import SearchForm from '../../components/SearchForm'

function Search(){
  return(
    <div className='search-page'>
      <Aside/>
      <SearchForm/>
    </div>
  )
}

export default Search