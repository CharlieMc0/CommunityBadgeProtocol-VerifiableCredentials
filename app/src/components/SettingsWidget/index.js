import './SettingsWidget.css';

function SettingsWidget(props) {

  return (
    <div className="widget-wrapper">
        <h2>{props.title}</h2>
        <p>{props.description}</p>
        
    </div>
  );
}

export default SettingsWidget;
