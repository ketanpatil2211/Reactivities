import React, {  useState, useContext, useEffect} from "react";
import { Button, Form, Grid, GridColumn, Segment } from "semantic-ui-react";
import {  IActivity } from "../../../../app/models/activity";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import {Form as FinalForm,Field } from 'react-final-form';
import  TextInput  from "../../../../app/common/form/TextInput";
import  TextArea   from '../../../../app/common/form/TextArea';
import { SelectInput } from "../../../../app/common/form/SelectInput";
import { category } from "../../../../app/common/options/Category";

import { RootStoreContext } from "../../../../app/stores/rootStore";


interface DetailParams {
  id: string;
}
const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    createActivity,
    editActivity,
    submitting,
    loadActivity
  } = rootStore.activityStore;

  const [activity, setActivity] = useState<IActivity>({
    id: "",
    title: "",
    description: "",
    date: "",
    category: "",
    venue: "",
    city: "",
    attendees:undefined!,
    isGoing:false,
    isHost:false
  });

  const [loading,setLoading]=useState(false);
  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadActivity(match.params.id).then((activity) => {
          setActivity(activity);
      }).finally(()=>setLoading(false));
    }
  }, [
    loadActivity,
    match.params.id
  ]);
  

 
 const handleFinalFormSubmit=(values:any)=>{
   console.log(values);
   const {...activity } = values;
     if (!activity.id) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity).then(() => {
        history.push(`/activities/${newActivity.id}`);
      });
    } else {
      editActivity(activity).then(() =>
        history.push(`/activities/${activity.id}`)
      );
    }
  }
 
  
  return (
    <Grid>
      <GridColumn width={10}>
        <Segment clearing>
         <FinalForm 
         initialValues={activity}
         onSubmit={handleFinalFormSubmit} 
         render={({handleSubmit})=>(
          <Form onSubmit={handleSubmit} loading={loading}>
          <Field
            name="title"
            placeholder="Title"
            value={activity.title}
            component={TextInput}
          />
          <Field
            name="description"
            placeholder="Description"
            value={activity.description}
            component={TextArea}
            rows={3}
          />
          <Field
            component={SelectInput}
            options={category}
            name="category"
            placeholder="Category"
            value={activity.category}
          />
          {/* <Field
            component={DateInput}
            name="date"
            placeholder="Date"
            value={activity.date}
          /> */}
          <Field
            component={TextInput}
            name="city"
            placeholder="City"
            value={activity.city}
          />
          <Field
            component={TextInput}
            name="venue"
            placeholder="Venue"
            value={activity.venue}
          />          
          <Button
            floated="right"
            positive
            content="Submit"
            type="submit"
            loading={submitting}
            disabled={loading}
          />
          <Button
            floated="right"
            content="Cancel"
            type="button"
            onClick={activity.id? ()=>history.push(`/activities/${activity.id}`):()=>history.push('/activities')}
            disabled={loading}
          />
        </Form>

         )} 
         >
         </FinalForm>
         
         
        </Segment>
      </GridColumn>
    </Grid>
  );
};
export default observer(ActivityForm);
