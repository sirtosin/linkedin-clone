import React, { useState } from "react";
import { auth } from "../firebase";
import styled from "styled-components";
import { login, register } from "../features/userSlice";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const LoginNow = () => {
  //user from store
  const user = useSelector((state) => state.user.value);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  function signIn() {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var users = userCredential.user;

        dispatch(
          login({
            email: users.email,
            name: users.displayName,
            image: users.photoURL,
          })
        );
        console.log(users.email);
        // ...
      })
      .catch((error) => {
        console.log(error);
        // ..
      });
  }
  function signup() {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var users = userCredential.user;
        users
          .updateProfile({
            displayName: name,
            photoURL: image,
          })
          .then(() => {
            dispatch(
              register({
                email: users.email,
                name: users.displayName,
                image: users.photoURL,
              })
            );
          });
        console.log(users.email);
        // ...
      })
      .catch((error) => {
        console.log(error);
        // ..
      });
  }

  return (
    <Container>
      <Nav>
        {user && <Redirect to="/home" />}
        <a href="/">
          <img src="/images/login-logo.svg" alt="" />
        </a>
        <div>
          <Join>Join now</Join>
          <SignIn>Sign in</SignIn>
        </div>
      </Nav>
      <Section>
        <h3>fill in your credentials</h3>
        <Form>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="profile pic (optional)"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          <button className="signup" onClick={() => signup()}>
            sign up
          </button>

          <button onClick={() => signIn()}>Sign in</button>
        </Form>
      </Section>
    </Container>
  );
};

const Container = styled.div`
  padding: 0px;
`;

const Nav = styled.nav`
  max-width: 1128px;
  margin: auto;
  padding: 12px 0 16px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  flex-wrap: nowrap;

  & > a {
    width: 135px;
    height: 34px;
    @media (max-width: 768px) {
      padding: 0 5px;
    }
  }
`;

const Join = styled.a`
  font-size: 16px;
  padding: 10px 12px;
  text-decoration: none;
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.6);
  margin-right: 12px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
    color: rgba(0, 0, 0, 0.9);
    text-decoration: none;
  }
`;

const SignIn = styled.a`
  box-shadow: inset 0 0 0 1px #0a66c2;
  color: #0a66c2;
  border-radius: 24px;
  transition-duration: 167ms;
  font-size: 16px;
  font-weight: 600;
  line-height: 40px;
  padding: 10px 24px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0);
  &:hover {
    background-color: rgba(112, 181, 249, 0.15);
    color: #0a66c2;
    text-decoration: none;
  }
`;

const Form = styled.div`
  width: 408px;
  padding: 3em;
  margin-top: -0.8em;
  & input {
    padding: 1em;
    border: none;
    width: 90%;
    background: transparent;
    border-bottom: 1px solid #333;
    outline: none;
    font-size: 1em;
  }
  & button {
    border: none;
    padding: 1em 2em;
    text-transform: capitalize;
    color: #fff;
    background: #2977c9;
    cursor: pointer;
    border-radius: 0.4em;
    margin: 30px;
  }
  & button.signup {
    border: none;
    padding: 1em 2em;
    text-transform: capitalize;
    color: #fff;
    background: #2957d9;
    cursor: pointer;
    border-radius: 0.4em;
    margin: 30px;
  }
  @media (max-width: 768px) {
    margin-top: 20px;
  }
  @media only screen and (min-width: 400px) {
    & input {
      position: relative;
      top: -5em;
      left: -5em;
      width: 60%;
    }
    & button,
    & button.signup {
      position: relative;
      left: -8em;
      padding: 1em 1em;
      top: -5.5em;
    }
  }
`;

const Section = styled.section`
  box-shadow: 10px 10px 20px #333;
  text-align: center;
  width: 500px;
  background: #fff;
  position: relative;
  top: 4em;
  height: 400px;
  margin: auto;
  & h3 {
    text-transform: capitalize;
    color: #2977c9;
    padding: 3em;
  }
  @media only screen and (max-width: 768px) {
    width: 70%;
    height: 400px;
    position: relative;
    top: 3em;
  }
  @media only screen and (max-width: 600px) {
    width: 85%;
    height: 400px;
    position: relative;
    top: 3em;
  }
`;

export default LoginNow;
