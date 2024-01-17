import {
  TextField,
  Button,
  Box,
  CardContent,
  Card,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import Center from "./Center";
import useForm from "./hooks/useForm";
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from "../shared/util/validators";
import { validate } from "../shared/util/validators";
import { ENDPOINTS, createAPIEndpoint } from "../api/index";
import useStateContext from "./hooks/useStateContext";
import { useNavigate } from "react-router-dom";

const getFreshModel = () => ({
  name: "",
  email: "",
});

export default function Login() {
  const { context, setContext, resetContext } = useStateContext();
  const navigate = useNavigate();

  const { values, setValues, errors, setErrors, handleInputChange } =
    useForm(getFreshModel);

  useEffect(() => {
    resetContext();
  }, []);

  const login = (event) => {
    // zapobiegam domyślnemu odświeżeniu
    event.preventDefault();
    if (validation()) {
      createAPIEndpoint(ENDPOINTS.user)
        .post(values)
        .then((res) => {
          console.log(res[0]);
          setContext({ userId: res.data.userId });
          navigate("/question");
        })
        .catch((err) => console.log(err));
    }
  };

  const validation = () => {
    let temp = {};
    temp.email = validate(values.email, [VALIDATOR_EMAIL()])
      ? ""
      : "Provide correct email";
    temp.name = validate(values.name, [VALIDATOR_REQUIRE()])
      ? ""
      : "Provide correct name";
    setErrors(temp);
    // Object zwraca tablicę, every iteruje i sprawdza czy wartości error są puste
    return Object.values(temp).every((error) => error === "");
  };

  return (
    <Center>
      <Card sx={{ width: "400px" }}>
        <CardContent sx={{ textAlign: "center" }}>
          <Typography sx={{ my: 2 }} variant="h3">
            Witaj
          </Typography>
          <Box
            sx={{
              "& .MuiTextField-root": {
                m: 1,
                width: "90%",
              },
            }}
          >
            {/* wyłaczam domyślną walidację html */}
            <form noValidate autoComplete="on" onSubmit={login}>
              <TextField
                label="Email"
                name="email"
                value={values.email}
                onChange={handleInputChange}
                // spread operator - wypakowuje obiekt
                {...(errors.email && { error: true, helperText: errors.email })}
              ></TextField>
              <TextField
                label="Nazwa"
                name="name"
                value={values.name}
                onChange={handleInputChange}
                {...(errors.name && { error: true, helperText: errors.name })}
              ></TextField>
              <Button
                type="submit"
                size="large"
                variant="contained"
                sx={{ width: "90%" }}
              >
                Zaloguj
              </Button>
            </form>
          </Box>
        </CardContent>
      </Card>
    </Center>
  );
}
