import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import md5 from 'crypto-js/md5';

class HeaderFeedback extends Component {
  constructor() {
    super();
    this.state = {
      gravatarImg: '',
    };
  }

  componentDidMount() {
    const { email } = this.props;
    const hash = md5(email).toString();
    const url = `https://www.gravatar.com/avatar/${hash}`;
    this.setState({
      gravatarImg: url,
    });
  }

  render() {
    const { name, score } = this.props;
    const { gravatarImg } = this.state;
    return (
      <header>
        <ul>
          <img
            src={ gravatarImg }
            alt="Trivia"
            data-testid="header-profile-picture"
          />
          <li data-testid="header-player-name">{name}</li>
          <li data-testid="header-score">{score}</li>
        </ul>
      </header>
    );
  }
}

HeaderFeedback.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  email: state.player.gravatarEmail,
});

export default connect(mapStateToProps, null)(HeaderFeedback);
