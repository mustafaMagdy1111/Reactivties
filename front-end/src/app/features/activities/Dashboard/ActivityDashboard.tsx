import React from 'react'
import {Grid, List} from 'semantic-ui-react'
import {IActivity} from './../../../models/activity';
import {ActivityList} from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import {ActivityForm} from './../../form/ActivityForm';

interface Iprops
{
    activities : IActivity[];
    selectActivity : (id : string) => void;
    selectedActivity : IActivity;
}

export const ActivityDashboard : React.FC < Iprops > = ({activities, selectActivity, selectedActivity}) => {
    return (
        <Grid>

            <Grid.Column width={10}>
                <ActivityList activities={activities} selectActivity={selectActivity}/>
                <ActivityForm/>

            </Grid.Column>

            
             <Grid.Column width={6}>
            { 
                <ActivityDetails     activity={selectedActivity}/> }
                <ActivityForm/>

            </Grid.Column> 

        </Grid>
    )
}
