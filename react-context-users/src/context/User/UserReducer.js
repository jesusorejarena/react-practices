// Se importan los types
import { GET_USERS, GET_PROFILE } from '../types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
	// Al llamarse el use reducer se le hace destructuring al action
	const { payload, type } = action;

	// Segun el type realiza tal accion
	switch (type) {
		case GET_USERS: // Segun el type que se este pidiendo
			return {
				...state, // Copia el state, y el payload guarda los datos
				users: payload, // El payload es como si se estuviera diciendo "data"
			};

		case GET_PROFILE: // Segun el type que se este pidiendo
			return {
				...state, // Copia el state, y el payload guarda los datos
				selectedUser: payload, // El payload es como si se estuviera diciendo "data"
			};

		default:
			// Si no se encuentra nada en el type, manda el state por defecto
			return state;
	}
};
