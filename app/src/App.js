import SideBar from './components/SideBar/index';
import SearchBar from './components/SearchBar/index';
import CommunitySetUp from './pages/communitySetup/index';
import './App.css';

function App() {
  return (
    <div className='app-wrapper'>
      <div className='app'>
        <div className='app-row'>
          <SideBar/>
          <div className='app-col'>
            <div className='header main'>
              <SearchBar/>
            </div>
            <div className='line-break'></div>
            <CommunitySetUp/>
          </div>  
        </div>
      </div>
    </div>
  );
}

export default App;
