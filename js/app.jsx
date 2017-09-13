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
// import cacheProxy from './cacheProxy';

document.addEventListener('DOMContentLoaded', function() {
        ReactDOM.render(
	<Router history={hashHistory}>
		<Route path='/' component={CompetitionTemplate}>
	        <Route path='/competition/:id' component={CompetitionList} />
	        <Route path='/team/:competionId/teamIndex' component={TeamList} />
	        //  <Route path='/team/:teamIndex' component={TeamList}/>
             <Route path='/player/:teamId/:playerIndex' component={PlayersList} />
	        // <Route path='/players/:playerId' component={PlayersList} />
		</Route>
	</Router>, document.getElementById('app'));
});
