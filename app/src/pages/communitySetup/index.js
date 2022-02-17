import './CommunitySetup.css';
import SettingsPanel from '../../components/SettingsPanel/index';
import SettingsWidget from '../../components/SettingsWidget/index';

function CommunitySetUp() {
  return (
    <div className='community-setup-wrapper'>
        <h1>Community Setup</h1>
        <p>Connect your community's discord and set up how Badges get awarded.</p>
        <div className='settings-panel-wrapper'>
          <SettingsPanel title="Rights" colour="purple">
            <SettingsWidget title="Who Can Nominate" description="Set up who within your community gets to nominate people for a Badge">

            </SettingsWidget>
            <SettingsWidget title="Who Can Be Nominated" description="Set up who within your community gets to be nominated to receive a Badge">

            </SettingsWidget>
            <SettingsWidget title="Who Can Vote" description="Set up who within your community gets to vote for nominated members">

            </SettingsWidget>
          </SettingsPanel>

          <SettingsPanel title="Voting Mechanics" colour="orange">

            <SettingsWidget title="Voting Period" description="Set up who within your community gets to nominate people for a Badge">

            </SettingsWidget>
            
            <SettingsWidget title="Voting Type" description="Set up who within your community gets to nominate people for a Badge">

            </SettingsWidget>

          </SettingsPanel>
          <SettingsPanel title="Community Profile" colour="green">

            <SettingsWidget title="Community Name" description="Set up who within your community gets to nominate people for a Badge">

            </SettingsWidget>
            <SettingsWidget title="Community Logo" description="Set up who within your community gets to nominate people for a Badge">

            </SettingsWidget>
            <SettingsWidget title="Community Bio" description="Set up who within your community gets to nominate people for a Badge">

            </SettingsWidget>

          </SettingsPanel>
        </div>
    </div>
  );
}

export default CommunitySetUp;
