import MaterialTable from "material-table";
import { useState, useEffect, useContext, FC } from "react";
import { TestContext } from "../contexts/test/TestContext";
import { eTestActionType, IUser } from "../models/ITests";
import UserPanel from "./panels/UserPanel";


const Test: FC = () => {
  const testState = useContext(TestContext);

  const [openPanel, setOpenPanel] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const openEditPanel = () => {
    setIsEdit(true);
    setOpenPanel(true);
  }

  const isEditCallBack = () => {
    setIsEdit(false);
  }

  useEffect(() => {
    testState.TestDispatch({ type: eTestActionType.RetrieveUsers });
  }, []);

  return (
    <>
      <h1>CRUD Express/SQLite/Context Api</h1>
      <MaterialTable
        style={{ width: '60%', left: '20%' }}
        title="All users"
        columns={[
          { title: 'Name', field: 'name' },
          { title: 'Email', field: 'email' },
        ]}
        data={testState?.state?.Users}
        actions={[
          {
            icon: 'add_box',
            isFreeAction: true,
            tooltip: 'Add a user',
            onClick: () => {
              setOpenPanel(true);
            },
          },
          {
            icon: 'edit',
            tooltip: 'Edit user',
            onClick: (event, rowData) => {
              testState.TestDispatch({ type: eTestActionType.setUserSelected, user: rowData as IUser })
              openEditPanel()
            }
          },
          {
            icon: 'delete',
            tooltip: 'Delete User',
            onClick: (event, rowData) => {
              testState.TestDispatch({ type: eTestActionType.DeleteUser, user: rowData as IUser })
            },
            disabled: false
          }
        ]}
        options={{
          actionsColumnIndex: -1
        }}
      />

      {
        openPanel &&
        <UserPanel
          isOpen={openPanel}
          ClosePanel={() => setOpenPanel(false)}
          isEdit={isEdit}
          isEditCallBack={isEditCallBack}
        />
      }
    </>
  )
}

export default Test
