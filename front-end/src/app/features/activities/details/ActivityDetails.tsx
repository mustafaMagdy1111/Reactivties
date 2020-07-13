import React, {useContext, useEffect} from 'react';
import {Card, Button} from 'semantic-ui-react';
import ActivityStore from '../../../api/stores/ActivityStore';
import {observer} from 'mobx-react-lite';
import {RouteComponentProps, Link} from 'react-router-dom';
import LoadingComponent from './../../../layout/LoadingComponent';

interface DetailParam {
    id : string
}

const ActivityDetails : React.FC < RouteComponentProps < DetailParam >> = ({match, history}) => {
    const activityStore = useContext(ActivityStore);
    const {selectedActivity: activity, loadActivity, loadingIntiial} = activityStore;

    useEffect(() => {
        loadActivity(match.params.id)
    }, [loadActivity, match.params.id])

    if (loadingIntiial || !activity) 
        return <LoadingComponent content='loading Activity....'/>

    return (
        <Card fluid>
            {/* <Image src={`.//categoryImages/${activity.category}.jpg`} wrapped ui={false} /> */}
            <Card.Content>
                <Card.Header>{activity !.title}</Card.Header>
                <Card.Meta>
                    <span>{activity !.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity !.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button
                        as
                        ={Link}
                        to={`/manage/${activity.id}`}
                        basic
                        color='blue'
                        content='Edit'/>
                    <Button onClick={() => history.goBack()} basic color='grey' content='Cancel'/>
                </Button.Group>
            </Card.Content>
        </Card>
    );
};

export default observer(ActivityDetails);
