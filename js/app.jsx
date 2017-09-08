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
import CompetitionTemplate from './components/competitionTemplate.jsx';
import TeamList from './components/teamList.jsx';
import PlayersList from './components/playersList.jsx';
import cacheProxy from './cacheProxy';

document.addEventListener('DOMContentLoaded', function() {
    class App extends React.Component {

        render() {
            return <Router history={hashHistory}>
                <Route path='/' component={CompetitionTemplate}>
                        <Route path='/comp/:compId' component={CompetitionList}>
                            <Route path='team/:teamId' component={TeamList}/>
                                <Route path='players/:playerId' component={PlayersList} />
                        </Route>
                </Route>
            </Router>;
        }
    }
    ReactDOM.render(
        <App />, document.getElementById('app'));
});
