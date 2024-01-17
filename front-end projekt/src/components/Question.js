import React, { useEffect, useState } from "react";
import { BASE_URL, ENDPOINTS, createAPIEndpoint } from "../api";
import {
  Card,
  CardContent,
  ListItemButton,
  Typography,
  List,
  CardHeader,
  LinearProgress,
  Box,
  CardMedia,
} from "@mui/material";
import { formatTime } from "../helper";
import useStateContext from "./hooks/useStateContext";
import { useNavigate } from "react-router-dom";

export default function Question() {
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const { context, setContext } = useStateContext();
  const navigate = useNavigate();

  let timer;

  const startTimer = () => {
    // funkcja wywoływana co sekunde [] - 1000
    timer = setInterval(() => {
      // prev callback czeka na zakonczenie poprzedniego wywołania
      setTimeTaken((prev) => prev + 1);
    }, 1000);
  };

  //   useEffect(() => {
  //     // funkcja wywoływana co sekunde [] - 1000
  //     const timer = setInterval(() => {
  //       // prev callback czeka na zakonczenie poprzedniego wywołania
  //       setTimeTaken((prev) => prev + 1);
  //     }, 1000);
  //     return () => clearInterval(timer);
  //   }, []);

  useEffect(() => {
    setContext({
      timeTaken: 0,
      selectedOptions: [],
    });
    startTimer();
    createAPIEndpoint(ENDPOINTS.question)
      .fetch()
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((err) => {
        console.log(err);
        clearInterval(timer);
      });
    // useEffect funkcja zwrotna - wykonywana w momencie dezaktywacji / zmiany komponentu
    return () => clearInterval(timer);
  }, []);

  const updateAnswer = (questionId, optionIndex) => {
    const temp = [...context.selectedOptions];
    temp.push({
      questionId: questionId,
      selectedOption: optionIndex + 1,
    });

    if (questionIndex === 4) {
      setContext({ selectedOptions: [...temp], timeTaken: timeTaken });
      navigate("/result");
    } else {
      setContext({ selectedOptions: [...temp] });
      // przechodzę do kolejnego pytania
      setQuestionIndex(questionIndex + 1);
    }
  };

  let abcd = "ABCD";

  return questions.length !== 0 ? (
    <Card
      sx={{
        maxWidth: 850,
        mx: "auto",
        "& .MuiCardHeader-action": { alignSelf: "center", mx: 0 },
      }}
    >
      <CardHeader
        title={`Pytanie ${questionIndex + 1} / 5`}
        action={<Typography>{formatTime(timeTaken)}</Typography>}
      />
      <Box>
        <LinearProgress
          variant="determinate"
          value={((questionIndex + 1) / 5) * 100}
        ></LinearProgress>
      </Box>
      {questions[questionIndex].imageName !== null ? (
        <CardMedia
          component="img"
          image={`${BASE_URL}images/${questions[questionIndex].imageName}.jpg`}
          sx={{ m: "10px auto" }}
        ></CardMedia>
      ) : null}
      <CardContent>
        <Typography>{questions[questionIndex].questionInWords}</Typography>
        <List>
          {questions[questionIndex].options.map((item, index) => (
            <ListItemButton
              key={index}
              disableRipple
              onClick={() =>
                updateAnswer(questions[questionIndex].questionId, index)
              }
            >
              <Box>
                <b>{abcd[index]}</b> - {item}
              </Box>
            </ListItemButton>
          ))}
        </List>
      </CardContent>
    </Card>
  ) : null;
}
