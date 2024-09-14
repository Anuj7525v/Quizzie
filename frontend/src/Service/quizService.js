import axios from 'axios';
import {BACKEND_URL} from '../constant';




// Create a new quiz
export const createQuiz = async (quizData, isTokenVerified) => {
  try {
    const response = await axios.post('http://localhost:4000/api/quiz', quizData, {
      headers: {
        Authorization: `Bearer ${isTokenVerified}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Delete a quiz by ID
export const deleteQuiz = async (quizId, token) => {
  try {
    const response = await axios.delete(`http://localhost:4000/api/quiz/${quizId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Update a quiz by ID
export const updateQuiz = async (quizId, updatedData, token) => {
  try {
    const response = await axios.put(`http://localhost:4000/api/quiz/update/${quizId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Increase impressions for a quiz
export const increaseImpressionQuiz = async (quizId) => {
  try {
    const response = await axios.put(`http://localhost:4000/api/quiz/${quizId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// View trending quizzes
export const viewTrendingQuizzes = async (token) => {
  try {
    const response = await axios.get('http://localhost:4000/api/quiz/trending', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Play a quiz
export const playQuiz = async (playData) => {
  try {
    const response = await axios.patch('http://localhost:4000/api/quiz/playquiz', playData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
