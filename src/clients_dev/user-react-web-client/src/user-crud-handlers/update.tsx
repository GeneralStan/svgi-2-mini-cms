import { IAction, IUser } from "../app.interfaces";


export const handleUpdateUser = async (editedUser: IUser, dispatch: React.Dispatch<IAction>) => {
    //You can optionally send an alert at the beginning of this function, in case it takes long to finish.
    //Of course, this alert will only flash if it takes very minimal time to create item
    dispatch({ type: 'BeforeUpdateUser' })
    //let's try to write to backend
    try {
        const response = await fetch(`/users/${editedUser.id}`,
            {
                method: 'PUT',//notice the method
                //mode: 'cors', // no-cors, *cors, same-origin
                //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                //credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                //redirect: 'follow', // manual, *follow, error
                //referrerPolicy: 'no-referrer', // no-referrer, *client
                body: JSON.stringify(editedUser) // body data type must match "Content-Type" header

            });
        if (!response.ok) throw new Error(response.statusText);//confirm that response is OK
        //Response is ok. Proceed with setting state with itemUpdated
        //partial update does not return full object, hence I am not using below to get tenant updated
        //const tenantUpdated = await response.json();
        await response.json();
        //dispatch to state
        dispatch({ type: 'UpdateUserSuccess', payload: { user: editedUser } })
    } catch (error) {
        dispatch({ type: 'UpdateUserFailure', payload: { error: error } })
    }

}