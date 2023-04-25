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
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { login, reset } from '../../redux/features/user/authSlice';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { user, isLoading, isSuccess, error } = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (error) {
            console.log(error);
        }

        if (isSuccess || user) {
            navigate('/');
        }

        dispatch(reset());
    }, [user, isSuccess, error, navigate, dispatch]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(login({ email, password }));
    }

    return (
        <Container size={420} my={40}>
            <Text color="dimmed" size="sm" align="center" mt={5}>
                Do not have an account yet?{' '}
                <Anchor size="sm" component="button">
                    <Link to='/signup' >Create account</Link>
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
                    />
                    <PasswordInput
                        label="Password"
                        placeholder="Your password"
                        required mt="md"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <Button fullWidth mt="xl" type="submit">
                        Log in
                    </Button>

                    <Center mt="xl">
                        {isLoading && <Loader color='indigo' />}
                    </Center>
                </form>
            </Paper>
        </Container>
    );
}