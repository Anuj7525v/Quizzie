import React, { useState } from 'react';
import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import Dashboard from "../Dashboard/Dashboard";
import Analytics from "../Analytics/Analytics";
import toast from 'react-hot-toast';
import { CreateQuiz } from '../CreateQuiz/CreateQuiz';


function Home() {
  const [currentPage, setCurrentPage] = useState('Dashboard');
  const [openCreateQuizModal, setOpenCreateQuizModal] = useState(false);
  const navigate = useNavigate();

  const logouthandle = async () => {
    try {
      localStorage.removeItem("token");
      console.log('Logout Confirmed');
      toast.success("Logout Successfully.");
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  const switchPage = () => {
    switch (currentPage) {
      case '/dashboard':
        return <Dashboard />;
      case '/analytics':
        return <Analytics />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <div className={styles.page}>
        <div className={styles.sidebar}>
          <h1 className={styles.logo}>QUIZZIE</h1>
          
          <ul className={styles.menu}>
            <li className={styles.menuBox} onClick={() => navigate('dashboard')}>Dashboard</li>
            <li className={styles.menuBox} onClick={() => navigate('analytics')}>Analytics</li>
            <li className={styles.menuBox} onClick={() => setOpenCreateQuizModal(true)}>Create Quiz</li>
          </ul>

          <div className={styles.btn2}>
            <button className={styles.logout} onClick={logouthandle}>LOGOUT</button>
          </div>
        </div>
        <div className={styles.mainbar}>
          {switchPage()}
        </div>
      </div>

      {/* CreateQuiz Modal */}
      <CreateQuiz 
      openCreateQuizModal={openCreateQuizModal}
        setOpenCreateQuizModal={setOpenCreateQuizModal} 
      />
    </>
  );
}

export default Home;
