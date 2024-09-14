import axios from 'axios';
import {BACKEND_URL} from "../constant";


// Get all quizzes (for analytics)
export const getAllQuizzes = async () => {
  try {
    const response = await axios.get('http://localhost:4000/api/user/analytics');
    return response.data;
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    throw error;
  }
};

// Get a specific question by ID
export const getQuestionById = async (questionId) => {
  try {
    const response = await axios.get(`http://localhost:4000/api/user/analytics/${questionId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching question with ID ${questionId}:`, error);
    throw error;
  }
};

// Get a specific quiz by ID
export const getQuizById = async (quizId) => {
  try {
    const response = await axios.get(`http://localhost:4000/api/user/analytics/q/${quizId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching quiz with ID ${quizId}:`, error);
    throw error;
  }
};

// Get all questions for a specific quiz
export const getAllQuestionsForQuiz = async (quizId) => {
  try {
    const response = await axios.get(`http://localhost:4000/api/user/analytics/questionWise/${quizId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching questions for quiz with ID ${quizId}:`, error);
    throw error;
  }
};

// Get dashboard data
export const getDashboardData = async () => {
  try {
    const response = await axios.get('http://localhost:4000/api/user/dashboard');
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};

