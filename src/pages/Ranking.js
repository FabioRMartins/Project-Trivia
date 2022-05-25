import React, { Component } from 'react';
/* import { connect } from 'react-redux'; */
/* import PropTypes from 'prop-types'; */

class Ranking extends Component {
  /* constructor() {
    super();
    this.state = {
      ranking: JSON.parse(localStorage.getItem(ranking)),
    };
  }
 */
  render() {
    /* const { ranking } = this.state; */
    return (
      <main>
        <h1 data-testid="ranking-title">Ranking</h1>
        {/* {ranking.map((item, index) => (
          <div
            key={ index }
          >
            <h1 data-testid={ `player-name-${index}` }>{ item.name }</h1>
            <h1 data-testid={ `player-score-${index}` }>{ item.score }</h1>
            <h1>{ item.picture }</h1>
          </div>
        ))} */}
      </main>
    );
  }
}

/* const mapStateToProps = (state)({
  name: state.player.name,
  score: state.player.score,
}); */

/* export default connect(mapStateToProps)(Ranking); */

export default Ranking;
