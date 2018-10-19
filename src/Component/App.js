import React from 'react';
import Exlore from './explore';
import Detail from './detail';
import Tag from './tag';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import MyNav from "./navbar";

const App = () => (
    <Router>
        <div>
            <MyNav></MyNav>
            <Route exact path="/" component={Exlore}/>
            <Route exact path="/detail/:id" component={Detail}/>
            <Route exact path="/tag" component={Tag}/>
            <Route exact path="/tag/:name" component={Tag}/>
        </div>
    </Router>
)
export default App