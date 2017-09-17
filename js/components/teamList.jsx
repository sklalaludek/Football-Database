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
// import cacheProxy from '../cacheProxy';

class TeamList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            team_list: [],
            ready: false
        }
    }

        componentDidMount() {
            const compId = this.props.params.teamIndex;
            axios.get(`https://api.football-data.org/v1/competitions/${compId}/teams`, {
                headers: {
                    'X-Auth-Token': 'b2190fa9c8134b2d9740ea7738a40a0d'
                }
            }).then(res => {
                let data = res.data;
                const team_list = data.teams.map(team => {
                    const teamId = team._links.self.href.match(/http:\/\/api.football-data.org\/v1\/teams\/([0-9]+)/)[1];
                    return <li key={teamId}><Link to={"/players/" + teamId}>{team.name} <img src={team.crestUrl} height="8" width="16"/></Link>
                    </li>;
                })
                this.setState({team_list: team_list, ready: true});
            });
        }
        render() {
         return(
           <div>
               {this.state.ready
                ? <div>
                    <ul>
                       {this.state.team_list}
                   </ul>
                  </div>
                : <h3>Loading... teamList</h3>
               }
           </div>
         )
      }
   }

export default TeamList;
