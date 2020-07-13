import React, {SyntheticEvent, useContext, useEffect} from 'react'
import {Grid} from 'semantic-ui-react'
import ActivityList from './ActivityList';
import {observer} from 'mobx-react-lite'
import ActivityStore from '../../../api/stores/ActivityStore';
import LoadingComponent from '../../../layout/LoadingComponent';

const ActivityDashboard : React.FC = () => {
    const activityStore = useContext(ActivityStore)

    useEffect(() => {
        activityStore.loadActivities();
    }, [activityStore]);

    if (activityStore.loadingIntiial) 
        return <LoadingComponent content='Loading activities'/>

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList/>
            </Grid.Column>
            <Grid.Column width={6}>
                <h2>actiivty filters</h2>
            </Grid.Column>
        </Grid>
    );
};

export default observer(ActivityDashboard);
