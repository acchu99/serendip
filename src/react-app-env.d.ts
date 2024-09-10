/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_RADAR_DUMMY_MODE: "true" | "false";
  }
};
