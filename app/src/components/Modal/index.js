// import React, { useState } from 'react';
import './Modal.css';

// https://codepen.io/fionnachan/pen/EvaqOB

function Modal(props) {

    const close = () => {

        props.openModalEvt(true);

    }

  return (
    <div className={props.modalOpenState ? 'hidden outer-wrapper' : 'outer-wrapper in'}>
        <div className='modal'>
            <div>
                <p>
                    <b>Success!</b>
                </p>
                <p>
                    Your community is now connected!
                </p>
            </div>
            <button className="ok-button" onClick={e => {close(e)}}>Close</button>
        </div>
        <div className='modal-wrapper'></div>
        <div className='container'>
            <div className='confetti'></div>
            <div className='confetti'></div>
            <div className='confetti'></div>
            <div className='confetti'></div>
            <div className='confetti'></div>
            <div className='confetti'></div>
            <div className='confetti'></div>
            <div className='confetti'></div>
            <div className='confetti'></div>
        </div>
    </div>
  );
}

export default Modal;
