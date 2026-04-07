// Import only the hooks we need from React (named imports, not the whole library)
import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

// --- Timer Component ---
// Defined OUTSIDE App — never define components inside other components.
// React would treat a nested component as a new function on every render,
// destroying and recreating it (and its state) each time App re-renders. NOw if you want this as an "infrastructure as code" approoach that could work. 
function Timer() {
  // useState returns [currentValue, setterFunction].
  // Calling setCount schedules a re-render with the new value.
  const [count, setCount] = useState(0);
  const [isPending, setIsPending] = useState(true);

  // useEffect lets you run code AFTER the component renders (side effects).
  // Common use cases: timers, subscriptions, data fetching, DOM manipulation.
  //
  // [isPending] in the dependency array means: re-run this effect whenever
  // isPending changes. Each phase schedules the next, creating a loop:
  //   pending (1s) → fired (0.6s) → pending → ...
  //
  // The cleanup function (return () => clearTimeout(id)) cancels the pending
  // timeout before the effect re-runs or the component unmounts.
  useEffect(() => {
    if (isPending) {
      // Waiting phase: fire the timeout after 1 second
      const id = setTimeout(() => {
        setCount((c) => c + 1); // functional update avoids stale closures
        setIsPending(false);
      }, 1000);
      return () => clearTimeout(id);
    } else {
      // Fired phase: show the result briefly, then reset to pending
      const id = setTimeout(() => setIsPending(true), 600);
      return () => clearTimeout(id);
    }
  }, [isPending]); // The dependency array controls WHEN the effect re-runs:
                   //   []        → run once, on mount only (like componentDidMount)
                   //   [a, b]    → re-run whenever a or b change
                   //   (omitted) → re-run after every render

  return (
    <div className="timer-demo">
      <div className={`timer-status ${isPending ? 'timer-pending' : 'timer-fired'}`}>
        {isPending ? 'timeout pending...' : 'timeout fired!'}
      </div>
      <div className="timer-count">count: <strong>{count}</strong></div>
    </div>
  );
}

function App() {
  // App maintains its own count state, completely independent of Timer's.
  // useState(0) sets the initial value to 0.
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <h1>I've rendered {count} times!</h1>
        <div id='useState'>
          <h2>useState</h2>
          <p>
            The <code>useState</code> hook allows you to add state to your
            functional components. It returns an array with two elements: the
            current state value and a function to update it.
          </p>
          {/* onClick receives an arrow function — this avoids calling setCount
              immediately on render. The functional update (count) => count + 1
              is preferred over setCount(count + 1) because it always uses the
              latest state, even if multiple updates are batched together. */}
          <button onClick={() => setCount((count) => count + 1)}>
            Count is {count}
          </button>
        </div>
        <div id="useEffect">
          <h2>useEffect</h2>
          <p>
            The <code>useEffect</code> hook allows you to perform side effects in
            your components. It takes a function that will run after the render
            is committed to the screen. You can also specify dependencies to
            control when the effect runs. <strong>NOTE: This should only be used for external monitoring. If it is part of your code, you shouldn't be using useEffect</strong>
          </p>
          <Timer />
        </div>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
