Project Documentation: Churn Prevention Modal

Overview

The Churn Prevention Modal project aims to provide a seamless experience for users considering unsubscribing from a service. It presents a modal window with a series of steps to guide users through the unsubscription process. The project is structured into components, utilities, store, types, and tests, facilitating easy maintenance and extensibility.

File Structure
src/
components/: Contains main components for the modal window and offer display.
UI/: Stores shared components such as Close Button, Indicators, and Help Section.
Steps/: Represents a component for each step of the churn prevention progress.
Config/: Holds options for unsubscription reasons.
Router/: Initialized but not used as there is no need for routing.
Store/: Holds all the store structure in separate files.
Types/: Consists of all needed TypeScript interfaces.
Utils/: Contains mock API integration and functionality to save data to local storage.
Tests/: Holds both unit and end-to-end tests.

Main components include comments for a deeper understanding of the processes.

***To rerun the whole flow you have to clean your local storage in browser.***

Dependencies
The project relies on common dependencies such as Vuex, Vue Router, Jest, and Cypress for testing. There are no specific dependencies beyond these common ones.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
