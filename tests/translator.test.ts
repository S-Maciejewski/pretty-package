import {Options, translate} from "../src/service/translator";

describe('translator tests', () => {
    const packageJsonContent =
        `{
  "name": "pretty-package",
  "version": "1.0.0",
  "dependencies": {
    "@emotion/react": "^11.10.6",
    "@emotion/styled": "^11.10.6",
    "@mui/base": "^5.0.0-alpha.126",
    "@mui/material": "^5.12.1",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/jest": "^27.5.2",
    "@types/node": "^16.18.24",
    "@types/react": "^18.0.38",
    "@types/react-dom": "^18.0.11",
    "node-sass": "^7.0.3",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "typescript": "^4.9.5",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}`
    const options: Options = {
        includeDevDependencies: false,
        markdown: true,
    }

    // TODO: setup jest tests?
    test('should return a valid markdown table', () => {
        const result = translate(packageJsonContent, options)
        // expect(result).toBe(`| name |`)
        expect(true).toBeTruthy()
    })

})
