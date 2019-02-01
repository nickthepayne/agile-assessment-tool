import * as QuestionType from './QuestionType';

function generateSurveyConfig(config) {
    return {
        showProgressBar: 'top',
        questionTitleTemplate: '{no}. {title}',
        pages: config.pages.map(page => ({
            questions: page.questions.map(question => generateQuestionConfig(question))
        }))
    };
}

function generateQuestionConfig(question) {
    const questionConfig = {
        type: question.type,
        name: `${question.category}__${question.question}`,
        title: question.question,
        description: question.description
    };

    if (question.type === QuestionType.RADIO || question.type === QuestionType.DROPDOWN) {
        questionConfig.choices = question.choices;
    }

    if (question.type === QuestionType.MULTIPLE_TEXT) {
        questionConfig.items = question.items;
    }

    return questionConfig;
}

const generatePageConfig = page => {

    const questions = page.questions.map(question => generateQuestionConfig(question));

    return {
        questions
    };
};

export {
    generatePageConfig,
    generateSurveyConfig
}