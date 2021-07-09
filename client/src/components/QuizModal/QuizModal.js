import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Modal,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import useFetch from 'use-http';

const QuizModal = () => {
  const [open, changeOpen] = useState(true);
  const {
    loading,
    error,
    data = {},
  } = useFetch('/api/questions/count', {}, []);

  return (
    <Modal open={open} onClose={() => changeOpen(false)}>
      <Card
        style={{
          maxWidth: 600,
          margin: '10rem auto',
        }}
      >
        <CardContent>
          {error && <Typography>Error getting the data</Typography>}
          <Typography variant="h4">Welcome to the quiz</Typography>
          <Typography>This is your first time giving the quiz</Typography>
          <Typography>There are {data.count} questions to answer.</Typography>
          <Typography>Press below to start the quiz</Typography>
        </CardContent>
        <CardActions>
          <Button
            disabled={!!error}
            color="primary"
            onClick={() => changeOpen(false)}
          >
            {loading ? <CircularProgress /> : 'Start the quiz'}
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
};

export default QuizModal;
