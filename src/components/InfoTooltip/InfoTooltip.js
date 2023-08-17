import React from "react";

export default function InfoTooltip({ name, isSuccess, isOpen, onClose }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
      <div className="popup__content">
        <button className="popup__close-button" type="button" onClick={onClose} />
        <div
          className={`popup__sign ${isSuccess ? "popup__sign_type_success" : "popup__sign_type_fail"
            }`}></div>
        <h2 className="popup__heading">
          {isSuccess
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте еще раз."}
        </h2>
      </div>
    </div>
  );
}