import './search-box.styles.css'

export const SearchBox = ({ handleChangeSearch, number }) => {
  return (
    <div className='search-container'>
      <span className='number'>{number}</span>
      {/* input with number of coincidences */}
      <input
        type='search'
        className='search-input'
        placeholder='Filter podcasts...'
        onChange={handleChangeSearch}
      />
    </div>
  )
}
