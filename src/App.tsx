import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import "./App.css";

const App = () => {
  const [displayContent, setDisplayContent] = useState("0");

  const opernads = [
    { id: "zero", key: "0" },
    { id: "one", key: "1" },
    { id: "two", key: "2" },
    { id: "three", key: "3" },
    { id: "four", key: "4" },
    { id: "five", key: "5" },
    { id: "six", key: "6" },
    { id: "seven", key: "7" },
    { id: "eight", key: "8" },
    { id: "nine", key: "9" },
  ];

  const operator = [
    { id: "add", key: "+" },
    { id: "subtract", key: "-" },
    { id: "multiply", key: "x" },
    { id: "divide", key: "/" },
  ];
  const absOperators = ["+", "x", "/"];

  const extraKeys = [
    {
      id: "equals",
      key: "=",
      method: () => {},
    },
    {
      id: "decimal",
      key: ".",
      method: () => {},
    },
    {
      id: "clear",
      key: "CE",
      method: () => {
        setDisplayContent("0");
      },
    },
  ];

  useEffect(() => {
    let effect = true;
    return () => {
      // eslint-disable-next-line
      effect = false;
    };
  }, []);

  return (
    <Box
      className="App"
      id="calc-machine"
      height="100vh"
      display="flex"
      alignItems="center"
    >
      <Box
        id="calc"
        width="200px"
        border={1}
        pt={3}
        pr={2}
        pl={2}
        pb={3}
        gap="1px"
        display="flex"
        flexWrap="wrap"
      >
        <Box border={1} width="100%" p={1} mb={1} textAlign="right">
          <Typography id="display"> {displayContent}</Typography>
        </Box>

        {extraKeys.map((item) => (
          <Box flex={1}>
            <Button variant="contained" id={item.id} onClick={item.method}>
              {item.key}
            </Button>
          </Box>
        ))}
        {operator.map((item) => (
          <Box flex={1}>
            <Button
              variant="contained"
              id={item.id}
              onClick={() => {
                if (displayContent.substr(-1) === item.key) {
                  setDisplayContent((prevState) =>
                    prevState.replace(/.$/, item.key)
                  );
                } else if (displayContent.substr(-1) !== "-") {
                  setDisplayContent((prevState) => prevState.concat(item.key));
                }
              }}
            >
              {item.key}
            </Button>
          </Box>
        ))}
        {opernads.map((item) => (
          <Box flex={1}>
            <Button
              variant="contained"
              id={item.id}
              style={{ width: "100%" }}
              onClick={() => {
                if (item.key === "0" && displayContent === "0") {
                } else if (displayContent === "0") {
                  setDisplayContent(item.key);
                } else {
                  setDisplayContent((prevState) => prevState.concat(item.key));
                }
              }}
            >
              {item.key}
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default App;
