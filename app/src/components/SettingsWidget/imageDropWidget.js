import React, { useState, useEffect } from 'react';

function ImageDropWidget(props) {

    const [value, setValue] = useState('');

    const fileInput = React.createRef();

    useEffect(() => {});

    // on select
    const sendData = (e) => {
        setValue(e.target.value);
        props.update({ dataValue: value, dataKey: props.dataKey })
    }

    const onDragOver = (e) => {
        e.stopPropagation();
        e.preventDefault();
    }
    
    const handlerFunction = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let dt = e.dataTransfer;
        let data = dt.items[0].getAsFile();
        props.update({ dataValue: data, dataKey: props.dataKey })
        setValue(data.name);
    }

    return (
        <div className="widget-wrapper">
            <div id="drop-area" onDrop={handlerFunction} onDragOver={onDragOver}>
                <label className="custom-file-upload">
                    <input ref={fileInput} name="file" id="file" className="inputfile" type="file" onChange={e => sendData(e)} />
                    Drag and Drop Image
                </label>
            </div>
            <p className='file-name'>{value}</p>
        </div>
    );
}

export default ImageDropWidget;
