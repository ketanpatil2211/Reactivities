
import ActivityStore from "./activityStore";
import UserStore  from "./userStore";
import CommonStore from "./commomStore";
import { createContext } from "react";
import { configure } from "mobx";

import { ModalProps } from "semantic-ui-react";
import ModalStore from "./modalStore";

configure({ enforceActions: "always" });

export class RootStore 
{
   activityStore :ActivityStore;
   userStore :UserStore;
   commonStore:CommonStore;
   modalStore:ModalProps;
   
constructor()
{
     this.activityStore =new ActivityStore(this);
     this.userStore =new UserStore(this);
     this.commonStore =new CommonStore(this);
     this.modalStore =new ModalStore(this);
}
}
export const RootStoreContext = createContext(new RootStore());

