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

    componentDidUpdate() {
        const teamId = this.props.params.playerId;
        axios.get(`https://api.football-data.org/v1/teams/${teamId}/players`, {
            headers: {
                'X-Auth-Token': 'b2190fa9c8134b2d9740ea7738a40a0d'
            }
        }).then(res => {
            let data = res.data;
            this.setState({player_list: data.players, ready: true});
        });
    }

    render() {
        const players = this.state.player_list;
        return (
            <div>
                {this.state.ready
                    ? <div>
                            <ul>
                                {players.map(player => <li>
                                    {player.name}
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
