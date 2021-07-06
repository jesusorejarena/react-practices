import React, { useContext } from 'react';

import ProyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';

const Proyecto = ({ proyecto }) => {
	// Obtener el state de proyectos
	const proyectoContext = useContext(ProyectoContext);
	const { proyectoActual } = proyectoContext;

	// Obtener la funcion del context de tarea
	const tareaContext = useContext(TareaContext);
	const { obtenerTareas } = tareaContext;

	// Funcion para agregar el proyecto actual
	const seleccionarProyecto = (id) => {
		proyectoActual(id); // Fijar un proyecto actual
		obtenerTareas(id); // Filtrar las tareas cuando se de click
	};

	return (
		<div>
			<li>
				<button type="button" className="btn btn-blank" onClick={() => seleccionarProyecto(proyecto._id)}>
					{proyecto.nombre}
				</button>
			</li>
		</div>
	);
};

export default Proyecto;
