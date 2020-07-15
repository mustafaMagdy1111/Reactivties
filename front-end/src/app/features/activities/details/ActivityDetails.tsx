import React, {useContext, useEffect} from 'react';
import {Card, Button, Grid, GridColumn} from 'semantic-ui-react';
import ActivityStore from '../../../api/stores/ActivityStore';
import {observer} from 'mobx-react-lite';
import {RouteComponentProps, Link} from 'react-router-dom';
import LoadingComponent from './../../../layout/LoadingComponent';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedSidebar from './ActivityDetailedSidebar';
import ActivityDetailedHeader from './ActivityDetailedHeader';

interface DetailParams {
    id: string;
  }
  
  const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({
    match
  }) => {
    const activityStore = useContext(ActivityStore);
    const { selectedActivity, loadActivity, loadingIntiial } = activityStore;
  
    useEffect(() => {
      loadActivity(match.params.id);
    }, [loadActivity, match.params.id]);
  
    if (loadingIntiial || !selectedActivity)
      return <LoadingComponent content='Loading activity...' />;
  
    return (
      <Grid>
        <Grid.Column width={10}>
          <ActivityDetailedHeader activity={selectedActivity} />
          <ActivityDetailedInfo activity={selectedActivity} />
          <ActivityDetailedChat />
        </Grid.Column>
        <Grid.Column width={6}>
          <ActivityDetailedSidebar />
        </Grid.Column>
      </Grid>
    );
  };
  
  export default observer(ActivityDetails);
  