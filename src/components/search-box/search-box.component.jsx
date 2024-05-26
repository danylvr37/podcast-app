import './search-box.styles.css'

export const SearchBox = ({ handleChangeSearch }) => {
  return (
    <>
      {/* input with number of coincidences */}
      <input
        type='search'
        className='search-input'
        placeholder='Filter podcasts...'
        onChange={handleChangeSearch}
      />
    </>
  )
}
