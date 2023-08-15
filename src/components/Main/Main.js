import { useContext } from "react"
import Card from "../Card/Card.js"
import CurrentUserContext from "../../contexts/CurrentUserContext.js"

export default function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete }) {
    const currentUser = useContext(CurrentUserContext)


    return (
        <main className="content">
            <section className="profile">
                <button type="button" className="profile__avatar-button" onClick={onEditAvatar}>
                    <img className="profile__avatar" src={currentUser.avatar} alt="фото профиля" />
                </button>
                <div className="profile__info" aria-label="Информация профиля">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <p className="profile__description">{currentUser.about}</p>
                </div>
                <button
                    className="profile__edit-button"
                    type="button"
                    aria-label="Редактировать"
                    onClick={onEditProfile}
                />
                <button
                    className="profile__add-button"
                    type="button"
                    aria-label="Добавить"
                    onClick={onAddPlace}
                />
            </section>

            <section className="elements" aria-label="Фотографии красивых мест">
                <div className="element">
                    {cards.map((card) => {
                        return (
                            <Card
                                key={card._id}
                                card={card}
                                onCardClick={onCardClick}
                                onCardLike={onCardLike}
                                onCardDelete={onCardDelete}
                            />
                        )
                    })}
                </div>
            </section>
        </main>
    )
}