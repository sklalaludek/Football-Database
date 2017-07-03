import React from 'react';
import ReactDOM from 'react-dom';
import {
    Router,
    Route,
    Link,
    IndexLink,
    IndexRoute,
    hashHistory
} from 'react-router';

import CompetitionList from './components/competitionList.jsx';
import TeamsList from './components/teamsList.jsx';
import PlayersList from './components/playersList.jsx';
import NotFound from './components/notFound.jsx';

class Home extends React.Component {
    render(){
        return <h1>Choose competition</h1>;
    }
}

class CompetitionTemplate extends React.Component {
    render() {
        return <div>
            <div>
                <CompetitionList />
            </div>
            <div>
                <TeamsList />
            </div>
        </div>;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    class App extends React.Component {
        render() {
            return <div>
                <Home />
                <CompetitionTemplate />
            </div>;
        }
    }

    ReactDOM.render(
        <App />, document.getElementById('app'));
});
