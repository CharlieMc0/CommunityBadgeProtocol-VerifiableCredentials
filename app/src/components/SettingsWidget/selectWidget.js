function SelectWidget(props) {

    // on select

    return (
        <div className="widget-wrapper">

            <div className="custom-select">
            <select>
                {
                    props.options.map((opt, index) => {
                        return <option key={index} value={index}>{opt}</option>
                    })
                }
            </select>
            </div>

        </div>
    );
}

export default SelectWidget;
