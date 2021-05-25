import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import ListadoNoticias from './components/ListadoNoticias';

function App() {
	// Definir la cetegoria y noticias
	const [categoria, guardarCategoria] = useState('');
	const [noticias, guardarNoticias] = useState([]);

	useEffect(() => {
		const consultarAPI = async () => {
			const url = `https://newsapi.org/v2/top-headlines?country=ve&category=${categoria}&apiKey=2d29cd86006140629a39b1b7bfc936a2`;

			const respuesta = await fetch(url);
			const noticias = await respuesta.json();

			console.log(noticias.articles);
			guardarNoticias(noticias.articles);
		};
		consultarAPI();
	}, [categoria]);

	return (
		<Fragment>
			<Header titulo="Buscador de Noticias" />

			<div className="container white">
				<Formulario guardarCategoria={guardarCategoria} />

				<ListadoNoticias noticias={noticias} />
			</div>
		</Fragment>
	);
}

export default App;
