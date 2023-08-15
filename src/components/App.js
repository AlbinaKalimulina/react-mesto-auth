import Header from "./Header/Header.js";
import Main from "./Main/Main.js";
import Footer from "./Footer/Footer.js";
import PopupWithForm from "./PopupWithForm/PopupWithForm.js";
import ImagePopup from "./ImagePopup/ImagePopup.js";
import { useEffect, useState } from "react";
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})

  const [currentUser, setCurrentUser] = useState({})

  const [cards, setCards] = useState([])

  useEffect(() => {
    Promise.all([api.getInfo(), api.getCards()])
      .then(([dataUser, dataCard]) => {
        setCurrentUser(dataUser)
        setCards(dataCard)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard(null)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (!isLiked) {
      api.addLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((error) => {
          console.log(error)
        })
    }
    else {
      api.deleteLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      const newCards = cards.filter((c) => c._id !== card._id)
      setCards(newCards)
    })
      .catch((error) => {
        console.log(error)
      })
  }

  function handleUpdateUser(dataUser) {
    api.setUserInfo(dataUser)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function handleUpdateAvatar(dataUser) {
    api.setAvatar(dataUser)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function handleAddPlaceSubmit(dataCard) {
    api.addCard(dataCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error)
      })
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>

      < div className="page__content" >

        <Header />

        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />


        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <PopupWithForm
          name='delete-card'
          title='Вы уверены?'
          titleButton='Да'
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />



      </div >

    </CurrentUserContext.Provider>
  );
}

export default App;
