import React from 'react';
import ReactDOM from 'react-dom';
import CompetitionList from './competitionList.jsx';

export class CompetitionTemplate extends React.Component {
    render() {
        return (
            <div className='main_view'>
            <CompetitionList/>
            {this.props.children}
        </div>);
    }
}

export default CompetitionTemplate;
