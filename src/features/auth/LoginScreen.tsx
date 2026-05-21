import { useState } from 'react';
import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from '@/features/auth/AuthContext';

export function LoginScreen() {
  const { login } = useAuth();
  const [loginUsername, setLoginUsername] = useState('bruna');
  const [loginPassword, setLoginPassword] = useState('Bruna2026');
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = () => {
    const result = login(loginUsername, loginPassword);
    if (!result.ok) setLoginError(result.error);
    else setLoginError(null);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        px: 3,
        py: 2,
      }}
    >
      <Paper
        sx={{
          width: 'min(100%, 1280px)',
          height: 'min(82vh, 760px)',
          mx: 'auto',
          borderRadius: 2,
          overflow: 'hidden',
          border: '1px solid rgba(0,0,0,0.08)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
        }}
      >
        {/* Left pane: logo lock-up + welcome + login form. Layout mirrors the
            SalesDemo-Prototype LoginView so the two apps share a login design. */}
        <Box
          sx={{
            px: { xs: 6, md: '120px' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '80px',
          }}
        >
          <Stack spacing={3} component="header">
            <Stack direction="row" alignItems="center" spacing="15px" sx={{ width: 356 }}>
              <Box
                component="img"
                src="/assets/kerv-logo.svg"
                alt="Kerv logo"
                sx={{ width: 40, height: 40 }}
              />
              <Typography variant="h6" color="text.primary" noWrap>
                |&nbsp;&nbsp;Media Planner
              </Typography>
            </Stack>
            <Typography variant="h4" component="h1" color="text.primary">
              Welcome&nbsp;&nbsp;back!
              <br />
              Log in to your account.
            </Typography>
          </Stack>

          <Stack spacing={3} component="section" aria-labelledby="login-heading">
            <Typography variant="h6" component="h2" id="login-heading" color="text.primary">
              Log in
            </Typography>
            <Stack
              component="form"
              spacing={3}
              onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                handleLogin();
              }}
            >
              <Stack spacing={2}>
                <TextField
                  size="small"
                  value={loginUsername}
                  onChange={(event) => setLoginUsername(event.target.value)}
                  placeholder="Email"
                  // Visually mirrors SalesDemo's Email field, but uses `type="text"`
                  // so the fake "bruna" credential isn't rejected by browser
                  // HTML5 email validation. Swap back to type="email" when real
                  // auth replaces the hardcoded check in AuthContext.
                  type="text"
                  autoComplete="username"
                  error={Boolean(loginError)}
                  fullWidth
                />
                <TextField
                  size="small"
                  value={loginPassword}
                  onChange={(event) => setLoginPassword(event.target.value)}
                  placeholder="Password"
                  type="password"
                  autoComplete="current-password"
                  error={Boolean(loginError)}
                  helperText={loginError || ' '}
                  FormHelperTextProps={{ sx: { mx: 0 } }}
                  fullWidth
                />
              </Stack>
              <Stack spacing={1.5}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
                >
                  LOG IN
                </Button>
                <Button
                  type="button"
                  variant="text"
                  sx={{ color: 'primary.main', alignSelf: 'flex-start', px: 1, py: 0.75 }}
                >
                  FORGOT YOUR PASSWORD?
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Box>

        <Box
          component="img"
          src="/assets/login-hero.jpg"
          alt=""
          aria-hidden
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'calc(100% + 250px) center',
            display: 'block',
          }}
        />
      </Paper>
    </Box>
  );
}
