import { Button, Header, Segment } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ActivityFormValues } from "../../../app/models/activity";
import * as Yup from 'yup';
import { v4 as uuid } from 'uuid';
import { Formik, Form } from "formik";
import CustomTextInput from "../../../app/common/form/CustomTextInput";
import CustomTextArea from "../../../app/common/form/CustomTextArea";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import CustomSelectInput from "../../../app/common/form/CustomSelectInput";
import CustomDateInput from "../../../app/common/form/CustomDateInput";

const ActivityForm = () => {

  const {activityStore} = useStore();
  const {createActivity, updateActivity
  , loadActivity} = activityStore;

  const {id} = useParams();

  const [activity, setActivity] = useState<ActivityFormValues>(
    new ActivityFormValues()
  );

    const validationSchema = Yup.object({
      title: Yup.string().required('The event title is required'),
      category: Yup.string().required('The event category is required'),
      description: Yup.string().required('the event description is required'),
      date: Yup.string().required('Date is required').nullable(),
      venue: Yup.string().required(),
      city: Yup.string().required(),
  })
    
    const navigate = useNavigate();

    useEffect(() => {
      if (id) loadActivity(id).then(activity => setActivity(new ActivityFormValues(activity)))
  }, [id, loadActivity])

    const handleSubmit = (activity:ActivityFormValues) => {
      if (!activity.id) {
        let newActivity = {
          ...activity,
          id: uuid(),
        };
        createActivity(newActivity).then(() =>
          navigate(`/activities/${newActivity.id}`)
        );
      } else {
        updateActivity(activity).then(() =>
          navigate(`/activities/${activity.id}`)
        );
      }
    }

    return (
      <Segment clearing>
        <Header content="Activity Details" sub color="teal" />
        <Formik
          enableReinitialize
          validationSchema={validationSchema}
          initialValues={activity}
          onSubmit={(values) => handleSubmit(values)}
        >
         {({ handleSubmit, isValid, isSubmitting, dirty }) => (
            <Form
              onSubmit={handleSubmit}
              autoComplete="off"
              className="ui form"
            >
              <CustomTextInput placeholder="Title" name="title" />
              <CustomTextArea
                placeholder="Description"
                name="description"
                rows={3}
              />
              <CustomSelectInput
                options={categoryOptions}
                name="category"
                placeholder="Category"
              />
              <CustomDateInput
                name="date"
                placeholderText="Date"
                showTimeSelect
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
              />

              <Header content="Location Details" sub color="teal" />
              <CustomTextInput placeholder="City" name="city" />
              <CustomTextInput placeholder="Venue" name="venue" />
              <Button 
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={isSubmitting} 
                            floated='right' 
                            positive 
                            type='submit' 
                            content='Submit' />
              <Button
                as={Link}
                to="/activities"
                floated="right"
                type="button"
                content="Cancel"
              />
            </Form>
          )}
        </Formik>
      </Segment>
    );
}

export default observer( ActivityForm);