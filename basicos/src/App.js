/* Llamado a los componetentes y a la libreria react */
import React, { Fragment, useState } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import Producto from './components/Producto';
import Carrito from './components/Carrito';

function App() {
	//objetos donde se guarda informacion como tipo variables, aqui es donde esta el tipo inventario de productos
	const [productos, guardarProductos] = useState([
		{ id: 1, nombre: 'camisa ReactJS', precio: 50 },
		{ id: 2, nombre: 'camisa VueJS', precio: 40 },
		{ id: 3, nombre: 'camisa Node.js', precio: 30 },
		{ id: 4, nombre: 'camisa Angular', precio: 20 },
	]);

	//objetos donde se guarda informacion como tipo variables, aqui es donde se pasa la informacion cuando se compra
	const [carrito, agregarProducto] = useState([]);

	// Obtener fecha para el copyright
	const fecha = new Date().getFullYear();

	return (
		<Fragment>
			<Header titulo="Tienda Virtual" />

			<h1>Lista de Productos</h1>

			{/* aqui se llama y se pasa la informacion a los componentes */}
			{productos.map((producto) => (
				<Producto
					key={producto.id}
					producto={producto}
					carrito={carrito}
					productos={productos}
					agregarProducto={agregarProducto}
				/>
			))}

			{/* aqui se llama y se pasa la informacion a los componentes */}
			<Carrito carrito={carrito} agregarProducto={agregarProducto} />

			{/* aqui se llama y se pasa la informacion a los componentes */}
			<Footer fecha={fecha} />
		</Fragment>
	);
}

export default App;
