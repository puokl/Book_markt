import { useState, useEffect, useRef } from "react";
import { Box, Flex, Center, chakra, useOutsideClick } from "@chakra-ui/react";
import axios from "axios";
import { SearchIcon } from "@chakra-ui/icons";
import SearchResults from "./SearchResults";

const Search = () => {
  const [queryText, setQueryText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQueryText(e.target.value);
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick({
    ref: ref,
    handler: () => {
      setQueryText("");
    },
  });

  useEffect(() => {
    if (!queryText) {
      setSearchResults([]);
      return;
      //   return false;
    }

    (async () => {
      const url = "http://localhost:1337/api/search";

      const { data } = await axios.get(url, {
        params: {
          title: queryText,
        },
      });

      setSearchResults(data);
      console.log("data", data);
    })();
  }, [queryText]);

  return (
    <Box
      sx={{
        rounded: "lg",
        overflow: "visible",
        bg: "transparent",
        shadow: "lg",
        maxW: "600px",
        width: "90%",
        mt: "1rem",
        mx: "auto",
        position: "relative",
        zIndex: 1,
      }}
      m={3}
    >
      <Flex pos="relative" align="strech">
        <chakra.input
          type=""
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          maxLength={64}
          sx={{
            w: "100%",
            h: "40px",
            pl: "68px",
            fontWeight: "medium",
            outline: 0,
          }}
          placeholder="Search a book"
          value={queryText}
          onChange={handleChange}
        />

        <Center pos="absolute" left={7} h="40px">
          <SearchIcon color="teal.500" boxSize="20px" />
        </Center>
      </Flex>

      {queryText && (
        <Box
          ref={ref}
          maxH="70vh"
          p="0"
          overflowY="auto"
          position="absolute"
          top="100%"
          left="0"
          right="0"
          zIndex={2}
          bg="gray.400"
        >
          <Box px={4}>
            <Box borderTopWidth="1px" pt={2} pb={4}>
              <SearchResults
                searchResults={searchResults}
                setQueryText={setQueryText}
              />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Search;
