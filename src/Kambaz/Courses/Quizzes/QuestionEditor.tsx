import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
    Button, Form, Card, Row, Col,
    InputGroup, FormControl, ListGroup
} from "react-bootstrap";
import { FaSave, FaTrash, FaPlus } from "react-icons/fa";
import * as client from "./client";
import { setQuiz, addQuestion, updateQuestion, deleteQuestion } from "./reducer";
import "./questionEditor.css";

export default function QuestionEditor() {
    const { qid } = useParams();
    const dispatch = useDispatch();

    const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
    const [newQuestion, setNewQuestion] = useState(false);
    const [questionData, setQuestionData] = useState<any>({
        title: "",
        questionType: "MULTIPLE_CHOICE",
        points: 1,
        question: "",
        answers: []
    });

    const { quiz } = useSelector((state: any) => state.quizzesReducer);

    const handleNewQuestion = () => {
        setNewQuestion(true);
        setEditingQuestionId(null);
        setQuestionData({
            title: "",
            questionType: "MULTIPLE_CHOICE",
            points: 1,
            question: "",
            answers: [
                { text: "", isCorrect: false },
                { text: "", isCorrect: false }
            ]
        });
    };

    const handleEditQuestion = (question: any) => {
        setNewQuestion(false);
        setEditingQuestionId(question._id);
        setQuestionData({ ...question });
    };

    const handleCancelEdit = () => {
        setNewQuestion(false);
        setEditingQuestionId(null);
    };

    const handleSaveQuestion = async () => {
        try {
            if (!qid) return;

            if (newQuestion) {
                const newQuestionWithId = {
                    ...questionData,
                    _id: uuidv4()
                };
                await client.addQuestionToQuiz(qid, newQuestionWithId);
                dispatch(addQuestion(newQuestionWithId));
            } else if (editingQuestionId) {
                await client.updateQuizQuestion(qid, editingQuestionId, questionData);
                dispatch(updateQuestion({ ...questionData, _id: editingQuestionId }));
            }

            setNewQuestion(false);
            setEditingQuestionId(null);

            const updatedQuiz = await client.findQuizById(qid);
            dispatch(setQuiz(updatedQuiz));
        } catch (error) {
            console.error("Failed to save question:", error);
        }
    };

    const handleDeleteQuestion = async (questionId: string) => {
        try {
            if (!qid) return;

            await client.deleteQuizQuestion(qid, questionId);
            dispatch(deleteQuestion(questionId));

            if (editingQuestionId === questionId) {
                setNewQuestion(false);
                setEditingQuestionId(null);
            }

            const updatedQuiz = await client.findQuizById(qid);
            dispatch(setQuiz(updatedQuiz));
        } catch (error) {
            console.error("Failed to delete question:", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (type === "number") {
            setQuestionData({ ...questionData, [name]: parseInt(value) });
        } else {
            setQuestionData({ ...questionData, [name]: value });
        }
    };

    const handleAnswerChange = (index: number, field: string, value: any) => {
        const newAnswers = [...questionData.answers];
        newAnswers[index] = { ...newAnswers[index], [field]: value };
        setQuestionData({ ...questionData, answers: newAnswers });
    };

    const handleAddAnswer = () => {
        setQuestionData({
            ...questionData,
            answers: [...questionData.answers, { text: "", isCorrect: false }]
        });
    };

    const handleRemoveAnswer = (index: number) => {
        const newAnswers = [...questionData.answers];
        newAnswers.splice(index, 1);
        setQuestionData({ ...questionData, answers: newAnswers });
    };

    const handleSetCorrectAnswer = (index: number) => {
        const newAnswers = questionData.answers.map((answer: any, i: number) => ({
            ...answer,
            isCorrect: i === index
        }));
        setQuestionData({ ...questionData, answers: newAnswers });
    };

    const renderQuestionTypeEditor = () => {
        switch (questionData.questionType) {
            case "MULTIPLE_CHOICE":
                return (
                    <div className="mt-3">
                        <h6>Answer Choices</h6>
                        <p className="text-muted">Select one correct answer</p>

                        {questionData.answers.map((answer: any, index: number) => (
                            <div key={index} className="d-flex align-items-center mb-2">
                                <Form.Check
                                    type="radio"
                                    name="correctAnswer"
                                    checked={answer.isCorrect}
                                    onChange={() => handleSetCorrectAnswer(index)}
                                    className="me-2"
                                />
                                <Form.Control
                                    value={answer.text}
                                    onChange={(e) => handleAnswerChange(index, "text", e.target.value)}
                                    placeholder={`Answer ${index + 1}`}
                                    className="me-2"
                                />
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => handleRemoveAnswer(index)}
                                    disabled={questionData.answers.length <= 2}
                                >
                                    <FaTrash />
                                </Button>
                            </div>
                        ))}

                        <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={handleAddAnswer}
                            className="mt-2"
                        >
                            <FaPlus className="me-2" /> Add Answer Choice
                        </Button>
                    </div>
                );

            case "TRUE_FALSE":
                return (
                    <div className="mt-3">
                        <h6>Correct Answer</h6>
                        <div className="d-flex">
                            <Form.Check
                                type="radio"
                                label="True"
                                name="trueFalseAnswer"
                                checked={questionData.answers[0]?.isCorrect}
                                onChange={() => {
                                    setQuestionData({
                                        ...questionData,
                                        answers: [
                                            { text: "True", isCorrect: true },
                                            { text: "False", isCorrect: false }
                                        ]
                                    });
                                }}
                                className="me-4"
                            />
                            <Form.Check
                                type="radio"
                                label="False"
                                name="trueFalseAnswer"
                                checked={questionData.answers[1]?.isCorrect}
                                onChange={() => {
                                    setQuestionData({
                                        ...questionData,
                                        answers: [
                                            { text: "True", isCorrect: false },
                                            { text: "False", isCorrect: true }
                                        ]
                                    });
                                }}
                            />
                        </div>
                    </div>
                );

            case "FILL_IN_BLANK":
                return (
                    <div className="mt-3">
                        <h6>Acceptable Answers</h6>
                        <p className="text-muted">Add one or more possible correct answers</p>

                        {questionData.answers.map((answer: any, index: number) => (
                            <div key={index} className="d-flex align-items-center mb-2">
                                <Form.Control
                                    value={answer.text}
                                    onChange={(e) => handleAnswerChange(index, "text", e.target.value)}
                                    placeholder={`Possible Answer ${index + 1}`}
                                    className="me-2"
                                />
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => handleRemoveAnswer(index)}
                                    disabled={questionData.answers.length <= 1}
                                >
                                    <FaTrash />
                                </Button>
                            </div>
                        ))}

                        <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={handleAddAnswer}
                            className="mt-2"
                        >
                            <FaPlus className="me-2" /> Add Possible Answer
                        </Button>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div id="wd-question-editor">
            {!newQuestion && !editingQuestionId && (
                <div className="mb-4">
                    <Button
                        variant="primary"
                        onClick={handleNewQuestion}
                        className="mb-3"
                    >
                        <FaPlus className="me-2" /> New Question
                    </Button>

                    {quiz.questions.length === 0 ? (
                        <div className="text-center py-4">
                            <p className="text-muted">No questions yet. Click 'New Question' to add one.</p>
                        </div>
                    ) : (
                        <ListGroup>
                            {quiz.questions.map((question: any, index: number) => (
                                <ListGroup.Item
                                    key={question._id}
                                    className="d-flex justify-content-between align-items-center"
                                >
                                    <div>
                                        <span className="fw-bold">Q{index + 1}: </span>
                                        <span>{question.title || question.question.substring(0, 50)}</span>
                                        <span className="ms-2 text-muted">({question.points} pts)</span>
                                        <span className="ms-2 badge bg-secondary">{question.questionType.replace(/_/g, ' ')}</span>
                                    </div>
                                    <div>
                                        <Button
                                            variant="outline-primary"
                                            size="sm"
                                            className="me-2"
                                            onClick={() => handleEditQuestion(question)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => handleDeleteQuestion(question._id)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </div>
            )}

            {(newQuestion || editingQuestionId) && (
                <Card>
                    <Card.Header>
                        <h5>{newQuestion ? "Add New Question" : "Edit Question"}</h5>
                    </Card.Header>
                    <Card.Body>
                        <Form>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Question Title (optional)</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="title"
                                            value={questionData.title || ""}
                                            onChange={handleChange}
                                            placeholder="Short title for the question"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Question Type</Form.Label>
                                        <Form.Select
                                            name="questionType"
                                            value={questionData.questionType}
                                            onChange={handleChange}
                                        >
                                            <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                                            <option value="TRUE_FALSE">True/False</option>
                                            <option value="FILL_IN_BLANK">Fill in the Blank</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Points</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="points"
                                            value={questionData.points}
                                            onChange={handleChange}
                                            min="1"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className="mb-3">
                                <Form.Label>Question Text</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="question"
                                    value={questionData.question || ""}
                                    onChange={handleChange}
                                    placeholder="Enter your question here"
                                />
                            </Form.Group>

                            {renderQuestionTypeEditor()}

                            <div className="d-flex justify-content-end mt-4">
                                <Button
                                    variant="secondary"
                                    onClick={handleCancelEdit}
                                    className="me-2"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="primary"
                                    onClick={handleSaveQuestion}
                                >
                                    {newQuestion ? "Add Question" : "Update Question"}
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            )}
        </div>
    );
}