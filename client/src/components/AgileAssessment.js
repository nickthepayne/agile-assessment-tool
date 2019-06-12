/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import axios from 'axios';
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
      recaptchaToken: undefined,
    };

    this.handleCurrentPageChanged = this.handleCurrentPageChanged.bind(this);
    this.verifyCaptcha = this.verifyCaptcha.bind(this);
  }

  componentDidMount() {
    this.setupRecaptcha();
  }

  shouldComponentUpdate() {
    const { config } = this.props;
    return !config;
  }

  setupRecaptcha() {
    window.onloadCallback = () => {
      window.grecaptcha.render('recaptcha', {
        sitekey: ['development', 'test'].includes(process.env.NODE_ENV)
          ? process.env.REACT_APP_TEST_SITE_KEY
          : process.env.REACT_APP_SITE_KEY,
        callback: (token) => {
          this.setState((prevState) => ({
            ...prevState,
            recaptchaToken: token,
          }));
        },
      });
    };
  }

  async verifyCaptcha(survey, options) {
    const { recaptchaToken } = this.state;

    if (!this.isOnLastPage()) {
      options.complete();
      return;
    }

    try {
      const result = await axios.post('api/verifycaptcha', { recaptchaToken });
      if (!result.data.success) {
        // eslint-disable-next-line no-alert
        alert('Please complete the reCAPTCHA');
        return;
      }

      options.complete();
    } catch (err) {
      console.error(err);
    }
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
            onServerValidateQuestions={this.verifyCaptcha}
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
