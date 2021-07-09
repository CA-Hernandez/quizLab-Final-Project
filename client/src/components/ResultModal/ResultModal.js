import React from 'react';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Modal,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const calculatePercentage = (score, total) =>
  ((score / total) * 100).toFixed(2);

const ResultModal = ({ show, onClose, result }) => (
  <Modal open={show} onClose={onClose}>
    <Card
      style={{
        width: 500,
        margin: '10rem auto',
      }}
    >
      <CardActionArea>
        <CardMedia
          image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
          style={{
            width: '100%',
            height: 140,
          }}
        />
        <CardContent>
          <Typography>You {result.summary}</Typography>
          <Typography>
            You scored {result.score} out of {result.total}
          </Typography>
          <Typography>
            That&apos;s {calculatePercentage(result.score, result.total)}%
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={onClose}>Close</Button>
      </CardActions>
    </Card>
  </Modal>
);

ResultModal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  result: PropTypes.shape({
    score: PropTypes.number,
    total: PropTypes.number,
    summary: PropTypes.string,
  }),
};

ResultModal.defaultProps = {
  show: false,
  result: {
    score: 0,
    total: 1,
    summary: 'failed',
  },
};

export default ResultModal;
