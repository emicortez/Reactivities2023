import { Button, Container, Menu, Image, Dropdown } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Link, NavLink } from 'react-router-dom';
import { useStore } from '../stores/store';

const NavBar = () => {
    const {userStore: {user, logout}} = useStore();
    return(
        <Menu inverted fixed='top' >
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight:10}} />
                    Reactivities
                </Menu.Item>
                <Menu.Item as={NavLink} to='/activities'  name='Activities' />
                <Menu.Item>
                    <Button positive content='Create Activity' as={NavLink} to='/createActivity'  />
                </Menu.Item>
                <Menu.Item position='right'>
                    <Image avatar spaced='right' src={user?.image || '/assets/user.png'} />
                    <Dropdown pointing='top left' text={user?.displayName}>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/profiles/${user?.username}`} text='My Profile' icon='user' />
                            <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
    )
}

export default observer(NavBar);