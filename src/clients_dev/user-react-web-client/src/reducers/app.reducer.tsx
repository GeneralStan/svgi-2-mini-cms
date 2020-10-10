import { IState, IAction } from '../app.interfaces';

const reducer = (state: IState, action: IAction) => {
    switch (action.type) {
        case 'FetchDataSuccess':
            return {
                ...state, users: action.payload!.users
            };
        case 'FetchDataFailure':
            return {
                ...state, alert: { show: true, type: "danger", message: `Could not load remote data: ${action.payload!.error}` }
            };
        case 'HandleViewUser':
            return {
                ...state, onViewUser: true, onAddUser: false, onEditUser: false, user: action.payload!.user
            };
        case 'HandleCloseViewUser':
            return{
                ...state, onViewUser: false, user: null
            }
        case 'HandleOnAddUser':
            return {
                ...state, onAddUser: true, onEditUser: false, alert: {...state.alert, show: false}
            };
        case 'HandleCancelCreate':
            return {
                ...state, onAddUser: false
            };
        case 'BeforeCreateUser':
            //goal here is to set alert to show creating user message
            return {
                ...state, alert: { show: true, type: "info", message: 'Creating user. Please wait!' }
            };
        case 'CreateUserSuccess': {
            //goal here is to update state with user created
            const currentUsers = state.users!;
            currentUsers.push(action.payload!.user!);
            return {
                ...state, users: currentUsers, onAddUser: false, alert: { show: true, type: "success", message: 'User successfully created!' }
            };
        };
        case 'CreateUserFailure':
            //goal here is to set alert to show failure to create
            return {
                ...state, alert: { show: true, type: "danger", message: `Could not create user: ${action.payload!.error}` }
            };
        case 'BeforeDeleteUser':
            //goal here is to set alert to show deleting tenant message
            return { 
                ...state, alert: { show: true, type: "info", message: 'Deleting user. Please wait!' } 
            };
        case 'DeleteUserSuccess': {
            //goal here is to remove deleted user from state
            const currentUsers = state.users;
            //find the index corresponding to the user with the passed id
            const index = currentUsers!.findIndex((user) => user.id === action.payload!.id);
            currentUsers!.splice(index, 1);
            return { 
                ...state, onViewUser: false, users: currentUsers, alert: { show: true, type: "success", message: 'User successfully deleted!' } 
            };
        };
        case 'DeleteUserFailure':
            //goal here is to set alert to show failure to delete
            return { 
                ...state, onViewTenant: false, alert: { show: true, type: "danger", message: `Could not delete user: ${action.payload!.error}` } 
            };
        case 'BeforeUpdateUser':
            //goal here is to set alert to show updating user message
            return { 
                ...state, alert: { show: true, type: "info", message: 'Updating user. Please wait!' } 
            };
        case 'HandleCancelUpdate':
            return { 
                ...state, onEditUser: false 
            };
        case 'HandleEditUser': {
            //alert(JSON.stringify(action.payload!.tenant))
            //goal here is to find the user to be edited and set the user in state to be edited
            const currentUsers = state.users;
            
            const index = currentUsers!.findIndex((user) => user.id === action.payload!.id);
            const user = currentUsers![index];
            return { 
                ...state, onEditUser: true, user: user, onAddUser: false, alert: {...state.alert, show: false} 
            };
        };
        case 'UpdateUserSuccess': {
            //goal here is to update state with user updated
            const currentUsers = state.users;
            const index = currentUsers!.findIndex((user) => user.id === action.payload!.user!.id);
            //now change the value for that user in state
            currentUsers![index] = action.payload!.user!;
            return { 
                ...state, onViewUser: false, users: currentUsers, tenant: action.payload!.user!, onEditUser: false, alert: { show: true, type: "success", message: 'User successfully updated!' } 
            };
        };
        case 'UpdateUserFailure':
            //goal here is to set alert to show failure to update
            return { 
                ...state, onViewUser: false, alert: { show: true, type: "danger", message: `Could not update user: ${action.payload!.error}` } 
            };
        case 'HandleCloseAlert':
            return { 
                ...state, alert: { show: false, message: '', type: '' } 
            };
            
        default:
            return state; //return state as is if the action type indicated is not handled
    }//close switch statement

}
export default reducer;