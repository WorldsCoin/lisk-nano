import React from 'react';
import grid from 'flexboxgrid/dist/flexboxgrid.css';
import { Button } from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';
import styles from './voting.css';
import ConfirmVotes from './confirmVotes';

class VotingHeader extends React.Component {
  constructor() {
    super();
    this.state = {
      query: '',
      searchIcon: 'search',
    };
  }
  search(name, value) {
    const icon = value.length > 0 ? 'close' : 'search';
    this.setState({
      query: value,
      searchIcon: icon,
    });
    this.props.search(value);
  }
  clearSearch() {
    if (this.state.searchIcon === 'close') {
      this.search('query', '');
    }
  }
  render() {
    return (
      <header className={`${grid.row} ${grid['between-xs']} hasPaddingRow`}>
        <div className={`${grid['col-xs-3']} ${styles.searchBox}`}>
          <Input type='tel' label='Search' name='query'
            value={this.state.query}
            onChange={this.search.bind(this, 'query')}
          />
          <i className={`material-icons ${styles.searchIcon}`} onClick={ this.clearSearch.bind(this) }>
            {this.state.searchIcon}
          </i>
        </div>
        <Button icon='done' flat
          onClick={() => this.props.setActiveDialog({
            title: 'Verify Vote for delegates',
            childComponent: ConfirmVotes,
          })}
          label={`VOTE (+${this.props.votedList.length} / -${this.props.unvotedList.length})`} />
      </header>
    );
  }
}
export default VotingHeader;
