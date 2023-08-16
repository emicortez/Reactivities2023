import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
// import { format } from "date-fns";

interface Props {
    activity: Activity
}

const ActivityListItem = ({ activity }: Props) => {
  
 return ( <Segment.Group>
  <Segment>
    <Item.Group>
      <Item>
        <Item.Image size="tiny" circular src={"/assets/user.png"} style={{marginBottom:3}}/>
        <Item.Content>
          <Item.Header as={Link} to={`/activities/${activity.id}`}>
            {activity.title}
          </Item.Header>
          <Item.Description>Hosted by Bob</Item.Description>
          {/* {activity.isHost && (
            <Item.Description>
              <Label
                basic
                color="orange"
                content="Your hosting this activity"
              />
            </Item.Description>
          )}
          {activity.isGoing && !activity.isHost && (
            <Item.Description>
              <Label
                basic
                color="green"
                content="Your are going to this activity"
              />
            </Item.Description>
          )} */}
        </Item.Content>
      </Item>
    </Item.Group>
  </Segment>
  <Segment>
    <Icon name="clock" /> {activity.date}
    <Icon name="marker" /> {activity.venue}, {activity.city}
  </Segment>
  {/* <Segment secondary>
    <ActivityListItemAttendees attendees={activity.attendees} />
  </Segment> */}
  <Segment clearing>
    <span>{activity.description}</span>
    <Button
      as={Link}
      to={`/activities/${activity.id}`}
      floated="right"
      content="View"
      color="blue"
    />
  </Segment>
</Segment.Group>)   
}

export default ActivityListItem;