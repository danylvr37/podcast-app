import './podcast-card.styles.css'

export const PodcastCard = ({ img, name, artist, description, type }) => {
  return (
    <div className={type === 'details' ? 'details-title-container' : 'titles-container'}>
      <img
        src={img}
        alt={name}
      />
      <div className={type === 'details' ? 'details-podcasts-name' : 'podcasts-name'}>
        <strong>{name}</strong>
      </div>
      <div className='details-podcasts-author'>{type === 'details' ? 'by' : 'Author'}: {artist}</div>
      {description &&
        <div className='details-podcasts-description'><strong>Description:</strong>
          <div>{description}</div>
        </div>}
    </div>
  )
}
