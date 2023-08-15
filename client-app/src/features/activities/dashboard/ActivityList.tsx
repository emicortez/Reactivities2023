import { Button, Item, Label, Segment } from "semantic-ui-react";
import { SyntheticEvent, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const ActivityList = () => {
  const {activityStore} = useStore();
  const {deleteActivity, loading, activitiesByDate} = activityStore;
  const [target, setTarget] = useState('');

  const handleActivityDelete = (e: SyntheticEvent<HTMLButtonElement>, id:string ) => {
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  }

    return (
      <Segment>
        <Item.Group divided>
          {activitiesByDate.map((activity) => (
            <Item key={activity.id}>
              <Item.Content>
                <Item.Header as={"a"}>{activity.title}</Item.Header>
                <Item.Meta>{activity.date}</Item.Meta>
                <Item.Description>
                  <div>{activity.description}</div>
                  <div>
                    {activity.city}, {activity.venue}
                  </div>
                </Item.Description>
                <Item.Extra>
                  <Button
                    floated="right"
                    content="View"
                    color="blue"
                    as={Link} to={`/activities/${activity.id}`}
                  />
                  <Button
                    floated="right"
                    content="Delete"
                    color="red"
                    name={activity.id}
                    loading={loading && target === activity.id}
                    onClick={(e) => handleActivityDelete(e, activity.id)}
                  />
                  <Label basic content={activity.category} />
                </Item.Extra>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </Segment>
    );
}

export default observer(ActivityList);