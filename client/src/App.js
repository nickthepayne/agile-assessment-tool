import React, { Component } from 'react';
import axios from 'axios';
import uuidv1 from 'uuid/v1';
import { generateSurveyConfig } from './config/surveyConfig';
import Analytics from './utils/analytics';

import Header from './components/Header';
import Footer from './components/Footer';
import AgileAssessment from './components/AgileAssessment';
import Result from './components/Result';

export const PageState = {
  LOADING: 'LOADING',
  WELCOME: 'WELCOME',
  SURVEY: 'SURVEY',
  EVALUATION: 'EVALUATION',
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

    this.startSurvey = this.startSurvey.bind(this);
  }

  componentDidMount() {
    Analytics.setUp();
    this.showWelcomePage();
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
    case PageState.WELCOME:
      return (
        <div id="pagecontent">
          <div className="columns">
            <h5>
                We&apos;ve created this survey for people currently working on or with agile teams
                as a lighthearted way to gain some insights and ideas for potential improvements in
                line with the continuous improvement at the heart of every true agilist.
            </h5>
            <h5>
                If your company is not currently working in an agile way, get in touch with us to
                find out what your organisation can gain from iterative development led by customer
                feedback.
            </h5>
            <button type="button" id="start-survey" onClick={this.startSurvey}>
                Start Survey
            </button>
          </div>
        </div>
      );
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

  startSurvey() {
    this.loadSurveyConfig().then(() => {
      this.setState((prevState) => ({
        ...prevState,
        showBanner: true,
        pageState: PageState.SURVEY,
      }));
    });
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
          pageState: PageState.LOADING,
        }));
      }
    } catch (err) {
      console.error(err);
    }
  }

  showWelcomePage() {
    this.setState((prevState) => ({
      ...prevState,
      showBanner: false,
      pageState: PageState.WELCOME,
    }));
  }

  render() {
    const { showBanner } = this.state;
    const content = this.getContent();

    return (
      <div id="outer">
        <Header showBanner={showBanner} />
        {content}
        <Footer />
      </div>
    );
  }
}
