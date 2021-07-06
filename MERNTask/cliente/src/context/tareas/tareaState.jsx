import React, { useReducer } from 'react';

import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';

import {
	TAREAS_PROYECTO,
	AGREGAR_TAREA,
	VALIDAR_TAREA,
	ELIMINAR_TAREA,
	TAREA_ACTUAL,
	ACTUALIZAR_TAREA,
	LIMPIAR_TAREA,
	TAREA_ERROR,
} from '../../types/index';

import clienteAxios from '../../config/axios';

const TareaState = (props) => {
	const initialState = {
		tareasproyecto: [],
		errortarea: false,
		tareaseleccionada: null,
		mensaje: null,
	};

	// Crear dispatch y state
	const [state, dispatch] = useReducer(TareaReducer, initialState);

	// Crear las funciones

	// Obtener las tareas de un proyecto
	const obtenerTareas = async (proyecto) => {
		try {
			const resultado = await clienteAxios.get('/api/tareas', { params: { proyecto } });

			dispatch({
				type: TAREAS_PROYECTO,
				payload: resultado.data.tareas,
			});
		} catch (error) {
			const alerta = {
				msg: 'Hubo un error',
				categoria: 'alerta-error',
			};
			dispatch({
				type: TAREA_ERROR,
				payload: alerta,
			});
		}
	};

	// Agregar una tarea al proyecto seleccionado
	const agregarTarea = async (tarea) => {
		try {
			const resultado = await clienteAxios.post('/api/tareas', tarea);
			dispatch({
				type: AGREGAR_TAREA,
				payload: resultado.data.tarea,
			});
		} catch (error) {
			const alerta = {
				msg: 'Hubo un error',
				categoria: 'alerta-error',
			};
			dispatch({
				type: TAREA_ERROR,
				payload: alerta,
			});
		}
	};

	// Valida y muestra un error en caso de que sea necesario
	const validarTarea = () => {
		dispatch({
			type: VALIDAR_TAREA,
		});
	};

	// Eliminar tarea por id
	const eliminarTarea = async (id, proyecto) => {
		try {
			await clienteAxios.delete(`/api/tareas/${id}`, { params: { proyecto } });
			dispatch({
				type: ELIMINAR_TAREA,
				payload: id,
			});
		} catch (error) {
			const alerta = {
				msg: 'Hubo un error',
				categoria: 'alerta-error',
			};
			dispatch({
				type: TAREA_ERROR,
				payload: alerta,
			});
		}
	};

	// Edita o modifica una tarea
	const actualizarTarea = async (tarea) => {
		try {
			const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);

			dispatch({
				type: ACTUALIZAR_TAREA,
				payload: resultado.data.tarea,
			});
		} catch (error) {
			const alerta = {
				msg: 'Hubo un error',
				categoria: 'alerta-error',
			};
			dispatch({
				type: TAREA_ERROR,
				payload: alerta,
			});
		}
	};

	// Extrae una tarea para edicion
	const guardarTareaActual = (tarea) => {
		dispatch({
			type: TAREA_ACTUAL,
			payload: tarea,
		});
	};

	// Elimina la tarea seleccionada
	const limpiarTarea = () => {
		dispatch({
			type: LIMPIAR_TAREA,
		});
	};

	return (
		<TareaContext.Provider
			value={{
				tareasproyecto: state.tareasproyecto,
				errortarea: state.errortarea,
				tareaseleccionada: state.tareaseleccionada,
				mensaje: state.mensaje,
				obtenerTareas,
				agregarTarea,
				validarTarea,
				eliminarTarea,
				guardarTareaActual,
				actualizarTarea,
				limpiarTarea,
			}}
		>
			{props.children}
		</TareaContext.Provider>
	);
};

export default TareaState;
