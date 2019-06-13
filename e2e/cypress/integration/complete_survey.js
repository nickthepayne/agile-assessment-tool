describe('Complete Survey', () => {
  const goNextSurveyPage = () => {
    cy.get('input[value="Next"]').click();
  };

  const goPreviousSurveyPage = () => {
    cy.get('input[value="Previous').click();
  };

  before(() => {
    cy.server();
    cy.route('POST', '/api/survey').as('postSurvey');
  });

  it('display start survey button on page load', () => {
    cy.visit('/');
    cy.get('button[id="start-survey"').should('be.visible');
  });

  it('display welcome banner on load', () => {
    cy.contains(
      "We've created this survey for people currently working on or with agile teams as a lighthearted way to gain some insights and ideas for potential improvements in line with the continuous improvement at the heart of every true agilist.",
    ).should('be.visible');
  });

  it('display 1st and 2nd question on start survey', () => {
    cy.get('button[id="start-survey"').click();
    cy.contains(
      'Is your organisation currently practicing plan-driven or agile software development?',
    ).should('be.visible');
    cy.contains('How happy are you with your current software development process?').should(
      'be.visible',
    );
  });

  it('display survey banner on start survey', () => {
    cy.contains(
      "Our self-assessment tool will provide some insights into the agility of your organisation. Be honest - we won't judge!",
    ).should('be.visible');
  });

  it('should not display glitchy numbering', () => {
    cy.contains(
      '1. Is your organisation currently practicing plan-driven or agile software development?',
    ).should('not.exist');
    cy.contains('2. How happy are you with your current software development process?').should(
      'not.exist',
    );
  });

  it('should display footnote on page load', () => {
    cy.contains('we create solutions that satisfy our customers. We develop').should('be.visible');
  });

  it('display 3rd question on selecting answers and going to the next page', () => {
    cy.contains('Mostly Agile').click();
    cy.contains('Somewhat happy').click();
    goNextSurveyPage();
    cy.contains('What units do you use for estimation?').should('be.visible');
  });

  it('display 1st and 2nd question on selecting previous page', () => {
    goPreviousSurveyPage();
    cy.contains('How happy are you with your current software development process?').should(
      'be.visible',
    );
  });

  it('display 3rd question on selecting next page', () => {
    goNextSurveyPage();
    cy.contains('What units do you use for estimation?').should('be.visible');
  });

  it('display 4th question on selecting answers and going to the next page', () => {
    cy.get('select').select('Story Points');
    goNextSurveyPage();
    cy.contains('How confident are you that your current project will be successful?').should(
      'be.visible',
    );
  });

  it('display 5th question on selecting answers and going to the next page', () => {
    cy.get('input[type="radio"][value="1"]')
      .parent()
      .click();
    goNextSurveyPage();
    cy.contains('Do teams in your organisation use Scrum?').should('be.visible');
  });

  it('display 6th question on selecting radio buttons', () => {
    cy.contains('No').click();
    cy.contains('Yes').click();
    cy.contains('How often do you reach your sprint goals?').should('be.visible');
  });

  it('display contact form on selecting answers and going to the next page', () => {
    cy.contains('We achieve them sometimes').click();
    goNextSurveyPage();
  });

  it('display results page on submission of contact details', () => {
    cy.get('input[aria-label="Name"]').type('Worker');
    cy.get('input[aria-label="Email"]').type('example@zuhlke.com');
    cy.get('input[aria-label="Organisation"]').type('Zuhlke');
    cy.get('input[type=checkbox]').click();
    cy.get('input[value="Complete"]').click();
    cy.contains('Thank you for participating!');
  });

  it('display correct results data', () => {
    cy.get('.agility')
      .find('.score-bar')
      .its('width')
      .should('be', '80%');
    cy.get('.estimation')
      .find('.score-bar')
      .its('width')
      .should('be', '100%');
    cy.get('.mood')
      .find('.score-bar')
      .its('width')
      .should('be', '20%');
    cy.get('.scrum')
      .find('.score-bar')
      .its('width')
      .should('be', '60%');
  });

  it('display correct number of links and profiles', () => {
    cy.get('.linkSection ul')
      .children('.card')
      .should('have.length', 4);
    cy.get('.contacts .profiles')
      .children('.profile')
      .should('have.length', 2);
  });

  it('display correct text on feedback submission', () => {
    cy.contains('We\'d love to hear from you!').not();
    cy.get('textarea[name="feedback"]').type('This was a great survey!');
    cy.get('button[type="submit"]').click();
    cy.contains('Thank you for your feedback!');
    cy.contains('We&apos;d love to hear from you!').should('not.exist');
  });
});
