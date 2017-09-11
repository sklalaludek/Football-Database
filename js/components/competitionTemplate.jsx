import React from 'react';
import ReactDOM from 'react-dom';
import CompetitionList from './competitionList.jsx';

export class CompetitionTemplate extends React.Component {
    render() {
        return (
            <div className='main_view'>
            <h2>choose competition:</h2>
            <CompetitionList/> {this.props.children}
        </div>);
    }
}

export default CompetitionTemplate;
