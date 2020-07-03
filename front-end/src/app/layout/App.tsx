import React, {useState, useEffect, Fragment, SyntheticEvent, useContext} from 'react';
import {List, Container} from 'semantic-ui-react';
import '../layout/styles.css';
import axios from 'axios';
import {IActivity} from './../models/activity';
import ActivityDashboard from '../features/activities/Dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import ActivityStore from '../api/stores/ActivityStore';
import {observer} from 'mobx-react-lite'
import NavBar from '../features/nav/NavBar';

const App = () => {
    const activityStore = useContext(ActivityStore)

    useEffect(() => {
        activityStore.loadActivities();
    }, [activityStore]);

    if (activityStore.loadingIntiial) 
        return <LoadingComponent content='Loading activities'/>

    return (
        <Fragment>
            <NavBar/>
            <Container style={{
                marginTop: '7em'
            }}>
                <ActivityDashboard/>
            </Container>
        </Fragment>
    );
};

export default observer(App);
