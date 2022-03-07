import React from 'react';
import * as yup from 'yup';
import logo from '../../../logo-420-x-108.png';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Container, TextField, Typography, CircularProgress } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { ILoginParams } from '../../../models/auth';
import LoginIcon from '@mui/icons-material/Login';

const schema = yup
  .object({
    email: yup.string().required('Please Enter your Email'),
    password: yup.string().required('Please Enter Your Password').min(6, 'Min 6 characters'),
  })
  .required();

interface Props {
  onLogin(values: ILoginParams): void;
  loading: boolean;
  errorMessage: string;
}

const LoginForm = (props: Props) => {
  const { onLogin, errorMessage, loading } = props;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginParams>({ resolver: yupResolver(schema) });

  const onSubmit = React.useCallback(
    (data: ILoginParams) => {
      onLogin(data);
      return;
    },
    [onLogin],
  );

  return (
    <>
      {loading && (
        <div
          style={{
            display: 'flex',
            width: '100vw',
            minHeight: '100vh',
            margin: 'auto',
            alignItems: ' center',
            justifyContent: 'center',
            backdropFilter: 'blur(10px)',
            background: 'transparent',
          }}
        >
          <CircularProgress
            disableShrink
            style={{
              width: '80px',
              height: '80px',
            }}
          />
        </div>
      )}
      {loading === false && (
        <Container
          component={'span'}
          style={{
            maxWidth: '410px',
            padding: '15px',
            background: '#f3f3f3',
            boxShadow: '0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%)',
          }}
        >
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <img src={logo} alt="" style={{ maxWidth: '250px', margin: '32px 32px 32px 24px' }} />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {errorMessage && (
              <Box
                sx={{
                  width: '100%',
                  height: '38px',
                  backgroundColor: '#f38585',
                  display: 'flex',
                  borderRadius: '3px',
                  marginBottom: '8px',
                }}
              >
                <Typography color={'red'} sx={{ margin: 'auto', width: '80%', fontSize: '15px' }}>
                  {errorMessage}
                </Typography>
              </Box>
            )}
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  placeholder="Email"
                  error={!!errors.email?.message}
                  helperText={errors.email?.message}
                  variant="outlined"
                  type="email"
                  className="login-input login-email-input"
                />
              )}
              {...register('email', { required: true })}
              name="email"
              control={control}
              defaultValue=""
            />
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  placeholder="Password"
                  error={!!errors.password?.message}
                  helperText={errors.password?.message || ''}
                  variant="outlined"
                  type="password"
                  className="login-input login-password-input"
                />
              )}
              rules={{ required: true }}
              name="password"
              control={control}
              defaultValue=""
            />
            <div style={{ display: 'flex' }}>
              <Button
                type="submit"
                style={{ margin: 'auto', width: '100%', backgroundColor: '#28a745', borderColor: '#28a745' }}
                variant="contained"
              >
                <LoginIcon />
                <span>Login</span>
              </Button>
            </div>
          </form>
        </Container>
      )}
    </>
  );
};

export default LoginForm;
