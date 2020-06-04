import React, {useState, useEffect, Fragment} from 'react';
import {List, Container} from 'semantic-ui-react';
import '../layout/styles.css';
import axios from 'axios';
import {IActivity} from './../models/activity';
import {NavBar} from './../features/nav/NavBar';
import {ActivityDashboard} from '../features/activities/Dashboard/ActivityDashboard';

const App = () => {
    const [activities,
        SetActivities] = useState < IActivity[] > ([]);

    const [SelectedActivity,
        setSelectedActivity] = useState < IActivity | null > (null);

    const handleSelectActivity = (id : string) => {
        debugger
        setSelectedActivity(activities.filter(a => a.id == id)[0])
    }

    useEffect(() => {
        axios.get < IActivity[] > ('http://localhost:5000/api/Activities').then(response => {
            SetActivities(response.data)
        });
    }, []);

    return (
        <Fragment>
            <NavBar/>

            <Container style={{
                marginTop: '7em'
            }}>
                <ActivityDashboard
                    activities={activities}
                    selectActivity={handleSelectActivity}
                    selectedActivity={SelectedActivity!}
                    
                    />
            </Container>

        </Fragment>
    );
};

export default App;
