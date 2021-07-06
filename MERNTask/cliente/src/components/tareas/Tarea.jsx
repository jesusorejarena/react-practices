import React, { useContext } from 'react';

import ProyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';

const Tarea = ({ tarea }) => {
	// Extraer un proyecto si esta activo
	const proyectoContext = useContext(ProyectoContext);
	const { proyecto } = proyectoContext;

	// Obtener la funcion del context de tarea
	const tareaContext = useContext(TareaContext);
	const { eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual } = tareaContext;

	// Extraer el proyecto
	const [proyectoActual] = proyecto;

	// Funcion que se ejecuta cuando el usuario presiona el btn de eliminar tarea
	const tareaEliminar = (id) => {
		eliminarTarea(id, proyectoActual._id);
		obtenerTareas(proyectoActual.id);
	};

	// Funcion que modifica el estado de las tareas
	const cambiarEstado = (tarea) => {
		if (tarea.estado) {
			tarea.estado = false;
		} else {
			tarea.estado = true;
		}
		actualizarTarea(tarea);
	};

	// Agrega una tarea actual cuando el usuario desee editarla
	const seleccionarTarea = () => {
		guardarTareaActual(tarea);
	};

	return (
		<li className="tarea sombra">
			<p>{tarea.nombre}</p>

			<div className="estado">
				{tarea.estado ? (
					<button type="button" className="completo" onClick={() => cambiarEstado(tarea)}>
						Completo
					</button>
				) : (
					<button type="button" className="incompleto" onClick={() => cambiarEstado(tarea)}>
						Incompleto
					</button>
				)}
			</div>

			<div className="acciones">
				<button type="button" className="btn btn-primario" onClick={() => seleccionarTarea(tarea)}>
					Editar
				</button>
				<button type="button" className="btn btn-secundario" onClick={() => tareaEliminar(tarea._id)}>
					Eliminar
				</button>
			</div>
		</li>
	);
};

export default Tarea;
