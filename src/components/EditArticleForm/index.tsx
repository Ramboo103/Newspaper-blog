import { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Button, Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

import { ARTICLE } from "../../saga/actionTypes";
import { RootState } from "../../store";
import { useNavigate, useParams } from "react-router-dom";
import { editArticleStart } from "../../reducers/articlesSlice";

function validateTitle(value: string) {
  let error;
  if (!value) {
    error = "Title is Required";
  }
  return error;
}

function validateDescription(value: string) {
  let error;
  if (!value) {
    error = "Description is Required";
  }
  return error;
}

function validateBody(value: string) {
  let error;
  if (!value) {
    error = "Article Body is Required";
  }
  return error;
}

export default function ValidateEditArticle() {
  const dispatch = useDispatch();
  const article = useSelector((state: RootState) => state.article);
  const currentUsername = localStorage.getItem("username");
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({
      type: ARTICLE.FETCH,
      payload: {
        slug: `${slug}`,
      },
    });
  }, [dispatch, slug]);

  useEffect(() => {
    if (article.isEditSuccess === true) {
      toast.success("Edit Article Success. Click me to check it out...", {
        onClick: () => {
          navigate(`/article/${article.article.slug}`);
        },
      });
    } else if (article.isEditSuccess === false) {
      toast.error(`${article.error}`);
    }
    dispatch(editArticleStart());
  }, [
    article.isEditSuccess,
    article.error,
    dispatch,
    navigate,
    article.article.slug,
  ]);

  if (!article.article.slug) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden mx-auto">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!(currentUsername === article.article.author?.username)) {
    alert("there is something wrong!");
    navigate("/");
  }

  return (
    <>
      <ToastContainer autoClose={3000}></ToastContainer>
      <Formik
        className="post-form"
        initialValues={{
          title: article.article.title,
          description: article.article.description,
          content: article.article.body,
        }}
        onSubmit={(values) => {
          dispatch({
            type: ARTICLE.EDIT,
            payload: {
              slug: `${slug}`,
              article: {
                title: values.title,
                description: values.description,
                body: values.content,
              },
            },
          });
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="title">Article Title:</label>
              <Field
                name="title"
                className="form-control"
                validate={validateTitle}
              />
              {errors.title && touched.title && (
                <div className="error">{errors.title}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="description">Article Description:</label>
              <Field
                name="description"
                className="form-control"
                as="textarea"
                rows={3}
                validate={validateDescription}
              />
              {errors.description && touched.description && (
                <div className="error">{errors.description}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="content">Article Content:</label>
              <Field
                name="content"
                className="form-control"
                as="textarea"
                rows={5}
                validate={validateBody}
              />
              {errors.content && touched.content && (
                <div className="error">{errors.content}</div>
              )}
            </div>

            <div className="d-flex justify-content-end">
              <Button
                type="submit"
                className="btn bg-primary-80 bg-primary-90-hover border-primary-80 border-primary-90-hover text-white"
              >
                Edit Article
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
