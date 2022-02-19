function InputNumberWidget(props) {

    // on key press update form

    return (
        <div className="widget-wrapper">
            
            <input type='number' placeholder="1" onKeyUp={e => props.update({ dataValue: e.target.value, dataKey: props.dataKey })} />

        </div>
    );
}

export default InputNumberWidget;
