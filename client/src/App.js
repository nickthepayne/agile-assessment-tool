import React, { Component } from 'react';
import axios from 'axios';
import uuidv1 from 'uuid/v1';
import { generateSurveyConfig } from './config/surveyConfig';
import Analytics from './utils/analytics';

import Header from './components/Header';
import Footer from './components/Footer';
import FootNote from './components/FootNote';
import AgileAssessment from './components/AgileAssessment';
import Result from './components/Result';

const PageState = {
  SURVEY: 'SURVEY',
  EVALUATION: 'EVALUATION',
  LOADING: 'LOADING',
};

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageState: PageState.LOADING,
      showBanner: true,
      surveyConfig: undefined,
      surveyResult: undefined,
    };

    this.loadSurveyConfig();
  }

  componentDidMount() {
    Analytics.setUp();
  }

  onComplete(result) {
    this.setState((prevState) => ({
      ...prevState,
      pageState: PageState.LOADING,
    }));

    const surveyResult = {
      id: uuidv1(),
      ...result.data,
    };

    try {
      axios.post('api/survey', surveyResult);
    } catch (err) {
      console.error(err);
    }

    this.setState((prevState) => ({
      ...prevState,
      surveyResult,
      pageState: PageState.EVALUATION,
    }));
  }

  onValueChange() {
    this.setState((prevState) => ({
      ...prevState,
      showBanner: false,
    }));
  }

  getContent() {
    const { pageState, surveyConfig, surveyResult } = this.state;

    switch (pageState) {
    case PageState.EVALUATION:
      return <Result surveyResult={surveyResult} />;
    case PageState.LOADING:
      return <div className="spinner">&nbsp;</div>;
    default:
      return (
        surveyConfig && (
          <AgileAssessment
            config={surveyConfig}
            onComplete={(result) => this.onComplete(result)}
            onValueChange={() => this.onValueChange()}
          />
        )
      );
    }
  }

  async loadSurveyConfig() {
    try {
      if (!this.surveyConfig) {
        const urlParams = new URLSearchParams(window.location.search);
        const env = urlParams.get('env');

        const response = await axios.get(`api/surveyconfig${env ? `?env=${env}` : ''}`);
        const surveyConfig = generateSurveyConfig(response.data);
        this.setState((prevState) => ({
          ...prevState,
          surveyConfig,
          pageState: PageState.SURVEY,
        }));
      }
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { showBanner } = this.state;
    const content = this.getContent();

    return (
      <div id="outer">
        <Header showBanner={showBanner} />
        {content}
        <FootNote />
        <Footer />
      </div>
    );
  }
}
