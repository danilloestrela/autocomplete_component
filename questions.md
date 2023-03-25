1. What is the difference between Component and PureComponent? give an example where it might break my app.

A `Component` in React is a reusable piece of UI that can receive input data from its parent component (via props) and can also maintain its own internal state. A `PureComponent` is a component that only renders based on it's props, always returning the same output for the same input. The `PureComponent` can help improve performance vy reducing unecessary re-renders.

2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?
 
If we implement a `Context` within a `shouldComponentUpdate` in a child component that depends on it's value, we'll prevent it from re-rendering when context value changes. That can lead to various bugs within the application, since depending in what you choose to put inside `shouldComponentUpdate` it can prevent the view to update.

3. Describe 3 ways to pass information from a component to its PARENT.
  - Using props (with callback functions)
  - Using Context (with callback functions)
  - Using Flux (Redux, for example) (with actions dispatch)

4. Give 2 ways to prevent components from re-rendering.
  - We can use `useMemo`, `useCallback`, `React.memo()`, `shouldComponentUpdate` for example.
  - Use `PureComponent`.

5. What is a fragment and why do we need it? Give an example where it might break my app.

It is simply a way to group element without adding additional wraping on DOM, allowing to return multiple elements without needing to put them under a `<div></div>`, for example. We need it to avoid unecessary DOM elements when we need to wrap multiple elements (due jsx result after conversion to object), improve readability (grouping elements logically), prevent conflicts when using hight order components.

6. Give 3 examples of the HOC pattern.
  - Redux connect()
  - react-router-dom withRouter()(v5, deprecated on v6)
  - Relay createFragmentContainer()

7. what's the difference in handling exceptions in promises, callbacks and async...await.
  - `Promises`: are commonly used in React for asynchronous operations, including error handling. When a Promise is rejected with an error, it can be caught with the `.catch()` method, which allows the error to be handled and the component's state to be updated. Promises are also designed to be composable, meaning they can be easily combined with other promises or used with `async/await`.
  - `Async/await`: They work by wrapping asynchronous operations in a Promise, which can then be waited using the 'await' keyword. This allows asynchronous code to be written in a better readable way, without the need for nested callbacks or complex Promise chaining.
  - `Callbacks`:  They work by passing a function as a parameter to another function, which is then called when the operation is complete. However, they can become unwieldy and difficult to read if multiple callbacks are nested within each other ("callback hell").

  Each of them has its own place when used in a project.
 
8. How many arguments does setState take and why is it async.

On `Class components`, `setState` can receive one or two arguments:
  - A state object containing one or more updated state values;
  - An optional callback function that can be executed after the state is updated.

  `setState` is asynchronous to optimize the performance of the rendering process. Since react schedules the next rendering after a state change, it can also group other state updates to minimize the number of renders and avoid unnecessary renders. This can take some time, which is why it needs to be asynchronous.

9. List the steps needed to migrate a Class to Function Component.
  - Replace `class` with `function`;
  - Remomve `constructor()`;
  - Remove `render()` and put it's data under `return()`;
  - Declare state using `useState(initialValueHere)` hook;
  - Most of lifecycle methods can be adapted using `useEffect()` hook, carefully;
  - Remove `this` keyword from all declarations or functions;
  - `this.setState()` with approprieate state update function returned from `useState()` hook
  - Update events width `useCallback()` hook.


10. List a few ways styles can be used with components.
  - Import directly the css file of each component;
  - Import directly css file using CSS Modules;
  - Use class libraries like tailwind/bootstrap;
  - Use toolkits like Material-UI;
  - Use Javascript libraries such as Styled Components;
  And lots of others... Vite supports CSS modules which I used on this project.

11. How to render an HTML string coming from the server

We can use a library called `html-react-parser` which converts this HTML string to JSX. With this tool it's also possible to customize how the HTML is parsed, preserving or discarding some HTML tags, removing empty tags or attributes. In addition, before parsing this data we can Sanitize the HTML string using `dompurify` library.
