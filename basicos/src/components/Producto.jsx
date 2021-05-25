import React from 'react';

const Producto = ({ producto, carrito, agregarProducto, productos }) => {
	const { nombre, precio, id } = producto;

	// Agregar producto al carrito
	const seleccionarProducto = (id) => {
		const producto = productos.filter((producto) => producto.id === id);
		agregarProducto([...carrito, ...producto]);
	};

	// eliminar producto
	const eliminarProducto = (id) => {
		const productos = carrito.filter((producto) => producto.id !== id);

		//  Colocar los productos en el state
		agregarProducto(productos);
	};

	return (
		<div>
			<h1>{nombre}</h1>
			<h4>${precio}</h4>
			{productos ? (
				<button type="button" onClick={() => seleccionarProducto(id)}>
					Comprar
				</button>
			) : (
				<button type="button" onClick={() => eliminarProducto(id)}>
					Eliminar
				</button>
			)}
		</div>
	);
};

export default Producto;
