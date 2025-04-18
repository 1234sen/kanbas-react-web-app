import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    Button, Form, Card, Tabs, Tab, Row, Col,
    InputGroup, FormControl, ToggleButton, ButtonGroup
} from "react-bootstrap";
import { FaSave, FaArrowLeft, FaPlus, FaTrash } from "react-icons/fa";
import * as client from "./client";
import { setQuiz } from "./reducer";
import QuestionEditor from "./QuestionEditor";
import "./editor.css";

export default function QuizEditor() {
    const { cid, qid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("details");
    const [formData, setFormData] = useState<any>({});

    const { quiz } = useSelector((state: any) => state.quizzesReducer);
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    useEffect(() => {
        if (currentUser && currentUser.role !== "FACULTY") {
            navigate(`/Kambaz/Courses/${cid}/Quizzes`);
        }
    }, [currentUser]);

    const fetchQuiz = async () => {
        try {
            setLoading(true);
            if (qid) {
                const data = await client.findQuizById(qid);
                dispatch(setQuiz(data));
                setFormData(data);
            }
        } catch (error) {
            console.error("Failed to fetch quiz:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuiz();
    }, [qid]);

    // 处理表单变更
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData({ ...formData, [name]: checked });
        } else if (type === "number") {
            setFormData({ ...formData, [name]: parseInt(value) });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // 保存测验
    const handleSave = async (publish = false) => {
        try {
            const updatedQuiz = {
                ...formData,
                published: publish ? true : formData.published
            };

            await client.updateQuiz(updatedQuiz);
            dispatch(setQuiz(updatedQuiz));

            if (publish) {
                navigate(`/Kambaz/Courses/${cid}/Quizzes`);
            } else {
                navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}`);
            }
        } catch (error) {
            console.error("Failed to save quiz:", error);
        }
    };

    // 取消编辑
    const handleCancel = () => {
        navigate(`/Kambaz/Courses/${cid}/Quizzes`);
    };

    // 创建新问题
    const handleAddQuestion = () => {
        setActiveTab("questions");
    };

    if (loading) {
        return <div className="text-center my-5"><div className="spinner-border text-primary" role="status" /></div>;
    }

    return (
        <div id="wd-quiz-editor" className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>{formData.title ? `Edit Quiz: ${formData.title}` : "New Quiz"}</h3>
                <div>
                    <Button
                        variant="secondary"
                        className="me-2"
                        onClick={handleCancel}
                    >
                        <FaArrowLeft className="me-2" /> Cancel
                    </Button>
                    <Button
                        variant="success"
                        className="me-2"
                        onClick={() => handleSave(true)}
                    >
                        <FaSave className="me-2" /> Save & Publish
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => handleSave()}
                    >
                        <FaSave className="me-2" /> Save
                    </Button>
                </div>
            </div>

            <Tabs
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k || "details")}
                className="mb-4"
            >
                <Tab eventKey="details" title="Details">
                    <Card>
                        <Card.Body>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Quiz Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="title"
                                        value={formData.title || ""}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="description"
                                        value={formData.description || ""}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Quiz Type</Form.Label>
                                            <Form.Select
                                                name="quizType"
                                                value={formData.quizType || "GRADED_QUIZ"}
                                                onChange={handleChange}
                                            >
                                                <option value="GRADED_QUIZ">Graded Quiz</option>
                                                <option value="PRACTICE_QUIZ">Practice Quiz</option>
                                                <option value="GRADED_SURVEY">Graded Survey</option>
                                                <option value="UNGRADED_SURVEY">Ungraded Survey</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Assignment Group</Form.Label>
                                            <Form.Select
                                                name="assignmentGroup"
                                                value={formData.assignmentGroup || "QUIZZES"}
                                                onChange={handleChange}
                                            >
                                                <option value="QUIZZES">Quizzes</option>
                                                <option value="EXAMS">Exams</option>
                                                <option value="ASSIGNMENTS">Assignments</option>
                                                <option value="PROJECT">Project</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Check
                                                type="checkbox"
                                                label="Shuffle Answers"
                                                name="shuffleAnswers"
                                                checked={formData.shuffleAnswers || false}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Time Limit (minutes)</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="timeLimit"
                                                value={formData.timeLimit || 20}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Check
                                                type="checkbox"
                                                label="Multiple Attempts"
                                                name="multipleAttempts"
                                                checked={formData.multipleAttempts || false}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        {formData.multipleAttempts && (
                                            <Form.Group className="mb-3">
                                                <Form.Label>Attempts Allowed</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="attemptsAllowed"
                                                    value={formData.attemptsAllowed || 1}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>
                                        )}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Check
                                                type="checkbox"
                                                label="Show Correct Answers"
                                                name="showCorrectAnswers"
                                                checked={formData.showCorrectAnswers || false}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Access Code (optional)</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="accessCode"
                                                value={formData.accessCode || ""}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Check
                                                type="checkbox"
                                                label="One Question at a Time"
                                                name="oneQuestionAtATime"
                                                checked={formData.oneQuestionAtATime || false}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Check
                                                type="checkbox"
                                                label="Webcam Required"
                                                name="webcamRequired"
                                                checked={formData.webcamRequired || false}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Check
                                                type="checkbox"
                                                label="Lock Questions After Answering"
                                                name="lockQuestionsAfterAnswering"
                                                checked={formData.lockQuestionsAfterAnswering || false}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Due Date</Form.Label>
                                            <Form.Control
                                                type="datetime-local"
                                                name="dueDate"
                                                value={formData.dueDate ? new Date(formData.dueDate).toISOString().slice(0, 16) : ""}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Available From</Form.Label>
                                            <Form.Control
                                                type="datetime-local"
                                                name="availableFrom"
                                                value={formData.availableFrom ? new Date(formData.availableFrom).toISOString().slice(0, 16) : ""}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Available Until</Form.Label>
                                            <Form.Control
                                                type="datetime-local"
                                                name="availableUntil"
                                                value={formData.availableUntil ? new Date(formData.availableUntil).toISOString().slice(0, 16) : ""}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Tab>

                <Tab eventKey="questions" title="Questions">
                    <Card>
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h5>Questions</h5>
                                <Button
                                    variant="success"
                                    onClick={handleAddQuestion}
                                >
                                    <FaPlus className="me-2" /> New Question
                                </Button>
                            </div>

                            <QuestionEditor />
                        </Card.Body>
                    </Card>
                </Tab>
            </Tabs>
        </div>
    );
}