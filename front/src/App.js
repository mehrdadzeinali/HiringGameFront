import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import routes from './routes';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                {routes.map((route, index) => (
                    <Route 
                        key={index}
                        path={route.path}
                        element={React.createElement(route.component)}
                    />
                ))}
            </Routes>
        </Router>
    );
}

export default App;
