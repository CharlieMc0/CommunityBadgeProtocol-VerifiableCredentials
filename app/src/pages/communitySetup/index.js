import './CommunitySetup.css';
import SettingsPanel from '../../components/SettingsPanel/index';
import SettingsWidget from '../../components/SettingsWidget/index';
import InputWidget from '../../components/SettingsWidget/inputWidget';
import TextAreaWidget from '../../components/SettingsWidget/textAreaWidget';
import SelectWidget from '../../components/SettingsWidget/selectWidget';
import InputNumberWidget from '../../components/SettingsWidget/inputNumberWidget';
import ImageDropWidget from '../../components/SettingsWidget/imageDropWidget';
import ToggleButtonWidget from '../../components/SettingsWidget/toggleButtonWidget';

function CommunitySetUp() {
  return (
    <div className='community-setup-wrapper'>
        <div className='title-bar'>
          <div>
          <h1>Community Setup</h1>
          <p>Connect your community's discord and set up how Badges get awarded.</p>
          </div>
          <div>
            <button className="submit-button">Create</button>
          </div>
        </div>
        <div className='settings-panel-wrapper'>
          <SettingsPanel title="Rights" colour="purple">
            <SettingsWidget title="Who Can Nominate" description="Set up who within your community gets to nominate people for a Badge">

              <ToggleButtonWidget text="admin" />
              <ToggleButtonWidget text="modifiers" />
              <ToggleButtonWidget text="members" />

            </SettingsWidget>
            <SettingsWidget title="Who Can Be Nominated" description="Set up who within your community gets to be nominated to receive a Badge">

              <ToggleButtonWidget text="admin" />
              <ToggleButtonWidget text="modifiers" />
              <ToggleButtonWidget text="members" />

            </SettingsWidget>
            <SettingsWidget title="Who Can Vote" description="Set up who within your community gets to vote for nominated members">

              <ToggleButtonWidget text="admin" />
              <ToggleButtonWidget text="modifiers" />
              <ToggleButtonWidget text="members" />

            </SettingsWidget>
          </SettingsPanel>

          <SettingsPanel title="Voting Mechanics" colour="orange">

            <SettingsWidget title="Voting Period" description="Set up who within your community gets to nominate people for a Badge">
              <div className='flex-wrap'>
                <InputNumberWidget />
                <SelectWidget options={['days', 'weeks', 'months']} />
              </div>
            </SettingsWidget>
            
            <SettingsWidget title="Voting Type" description="Set up who within your community gets to nominate people for a Badge">
                <SelectWidget options={['binary']} />
            </SettingsWidget>

          </SettingsPanel>
          <SettingsPanel title="Community Profile" colour="green">

            <SettingsWidget title="Community Name" description="Set up who within your community gets to nominate people for a Badge">
                <InputWidget />
            </SettingsWidget>
            <SettingsWidget title="Community Logo" description="Set up who within your community gets to nominate people for a Badge">
                <ImageDropWidget/>
            </SettingsWidget>
            <SettingsWidget title="Community Bio" description="Set up who within your community gets to nominate people for a Badge">
                <TextAreaWidget />
            </SettingsWidget>

          </SettingsPanel>
        </div>
    </div>
  );
}

export default CommunitySetUp;
