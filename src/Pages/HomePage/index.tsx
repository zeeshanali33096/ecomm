import React from "react";
import { Box } from "@chakra-ui/react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import FeedPage from "../FeedPage";
import ProductDescriptionPage from "../ProductDescriptionPage";

interface Props {
  // history: History;
}

const HomePage = (props: Props) => {
  const match = useRouteMatch();

  return (
    <Box p={5}>
      <Switch>
        <Route exact path={`${match.url}`}>
          <FeedPage />
        </Route>
        <Route path={`${match.url}/:id`}>
          <ProductDescriptionPage />
        </Route>
      </Switch>
    </Box>
  );
};

export default HomePage;
