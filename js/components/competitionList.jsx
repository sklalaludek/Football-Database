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

class CompetitionList extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            comp_list: [],
            ready: false
        }
    }

    componentDidMount(){
        cacheProxy.get('http://api.football-data.org/v1/competitions')
        .then(dataObj => {
            console.log('dataObj from competition list', dataObj);
            const comp_list = dataObj.map(function(competition){
                return <li key={competition.id}><Link to={"/comp/" + competition.id}>{competition.caption}</Link>
                </li>;
            });
            this.setState({
                comp_list: comp_list,
                ready: true
            });
        });
    }

    render() {
        if (this.state.ready) {
            return <ul>{this.state.comp_list}</ul>;
        } else {
            return <h3>Loading...</h3> ;
        }
    }
}

export default CompetitionList;
