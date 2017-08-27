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
import TeamList from './components/teamList.jsx';
import PlayersList from './components/playersList.jsx';
import NotFound from './components/notFound.jsx';
import cacheProxy from './cacheProxy';

class Home extends React.Component {

    render(){
        return <h1>Choose competition:</h1>;
    }
}

class CompetitionTemplate extends React.Component {

    render() {
        return <div>
            <div className='main_view'>
                <Home />
                <CompetitionList />
                {this.props.children}
            </div>
        </div>;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    class App extends React.Component {

        render() {
            return <Router history={hashHistory}>
                <Route path='/' component={Home}>
                    <IndexRoute component={CompetitionTemplate}/>
                    <Route path='/comp/:compId' component={CompetitionList}>
                        <Route path='team/:teamId' component={TeamList}/>
                            <Route path='players/:playerId' component={PlayersList} />
                        </Route>
                    <Route path='*' component={NotFound}/>
                </Route>
            </Router>;
        }
    }
    ReactDOM.render(
        <App />, document.getElementById('app'));
});
