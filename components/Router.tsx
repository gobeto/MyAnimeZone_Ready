import { BrowserRouter as Router, Route } from 'react-router-dom';
import Library from '@/components/animesLibrary';
//import AnimePage from '@/components/AnimePage';
import React from 'react';
import Navbar from '@/components/Navbar';

function App() {
    return (
        <Router>
            <Route path="/" Component={Library} />
            {/* <Route path="/anime/:id" Component={AnimePage} /> */}
        </Router>
    );
}

export default App;