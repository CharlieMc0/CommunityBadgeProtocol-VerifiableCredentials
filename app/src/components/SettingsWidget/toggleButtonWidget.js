function ToggleButtonWidget(props) {

    const select = (evt) => {
        evt.target.classList.toggle("selected");
    }

    return (
        <button onClick={select} className="toggle-button">{props.text}</button>
    );
}

export default ToggleButtonWidget;
