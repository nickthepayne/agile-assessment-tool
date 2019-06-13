/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import * as Survey from 'survey-react';
import showdown from 'showdown';

import 'bootstrap/dist/css/bootstrap.css';
import 'survey-react/survey.css';
import 'nouislider/distribute/nouislider.css';
import 'select2/dist/css/select2.css';
import 'bootstrap-slider/dist/css/bootstrap-slider.css';

// eslint-disable-next-line import/extensions
import 'select2/dist/js/select2.js';

class AgileAssessment extends React.Component {
  shouldComponentUpdate() {
    const { config } = this.props;
    return !config;
  }

  render() {
    Survey.Survey.cssType = 'bootstrap';

    const { config, onComplete, onValueChange } = this.props;

    const model = new Survey.Model(config);

    const converter = new showdown.Converter();
    model.onTextMarkdown.add((survey, options) => {
      // convert the mardown text to html
      let str = converter.makeHtml(options.text);
      // remove root paragraphs <p></p>
      str = str.substring(3);
      str = str.substring(0, str.length - 4);
      // set html
      // eslint-disable-next-line no-param-reassign
      options.html = str;
    });

    return (
      <div id="pagecontent">
        <div className="github-content row">
          <Survey.Survey
            model={model}
            onComplete={onComplete}
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
