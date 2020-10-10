import { IAction } from "../app.interfaces";

export const handleDeleteUser = async (id: number | string, dispatch: React.Dispatch<IAction>) => {
    //You can optionally send an alert at the beginning of this function, in case it takes long to finish.
    dispatch({ type: 'BeforeDeleteUser' });
    try {
        const response = await fetch(`/users/${id}`, //note this URL
            {
                method: 'DELETE',
                //mode: 'cors', // no-cors, *cors, same-origin
                //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                //credentials: 'same-origin', // include, *same-origin, omit
                //redirect: 'follow', // manual, *follow, error
                //referrerPolicy: 'no-referrer', // no-referrer, *client
            });
        if (!response.ok) throw new Error(response.statusText);//confirm that response is OK
        //Response is ok. Proceed!
        //remove tenant from state
        dispatch({ type: 'DeleteUserSuccess', payload: { id: id } })
    } catch (error) {
        //problem deleting from backend
        dispatch({ type: 'DeleteUserFailure', payload: { error: error } })
    }
}