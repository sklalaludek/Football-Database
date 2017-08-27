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

class PlayersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            player_list: [],
            ready: false
        }
    }

    componentDidMount() {
        const teamId = this.props.params.teamId
        // const idRegx = /http\:\/\/api.football-data.org\/v1\/teams\/(\d+)/;
        cacheProxy.get("http://api.football-data.org/v1/teams/" + teamId + "/players")
            .then(data => {
                const player_list = data.players.map(player => {
                    console.log(player);
                    return <li>{player.name}</li>;
                });
                this.setState({
                    player_list: player_list,
                    ready: true
                });
            });
    }

    render() {
        if (this.state.ready) {
            return <div>
                <div>
                    <ul>{this.state.player_list}</ul>;
                </div>
                {this.props.children}
            </div>;
        } else {
            return <h3>Loading...</h3>;
        }
    }
}

export default PlayersList;
