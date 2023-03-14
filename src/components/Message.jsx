import React from "react";

const Message = ({ text }) => {
    return (
        <div className="message__wrapper">
            <p className="message__text">{text}</p>
        </div>
    );
};

export default Message;
