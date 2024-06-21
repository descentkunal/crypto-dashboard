import React from "react";
import { useRouteError } from "react-router-dom";

const Error: React.FC = () => {
  const err = useRouteError() as { status: string; statusText: string };
  return (
    <div>
      <h1>Something went wrong!!!</h1>
      <h2>
        {err.status}: {err.statusText}
      </h2>
    </div>
  );
};

export default Error;
