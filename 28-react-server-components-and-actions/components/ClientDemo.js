'use client';

import { useState } from 'react';
import RSCDemo from './RSCDemo';

export default function ClientDemo({ children }) {
  const [count, setCount] = useState(0); // <- this is why it's a client component

  console.log('ClientDemo rendered');
  return (
    <div className="client-cmp">
      <h2>A React Client Component</h2>
      <p>
        Will be rendered on the client <strong>AND</strong> the server.
      </p>
      <p>
        <button onClick={() => setCount(prevCount => prevCount + 1)}>Increase</button>
        <span>{count}</span>
      </p>
      <RSCDemo /> 
      {/* This works but the code is converted to client-component. but if we change the RSCDemo to async, making sure that it is a server component, it will raise an error no the console. */}
      {/* {children} */}
    </div>
  );
}
