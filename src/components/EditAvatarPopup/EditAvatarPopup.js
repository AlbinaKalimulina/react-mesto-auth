import { useEffect, useRef } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";


export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputRef = useRef()

  useEffect(() => {
    if (isOpen) {
      inputRef.current.value = '';
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault()
    onUpdateAvatar({
      userphoto: inputRef.current.value
    })
  }

  return (
    <PopupWithForm
      name='edit-avatar'
      title='Обновить аватар'
      titleButton='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={inputRef}
        className="popup__input popup__input_type_userphoto-link"
        id="userphotolink"
        name="userphoto"
        type="url"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="error-message popup__error" id="userphotolink-error" />
    </PopupWithForm>
  )
}