import React from 'react'
import {Menu, Container, Button} from 'semantic-ui-react'

export const NavBar = () => {
    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item header>
                    <img src="/assests/logo.png" alt=""  style={{marginRight:'10'}} />
                </Menu.Item>
                <Menu.Item name='Activities'/>
                <Menu.Item name='friends'>
                    <Button  positive content='Create Activitiy' />  
                </Menu.Item>
            </Container>

        </Menu>
    )
}
