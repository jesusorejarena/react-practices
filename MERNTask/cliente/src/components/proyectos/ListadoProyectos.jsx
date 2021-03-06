import React, { useContext, useEffect } from 'react';

// Libraries
import { CSSTransition, TransitionGroup } from 'react-transition-group';

// Components
import Proyecto from './Proyecto';

import ProyectoContext from '../../context/proyectos/proyectoContext';
import AlertaContext from '../../context/alertas/alertaContext';

const ListadoProyectos = () => {
	// Extraer proyectos de state inicial
	const proyectoContext = useContext(ProyectoContext);
	const { mensaje, proyectos, obtenerProyectos } = proyectoContext;

	// Extraer un proyecto si esta activo
	const alertaContext = useContext(AlertaContext);
	const { alerta, mostrarAlerta } = alertaContext;

	// Obtener proyectos cuando carga el componente
	useEffect(() => {
		// Si hay un error
		if (mensaje) {
			mostrarAlerta(mensaje.msg, mensaje.categoria);
		}

		obtenerProyectos();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mensaje]);

	// Revisar si proyecto tiene contenidos
	if (proyectos.length === 0) return <p>No hay proyectos, comienza creando uno</p>;

	return (
		<ul className="listado-proyectos">
			{alerta ? <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> : null}
			<TransitionGroup>
				{proyectos.map((proyecto) => (
					<CSSTransition key={proyecto._id} timeout={200} classNames="proyecto">
						<Proyecto proyecto={proyecto} />
					</CSSTransition>
				))}
			</TransitionGroup>
		</ul>
	);
};

export default ListadoProyectos;
