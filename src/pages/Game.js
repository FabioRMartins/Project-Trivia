import React from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HeaderGame from '../components/HeaderGame';
import { fetchGetRequest, fetchGetQuestion } from '../redux/actions';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: {},
      shuffledAnswers: [],
      currentQuestionIndex: 0,
      nxtButtonDisabled: true,
      questionButtonDisabled: false,
      correctStyle: {},
      wrongStyle: {},
    };
  }

  componentDidMount() {
    this.fetchGetQuestion();
  }

  fetchGetQuestion = async () => {
    const { history } = this.props;
    fetchGetRequest();
    const getQuestion = await fetchGetQuestion();
    const code = 3;
    if (getQuestion.response_code === code) {
      localStorage.removeItem('token');
      history.push('/');
    }
    const questions = getQuestion.results;
    const currentQuestionIndex = 0;
    const currentQuestion = questions[currentQuestionIndex];
    const NUMBER = 0.5;
    const allAnswers = [
      ...currentQuestion.incorrect_answers,
      currentQuestion.correct_answer,
    ];
    const shuffledAnswers = allAnswers.sort(() => Math.random() - NUMBER);
    console.log(shuffledAnswers);
    this.setState({
      questions,
      shuffledAnswers,
    });
  }

  checkAnswer = (e) => {
    e.preventDefault();
    const { target } = e;
    const { questions, currentQuestionIndex } = this.state;
    const correctAnswer = questions[currentQuestionIndex].correct_answer;
    if (target.value === correctAnswer) {
      // Aqui entra a logica de somar pontos corretos
      console.log('acertou');
    }
    this.setState({
      nxtButtonDisabled: false,
      questionButtonDisabled: true,
      correctStyle: { border: '3px solid rgb(6, 240, 15' },
      wrongStyle: { border: '3px solid red' },
    });
  }

  shuffledAnswers = () => {
    const { questions, currentQuestionIndex } = this.state;
    const currentQuestion = questions[currentQuestionIndex];
    const NUMBER = 0.5;
    const allAnswers = [
      ...currentQuestion.incorrect_answers,
      currentQuestion.correct_answer,
    ];
    const shuffledAnswers = allAnswers.sort(() => Math.random() - NUMBER);
    this.setState({
      shuffledAnswers,
    });
  }

  nextQuestion = (e) => {
    e.preventDefault();
    const { questions, currentQuestionIndex } = this.state;
    const { history } = this.props;
    if (currentQuestionIndex < questions.length - 1) {
      this.setState({
        currentQuestionIndex: currentQuestionIndex + 1,
        nxtButtonDisabled: true,
        questionButtonDisabled: false,
        correctStyle: {},
        wrongStyle: {},
      }, () => this.shuffledAnswers());
    } else {
      history.push('/feedback');
    }
  }

  clickToHome = (event) => {
    event.preventDefault();
    const { history } = this.props;
    history.push('/');
  }

  renderQuestions = () => {
    const {
      questions,
      currentQuestionIndex,
      questionButtonDisabled,
      correctStyle,
      wrongStyle,
      shuffledAnswers,
    } = this.state;
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = currentQuestion.correct_answer;
    return (
      <div>
        <p data-testid="question-category">{currentQuestion.category}</p>
        <p data-testid="question-text">{currentQuestion.question}</p>
        <div data-testid="answer-options">
          {
            shuffledAnswers.map((answer, index) => (
              (answer !== correctAnswer)
                ? (
                  <button
                    type="submit"
                    key={ index }
                    value={ answer }
                    data-testid={ `wrong-answer-${index}` }
                    onClick={ this.checkAnswer }
                    disabled={ questionButtonDisabled }
                    style={ wrongStyle }
                  >
                    {answer}
                  </button>
                ) : (
                  <button
                    type="submit"
                    key={ index }
                    value={ answer }
                    data-testid="correct-answer"
                    onClick={ this.checkAnswer }
                    disabled={ questionButtonDisabled }
                    style={ correctStyle }
                  >
                    {answer}
                  </button>
                )
            ))
          }
        </div>
      </div>
    );
  }

  render() {
    const { questions, nxtButtonDisabled } = this.state;
    return (
      <main>
        <HeaderGame />
        <div>
          {
            questions.length > 0 ? this.renderQuestions() : <p>Carregando</p>
          }
          {
            <button
              type="submit"
              onClick={ this.nextQuestion }
              disabled={ nxtButtonDisabled }
              data-testid="btn-next"
            >
              Proximo
            </button>
          }
        </div>
        <button
          type="submit"
          data-testid="btn-ranking"
          onClick={ this.viewRanking }
        >
          Ver Ranking
        </button>

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

Game.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default Game;
