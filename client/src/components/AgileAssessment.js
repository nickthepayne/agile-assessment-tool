/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import * as Survey from 'survey-react';

import 'bootstrap/dist/css/bootstrap.css';
import 'survey-react/survey.css';
import 'nouislider/distribute/nouislider.css';
import 'select2/dist/css/select2.css';
import 'bootstrap-slider/dist/css/bootstrap-slider.css';

// eslint-disable-next-line import/extensions
import 'select2/dist/js/select2.js';

const insertRecaptchaScript = () => {
  const script = document.createElement('script');
  script.src = 'https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit';
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
};

class AgileAssessment extends React.Component {
  constructor(props) {
    super(props);

    const { config } = this.props;

    this.state = {
      model: new Survey.Model(config),
    };

    this.handleCurrentPageChanged = this.handleCurrentPageChanged.bind(this);
  }

  shouldComponentUpdate() {
    const { config } = this.props;
    return !config;
  }

  handleCurrentPageChanged() {
    if (this.isOnLastPage()) {
      insertRecaptchaScript();
    }
  }

  isOnLastPage() {
    const { model } = this.state;
    return model.currentPageNo === model.pageCount - 1;
  }

  render() {
    Survey.Survey.cssType = 'bootstrap';

    const { onComplete, onValueChange } = this.props;
    const { model } = this.state;

    return (
      <div id="pagecontent">
        <div className="github-content mobile-padding row zue-teaser-medium-boxes zue-boxes-container ng-scope">
          <Survey.Survey
            model={model}
            onComplete={onComplete}
            onCurrentPageChanged={this.handleCurrentPageChanged}
            onValueChanged={onValueChange}
          />
        </div>
      </div>
    );
  }
}

AgileAssessment.propTypes = {
  config: PropTypes.shape({}).isRequired,
  onComplete: PropTypes.func.isRequired,
  onValueChange: PropTypes.func.isRequired,
};

export default AgileAssessment;
