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
import cacheProxy from './cacheProxy';

document.addEventListener('DOMContentLoaded', function() {

    class Competitions extends React.Component {
        constructor(props){
            super(props);

            this.state = {
                leagues : [],
                loading : true,
                team : 424
            }
        }
        handleOnClick = (i) => {
            this.setState({team : i})
        }

        componentDidMount() {
            cacheProxy.get('http://api.football-data.org/v1/competitions')
            .then(dataObj => {
                console.log('ComDataObj', dataObj);
                this.setState({
                    leagues : dataObj,
                    loading : false
                });
        });
    }
        render() {
            // console.log('this', this.state.leagues);
            if(this.state.loading){
                return null;
            }
            const listOfLeagues = this.state.leagues.map((item) => {
                return <li key={item.id} onClick={e => this.handleOnClick(item.id)}>{item.caption}</li>;
            });

            return <div style={{width: '100%'}}>
                <div style={{width: '300px', height: '100vh', display: 'inline-block', border: `1px solid red`}}>
                    <h1>Wybierz ligę: </h1>
                        {listOfLeagues}
                </div>
                <Teams teams={this.state.team}/>
            </div>;
        }
    }

    class Teams extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                teams : this.props.teams,
                team : [],
                players : [],
                loading : true
            }
        }

        handleOnClickPlayers = (h) => {
            this.setState({players : h});
        }
        // componentDidMount() {
        //     console.log('this props teams', this.props);
        //     cacheProxy.get(`http://api.football-data.org/v1/competitions/${this.props.teamsID}/teams`)
        //     .then(data => {
        //         const teamsObj = data.teams;
        //         console.log('TeamsDataObj', teamsObj);
        //         this.setState({
        //             teams : teamsObj,
        //             loading : false
        //         });
        //         console.log('data',data);
        //     });
        // }

        componentWillReceiveProps(nextProps){
                    console.log('nextProps', nextProps);
                   this.setState({
                       teams : nextProps.teams
                   }, () => {
                       cacheProxy.get(`http://api.football-data.org/v1/competitions/${this.state.teams}/teams`)
                          .then(obj => {
                              console.log('obj', obj);
                              this.setState({
                                  team : obj,
                                  loading : false
                              });
                   });
                //    console.log('data',teams);
               });
        }

        render(){
            console.log('this state id', this.state.teams);
            console.log('team co to', this.state.team);
            if(this.state.loading){
                return null;
            }
            const listOfTeams = this.state.team.teams.map((team,index) => {
                return <li key={index} onClick={h => this.handleOnClickPlayers(team._links.players.href)}>{team.name}</li>;
            });
            console.log('listOfTeams', listOfTeams);
            return <div style={{width: '300px', height: '100vh', display: 'inline-block', border: `1px solid green`}}>
                {listOfTeams}
                <Players players={this.state.players}/>
            </div>;
        }
    }

    class Players extends React.Component{
        constructor(props){
            super(props);

            this.state = {
                loading : true,
                players : [],
                player : []
            }
        }
        componentWillReceiveProps(nextProps){
                   this.setState({
                       players : nextProps.players
                   }, () => {
                       cacheProxy.get(`${this.state.players}`)
                          .then(obj => {
                              console.log('obj', obj);
                              this.setState({
                                  player : obj,
                                  loading : false
                              });
                   });
               });
        }
        render(){
            if(this.state.loading){
              return null;
          }
          const listOfPlayers = this.state.player.players.map((item,index) => {
            return <li key={index} >{item.name}</li>;
        });
          return <div style={{width: '300px', height: '100vh', display: 'inline-block', border: `1px solid green`}}>{listOfPlayers}</div>;
        }
    }

    class App extends React.Component {
        render() {
            return <Competitions />;
        }
    }

    ReactDOM.render(
        <App />, document.getElementById('app'));
});
