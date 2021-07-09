import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import QuizModal from '../components/QuizModal/QuizModal';
import QuizForm from '../components/QuizForm/QuizForm';

const HomeScreen = () => (
  <div>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Quiz App</Typography>
      </Toolbar>
    </AppBar>
    <QuizForm />
    <QuizModal />
  </div>
);

export default HomeScreen;
