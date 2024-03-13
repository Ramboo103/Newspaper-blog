import { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Button, Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";

import { AUTH } from "../../saga/actionTypes";
import { RootState } from "../../store";
import { editAuthStart } from "../../reducers/auth";

function validateURL(value: string) {
  let error;
  if (!value) {
    error = "URL is Required";
  }
  return error;
}

function validateBio(value: string) {
  let error;
  if (!value) {
    error = "Your bio is Required";
  }
  return error;
}

function validatePass(value: string) {
  let error;

  if (value.length < 6) {
    error = "Password must be at least 6 characters long";
    return error;
  }

  if (!/[A-Z]/.test(value)) {
    error = "Password must contain at least one uppercase letter";
    return error;
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
    error = "Password must contain at least one special character";
    return error;
  }

  return error;
}

export default function ValidateSettingForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const auth = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    dispatch({
      type: AUTH.SET,
    });
  }, [dispatch, user?.bio, user?.email, user?.password]);

  useEffect(() => {
    if (auth.isEditSuccess === true) {
      toast.success("Edit Profile Success. Click me check it out...", {
        onClick: () => {
          navigate(`/profile/${auth.user?.username}`);
        },
      });
    } else if (auth.isEditSuccess === false) {
      toast.error(`${auth.error}`);
    }
    dispatch(editAuthStart());
  }, [auth.isEditSuccess, auth.error, dispatch, navigate, auth.user?.username]);

  return !user?.username ? (
    <div className="d-flex justify-content-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden mx-auto">Loading...</span>
      </Spinner>
    </div>
  ) : (
    <div className="new-post py-5 mx-auto">
      <ToastContainer autoClose={3000}></ToastContainer>
      <h1 className="new-post-h1">Edit Settings:</h1>

      <Formik
        className="post-form"
        initialValues={{
          email: user.email,
          password: "",
          username: user.username,
          bio: user.bio,
          image: user.image,
        }}
        onSubmit={(values) => {
          dispatch({
            type: AUTH.EDIT,
            payload: {
              user: {
                email: user.email,
                password: values.password,
                username: user.username,
                bio: values.bio,
                image: values.image,
              },
            },
          });
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="username">Your Username:</label>
              <Field
                name="username"
                validate={validateURL}
                disabled={true}
                className="form-control"
              />
              {errors.username && touched.username && (
                <div className="error text-danger">{errors.username}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="image">Your Image URL:</label>
              <Field
                name="image"
                validate={validateURL}
                className="form-control"
              />
              {errors.image && touched.image && (
                <div className="error text-danger">{errors.image}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="bio">Your Bio:</label>
              <Field
                name="bio"
                validate={validateBio}
                as="textarea"
                rows={5}
                className="form-control"
              />
              {errors.bio && touched.bio && (
                <div className="error text-danger">{errors.bio}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="email">Your Email:</label>
              <Field
                name="email"
                validate={validateURL}
                disabled={true}
                className="form-control"
              />
              {errors.image && touched.email && (
                <div className="error text-danger">{errors.email}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="password">Your New Password:</label>
              <Field
                name="password"
                validate={validatePass}
                className="form-control"
              />
              {errors.password && touched.password && (
                <div className="error text-danger">{errors.password}</div>
              )}
            </div>

            <div className="d-flex justify-content-end">
              <Button
                type="submit"
                className="btn bg-primary-80 bg-primary-90-hover border-primary-80 border-primary-90-hover text-white"
              >
                Update Settings
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
