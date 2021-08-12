import { createContext, useReducer } from "react";
import {
  eTestActionType,
  initialStateTests,
  ITests,
  ITestsActionType,
  IUser
} from "../../models/ITests";
import { ReducerTest } from "./ReducerTest";
import { TestService } from "../../services/TestService";

interface defaultValue {
  state: ITests;
  TestDispatch: (action: ITestsActionType) => void;
}

const TestContext = createContext<defaultValue>({
  state: initialStateTests,
  TestDispatch: () => { }
});

function TestProvider(props: any) {
  const [state, dispatch] = useReducer(ReducerTest, initialStateTests);
  const Dispatch = async (action: ITestsActionType) => {
    switch (action.type) {
      case eTestActionType.RetrieveUsers:
        const result: IUser[] = await TestService.getAll();
        dispatch({ type: eTestActionType.RetrieveUsersSuccess, users: result });
        break;
      case eTestActionType.InsertUser:
        if (action.user) {
          const result: any = await TestService.insert(action.user);
          dispatch({ type: eTestActionType.InsertUserSuccess, users: result });
        }
        break;
      case eTestActionType.UpdateUser:
        if (action.user) {
          const result: IUser[] = await TestService.update(action.user);
          dispatch({ type: eTestActionType.UpdateUserSuccess, users: result });
        }
        break;
      case eTestActionType.DeleteUser:
        if (action.user) {
          const result: IUser[] = await TestService.delete(action.user);
          dispatch({ type: eTestActionType.DeleteUserSuccess, users: result });
        }
        break
      default:
        dispatch(action);
        break;
    }
  };

  return (
    <TestContext.Provider value={{ state, TestDispatch: Dispatch }}>
      {props.children}
    </TestContext.Provider>
  );
}
export { TestContext, TestProvider };
