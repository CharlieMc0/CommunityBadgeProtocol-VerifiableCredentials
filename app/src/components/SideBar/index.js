import './SideBar.css';
import Logo from './../Logo/index';

function SideBar() {

  const links = [
    { title: 'Community Setup', url: '', active: true },
    { title: 'Claim Badge', url: '' },
    { title: 'My Profile', url: '' },
    { title: 'Communities', url: '' }
  ];

  return (
    <div className='content'>
        
        <div className='header'>
          <Logo />
        </div>

        <div className='line-break'></div>

        {
          
          links.map((l, i) => {
            return <div className={`side-bar-link ${l.active ? 'active' : 'not-active'}`} key={i}>{l.title}</div>;
          })
        
        }

        <div className='line-break gutter'></div>

        <div className='thoughts-box'>

          <b>Got Thoughts?</b>

          <p>
            We are just getting started and we’ve got a long road ahead of us. Help us build the best tool for you.
          </p>

          <button>Leave Feedback</button>

        </div>
    </div>
  );
}

export default SideBar;
