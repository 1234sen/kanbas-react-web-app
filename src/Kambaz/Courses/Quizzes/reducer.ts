import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quizzes: [],
    quiz: {
        title: "New Quiz",
        description: "",
        quizType: "GRADED_QUIZ",
        assignmentGroup: "QUIZZES",
        shuffleAnswers: true,
        timeLimit: 20,
        multipleAttempts: false,
        attemptsAllowed: 1,
        showCorrectAnswers: true,
        accessCode: "",
        oneQuestionAtATime: true,
        webcamRequired: false,
        lockQuestionsAfterAnswering: false,
        questions: []
    },
    currentQuestion: null,
    quizAttempt: null,
    loading: false,
    error: null
};

const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        setQuizzes: (state, action) => {
            state.quizzes = action.payload;
        },
        addQuiz: (state, action) => {
            state.quizzes.push(action.payload);
        },
        deleteQuiz: (state, action) => {
            state.quizzes = state.quizzes.filter(
                quiz => quiz._id !== action.payload
            );
        },
        updateQuiz: (state, action) => {
            state.quizzes = state.quizzes.map(quiz => {
                if (quiz._id === action.payload._id) {
                    return action.payload;
                }
                return quiz;
            });
        },
        setQuiz: (state, action) => {
            state.quiz = action.payload;
        },
        addQuestion: (state, action) => {
            state.quiz.questions.push(action.payload);
        },
        updateQuestion: (state, action) => {
            state.quiz.questions = state.quiz.questions.map(question => {
                if (question._id === action.payload._id) {
                    return action.payload;
                }
                return question;
            });
        },
        deleteQuestion: (state, action) => {
            state.quiz.questions = state.quiz.questions.filter(
                question => question._id !== action.payload
            );
        },
        setCurrentQuestion: (state, action) => {
            state.currentQuestion = action.payload;
        },
        setQuizAttempt: (state, action) => {
            state.quizAttempt = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const {
    setQuizzes,
    addQuiz,
    deleteQuiz,
    updateQuiz,
    setQuiz,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    setCurrentQuestion,
    setQuizAttempt,
    setLoading,
    setError
} = quizzesSlice.actions;

export default quizzesSlice.reducer;