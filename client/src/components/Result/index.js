import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Evaluation from './Evaluation';
import AgileLinks from './AgileLinks';
import Profile from './Profile';
import Feedback from './Feedback';
import { evaluateScore } from '../../utils/scoreEvaluator';

import '../../styles/result.scss';

class Result extends React.Component {
  constructor(props) {
    super(props);

    this.scrollRef = React.createRef();

    this.state = {
      evaluations: undefined,
      contact: undefined,
    };
  }

  componentWillMount() {
    const { surveyResult } = this.props;
    const evaluations = evaluateScore(surveyResult);

    const contact = Object.keys(surveyResult)
      .filter((key) => key.split('__')[0] === 'contact')
      .map((key) => surveyResult[key])[0];

    this.setState((prevState) => ({
      ...prevState,
      evaluations,
      contact,
    }));
  }

  componentDidMount() {
    // since we are not using a router, the scroll position is preserved when we change
    // the view, so we need to reset to the top of the content.
    const contentTop = this.scrollRef.offsetTop;
    const currentTop = document.documentElement.scrollTop || document.body.scrollTop;
   
    if (currentTop > contentTop) {
      window.scrollTo(0, contentTop);
    }
  }

  async onSubmitFeedback(feedback) {
    const { surveyResult } = this.props;
    await axios.post('api/feedback', { ...feedback, surveyId: surveyResult.id });
  }

  render() {
    const { evaluations } = this.state;
    return (
      <div
        id="pagecontent"
        ref={(ref) => {
          this.scrollRef = ref;
        }}
      >
        <div className="github-content row">
          <div className="result-content">
            <div className="result-left">
              <h3 className="color-primary">Thank you for participating!</h3>
              {evaluations && <Evaluation evaluations={evaluations} />}
              <Feedback onSubmit={(feedback) => this.onSubmitFeedback(feedback)} />
              <AgileLinks />
            </div>
            <Profile />
          </div>
        </div>
      </div>
    );
  }
}

Result.propTypes = {
  surveyResult: PropTypes.shape({}).isRequired,
};

export default Result;
