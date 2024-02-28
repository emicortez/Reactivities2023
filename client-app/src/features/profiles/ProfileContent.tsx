import { observer } from 'mobx-react-lite';
import { Tab } from 'semantic-ui-react';
import { Profile } from '../../app/models/profile';
import { useStore } from '../../app/stores/store';
// import ProfileActivities from './ProfileActivities';
 import ProfilePhotos from './ProfilePhotos';
import ProfileAbout from './ProfileAbout';
import ProfileFollowings from './ProfileFollowings';

interface Props {
    profile: Profile
}

const ProfileContent = ({ profile }: Props) => {
     const {profileStore} = useStore();

    const panes = [
        { menuItem: 'About', render: () => < ProfileAbout profile={profile} />}, //<ProfileAbout />
        { menuItem: 'Photos', render: () => <ProfilePhotos profile={profile} /> },
        { menuItem: 'Events', render: () => <Tab.Pane>About content</Tab.Pane>  }, //<ProfileActivities />
        { menuItem: 'Followers', render: () => <ProfileFollowings /> },  
        { menuItem: 'Following', render: () => <ProfileFollowings />  }, 
    ];

    return (
        <Tab
            menu={{ fluid: true, vertical: true }}
            menuPosition='right'
            panes={panes}
           onTabChange={(e, data) => profileStore.setActiveTab(data.activeIndex)}
        />
        
    )
}

export default observer(ProfileContent);