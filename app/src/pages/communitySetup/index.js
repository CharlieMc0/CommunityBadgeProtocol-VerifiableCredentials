import './CommunitySetup.css';
import SettingsPanel from '../../components/SettingsPanel/index';
import SettingsWidget from '../../components/SettingsWidget/index';
import InputWidget from '../../components/SettingsWidget/inputWidget';
import TextAreaWidget from '../../components/SettingsWidget/textAreaWidget';
import SelectWidget from '../../components/SettingsWidget/selectWidget';
import InputNumberWidget from '../../components/SettingsWidget/inputNumberWidget';
import ImageDropWidget from '../../components/SettingsWidget/imageDropWidget';
import ToggleButtonWidget from '../../components/SettingsWidget/toggleButtonWidget';

function CommunitySetUp(props) {

  let postData = {
    "whoCanNominate": { "admin": true, "modifiers": true, "members": true },
    "whoCanBeNominated": { "admin": true, "modifiers": true, "members": true },
    "whoCanVote": { "admin": true, "modifiers": true, "members": true },
    "votingPeriodFrequency": "days",
    "votingPeriodValue": "1",
    "votingType": "binary",
    "name": undefined,
    "logo": undefined,
    "bio": undefined
  };

  async function postDataEvt(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  }

  const postForm = () => { 
    // postDataEvt('https://3355z6o2ll.execute-api.us-east-1.amazonaws.com/ethdenver-hackathon-discord/create-profile', 
    // JSON.stringify(postData))
    //   .then(data => {
    //     console.log(data);
    //   }).catch(err => {
    //     console.log(err);
    //   })
    props.openModalEvt(false);
  }

  const formUpdate = (evt) => {
    
    if(
      evt.dataKey === "whoCanNominate" ||
      evt.dataKey === "whoCanBeNominated" ||
      evt.dataKey === "whoCanVote" 
    ) {

      postData[evt.dataKey][evt.dataValue] = !postData[evt.dataKey][evt.dataValue];

    } else {

      postData[evt.dataKey] = evt.dataValue;

    }

    console.log(postData);

  }

  return (
    <div className='community-setup-wrapper'>
        <div className='title-bar'>
          <div>
          <h1>Community Setup</h1>
          <p>Connect your community's discord and set up how Badges get awarded.</p>
          </div>
          <div>
            <button className="submit-button" onClick={postForm}>
              { props.loading && <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div> }
              { !props.loading && 'Create' }
            </button>
          </div>
        </div>
        <div className='settings-panel-wrapper'>
          <SettingsPanel title="Rights" colour="purple">
            <SettingsWidget title="Who Can Nominate" description="Set up who within your community gets to nominate people for a Badge">

              <ToggleButtonWidget dataKey="whoCanNominate" update={e => formUpdate(e)} text="admin" />
              <ToggleButtonWidget dataKey="whoCanNominate" update={e => formUpdate(e)} text="modifiers" />
              <ToggleButtonWidget dataKey="whoCanNominate" update={e => formUpdate(e)} text="members" />

            </SettingsWidget>
            <SettingsWidget title="Who Can Be Nominated" description="Set up who within your community gets to be nominated to receive a Badge">

              <ToggleButtonWidget dataKey="whoCanBeNominated" update={formUpdate} text="admin" />
              <ToggleButtonWidget dataKey="whoCanBeNominated" update={formUpdate} text="modifiers" />
              <ToggleButtonWidget dataKey="whoCanBeNominated" update={formUpdate} text="members" />

            </SettingsWidget>
            <SettingsWidget title="Who Can Vote" description="Set up who within your community gets to vote for nominated members">

              <ToggleButtonWidget dataKey="whoCanVote" update={formUpdate} text="admin" />
              <ToggleButtonWidget dataKey="whoCanVote" update={formUpdate} text="modifiers" />
              <ToggleButtonWidget dataKey="whoCanVote" update={formUpdate} text="members" />

            </SettingsWidget>
          </SettingsPanel>

          <SettingsPanel title="Voting Mechanics" colour="orange">

            <SettingsWidget title="Voting Period" description="Set up who within your community gets to nominate people for a Badge">
              <div className='flex-wrap'>
                <InputNumberWidget dataKey="votingPeriodValue" update={formUpdate} />
                <SelectWidget dataKey="votingPeriodFrequency" update={formUpdate} options={['days', 'weeks', 'months']} />
              </div>
            </SettingsWidget>
            
            <SettingsWidget title="Voting Type" description="Set up who within your community gets to nominate people for a Badge">
                <SelectWidget dataKey="votingType" update={formUpdate} options={['binary']} />
            </SettingsWidget>

          </SettingsPanel>
          <SettingsPanel title="Community Profile" colour="green">

            <SettingsWidget title="Community Name" description="Set up who within your community gets to nominate people for a Badge">
                <InputWidget dataKey="name" update={formUpdate} />
            </SettingsWidget>
            <SettingsWidget title="Community Logo" description="Set up who within your community gets to nominate people for a Badge">
                <ImageDropWidget dataKey="logo" update={formUpdate}/>
            </SettingsWidget>
            <SettingsWidget title="Community Bio" description="Set up who within your community gets to nominate people for a Badge">
                <TextAreaWidget dataKey="bio" update={formUpdate} />
            </SettingsWidget>

          </SettingsPanel>
        </div>
    </div>
  );
}

export default CommunitySetUp;
