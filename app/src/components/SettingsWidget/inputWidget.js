function InputWidget(props) {

    // on key press update form

    return (
        <div className="widget-wrapper">

            <input onKeyUp={e => { 
                props.update({ dataValue: e.target.value, dataKey: props.dataKey })
            }
            } placeholder="Type here..." />

        </div>
    );
}

export default InputWidget;
