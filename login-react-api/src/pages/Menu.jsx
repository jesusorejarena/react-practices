import React, { Component } from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Menu extends Component {
	cerrarSesion = () => {
		cookies.remove('id', { path: '/' });
		cookies.remove('apellido_paterno', { path: '/' });
		cookies.remove('apellido_materno', { path: '/' });
		cookies.remove('nombre', { path: '/' });
		cookies.remove('username', { path: '/' });
		window.location.href = './';
	};

	componentDidMount() {
		if (!cookies.get('username')) {
			window.location.href = './';
		}
	}

	render() {
		console.log(`id: ${cookies.get('id')}`);
		console.log(`Apellidos: ${cookies.get('apellido_paterno')} ${cookies.get('apellido_materno')}`);
		console.log(`Nombre: ${cookies.get('nombre')}`);
		console.log(`Usuario: ${cookies.get('username')}`);
		return (
			<div>
				Menu Principal
				<br />
				<button onClick={() => this.cerrarSesion()}>Cerrar Sesión</button>
			</div>
		);
	}
}

export default Menu;
