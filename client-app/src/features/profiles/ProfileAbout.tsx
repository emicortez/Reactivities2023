import { observer } from "mobx-react-lite";
import { Button, Grid, Header, Tab } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { useState } from "react";
import { Profile } from "../../app/models/profile";
import ProfileEditForm from "./ProfileEditForm";

interface Props {
    profile: Profile
}

const ProfileAbout = ({ profile }: Props) => {
    const { profileStore: { isCurrentUser } } = useStore();
    const [updateProfileMode, setUpdateProfileMode] = useState(false);
    return (
        <Tab.Pane>
        <Grid>
            <Grid.Column width='16'>
                <Header floated='left' icon='image' content='About' />
                {isCurrentUser && (
                    <Button floated='right' basic content={updateProfileMode ? 'Cancel' : 'Update About'} onClick={() => setUpdateProfileMode(!updateProfileMode)} />
                )}
            </Grid.Column>
            <Grid.Column width='16'>
                {updateProfileMode ? (
                    <ProfileEditForm setEditMode={setUpdateProfileMode} />
                ) : (
                    <span style={{ whiteSpace: 'pre-wrap' }}>{profile?.bio}</span>
                )}
            </Grid.Column>
        </Grid>
    </Tab.Pane>
    );

}

export default observer(ProfileAbout);