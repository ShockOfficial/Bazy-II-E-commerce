import React from 'react';
import {
	TextInput,
	PasswordInput,
	Anchor,
	Paper,
	Text,
	Container,
	Center,
	Button,
	Loader
} from '@mantine/core';
import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../../hooks/useLogin';
import { AppRoutes } from '../../Routes/routes';
import { useAuthContext } from '../../hooks/useAuthContext';

export function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(false);
	const { login, isLoading, error: errorMessage } = useLogin();
	const { user } = useAuthContext();
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate(AppRoutes.HOME, { replace: true });
		}
	}, [user, navigate]);

	useEffect(() => {
		if (errorMessage) {
			setError(true);
		}
	}, [errorMessage]);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		login(email, password);
	};

	const handleInput = () => {
		if (error) {
			setError(false);
		}
	};

	return (
		<Container size={420} my={40}>
			<Text color="dimmed" size="sm" align="center" mt={5}>
				Do not have an account yet?{' '}
				<Anchor size="sm" component="button">
					<Link to="/signup">Create account</Link>
				</Anchor>
			</Text>

			<Paper withBorder shadow="md" p={30} mt={30} radius="md">
				<form onSubmit={handleSubmit}>
					<TextInput
						label="Email"
						placeholder="you@mantine.dev"
						required
						onChange={(e) => setEmail(e.target.value)}
						value={email}
						error={error}
						onInput={handleInput}
					/>
					<PasswordInput
						label="Password"
						placeholder="Your password"
						required
						mt="md"
						onChange={(e) => setPassword(e.target.value)}
						value={password}
						error={error}
						onInput={handleInput}
					/>
					<Button fullWidth mt="xl" type="submit">
						Log in
					</Button>

					<Center mt="xl">
						{isLoading && <Loader color="indigo" />}
						{errorMessage && (
							<Text color="red" size="xs">
								{errorMessage}
							</Text>
						)}
					</Center>
				</form>
			</Paper>
		</Container>
	);
}
