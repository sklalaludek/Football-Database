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

class CompetitionList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comp_list: [],
            ready: false
        };
    }

    componentDidMount() {
        axios.get('https://api.football-data.org/v1/competitions', {
            headers: {
                'X-Auth-Token': 'b2190fa9c8134b2d9740ea7738a40a0d'
            }
        }).then(res => {
            let data = res.data;
            this.setState({comp_list: data, ready: true});
        });
    }

    render() {
        const competitions = this.state.comp_list;
        return (
            <div>
            {this.state.ready
                ? <div>
                    <ul>
                        {competitions.map(competition => <li key={competition.id}>
                            <Link to={"/team/" + competition.id}>{competition.caption}</Link>
             						</li>)}
                    </ul>
                </div>
            : <h3>Loading...</h3>
            }
        </div>);
    }
}

export default CompetitionList;
