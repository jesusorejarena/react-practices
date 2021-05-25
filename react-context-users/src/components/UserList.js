import React, { useEffect, useContext } from 'react';

// Context
import UserContext from '../context/User/UserContext';

const UserList = () => {
	// Los datos del UserContext se destructuran y se pueden llamar para realizar la funcion "Peticion"
	const { users, getUsers, getProfile } = useContext(UserContext);

	useEffect(() => {
		getUsers();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="list-group h-100">
			{users.map((user) => (
				<a
					className="list-group-item list-group-item-action d-flex flex-row justify-content-start"
					href="#!"
					key={user.id}
					onClick={() => getProfile(user.id)}
				>
					<img src={user.avatar} className="img-fluid mr-4 rounded-circle" width="70" alt="Lista" />
					<p>{`${user.first_name} ${user.last_name}`}</p>
				</a>
			))}
		</div>
	);
};

export default UserList;
