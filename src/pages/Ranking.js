import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getRanking from '../helpers/localStorage';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    const ranking = getRanking();
    console.log(ranking);
    this.setState({
      ranking: ranking.sort((a, b) => b.score - a.score),
    });
  }

    clickToHome = (event) => {
      event.preventDefault();
      const { history } = this.props;
      history.push('/');
    }

    render() {
      const { ranking } = this.state;
      return (
        <main>
          <h1 data-testid="ranking-title">Ranking</h1>
          <ol>
            {ranking.length > 0 && (
              ranking.map((item, index) => (
                <li key={ index }>
                  <img
                    src={ item.picture }
                    alt={ `imagem de perfil de ${item.name}` }
                  />
                  <p
                    data-testid={ `player-name-${index}` }
                  >
                    { item.name }
                  </p>
                  <p
                    data-testid={ `player-score-${index}` }
                  >
                    { item.score }
                  </p>
                </li>
              ))
            )}
          </ol>
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
