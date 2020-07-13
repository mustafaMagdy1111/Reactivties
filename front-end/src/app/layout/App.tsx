import React, {useState, useEffect, Fragment, SyntheticEvent, useContext} from 'react';
import {List, Container} from 'semantic-ui-react';
import '../layout/styles.css';
import axios from 'axios';
import ActivityDashboard from '../features/activities/Dashboard/ActivityDashboard';
import {observer} from 'mobx-react-lite'
import NavBar from '../features/nav/NavBar';
import {Route, withRouter, RouteComponentProps} from 'react-router-dom';
import {HomePage} from './../features/home/HomePage';
import ActivityForm from '../features/form/ActivityForm';
import ActivityDetails from '../features/activities/details/ActivityDetails';

const App : React.FC < RouteComponentProps > = ({location}) => {
    // const activityStore = useContext(ActivityStore)

    // useEffect(() => {
    //     activityStore.loadActivities();
    // }, [activityStore]);

    // if (activityStore.loadingIntiial) 
    //     return <LoadingComponent content='Loading activities'/>

    return (
        <Fragment>
            <Route exact path='/' component={HomePage}/>
            <Route
                path={'/(.+)'} render = {
                () => (
                    <Fragment>
                        <NavBar/>
                        <Container
                            style={{
                            marginTop: '7em'
                        }}>
                            <Route exact path='/activities' component={ActivityDashboard}/>
                            <Route path='/activities/:id' component={ActivityDetails}/>
                            <Route
                                key={location.key}
                                path={['/createActivity', '/manage/:id']}
                                component={ActivityForm}/>
                        </Container>
                    </Fragment>
                )
            } /> </Fragment>);}
                export
                default
                withRouter(observer(App));;