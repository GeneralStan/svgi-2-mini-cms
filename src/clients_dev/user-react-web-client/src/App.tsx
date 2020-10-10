import React, { useEffect, useReducer } from 'react';
import { IAction, IFindOptions, IState } from './app.interfaces';
import reducer from './reducers/app.reducer';

import { handleCreateUser } from './user-crud-handlers/create';
import { handleDeleteUser } from './user-crud-handlers/delete';
import { handleUpdateUser } from './user-crud-handlers/update';
import { handleReadUsers } from './user-crud-handlers/read';
import Alert from './components/Alert';
import UserList from './components/UserList';

import AddUser from './components/AddUser';
import EditUser from './components/EditUser';
import ViewUser from './components/ViewUser';

/**
 * Here, we take for granted that on initialization, 
 * jwt token string may be sent by the server, if there is valid login
 * To get the userinfo and roles from the token, 
 * we can use https://github.com/auth0/jwt-decode
 */
type Props = {
  jwtToken?: string
}

/*Below is type definition for our context type.*/
//Restricts Context type to null or Object containing functions; null is used only for initialization of context in App.
//Using Object because we have two or more parameters to pass and we want to carry them together within one context instead of two
//different ones.
type AppContextType = null | { dispatch: React.Dispatch<IAction>, handleDeleteUser: Function };

//create a context to be used to pass handlers like delete, edit handlers to subcomponents.
//We are also going to pass dispatch returned by useReducer.
export const AppContext = React.createContext<AppContextType>(null);

/*Let us define type for our reducer so that we can easily pass any type of previous state and action.
Reducer is simply a type of function that takes previous state and action and returns a new state as represented
We don't have to do this. But it is good to know.*/
type Reducer<S, A> = (prevState: S, action: A) => S;

const App: React.FC<Props> = ({ jwtToken }) => {

  /*let us organize state, using useReducer*/
  //Prepare initial state values
  const initialState: IState =
  {
    users: [],
    user: null,
    onAddUser: false,
    onViewUser: false,
    onEditUser: false,
    alert: { show: false, message: '', type: '' }
  };

  //using useReducer instead of useState
  const [state, dispatch] = useReducer<Reducer<IState, IAction>>(reducer, initialState);

  /*Additional handler functions here*/
  //Below is called by Alert component.
  const handleCloseAlert = () => {
    dispatch({ type: 'HandleCloseAlert' });
  }


  //Just testing findOptions. Can be used to qualify find.
  //let findOptions: IFindOptions = {"select":["id","name", "contactFirstName","dateCreated"], "order": {"name": "ASC", "id": "DESC"}}
  let findOptions: IFindOptions = {}
  /**
   * useEffect to be run once, hence the second parameter []. Loads data at componentDidMount life cycle stage
   */
  useEffect(() => {
    handleReadUsers(dispatch, findOptions);
    // eslint-disable-next-line
  }, []);

  /*Time to logically decide what to show.*/
  //Setup alert component as a variable so we don't keep repeating
  const myAlert = (
    <Alert type={state.alert.type} message={state.alert.message} onClickHandler={handleCloseAlert} />
  )

  //check if editTenant should be loaded or not since it is conditional loading
  if (state.onEditUser && state.user !== null) {
    return (
      <div className="container ">
        <div className="content is-medium">
          <p>
            <EditUser user={state.user!} handleUpdateUser={handleUpdateUser} dispatch={dispatch} />
          </p>
          <p>
            {state.alert.show && myAlert}
          </p>
          <p>
            <AppContext.Provider value={{ dispatch, handleDeleteUser }}>
              <UserList users={state.users!} />
            </AppContext.Provider>
          </p>
        </div>
      </div>
    );
  } else if (state.onAddUser) {//Display AddTenant along with TenantList if onAddTenant is true
    return (
      <div className="container ">
        <div className="content is-medium">
          <p>
            <AddUser handleCreateUser={handleCreateUser} dispatch={dispatch} />
          </p>
          <p>
            {state.alert.show && myAlert}
          </p>
          <p>
            <AppContext.Provider value={{ dispatch, handleDeleteUser }}>
              <UserList users={state.users!} />
            </AppContext.Provider>
          </p>
        </div>
      </div>
    );
  } else if (state.onViewUser && state.user != null) {
    return (
      <div className="container ">
        <div className="content is-medium">
          <p>
            <AppContext.Provider value={{dispatch, handleDeleteUser }}>
              <ViewUser user={state.user!} />
            </AppContext.Provider>
          </p>
        </div>
      </div>
    );
  } else {//onAddUser is false
    return (
      <div className="container ">
        <div className="content is-medium">
          <p>
            <button className="button is-outline" onClick={() => { dispatch({ type: 'HandleOnAddUser' }) }}>+ Add User</button>
          </p>
          <p>
            {state.alert.show && myAlert}
          </p>
          <p>
            <AppContext.Provider value={{ dispatch, handleDeleteUser }}>
              <UserList users={state.users!} />
            </AppContext.Provider>
          </p>
        </div>
      </div>
    );
  }

}

export default App;