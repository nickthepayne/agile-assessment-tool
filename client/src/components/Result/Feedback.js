import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Analytics from '../../utils/analytics';

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      feedback: null,
      privacyAgreement: false,
    };
  }

  componentDidMount() {
    Analytics.viewPage('/feedback');
    Analytics.event('completed', 'survey');
  }

  async handleSubmit(event) {
    event.preventDefault();

    const { feedback, privacyAgreement } = this.state;
    const { contact } = this.props;
    const email = contact && contact.email;
    const organisation = contact && contact.organisation;

    await this.submitFeedback({ feedback, email, organisation, privacyAgreement });
  }

  async submitFeedback(feedback) {
    const { surveyId } = this.props;
    await axios.post('api/feedback', { ...feedback, surveyId });

    this.setState((prev) => ({
      ...prev,
      feedbackSaved: true,
    }));
  }

  handleFeedbackChanged(feedback) {
    this.setState((prev) => ({
      ...prev,
      feedback,
    }));
  }

  render() {
    const { feedback, feedbackSaved } = this.state;
    return (
      <div className="feedback">
        {!feedbackSaved && (
          <div className="feedback-form">
            <h5>We&apos;d love to hear from you!</h5>
            <p>
              Get in touch if you&apos;d like to receive a personalised assessment based on your
              answers, or for a more in-depth conversation on the value agile practices can bring to
              your organisation.
            </p>
            <form onSubmit={(ev) => this.handleSubmit(ev)}>
              <textarea
                name="feedback"
                placeholder="Feedback / Comments / Specific areas of interest"
                disabled={feedbackSaved}
                onChange={(event) => this.handleFeedbackChanged(event.target.value)}
              />
              <button type="submit" disabled={!feedback || feedbackSaved}>
                Submit
              </button>
            </form>
          </div>
        )}
        {feedbackSaved && <span className="feedback-saved-hint">Thank you for your feedback!</span>}
      </div>
    );
  }
}

Feedback.propTypes = {
  contact: PropTypes.element.isRequired,
  surveyId: PropTypes.element.isRequired,
};

export default Feedback;
