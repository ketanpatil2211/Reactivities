import axios, { AxiosResponse } from "axios";

import { history} from '../..';
import { IActivity } from "../models/activity";
import { IUser, IUserFormValues } from "../models/user";

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.request.use((config)=> {
const token=window.localStorage.getItem('jwt');
if(token)
 {
   config.headers.Authorization=`Bearer ${token}`;
 }
 return config;
},error=>{
  return Promise.reject(error);
})

axios.interceptors.response.use(undefined,error =>{
  console.log(error); //not showing anything on console
  // if(error)
  // {
  //     console.log(error.response.status)
  //     history.push('/notfound');
  // }
  throw error.response;

})
const responseBody = (response: AxiosResponse) => response.data; //not clear

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => resolve(response), ms)
  ); //not clear
const requests = {
  get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
  post: (url: string, body: {}) =>
      axios.post(url, body).then(sleep(1000)).then(responseBody),
  put: (url: string, body: {}) =>
    axios.put(url, body).then(sleep(1000)).then(responseBody),
  del: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody),
};

const Activities = {
  list: (): Promise<IActivity[]> => requests.get("/activities"),
  details: (id: string) => requests.get(`/activities/${id}`),
  create: (activity: IActivity) => requests.post("/activities", activity),
  update: (activity: IActivity) =>
    requests.put(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.del(`/activities/${id}`),
  attend:(id:string)=>requests.post(`/activities/${id}/attend`,{}),
  unattend:(id:string)=>requests.del(`/activities/${id}/unattend`)

};
const User ={
 current :():Promise<IUser> =>requests.get('/user'),
 login:(user:IUserFormValues):Promise<IUser>=>requests.post(`/user/login`,user),
 register:(user:IUserFormValues):Promise<IUser>=>requests.post(`/user/register`,user),

}
export default { Activities,User };
