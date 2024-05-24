export const PodcastCard = ({ img, name, artist }) => {
  return (
    <div className='titles-container'>
      <img
        src={img}
        alt={name}
      />
      <div>
        <strong>{name}</strong>
      </div>
      <div>{artist}</div>
    </div>
  )
}
