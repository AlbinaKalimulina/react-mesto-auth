import { useEffect, useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm"

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    if (isOpen) {
      // Очищаем значения полей ввода
      setTitle("");
      setLink("");
    }
  }, [isOpen]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Создаем новую карточку с помощью переданных значений
    const newCard = {
      placename: title,
      placelink: link,
    };
    // Вызываем обработчик onAddPlace и передаем новую карточку
    onAddPlace(newCard);
  };


  return (
    <PopupWithForm
      name='add-place'
      title='Новое место'
      titleButton='Создать'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_place-name"
        id="placename"
        name="placename"
        type="text"
        placeholder="Название"
        required
        minLength={2}
        maxLength={30}
        value={title}
        onChange={handleTitleChange}
      />
      <span className="error-message popup__error" id="placename-error" />
      <input
        className="popup__input popup__input_type_place-link"
        id="placelink"
        name="placelink"
        type="url"
        placeholder="Ссылка на картинку"
        required
        value={link}
        onChange={handleLinkChange}
      />

      <span className="error-message popup__error" id="placelink-error" />
    </PopupWithForm>

  )
}