// import { styled } from 'styled-components';

// export const Button = styled.button`
//   padding: 1rem 2rem;
//   font-weight: 600;
//   text-transform: uppercase;
//   border-radius: 0.25rem;
//   color: #1f2937;
//   background-color: #f0b322;
//   border-radius: 6px;
//   border: none;

//   &:hover {
//     background-color: #f0920e;
//   }
// `;

// export const TextButton = styled.button`
//   color: #f0b322;
//   border: none;

//   &:hover {
//     color: #f0920e;
//   }
// `;

export function Button({ children, ...props }) {
    return <button className="px-4 py-2 font-semibold uppercase rounded text-stone-900 bg-amber-400 hover:bg-amber-500" {...props}>{children}</button>
}

export function TextButton({ children, ...props }) {
    return <button className="px-4 py-2 font-semibold uppercase rounded text-stone-900 bg-amber-400 hover:bg-amber-500" {...props}>{children}</button>
}