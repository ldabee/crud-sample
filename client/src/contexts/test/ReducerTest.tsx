/* eslint:"no-lone-blocks" */
import _ from "lodash";
import {
  initialStateTests,
  ITests,
  ITestsActionType,
  eTestActionType
} from "../../models/ITests";

export function ReducerTest(state: ITests = initialStateTests, action: ITestsActionType): ITests {
  const newState: ITests = _.clone(state);
  switch (action.type) {
    case eTestActionType.RetrieveUsersSuccess:
      if (action.users) newState.Users = action.users;
      break;
    case eTestActionType.InsertUserSuccess:
      if (action.users) newState.Users = action.users;
      break;
    case eTestActionType.UpdateUserSuccess:
      if (action.users) newState.Users = action.users;
      break;
    case eTestActionType.DeleteUserSuccess:
      if (action.users) newState.Users = action.users;
      break;
    case eTestActionType.setUserSelected:
      if (action.user) newState.userSelected = action.user;
      break;
  }
  return newState;
}