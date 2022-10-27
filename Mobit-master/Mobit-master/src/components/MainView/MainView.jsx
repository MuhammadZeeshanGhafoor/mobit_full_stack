import React, { useEffect, useState } from 'react';
import _ from 'lodash'
import fuzzy from "fuzzy";
import UserList from "../UserList/UserList";
import "./MainView.scss"
import UserDetails from "../UserDetails/UserDetails";
import userService from "../../services/userService";

const NEW_USER = {
    name: '',
    email: '',
    password: '',
    address: { street: '', zipCode: '', city: '', country: '' }
}

function MainView(props) {

    const [users, setUsers] = useState([])
    const [isNewUser, setIsNewUser] = useState(true)
    const [filterPattern, setFilterPattern] = useState('')
    const [selectedUser, setSelectedUser] = useState(NEW_USER)

    const filteredUsers = () => {
        return fuzzy
            .filter(
                filterPattern,
                users,
                {
                    extract: (el) => el.name
                }
            )
            .map((item) => item.original)
    }

    useEffect(() => {
        console.log('Will mount')
        userService.fetchUsers().then((users) => {
            setUsers([...users])

        })
    }, [])

    const selectUser = (userId) => {
        setSelectedUser(_.find(users, { id: userId }))
        setIsNewUser(false)

    }

    const handleNewUserButtonClick = () => {
        setSelectedUser(NEW_USER)
        setIsNewUser(true)

    }

    const saveNewUser = (newUser) => {
        userService.addUser(newUser).then(savedUser => {
            console.log("Saved", savedUser)
            setSelectedUser(savedUser)
            setIsNewUser(false)
            setUsers((pre) => [...pre, savedUser])

        })
    }

    const updateUser = (userToUpdate) => {
        userService.updateUser(userToUpdate).then(() => {
            const updatedUsers = [...users]
            updatedUsers[userToUpdate.id - 1] = userToUpdate

            setUsers(updatedUsers)
        })
    }

    const saveUser = (userToSave) => {
        if (isNewUser) {
            saveNewUser(userToSave)
        } else {
            updateUser(userToSave)
        }
    }

    const onSelectedUserChange = (selectedUser) => {
        setSelectedUser(selectedUser)
    }

    const onFilterPatternChange = (pattern) => {
        setFilterPattern(pattern)
    }
console.log("selectedUser",selectedUser)
    return (
        <div className="main-view-container container-fluid">
            {props.tab === 0 ?
                <div className="columns w-100">
                    <div className="column-title">
                        User List
                    </div>
                    <UserList users={filteredUsers()} onNewUser={handleNewUserButtonClick}
                        onUserSelect={selectUser} filterPattern={filterPattern}
                        onFilterPatternChange={onFilterPatternChange} />
                </div> :
                <div className="columns w-100">
                    <div className="column-title">
                        {isNewUser ? "New User" : "User Details"}
                    </div>
                    <UserDetails user={selectedUser} onChange={onSelectedUserChange}
                        onSave={saveUser} />
                </div>}
        </div>
    )
}


export default MainView;