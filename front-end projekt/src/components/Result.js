import React, { useEffect, useState } from "react";
import useStateContext from "./hooks/useStateContext";
import { ENDPOINTS, createAPIEndpoint } from "../api";
import {
  CardContent,
  Card,
  Box,
  Typography,
  Button,
  Alert,
} from "@mui/material";
import { formatTime } from "../helper";
import { useNavigate } from "react-router-dom";
import Answer from "./Answer";

export default function Result() {
  const { context, setContext } = useStateContext();
  const [score, setScore] = useState(0);
  const [questionAnswers, setQuestionAnswers] = useState([]);
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    // wydobywam questionIds z context
    const questionIds = context.selectedOptions.map((q) => q.questionId);
    createAPIEndpoint(ENDPOINTS.result)
      .post(questionIds)
      // res zwraca obiekty question dla wysłanych id
      .then((res) => {
        const answers = context.selectedOptions.map((a) => ({
          // dodaje selectedOptions
          ...a,
          // dodaje obiekt question po danym id w context
          ...res.data.find((q) => q.questionId === a.questionId),
        }));
        setQuestionAnswers(answers);
        calculateScore(answers);
      })
      .catch((err) => console.log(err));
  }, []);

  const calculateScore = (answers) => {
    // jeśli odpowiedzi zgadzaja się z wybranymi - zwiększamy licznik
    let score = answers.reduce((accumulator, currentValue) => {
      return currentValue.answer === currentValue.selectedOption
        ? accumulator + 1
        : accumulator;
    }, 0);
    setScore(score);
  };

  const reset = () => {
    setContext({ timeTaken: 0, selectedOptions: [] });
    navigate("/question");
  };

  const submit = () => {
    createAPIEndpoint(ENDPOINTS.score)
      .put(context.userId, {
        userId: context.userId,
        score: score,
        timeTaken: context.timeTaken,
      })
      .then((res) => {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <Card
        sx={{
          maxWidth: 850,
          mx: "auto",
          "& .MuiCardHeader-action": { alignSelf: "center", mx: 0 },
        }}
      >
        <Box>
          <CardContent>
            <Typography variant="h5" textAlign="center" sx={{ mb: 5 }}>
              Gratulacje!
            </Typography>
            <Typography>Wynik: {score} / 5</Typography>
            <Typography>Czas: {formatTime(context.timeTaken)}</Typography>
            <Box
              sx={{ justifyContent: "center", display: "flex", gap: 2, mb: 3 }}
            >
              <Button onClick={submit} variant="contained">
                Zapisz
              </Button>
              <Button onClick={reset} variant="contained">
                Ponów
              </Button>
            </Box>
            <Alert
              severity="success"
              sx={{ visibility: showAlert ? "visible" : "hidden" }}
            >
              Wynik opublikowany
            </Alert>
          </CardContent>
        </Box>
      </Card>
      <Answer questionAnswers={questionAnswers}></Answer>
    </React.Fragment>
  );
}
