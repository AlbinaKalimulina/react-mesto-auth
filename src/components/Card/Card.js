import { useContext } from "react"
import CurrentUserContext from "../../contexts/CurrentUserContext"

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = useContext(CurrentUserContext)
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const numberOfLikes = card.likes.length


    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
        `card__like-button ${isLiked && 'card__like-button_active'}`
    );;

    const handleLikeClick = () => {
        onCardLike(card);
    };

    function handleDeleteClick() {
        onCardDelete(card);
    };

    return (
        <div className="card">

            {isOwn && <button
                className="card__delete-button"
                type="button"
                onClick={handleDeleteClick} />}


            <img
                className="card__image"
                src={card.link}
                alt={`Фото ${card.name}`}
                onClick={() => onCardClick({ link: card.link, name: card.name })}
            />
            <div className="card__title">
                <h2 className="card__place-name" >{card.name}</h2>
                <div className="card__like-group">
                    <button
                        className={cardLikeButtonClassName}
                        type="button"
                        onClick={handleLikeClick}
                    />
                    <span className="card__likes-counter"> {numberOfLikes}</span>
                </div>
            </div>
        </div>
    )
}