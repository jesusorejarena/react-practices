import React, { useContext, useEffect } from 'react';

import AuthContext from '../../context/autenticacion/authContext';

const Barra = () => {
	// Extraer la informacion de autenticacion
	const authContext = useContext(AuthContext);
	const { usuario, usuarioAutenticado, cerrarSesion } = authContext;

	useEffect(() => {
		usuarioAutenticado();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<header className="app-header">
			{usuario ? (
				<p className="nombre-usuario">
					Hola <span>{usuario.nombre}</span>
				</p>
			) : null}

			<nav className="nav-principal">
				<button
					className="btn btn-blank"
					style={{ color: '#FFF', fontWeight: 'bold', fontSize: '2rem' }}
					onClick={() => cerrarSesion()}
				>
					Cerrar Sesión
				</button>
			</nav>
		</header>
	);
};

export default Barra;
