function ToggleButtonWidget(props) {

    const select = (evt) => {
        evt.target.classList.toggle("selected");
        props.update({ dataValue: props.text, dataKey: props.dataKey});
    }

    return (
        <button onClick={e => select(e)} className="toggle-button">{props.text}</button>
    );
}

export default ToggleButtonWidget;
