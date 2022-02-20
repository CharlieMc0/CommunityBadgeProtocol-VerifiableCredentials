import SideBar from './components/SideBar/index';
import SearchBar from './components/SearchBar/index';
import CommunitySetUp from './pages/communitySetup/index';
import ProfileBadge from './components/ProfileBadge/index';
import Modal from './components/Modal/index';
import './App.css';
import React, { useState } from 'react';

function App() {

  const [closeModal, setCloseModal] = useState(true);
  const [loading, setLoading] = useState(false);

  const openModalEvt = (state) => {
      setCloseModal(state);
  }

  return (
    <div className='app-wrapper'>
      <div className='app'>
      <Modal openModalEvt={openModalEvt} modalOpenState={closeModal} />
        <div className='app-row'>
          <SideBar/>
          <div className='app-col main'>
            <div className='header main'>
              <SearchBar/>
              <ProfileBadge />
            </div>
            <div className='line-break'></div>
            <CommunitySetUp openModalEvt={openModalEvt} loading={loading} />
          </div>  
        </div>
      </div>
    </div>
  );
}

export default App;
