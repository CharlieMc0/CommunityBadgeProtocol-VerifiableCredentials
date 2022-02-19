import './SettingsPanel.css';

function SettingsPanel(props) {

  return (
    <div className='settings-panel'>

      <div className='bullet-title-wrapper'>
        <div className={`bullet-${props.colour}`}></div>
        <div className='bullet-title'>{props.title}</div>
      </div>

      <div className={`line-break-${props.colour}`}></div>

      {props.children}

    </div>
  );
}

export default SettingsPanel;
