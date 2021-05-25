import React, { useReducer } from 'react';
import UserReducer from './UserReducer';
import UserContext from './UserContext';

// Librerias
import axios from 'axios';

const UserState = (props) => {
	// Se establece un state inicial para guardar la data que se obtiene de las apis
	const initialState = {
		// El users va a traer varios usuarios en forma de arrays
		users: [],
		// El selectedUser va a guardar un solo usuario en forma
		selectedUser: null,
	};

	// Se guarda en el state el useReducer junto con el state inicial
	const [state, dispatch] = useReducer(UserReducer, initialState);

	// Funcion para realizar la peticion de la api
	const getUsers = async () => {
		const res = await axios.get('https://reqres.in/api/users');
		console.log(res.data.data);

		// Luego se guarda el tipo de la respuesta junto con la data "payload"
		dispatch({
			type: 'GET_USERS',
			payload: res.data.data,
		});
	};

	// Funcion para realizar la peticion de la api
	const getProfile = async (id) => {
		const res = await axios.get('https://reqres.in/api/users/' + id);
		console.log(res.data.data);

		// Luego se guarda el tipo de la respuesta junto con la data "payload"
		dispatch({
			type: 'GET_PROFILE',
			payload: res.data.data,
		});
	};

	// Como el userState es el que queda en el principal, toda la informacion se la va a pasar a los hijos
	// Como lo es el state donde se guardan las peticiones, junto con las funciones para realizar la peticion
	return (
		<UserContext.Provider value={{ users: state.users, selectedUser: state.selectedUser, getUsers, getProfile }}>
			{props.children}
		</UserContext.Provider>
	);
};

export default UserState;
