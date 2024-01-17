import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CardMedia,
  List,
} from "@mui/material";
import { BASE_URL } from "../api";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { green, red } from "@mui/material/colors";

export default function Answer({ questionAnswers }) {
  let abcd = "ABCD";

  return (
    <Box
      sx={{
        maxWidth: 850,
        mx: "auto",
        "& .MuiCardHeader-action": { alignSelf: "center", mx: 0 },
        mt: 2,
      }}
    >
      {questionAnswers.map((item, key) => (
        <Accordion key={key}>
          <AccordionSummary
            sx={{
              "& .MuiAccordionSummary-expandIconWrapper": {
                transition: "none",
                "&.Mui-expanded": {
                  transform: "none",
                },
              },
            }}
            expandIcon={
              item.answer === item.selectedOption ? (
                <CheckIcon sx={{ color: green[500] }} />
              ) : (
                <ClearIcon sx={{ color: red[500] }} />
              )
            }
          >
            {item.questionInWords}
          </AccordionSummary>
          <AccordionDetails>
            {item.imageName !== null ? (
              <CardMedia
                component="img"
                image={`${BASE_URL}images/${item.imageName}.jpg`}
                sx={{ m: "10px auto" }}
              ></CardMedia>
            ) : null}
            <List>
              {item.options.map((i, index) => (
                <Box
                  sx={
                    item.answer === index + 1
                      ? { color: green[500] }
                      : item.selectedOption === index + 1
                      ? { color: red[500] }
                      : ""
                  }
                >
                  <b>{abcd[index]}</b> - {i}
                </Box>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
