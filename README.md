# React App

## Stack
  - Webpack
  - Babel
  - Axios
  - React
  - React-Router

## Imperative VS Declarative
  - Impreative: How
  `javascript
    var numbers = [1,2,3];
    var total = 0;
    for(var i=0; i< numbers.length; i++) {
      total += numbers[i];
    }
  `
  - Declarative: What
  `javascript
    var numbers = [1,2,3];
    numbers.reduce(function(prev, curr) {
      return prev curr;
    });
  `
    - Reduce side effects
    - minimize mutability
    - more readable code
    - less code

  - Composition
    - Break your code to function that return react component
      for ex' `var getUserBirthDate = React.createClass({
        render: funciton(){
          return (
            <p>BirthDate: {this.props.birthdate}</p>
          )
        }
      });`

  - Explicit Mutations
    `this.state...`

## Important Notes
  - ES6 features
    + let / const
    + import / export
    + destructring 
    + arrow function
    + default value
    + concise Objects
    + Async / Await // going to be part of es8