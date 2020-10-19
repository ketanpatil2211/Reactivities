import { action, observable, reaction } from "mobx";
import { RootStore } from "./rootStore";

export default class CommonStore {
    rootStore :RootStore;
    constructor(rootStore:RootStore)
    {
      this.rootStore =rootStore;
      reaction(
        ()=>this.token,
        token =>{
           if(token){
              window.localStorage.setItem('jwt',token);
           }
           else{
            window.localStorage.removeItem('jwt');
           }
        }
      )
    }
 @observable token: string | null=localStorage.getItem('jwt');
 @observable appLoaded=false;

 @action SetToken = (token:string | null)=>{
     this.token=token;
 }
 @action setAppLoaded =() =>{
  this.appLoaded=true;
 }
}