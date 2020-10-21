export interface IActivity {
  id?: string;
  title: string;
  category: string;
  description: string;
  date: string;
  city: string;
  venue: string;
  isGoing:boolean;
  isHost:boolean;//these both properties are for the currently logged in user
  attendees :IAttendee[];
}

// export interface IActivityFormValues extends Partial<IActivity> {
//   time?: Date;
// }

// export class ActivityFormValues implements IActivityFormValues {
//   id?: string = undefined;
//   title: string = '';
//   category: string = '';
//   description: string = '';
//   date: string = '';
//   city: string = '';
//   venue: string = '';

//   constructor(init?: IActivityFormValues) {
       
//       Object.assign(this, init);
//   }
// }

export interface IAttendee {
username:string;
displayName:string;
image:string;
isHost:boolean;
}