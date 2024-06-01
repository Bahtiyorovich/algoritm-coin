import React, { useEffect } from "react";
import {
  Card,
  Button,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../../feature/action/authAction";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { LoginSchema } from "./authFormikSchema";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const initialValues = {
    email: '',
    password: ''
  };
  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(loginUser(values))
      .unwrap()
      .then(() => {
        navigate('/')
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setSubmitting(false);
      });
    };
    
  return (
    <Card color="transparent" shadow={false} className="max-w-lg mx-auto p-8">
      <Typography variant="h4" color="blue-gray" className="text-center">
        Sign In
      </Typography>
      <Typography color="gray" className="mt-1 text-center font-normal">
        Nice to meet you! Enter your details to sign up.
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="mt-8 mb-2 space-y-4">
            {error && (
              <p className="bg-red-50 text-red-600 border border-red-500 rounded-md p-4">
                {error}
              </p>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Field
                type="email"
                name="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Field
                type="password"
                name="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
            </div>
            <Button type="submit" disabled={isSubmitting || loading} className="mt-6 w-full">
              {loading ? <Spinner size="sm" /> : "Sign In"}
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Create an account?{" "}
              <Link to="/register" className="font-medium text-gray-900">Sign Up</Link>
            </Typography>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default Login;
