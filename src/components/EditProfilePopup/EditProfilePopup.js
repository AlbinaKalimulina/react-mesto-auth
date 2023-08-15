
import CurrentUserContext from "../../contexts/CurrentUserContext";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { useContext, useEffect, useState } from "react";


export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (isOpen) {
            setName(currentUser.name);
            setDescription(currentUser.about);
        }
    }, [isOpen, currentUser]);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            username: name,
            description: description,
        });
    }

    return (
        <PopupWithForm
            name='edit-profile'
            title='Редактировать профиль'
            titleButton='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                className="popup__input popup__input_type_name"
                id="username"
                name="username"
                type="text"
                placeholder="Введите имя"
                required=""
                minLength={2}
                maxLength={40}
                value={name || ''}
                onChange={handleNameChange}
            />
            <span className="error-message popup__error" id="username-error" />
            <input
                className="popup__input popup__input_type_descrition"
                id="description"
                name="description"
                type="text"
                placeholder="Введите вид деятельности"
                required=""
                minLength={2}
                maxLength={200}
                value={description || ''}
                onChange={handleDescriptionChange}
            />
            <span className="error-message popup__error" id="description-error" />
        </PopupWithForm>
    )
}