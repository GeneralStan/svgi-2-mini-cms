/** This component is for displaying each item in the record, passed to it from TenantList */
import React, { useContext } from 'react';
import { IUser } from '../app.interfaces';
import { AppContext } from '../App';

type Props = {
    user: IUser,
}

const ViewUser: React.FC<Props> = ({ user }) => {

    //declare applicable contexts
    const appContext = useContext(AppContext);

    //callback function for delete button onClick event. We could have also embedded this function definition directly rather than define it first here
    const onDeleteUser = () => {
        appContext!.handleDeleteUser!(user.id, appContext!.dispatch); ////notice here that we are invoking the handleDeleteUser() via appContext. The exclamation mark is because of the possible null which will not really happen
    };

    //callback function for edit button
    const onEditUser = () => {
        //appContext!.handleEditUser!(user.id, appContext!.dispatch); //notice here that we are invoking the handleEditUser() via appContext. The exclamation mark is because of the possible null which will not really happen
        appContext!.dispatch({ type: 'HandleEditUser', payload: { id: user.id } });
    };

    const onClickCloseButton = () => {
        appContext!.dispatch({type: 'HandleCloseViewUser'})
    }

    return (
        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">{`Details of ${user.name}`}</p>
                    <button className="delete" aria-label="close" onClick={onClickCloseButton}/>
                </header>
                <section className="modal-card-body">
                    {/*<!-- Content ... -->*/}
                    <div className="columns">
                        <div className="column is-two-fifths">
                           First name:
                        </div>
                        <div className="column">
                            {user.firstName}
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column is-two-fifths">
                            Middle name:
                        </div>
                        <div className="column">
                            {user.middleName}
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column is-two-fifths">
                            Last name:
                        </div>
                        <div className="column">
                            {user.lastName}
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column is-two-fifths">
                            Common name:
                        </div>
                        <div className="column">
                            {user.commonName}
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column is-two-fifths">
                            Gender:
                        </div>
                        <div className="column">
                            {user.gender}
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column is-two-fifths">
                            Email address:
                        </div>
                        <div className="column">
                            {user.primaryEmailAddress}
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column is-two-fifths">
                            Active:
                        </div>
                        <div className="column">
                            {user.isActive? "Yes" : "No"}
                        </div>
                    </div>
                </section>
                <footer className="modal-card-foot">
                    <div className="buttons are-small">
                        <button className="button is-warning" onClick={onEditUser}>Edit</button>
                        <button className="button is-danger" onClick={() => { if (window.confirm('This action cannot be reversed! Are you sure you want to delete?')) onDeleteUser() }}>Delete</button>
                    </div>
                </footer>
            </div>
        </div>

    );
}

export default ViewUser;