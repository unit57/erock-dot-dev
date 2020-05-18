import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import Recaptcha from 'react-recaptcha';
import FormikField from '@components/form-fields/FormikField';
import Button from '@components/Button';
import { toggleModal } from '@redux/actions';
import './contact-form.scss';

type Props = {
  handleToggleModal: () => {};
};

type values = {
  email: string | null;
  message: string | null;
};

const ContactForm: React.FC<Props> = props => {
  const [submitContactError, setSubmitContactError] = useState('');
  const [submitRecaptcha, setSubmitRecaptcha] = useState(false);
  const { handleToggleModal } = props;
  const submitMessage = (
    values: values,
    setSubmitting: (arg0: boolean) => void
  ) => {
    const { email, message } = values;
    axios
      .post('/contact', {
        email,
        message
      })
      .then(response => {
        // eslint-disable-next-line no-console
        console.log('response in app', response);
        handleToggleModal();
        setSubmitting(false);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error('error in app', error);
        setSubmitContactError(
          "Sorry, that message didn't go through. Please try again."
        );
        setSubmitting(false);
      });
    setSubmitting(false);
  };

  const contactFormValidation = (values: values) => {
    let hasErrors: boolean = true;
    const errors: values = {
      email: '',
      message: ''
    };

    if (!values.email) {
      errors.email = 'Required';
      hasErrors = true;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      hasErrors = true;
      errors.email = 'Invalid email address';
    } else {
      hasErrors = false;
    }

    if (!values.message) {
      hasErrors = true;
      errors.message = 'Required';
    } else {
      hasErrors = false;
    }

    const returnErrors = hasErrors ? errors : {};

    return returnErrors;
  };

  const onloadCallback = () => {
    console.log('recaptcha loaded');
  };

  function verifyCallback(res) {
    if (res) {
      setSubmitRecaptcha(true);
    }
  }

  return (
    <section className="contact-form__container">
      <div className="contact-form__container__modal-header">
        <h2>Get in touch!</h2>
      </div>
      <Formik
        initialValues={{ email: '', message: '' }}
        validate={values => {
          return contactFormValidation(values);
        }}
        onSubmit={(values, { setSubmitting }) => {
          if (!submitRecaptcha) return setSubmitting(false);
          submitMessage(values, setSubmitting);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormikField
              label="Email"
              type="email"
              name="email"
              errorComponent="div"
              className="contact-form__container__from-email"
            />
            <FormikField
              label="Message"
              type="email"
              name="message"
              errorComponent="div"
              fieldType="textarea"
              className="contact-form__container__message"
            />
            <div className="contact-form__container__modal-footer">
              {/* video tutorial  http://127.0.0.1/ https://www.google.com/search?q=how+to+set+up+recaptia+react&oq=how+to+set+up+recaptia+react&aqs=chrome..69i57.11088j0j7&sourceid=chrome&ie=UTF-8#kpvalbx=_7ezBXsSTLYfr_Qaqk6bIAQ40 */}
              <Recaptcha
                sitekey="6LeA5fgUAAAAAKvGu017bzZPwpkNFU7uh97p9ROA"
                render="explicit"
                onloadCallback={onloadCallback}
                verifyCallback={verifyCallback}
              />
              <Button label="Submit" disabled={isSubmitting} type="submit" />
              {submitContactError && (
                <p className="contact-form__container__send-email-error">
                  {submitContactError}
                </p>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

const mapStateToProps = {
  handleToggleModal: toggleModal
};

export default connect(null, mapStateToProps)(ContactForm);
