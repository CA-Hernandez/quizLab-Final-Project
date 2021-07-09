import React, { useState } from 'react';
import useFetch from 'use-http';
import { Controller, useForm } from 'react-hook-form';
import {
  Button,
  Card,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import ResultModal from '../ResultModal/ResultModal';

const QuizForm = () => {
  const { loading, error, data = [] } = useFetch('/api/questions/', {}, []);
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const [result, setResult] = useState({});
  const [showResult, setShowResult] = useState(false);

  const onSubmit = (formData) => {
    fetch('/api/questions/result', {
      body: JSON.stringify(formData),
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('error with posting results');
      })
      .then((quizResult) => {
        setResult(quizResult);
        setShowResult(true);
      })
      .catch((e) => {
        console.error('Error sending result', e);
      });
  };

  if (loading) {
    return <CircularProgress aria-busy />;
  }

  if (error) {
    return (
      <Card>
        <Typography>Error fetching data from the server</Typography>
      </Card>
    );
  }

  return (
    <Card
      style={{
        maxWidth: 600,
        margin: '4rem auto',
        maxHeight: '80vh',
        overflow: 'auto',
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {data.map((question) => (
          <FormControl
            style={{
              margin: 20,
              display: 'flex',
            }}
            key={question.id}
            component="fieldset"
            error={!!errors[question.id]}
          >
            <FormLabel component="legend">{question.question}</FormLabel>
            <FormHelperText>
              {errors[question.id] && 'Please select an option'}
            </FormHelperText>
            <Controller
              rules={{ required: true }}
              control={control}
              name={question.id}
              render={({ field }) => (
                <RadioGroup {...field}>
                  {question.options.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
                </RadioGroup>
              )}
            />
          </FormControl>
        ))}
        <Button color="primary" style={{ width: '100%' }} type="submit">
          Submit
        </Button>
      </form>

      <ResultModal
        show={showResult}
        result={result}
        onClose={() => setShowResult(false)}
      />
    </Card>
  );
};

export default QuizForm;
