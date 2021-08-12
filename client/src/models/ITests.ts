export type ITests = {
  Users: IUser[],
  userSelected: IUser
}

export type IUser = {
  id: number;
  name: string;
  email: string;
  password: string
}

export const initialStateTests: ITests = {
  Users: [],
  userSelected: {} as IUser
};

export enum eTestActionType {
  RetrieveUsers = "RetrieveUsers",
  RetrieveUsersSuccess = "RetrieveUsersSuccess",
  InsertUser = "InsertUser",
  InsertUserSuccess = "InsertUserSuccess",
  UpdateUser = "UpdateUser",
  UpdateUserSuccess = "UpdateUserSuccess",
  DeleteUser = "DeleteUser",
  DeleteUserSuccess = "DeleteUserSuccess",
  setUserSelected = "setUserSelected"
}

export type ITestsActionType = {
  type: eTestActionType;
  users?: IUser[];
  user?: IUser
};
