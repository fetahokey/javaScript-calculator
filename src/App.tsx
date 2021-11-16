import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import "./App.css";

const App = () => {
  const [displayContent, setDisplayContent] = useState<string>("0");
  const [result, setResult] = useState<Number>(0);
  const [isEval, setIsEval] = useState<Boolean>(false);
  const [canBeDecimal, setCanBeDecimal] = useState(true);

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
    { id: "multiply", key: "*" },
    { id: "divide", key: "/" },
  ];
  const absOperators = ["+", "*", "/"];
  const negOperators = ["-"];
  const allOperators = absOperators.concat(negOperators);

  const extraKeys = [
    {
      id: "equals",
      key: "=",
      method: () => {
        setDisplayContent(eval(displayContent).toString());
        setIsEval(true);
        setResult(eval(displayContent).toString());
        setCanBeDecimal(true);
      },
    },
    {
      id: "decimal",
      key: ".",
      method: () => {
        if (
          !allOperators.concat(".").includes(displayContent.substr(-1)) &&
          canBeDecimal
        ) {
          setDisplayContent((prevState) => prevState.concat("."));
          setCanBeDecimal(false);
        }
      },
    },
    {
      id: "clear",
      key: "CE",
      method: () => {
        setIsEval(false);
        setCanBeDecimal(true);
        setDisplayContent("0");
      },
    },
  ];
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
        <Box
          border={1}
          width="100%"
          overflow="auto"
          p={1}
          mb={1}
          textAlign="right"
          display="flex"
          flexWrap="wrap"
          id="displayC"
          fontFamily="Roboto"
          fontSize={12}
        >
          {displayContent}
        </Box>
        <Box
          border={1}
          width="100%"
          overflow="auto"
          p={1}
          mb={1}
          textAlign="right"
          display="flex"
          flexWrap="wrap"
          id="display"
          fontFamily="Roboto"
          fontSize={12}
        >
          {isEval ? result : displayContent}
        </Box>

        {extraKeys.map((item) => (
          <Box flex={1} key={item.id}>
            <Button variant="contained" id={item.id} onClick={item.method}>
              {item.key}
            </Button>
          </Box>
        ))}
        {operator.map((item) => (
          <Box flex={1} key={item.id}>
            <Button
              variant="contained"
              id={item.id}
              onClick={() => {
                setCanBeDecimal(true);
                const last2Chars = displayContent.substr(-2);
                const isLast2CharsNotOperators =
                  !allOperators.includes(last2Chars[0]) ||
                  !allOperators.includes(last2Chars[1]);

                if (!isLast2CharsNotOperators) {
                  setDisplayContent((prevState) =>
                    prevState.replace(/.{0,2}$/, item.key)
                  );
                }

                if (isLast2CharsNotOperators) {
                  if (
                    absOperators.includes(displayContent.substr(-1)) &&
                    absOperators.includes(item.key)
                  ) {
                    setDisplayContent((prevState) =>
                      prevState.replace(/.$/, item.key)
                    );
                  } else if (
                    allOperators.includes(displayContent.substr(-1)) &&
                    negOperators.includes(item.key)
                  ) {
                    setDisplayContent((prevState) =>
                      prevState.concat(item.key)
                    );
                  } else if (
                    absOperators.includes(item.key) &&
                    negOperators.includes(displayContent.substr(-1))
                  ) {
                    setDisplayContent((prevState) =>
                      prevState.replace(/.$/, item.key)
                    );
                  } else {
                    setDisplayContent((prevState) =>
                      prevState.concat(item.key)
                    );
                  }
                }
              }}
            >
              {item.key}
            </Button>
          </Box>
        ))}
        {opernads.map((item) => (
          <Box flex={1} key={item.id}>
            <Button
              variant="contained"
              id={item.id}
              style={{ width: "100%" }}
              onClick={() => {
                const lastTwoChars = displayContent.substr(-2);
                if (
                  lastTwoChars.length === 2 &&
                  negOperators.includes(lastTwoChars[0]) &&
                  negOperators.includes(lastTwoChars[1])
                ) {
                  setDisplayContent((prevState) =>
                    prevState.replace(/.{0,2}$/, "+")
                  );
                }

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
