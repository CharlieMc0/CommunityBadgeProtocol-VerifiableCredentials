function TextAreaWidget(props) {

    // on key press update form

    return (
        <div className="widget-wrapper">

            <textarea onChange={e => props.update({ dataValue: e.target.value, dataKey: props.dataKey })} />

        </div>
    );
}

export default TextAreaWidget;
