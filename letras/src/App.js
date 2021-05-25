import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cancion from './components/Cancion';
import Info from './components/Info';

import axios from 'axios';

function App() {
	// Definir el state
	const [busquedaletra, guardarBusquedaLetra] = useState({});
	const [letra, guardarLetra] = useState('');
	const [info, guardarInfo] = useState({});

	useEffect(() => {
		if (Object.keys(busquedaletra).length === 0) return;

		const consultarApiLetra = async () => {
			const { artista, cancion } = busquedaletra;

			const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
			const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

			// Se ejecutan las dos al mismo tiempo sin esperar que termine la primera para luego hacer la segunda consulta

			const [letra, informacion] = await Promise.all([axios(url), axios(url2)]);

			// De esta forma seria mas lento
			// const resultado = await axios(url);
			// const resultado = await axios(url2);

			guardarLetra(letra.data.lyrics);
			guardarInfo(informacion.data.artists[0]);
			
			console.log(letra.data.lyrics);
			console.log(informacion.data.artists[0]);

			// guardarLetra(resultado.data.lyrics);
		};
		consultarApiLetra();
	}, [busquedaletra]);

	return (
		<Fragment>
			<Formulario guardarBusquedaLetra={guardarBusquedaLetra} />

			<div className="container mt-5">
				<div className="row">
					<div className="col-md-6">
						<Info info={info} />
					</div>
					<div className="col-md-6">
						<Cancion letra={letra} />
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default App;