import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
    Router,
    Route,
    Link,
    IndexLink,
    IndexRoute,
    hashHistory
} from 'react-router';

class PlayersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            player_list: [],
            ready: false
        }
    }

    // componentDidMount() {
    //     const teamId = this.props.params.teamId;
    //
    //     // const idRegx = /http\:\/\/api.football-data.org\/v1\/teams\/(\d+)/;
    //     cacheProxy.get("http://api.football-data.org/v1/teams/" + teamId + "/players")
    //         .then(data => {
    //             const player_list = data.players.map(player => {
    //                 console.log(player);
    //                 return <li>{player.name}</li>;
    //             });
    //             this.setState({
    //                 player_list: player_list,
    //                 ready: true
    //             });
    //         });
    // }

    componentDidUpdate() {
        const teamId = this.props.params;
        console.log(teamId);
        axios.get(`http://api.football-data.org/v1/teams/${teamId}/players`, {
            headers: {
                'X-Auth-Token': 'b2190fa9c8134b2d9740ea7738a40a0d'
            }
        }).then(res => {
            let data = res.data;
            console.log(data)
            this.setState({player_list: res.players, ready: true});
        });
    }

    render() {
        const players = this.state.player_list;
        return (
            <div>
                {this.state.ready
                    ? <div>
                            <ul>
                                {players.map(players, index => <li key={index}>
                                    {players.name}
                                </li>)}
                            </ul>
                        </div>
                    : <h3>Loading...</h3>
}
            </div>
        )
    }
}

export default PlayersList;
