import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Panel from '../Components/Panel/Panel';
import routes from '../Routes/routes';


function Main({ user }) {
    const ROUTES = routes.map((r, i) => <Route exact path={r.path} key={r.path} render={props => <r.component {...props} />} />)
    return <Router>
        <Panel userLogged={user}>
            <Switch>
                {ROUTES}
            </Switch>
        </Panel>

    </Router>
}

export default Main
