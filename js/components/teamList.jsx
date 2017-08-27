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
import cacheProxy from '../cacheProxy';

class TeamList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            team_list: [],
            ready: false
        }
    }

    componentDidMount() {
        const compId = this.props.compId;
        const idRegx = /http\:\/\/api.football-data.org\/v1\/teams\/(\d+)/;

        cacheProxy.get("http://api.football-data.org/v1/competitions/" + compId + "/teams")
            .then(data => {
                const team_list = data.teams.map(team => {
                    const href = team._links.self.href;
                    const teamId = idRegx.exec(href)[1];
                    return <li key={teamId}>{team.name} <img src={team.crestUrl} height="8" width="16"/>
                    </li>});
                this.setState({
                    team_list: team_list,
                    ready: true
                });
            });
    }

    render() {
       if (this.state.ready) {
           return <ul>{this.state.team_list}</ul>;
       } else {
           return <h3>Loading...</h3>;
       }
   }
}

class Teams extends React.Component {

    render() {
            return <div>
                <div>
                    <TeamList compId={this.props.params.compId} />
                </div>
                {this.props.children}
            </div>;
    }
}

export default TeamList;
