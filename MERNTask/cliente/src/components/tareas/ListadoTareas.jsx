import React, { Fragment, useContext, useEffect } from 'react';

// Libraries
import { CSSTransition, TransitionGroup } from 'react-transition-group';

// Components
import Tarea from './Tarea';

import ProyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';
import AlertaContext from '../../context/alertas/alertaContext';

const ListadoTareas = () => {
	// Extraer proyectos de state inicial
	const proyectoContext = useContext(ProyectoContext);
	const { proyecto, eliminarProyecto } = proyectoContext;

	// Obtener las tareas del proyecto
	const tareaContext = useContext(TareaContext);
	const { mensaje, tareasproyecto } = tareaContext;

	// Extraer un proyecto si esta activo
	const alertaContext = useContext(AlertaContext);
	const { alerta, mostrarAlerta } = alertaContext;

	useEffect(() => {
		// Si hay un error
		if (mensaje) {
			mostrarAlerta(mensaje.msg, mensaje.categoria);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mensaje]);

	// Si no hay proyecto seleccionado
	if (!proyecto) return <h2>Selecciona un proyecto</h2>;

	// Array destructuring para extraer el proyecto actual
	const [proyectoActual] = proyecto;

	// Elimina un proyecto
	const onClickEliminar = () => {
		eliminarProyecto(proyectoActual._id);
	};

	return (
		<Fragment>
			<h2>Proyecto: {proyectoActual.nombre}</h2>

			{alerta ? <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> : null}

			<ul className="listado-tareas">
				{tareasproyecto.length === 0 ? (
					<li className="tarea">
						<p>No hay tareas</p>
					</li>
				) : (
					<TransitionGroup>
						{tareasproyecto.map((tarea) => (
							<CSSTransition key={tarea._id} timeout={200} classNames="tarea">
								<Tarea tarea={tarea} />
							</CSSTransition>
						))}
					</TransitionGroup>
				)}
			</ul>

			<button type="button" className="btn btn-eliminar" onClick={onClickEliminar}>
				Eliminar Proyecto &times;
			</button>
		</Fragment>
	);
};

export default ListadoTareas;
