import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { QuizBox } from "../../Component/QuizBox/QuizBox";
import { useSelector } from "react-redux";
import convertToK from "../../Component/Converter/convertToK";
import { LoadingSVG } from "../../assets/LoadingSvg";
import axios from 'axios';
import {BACKEND_URL} from "../../constant";



const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({});

  const userState = useSelector((state) => state.user);
  const currentUser = userState?.currentUser;

  

  useEffect(() => {
    const fetchD = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/user/dashboard`);
        setDashboardData(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser) {
      fetchD();
    }
  }, []);

  const [loading, setLoading] = useState(false);
  const [trendingQuizzes, setTrendingQuizzes] = useState([]);
  useEffect(() => {
    const fetchD = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BACKEND_URL}/api/quiz/trending`);
        setTrendingQuizzes(res?.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchD();
    }
  }, []);

  return (
    <div className={styles.dashboard}>
      <div className={styles.mainContent}>
        <div className={styles.singleContent} style={{ color: "orange" }}>
          <p className={styles.heading}>
            <span>{dashboardData.totalQuizzesCreatedByUser} </span> Quiz
          </p>
          <p className={styles.para}>Created</p>
        </div>

        <div className={styles.singleContent} style={{ color: "green" }}>
          <p className={styles.heading}>
            <span>{dashboardData?.totalQuestionCreatedByUser} </span>Questions
          </p>
          <p className={styles.para}>Created</p>
        </div>

        <div className={styles.singleContent} style={{ color: "blue" }}>
          <p className={styles.heading}>
            <span>{convertToK(dashboardData?.totalImpressions)} </span> Total
          </p>
          <p className={styles.para}>Impressions</p>
        </div>
      </div>

      <h6 style={{ margin: "4rem 0 3rem 0", fontSize: "2rem" }}>
        Trending Quizzes
      </h6>

      <div className={styles.quizzesComp}>
        {loading ? (
          <div style={{ textAlign: "center" }}>{LoadingSVG}</div>
        ) : trendingQuizzes?.length === 0 ? (
          <div style={{ color: "#123456" }}>No trending quizzes!</div>
        ) : (
          trendingQuizzes?.map((trendingQuiz) => (
            <QuizBox key={trendingQuiz?._id} quizData={trendingQuiz} />
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;