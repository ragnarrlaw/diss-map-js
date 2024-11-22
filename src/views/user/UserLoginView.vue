<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

const schema = yup.object({
  username: yup.string().min(4).required('Username is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const onSubmit = values => {
  console.log(values);
};
</script>

<template>
  <div class="user-login">
    <h1>User Login</h1>
    <Form @submit="onSubmit" :validation-schema="schema">
      <div class="form-group">
        <label for="username">Username:</label>
        <Field
          name="username"
          id="username"
          type="text"
          :validate-on-input="true"
        />
        <ErrorMessage name="username" class="error-message" />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <Field
          name="password"
          id="password"
          type="password"
          :validate-on-input="true"
        />
        <ErrorMessage name="password" class="error-message" />
      </div>
      <button type="submit" class="submit-button">Login</button>
    </Form>
  </div>
</template>

<style scoped>
.user-login {
  max-width: 400px;
  padding: 2rem;
  margin: auto;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  font-family: 'Roboto', sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #737776;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #656868;
}

input[type='text'],
input[type='email'],
input[type='password'] {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.2);
  color: #060606;
  font-size: 1rem;
}

input[type='text']::placeholder,
input[type='email']::placeholder,
input[type='password']::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.submit-button {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  background: #00d1b2;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.submit-button:hover {
  background: #00b89c;
}

.is-invalid {
  border: 2px solid red;
}

.error-message {
  color: red;
}
</style>
