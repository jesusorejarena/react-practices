import React from 'react';

// Components
import Profile from './components/Profile';
import UserList from './components/UserList';

// Context
import UserState from './context/User/UserState';

// Librerias
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	// El context se coloca de primero para que este disponible para los demas componentes

	return (
		<UserState>
			<div class="container p-4">
				<div class="row">
					<div class="col-md-7">
						<UserList />
					</div>
					<div class="col-md-5">
						<Profile />
					</div>
				</div>
			</div>
		</UserState>
	);
}

export default App;
