import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import "./index.css";
import store from "./store/store.js";
import { AddPost, AllPost, AuthLayout, EditPost, Home, LoginPage, Post, SignupPage } from "./components/index.js";

const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home/>}/>
      <Route path="/login" element={
        <AuthLayout authentication={false}>
          <LoginPage/>
        </AuthLayout>
      }/>
      <Route path="/signup" element={
        <AuthLayout authentication={false}>
          <SignupPage/>
        </AuthLayout>
      }/>
      <Route path="/all-posts" element={
        <AuthLayout authentication={true}>
          <AllPost/>
        </AuthLayout>
      }/>
      <Route path="/add-post" element={
        <AuthLayout authentication={true}>
          <AddPost/>
        </AuthLayout>
      }/>
      <Route path="/edit-post/:slug" element={
        <AuthLayout authentication={true}>
          <EditPost/>
        </AuthLayout>
      }/>
      <Route path="/post/:slug" element={
        <Post/>
      }/>
    </Route>
    )
)

ReactDOM.createRoot(document.getElementById("root")).render(
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
);
