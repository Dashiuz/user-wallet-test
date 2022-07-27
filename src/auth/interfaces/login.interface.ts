import { Users } from "../../users/interfaces/users.interface";

export interface Login extends Users {  
  user: Users;
  token: string;
}
