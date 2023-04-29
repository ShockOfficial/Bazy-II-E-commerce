import {
    TextInput,
    PasswordInput,
    Anchor,
    Paper,
    Text,
    Container,
    Center,
    Loader,
    Button,
} from '@mantine/core';
import { FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSignup } from '../../hooks/useSignup';

export function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const { signup, isLoading, error: errorMessage } = useSignup();

    useEffect(() => {
        if (errorMessage) {
            setError(true);
        }
    }, [errorMessage]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        signup(email, password);
    }

    const handleInput = () => {
        if (error) {
            setError(false);
        }
    }

    return (
        <Container size={420} my={40}>
            <Text color="dimmed" size="sm" align="center" mt={5}>
                Do you have an account?{' '}
                <Anchor size="sm" component="button">
                    <Link to='/login'>Log in</Link>
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
                        required mt="md"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        error={error}
                        onInput={handleInput}
                    />
                    <Button fullWidth mt="xl" type="submit">
                        Sign in
                    </Button>

                    <Center mt="xl">
                        {isLoading && <Loader color='indigo' />}
                        {errorMessage && (
                            <Text color="red" size="xs" >
                                {errorMessage}
                            </Text>
                        )}
                    </Center>
                </form>
            </Paper>
        </Container>
    );
}