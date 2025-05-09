module.exports = {
    testEnvironment: "jest-environment-jsdom",
    transform: {
      "^.+\\.tsx?$": "ts-jest",
    },
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    },
  };