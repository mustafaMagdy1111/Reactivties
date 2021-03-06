import React, {useContext} from 'react'
import {Item, Button, Segment, Label, SegmentGroup, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import ActivityStore from '../../../api/stores/ActivityStore';
import {IActivity} from './../../../models/activity';

export const ActivityListItem : React.FC < {
    activity: IActivity
} > = ({activity}) => {
    const activityStore = useContext(ActivityStore);
    return (

    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size='tiny' circular src='./assests/user.png' />
            <Item.Content>
              <Item.Header as='a'>{activity.title}</Item.Header>
              <Item.Description>Hosted by Bobggggggggggg</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name='clock' /> {activity.date}
        <Icon name='marker' /> {activity.venue}, {activity.city}
      </Segment>
      <Segment secondary>Attendees will go here</Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          as={Link}
          to={`/activities/${activity.id}`}
          floated='right'
          content='View'
          color='blue'
        />
      </Segment>
    </Segment.Group>
  );
};

export default ActivityListItem;
