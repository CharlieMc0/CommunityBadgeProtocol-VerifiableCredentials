function SelectWidget(props) {

    return (
        <div className="widget-wrapper">

            <div className="custom-select">
            <select onChange={e => props.update({ dataValue: e.target.value, dataKey: props.dataKey })}>
                {
                    props.options.map((opt, index) => {
                        return <option key={index} value={opt}>{opt}</option>
                    })
                }
            </select>
            </div>

        </div>
    );
}

export default SelectWidget;
