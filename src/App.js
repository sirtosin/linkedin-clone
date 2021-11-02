import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import LoginNow from "./components/LoginNow";
import Login from "./components/Login";
import { useDispatch } from "react-redux";
import db, { auth } from "./firebase";
import { login, logout } from "./features/userSlice";
import { getArticles } from "./features/articleSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((users) => {
      if (users) {
        dispatch(
          login({
            email: users.email,
            name: users.displayName,
            image: users.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);
  useEffect(() => {
    db.collection("articles")
      .orderBy("actor.timestamp", "desc")
      .onSnapshot((snapshot) => {
        const payload = snapshot.docs.map((doc) => doc.data());
        if (!payload) {
          {
            {
              <img src="/images/loader.svg" />;
            }
          }
        }
        dispatch(getArticles(payload));
      });
  }, [dispatch]);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/loginnow">
            <LoginNow />
          </Route>
          <Route path="/home">
            <Header />
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
