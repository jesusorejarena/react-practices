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

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
	switch (action.type) {
		case TAREAS_PROYECTO:
			return {
				...state,
				tareasproyecto: action.payload,
			};

		case AGREGAR_TAREA:
			return {
				...state,
				tareasproyecto: [action.payload, ...state.tareasproyecto],
				errortarea: false,
			};

		case VALIDAR_TAREA:
			return {
				...state,
				errortarea: true,
			};

		case ELIMINAR_TAREA:
			return {
				...state,
				tareasproyecto: state.tareasproyecto.filter((tarea) => tarea._id !== action.payload),
			};

		case ACTUALIZAR_TAREA:
			return {
				...state,
				tareasproyecto: state.tareasproyecto.map((tarea) =>
					tarea._id === action.payload._id ? action.payload : tarea
				),
				/* tareaseleccionada: null, */ // Tambien se puede hacer de esta forma sin necesitada de hacer la parte de LIMPIAR_TAREA
			};

		case TAREA_ACTUAL:
			return {
				...state,
				tareaseleccionada: action.payload,
			};

		case LIMPIAR_TAREA:
			return {
				...state,
				tareaseleccionada: null,
			};

		case TAREA_ERROR:
			return {
				...state,
				mensaje: action.payload,
			};

		default:
			return state;
	}
};
