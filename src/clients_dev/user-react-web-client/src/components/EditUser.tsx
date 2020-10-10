/** This component is for displaying each tenant in the record, passed to it from TenantList */
import React, { useState } from 'react';
import { IAction, IUser } from '../app.interfaces';

//create the type for the anticipated props to be passed from parent component
type Props = {
    user: IUser,
    handleUpdateUser: Function,
    dispatch: React.Dispatch<IAction>
}

const EditUser: React.FC<Props> = (props) => {

    const initialUserState: IUser = {
        id: props.user.id,
        //code: props.tenant.code,
        firstName: props.user.firstName,
        middleName: props.user.middleName,
        lastName: props.user.lastName,
        commonName: props.user.commonName,
        gender: props.user.gender,
        primaryEmailAddress: props.user.primaryEmailAddress,
        dateOfBirth: props.user.dateOfBirth,
        isActive: props.user.isActive,
        /*
        customTheme: {
            name: props.tenant.customTheme!.name,
            description: props.tenant.customTheme!.description,
            properties: props.tenant.customTheme!.properties,
            bulmaProperties: {
                primaryColor: props.tenant.customTheme!.bulmaProperties!.primaryColor,
                primaryBackground: props.tenant.customTheme!.bulmaProperties!.primaryBackground
            }
        }
        */
    }

    //declare the state variable for user to be added from form. Notice that we are using an object containing the individual elements
    //We need to interact with them individually as state variable that will change in response to input onChange 
    const [user, setUser] = useState<IUser>({ ...initialUserState });

    //create a general onChange event handler for form inputs that fire onChange event
    //See https://reactjs.org/docs/events.html? for all kinds of events that can be handled in react
    const onChange = (event: React.FormEvent) => {
        const userState = user;//check out user in state as is
        //modify element in the state which has the same name as the input that fired this event. Pass the new value
        const target: HTMLInputElement | HTMLSelectElement = event.target as HTMLInputElement | HTMLSelectElement; //as is used here to cast
        userState[target.name] = target.value;
        setUser({ ...userState });//checkin the modified state
    }

    //function to handle form onSubmit event
    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();//do not do the default form submit to the server
        props.handleUpdateUser(user, props.dispatch);//call the handleAddUser function passed via props.
    }

    //function to handle form onCancel
    const onCancel = () => {
        //props.handleCancelUpdate(props.dispatch);//call the function handleCancelAdd passed via props
        //simply set state to make displayUpdate disappear
        props.dispatch({ type: 'HandleCancelUpdate' });
    }

    //Note where the above functions are used below within the return statement
    return (
        <div className="columns is-mobile">
            <div className="column is-two-thirds">
                <div className="box">
                    <form onSubmit={onSubmit}>
                    <legend>Add User:</legend>
                        {/* <div className="field">
                            <label className="label">Code</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Code input" name="code" value={tenant.code} onChange={onChange} required/>
                            </div>
                        </div> */}
                        <div className="field">
                            <label className="label">First name</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Name input" name="firstName" value={user.firstName} onChange={onChange} required/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Middle name</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Middle name input" name="middleName" value={user.middleName} onChange={onChange} required/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Last name</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Last name input" name="lastName" value={user.lastName} onChange={onChange} required/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Common name</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Common name input" name="commonName" value={user.commonName} onChange={onChange} required/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Gender</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Gender input" name="gender" value={user.gender} onChange={onChange} required/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Email address</label>
                            <div className="control">
                                <input className="input" type="email" placeholder="Email Address" name="primaryEmailAddress" value={user.primaryEmailAddress} onChange={onChange} required/>
                            </div>
                            <p className="help is-info">Enter a valid email here</p>
                        </div>
                        {/* <div className="field">
                            <label className="label">Date of Birth</label>
                            <div className="control">
                                <input className="Date" type="date" placeholder="Date of Birth" name="dateOfBirth" value={user.dateOfBirth} onChange={onChange} required/>
                            </div>
                        </div>----bring this up in class */}
                        <div className="field is-grouped">
                            <div className="control">
                                <button className="button is-link">Submit</button>
                            </div>
                            <div className="control">
                                <button className="button is-link is-light" onClick={onCancel}>Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default EditUser;