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
            const teamIndex = this.props.params.teamIndex;
            console.log('teamIndex',teamIndex);
            axios.get(`http://api.football-data.org/v1/competitions/${teamIndex}/teams`, {
                headers: {
                    'X-Auth-Token': 'b2190fa9c8134b2d9740ea7738a40a0d'
                }
            }).then(res => {
                let data = res.data;
                // console.log(data);
                this.setState({team_list: data.teams, ready: true});
            });
        }
        // {team_list.map(team => {
        //     let teamId = team._links.self.href.match(/http:\/\/api.football-data.org\/v1\/teams\/([0-9]+)/)[1];
        //      <li key={teamId}><Link to={"/players/" + teamId}>{team.name} <img src={team.crestUrl} height="8" width="16"/></Link></li>
        // }
        //  )}
        render() {
         const team_list = this.state.team_list;
         return(
           <div>
               {this.state.ready
                ? <div>
                    <ul>
                       {team_list.map((team, index) =>
                            <li key={index}>
                                <Link to={"/players/" + index}>{team.name}<img src={team.crestUrl} height="8" width="16"/></Link>
                            </li>
                        )};
                   </ul>
                  </div>
                : <h3>Loading... teamList</h3>
               }
           </div>
         )
      }
   }

export default TeamList;
