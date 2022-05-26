import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  clickToHome = (event) => {
    event.preventDefault();
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <main>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          onClick={ this.clickToHome }
          data-testid="btn-go-home"
        >
          Inicio
        </button>
      </main>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default Ranking;
