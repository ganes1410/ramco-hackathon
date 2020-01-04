import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  html {
    height: 100%;
  }

  body {
    overflow-x: hidden;
    overflow-y: auto;
    height: 100%;
    padding: 32px;
    margin: 0;
    padding: 0;
  }

  div#root {
    height: 100%;
  }
`;

export const Root = styled.main`
  display: flex;
  flex-flow: column;
  align-items: center;
  text-align: center;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 50px 0 100px;
  padding-top: 20px;
`;

export const Preview = styled.img`
  width: 100%;
  height: auto;
`;

export const Button = styled.button`
  /* position: fixed; */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 200px;
  background: blueviolet;
  color: white;
  font-size: 0.8rem;
  margin-top: 20px;
`;

export const Input = styled.input`
  height: 30px;
  margin-bottom: 16px;
  width: 200px;
  font-size: 0.8rem;
  border: 1px solid lightgray;
`;
