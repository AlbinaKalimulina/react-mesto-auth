export default function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_image ${(card && card.link) && 'popup_opened'}`}>
      <div className="popup__image-container">
        <button className="popup__close-button" type="button" onClick={onClose} />
        <figure>
          <img className="popup__card-image" src={card ? card.link : '#'} alt={card ? card.name : '#'} />
          <figcaption className="popup__card-description">{card && card.name}</figcaption>
        </figure>
      </div>
    </div>
  )
}