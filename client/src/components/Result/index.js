import React from 'react';
import PropTypes from 'prop-types';
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

    const { surveyResult } = props;

    const contact = surveyResult.contact__contact;

    this.state = {
      evaluations: undefined,
      contact,
    };
  }

  componentDidMount() {
    const { surveyResult } = this.props;

    const evaluations = evaluateScore(surveyResult);

    this.setState((prevState) => ({
      ...prevState,
      evaluations,
    }));

    // since we are not using a router, the scroll position is preserved when we change
    // the view, so we need to reset to the top of the content.
    const contentTop = this.scrollRef.offsetTop;
    const currentTop = document.documentElement.scrollTop || document.body.scrollTop;

    if (currentTop > contentTop) {
      window.scrollTo(0, contentTop);
    }
  }

  render() {
    const { surveyResult } = this.props;
    const { evaluations, contact } = this.state;
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
              <Feedback contact={contact} surveyId={surveyResult.id} />
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
  surveyResult: PropTypes.element.isRequired,
};

export default Result;
