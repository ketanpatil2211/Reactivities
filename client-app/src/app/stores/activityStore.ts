import { observable, action, runInAction, computed } from "mobx";
import { SyntheticEvent } from "react";
import agent from "../api/agent";
import { IActivity } from "../models/activity";
import { history} from '../..';
import { RootStore } from "./rootStore";
import { setActivityProps,createAttendee } from "../utils/util";


export default class ActivityStore {

   rootStore :RootStore;
   constructor(rootStore:RootStore)
   {
     this.rootStore =rootStore;
   }

  @observable activityRegistry = new Map();
  @observable activity: IActivity | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = "";
  @observable loading=false;

  @computed get activitiesByDate() {
    return this.groupActivitiesByDate(
      Array.from(this.activityRegistry.values())
    );
  }

  groupActivitiesByDate(activities: IActivity[]) {
    const sortedActivities = activities.sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
    return Object.entries(
      sortedActivities.reduce((activities, activity) => {
        const date = activity.date.split("T")[0];
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity];
        return activities;
      }, {} as { [key: string]: IActivity[] })
    );
  }

  @action
  loadActivities = async () => {
    this.loadingInitial = true;
    try {
      const activities = await agent.Activities.list();
      runInAction(() => {
        activities.forEach((activity) => {
          activity.date = activity.date.split(".")[0];
          setActivityProps(activity,this.rootStore.userStore.user!);
          this.activityRegistry.set(activity.id, activity);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction(() => {
        
        this.loadingInitial = false;
      });
    }
  };

  @action loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.activity = activity; 
      return activity;
    } else {
      this.loadingInitial = true;
      try {
        activity = await agent.Activities.details(id);
        console.log("in the load act "+activity.title);
        runInAction(() => {
          setActivityProps(activity,this.rootStore.userStore.user!);
          this.activity = activity;
          this.activityRegistry.set(activity.id,activity);
          this.loadingInitial = false;
        });
        return activity;
      } catch (error) {
        runInAction(() => {
          this.loadingInitial = false;
        })
        console.log(error)
      }
    }
  };

  @action clearActivity = () => {
    this.activity = null;
  };
  getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };
  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    
    try {
      console.log("In the create Activity"+activity.id);
      await agent.Activities.create(activity);
      runInAction(() => {
        const attendee=createAttendee(this.rootStore.userStore.user!);
        attendee.isHost=true;
       let attendees=[];
        attendees.push(attendee);
       activity.attendees=attendees;
        activity.isHost=true;
        activity.isGoing=true;
        this.activityRegistry.set(activity.id, activity);
        this.submitting = false;
      });
      history.push(`/activities/${activity.id}`);
    } catch (error) {
      runInAction(() => {
        console.log("from create activity "+error);
        this.submitting = false;
      });
    }
  };

  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.activity = activity;
        this.submitting = false;
      });
      history.push(`/activities/${activity.id}`);
    } catch (error) {
      runInAction(()=>{
        this.submitting = false;
      })
      
      console.log(error);
    }
  };

  @action deleteActivity = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Activities.delete(id);
      runInAction(() => {
        this.activityRegistry.delete(id);
        this.submitting = false;
        this.target = "";
      });
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
        this.target = "";
        console.log(error);
      });
    }
  };

@action attendActivity =async ()=>{
  const attendee =createAttendee(this.rootStore.userStore.user!);  
  this.loading=true;
   try
  {
    await agent.Activities.attend(this.activity!.id!);
    runInAction(()=>{
      if(this.activity)
      {
         this.activity.attendees.push(attendee);
        this.activity.isGoing=true;
        this.activityRegistry.set(this.activity.id,this.activity);
      this.loading=false;
      }
    })
  }
  catch(error)
  {
    runInAction(()=>{
      this.loading=false;
    })
    console.log(error); //use tost here
  }
   
}
@action cancelAttendance =async ()=>{
  this.loading=true;
  try
  {
    await agent.Activities.unattend(this.activity!.id!);
   runInAction(()=>{  
    if(this.activity)
    {
      this.activity.attendees = this.activity.attendees.filter(
        a => a.username !== this.rootStore.userStore.user!.username
      );
      this.activity.isGoing=false;
      this.activityRegistry.set(this.activity.id,this.activity);
      this.loading=false;
    }

   })
   
  }
  catch(error)
  {
    this.loading=false;
    console.log(error);
  }
  
  
 
}
}


