import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

import AuthContext from '../../context/autenticacion/authContext';

function RutaPrivada({ component: Component, ...props }) {
	// Extraer la informacion de autenticacion
	const authContext = useContext(AuthContext);
	const { autenticado, cargando, usuarioAutenticado } = authContext;

	useEffect(() => {
		usuarioAutenticado();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Route
			{...props}
			render={(props) => (!autenticado && !cargando ? <Redirect to="/" /> : <Component {...props} />)}
		/>
	);
}

export default RutaPrivada;
