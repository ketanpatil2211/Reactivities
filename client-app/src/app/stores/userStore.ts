import { action, computed, observable, runInAction } from "mobx";
import agent from "../api/agent";
import { IUser, IUserFormValues } from "../models/user";
import { RootStore } from "./rootStore";
import { history} from '../..';
export default class UserStore {

    rootStore :RootStore;
    constructor(rootStore:RootStore)
    {
      this.rootStore =rootStore;
    }
    
  @observable user :IUser | null=null;

  @computed get isLoggedIn() 
  { 
    return !!this.user;
  }
 @action login = async(values :IUserFormValues)=>{
  try 
  {
      const user =await agent.User.login(values);
      runInAction(()=>{
        this.user = user; // modification to the state come here otherwise it will consider it as a expression in the then chain after async
      })
      this.rootStore.commonStore.SetToken(user.token);
      this.rootStore.modalStore.closeModal();
      history.push('/activities');
  }
  catch(error)
  {
    throw error;
  }
}
@action register=async(values:IUserFormValues) =>{
  try 
  {
      const user =await agent.User.register(values);
      runInAction(()=>{
        this.user = user; // modification to the state come here otherwise it will consider it as a expression in the then chain after async
      })
      this.rootStore.commonStore.SetToken(user.token);
      this.rootStore.modalStore.closeModal();
      history.push('/activities');
  }
  catch(error)
  {
    throw error;
  }

}

@action getUser = async ()=>{
  try {
   const user =await agent.User.current();
   runInAction(()=>{
     this.user=user;
   })
  }
  catch(error){
    console.log(error);
  }
}
@action logout =()=>{
  this.rootStore.commonStore.SetToken(null);
  this.user=null;
  history.push('/');
 }
}