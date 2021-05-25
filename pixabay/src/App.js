import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {
	// State de la app
	const [busqueda, guardarBusqueda] = useState('');
	const [imagenes, guardarImagenes] = useState([]);
	const [paginaactual, guardarPaginaActual] = useState(1);
	const [totalpaginas, guardarTotalPaginas] = useState(1);

	useEffect(() => {
		const consultarAPI = async () => {
			if (busqueda === '') return;

			const imagenesPorPagina = 30;
			const key = '9932383-e4f9012774008ab96a478290c';
			const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;

			const respuesta = await fetch(url);
			const resultado = await respuesta.json();

			guardarImagenes(resultado.hits);

			// Calcular el total de paginas
			const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);

			guardarTotalPaginas(calcularTotalPaginas);

			// Mover la pantalla hasta arriba
			const jumbotron = document.querySelector('.jumbotron');
			jumbotron.scrollIntoView({ behavior: 'smooth' });
		};

		consultarAPI();
	}, [busqueda, paginaactual]);

	// Definir la pagina anterior
	const paginaAnterior = () => {
		const nuevaPaginaActual = paginaactual - 1;

		if (nuevaPaginaActual === 0) return;

		guardarPaginaActual(nuevaPaginaActual);
	};

	// Definir la pagina siguiente
	const paginaSiguiente = () => {
		const nuevaPaginaActual = paginaactual + 1;

		if (nuevaPaginaActual > totalpaginas) return;

		guardarPaginaActual(nuevaPaginaActual);
	};

	return (
		<div className="container">
			<div className="jumbotron">
				<p className="lead text-center">Buscador de Imagenes</p>

				<Formulario guardarBusqueda={guardarBusqueda} />
			</div>
			<div className="row justify-content-center">
				<ListadoImagenes imagenes={imagenes} />

				{paginaactual === 1 ? null : (
					<button type="button" onClick={paginaAnterior} className="btn btn-info mr-1">
						&laquo; Anterior
					</button>
				)}

				{paginaactual === totalpaginas ? null : (
					<button type="button" onClick={paginaSiguiente} className="btn btn-info mr-1">
						Siguiente &raquo;
					</button>
				)}
			</div>
		</div>
	);
}

export default App;
