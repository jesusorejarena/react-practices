import React, { useContext, useState, useEffect } from 'react';

import ProyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {
	// Extraer un proyecto si esta activo
	const proyectoContext = useContext(ProyectoContext);
	const { proyecto } = proyectoContext;

	// Obtener la funcion del context de tarea
	const tareaContext = useContext(TareaContext);
	const { tareaseleccionada, errortarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea } =
		tareaContext;

	// Effect que detecta si hay una tarea seleccionada
	useEffect(() => {
		if (tareaseleccionada !== null) {
			guardarTarea(tareaseleccionada);
		} else {
			guardarTarea({
				nombre: '',
			});
		}
	}, [tareaseleccionada]);

	// State del formulario
	const [tarea, guardarTarea] = useState({
		nombre: '',
	});

	// Extraer el nombre del proyecto
	const { nombre } = tarea;

	// Si no hay proyecto seleccionado
	if (!proyecto) return null;

	// Array destructuring para extraer el proyecto actual
	const [proyectoActual] = proyecto;

	// Leer los valores del formulario
	const handleChange = (e) => {
		guardarTarea({
			...tarea,
			[e.target.name]: e.target.value,
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();

		// Validar
		if (nombre.trim() === '') {
			validarTarea(nombre);
			return;
		}

		// Si es edicion o nueva tarea
		if (tareaseleccionada === null) {
			// Agregar la nueva tarea al state de tareas
			tarea.proyecto = proyectoActual._id;
			agregarTarea(tarea);
		} else {
			// Actualizar tarea existente
			actualizarTarea(tarea);

			// Elimina tareaseleccionada del state
			limpiarTarea();
		}

		// Obtener y filtrar las tareas del proyecto actual
		obtenerTareas(proyectoActual._id);

		// Reiniciar el form
		guardarTarea({
			nombre: '',
		});
	};

	return (
		<div className="formulario">
			<form onSubmit={onSubmit}>
				<div className="contenedor-input">
					<input
						type="text"
						className="input-text"
						placeholder="Nombre Tarea..."
						name="nombre"
						value={nombre}
						onChange={handleChange}
					/>
				</div>

				<div className="contenedor-input">
					<input
						type="submit"
						className="btn btn-primario btn-submit btn-block"
						value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
					/>
				</div>
			</form>
			{errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
		</div>
	);
};

export default FormTarea;