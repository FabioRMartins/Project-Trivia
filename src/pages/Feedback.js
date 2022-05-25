import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HeaderFeedback from '../components/HeaderFeedback';

class Feedback extends Component {
  messageToShow = () => {
    const { score, assertions } = this.props;
    const THREE = 3;
    const answers = (
      <div>
        <p>
          Você acertou&nbsp;
          <span data-testid="feedback-total-question">{assertions}</span>
          &nbsp;Pergunta(as)!
          <br />
          Um total de&nbsp;
          <span data-testid="feedback-total-score">{score}</span>
          &nbsp;pontos!
        </p>
      </div>
    );
    if (Number(assertions) < THREE) {
      return (
        <section>
          <h1 data-testid="feedback-text">Could be better...</h1>
          {answers}
        </section>
      );
    }

    return (
      <section>
        <h1 data-testid="feedback-text">Well Done!</h1>
        {answers}
      </section>
    );
  }

  playAgain = (e) => {
    e.preventDefault();
    const { history } = this.props;
    history.push('/');
  }

  viewRanking = (e) => {
    e.preventDefault();
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const messageToShow = this.messageToShow();
    return (
      <main>
        <HeaderFeedback />
        {messageToShow}
        <button
          type="submit"
          data-testid="btn-play-again"
          onClick={ this.playAgain }
        >
          Jogar Novamente
        </button>
        <button
          type="submit"
          data-testid="btn-ranking"
          onClick={ this.viewRanking }
        >
          Ver Ranking
        </button>
      </main>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

// export default Feedback;
export default connect(mapStateToProps, null)(Feedback);
