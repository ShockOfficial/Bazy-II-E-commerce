import {
	Avatar,
	Group,
	Paper,
	Text,
	Button,
	FileInput,
	Loader,
	TextInput
} from '@mantine/core';
import React, { FormEvent, useState, useEffect } from 'react';
import { useStyles } from './styles';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useForm } from '@mantine/form';
import { convertToBase64 } from '../../utils/functions';
import { useUpdate } from '../../hooks/useUpdate';

interface ProfileForm {
	avatar: string;
	name: string;
	email: string;
}

const Profile = () => {
	const { classes } = useStyles();
	const { user } = useAuthContext();
	const [isEditing, setIsEditing] = useState(false);
	const { update, isLoading, error } = useUpdate();

	const form = useForm<ProfileForm>({
		initialValues: {
			avatar: user?.avatar || '',
			name: user?.name || '',
			email: user?.email || ''
		},
		initialDirty: { avatar: false, name: false, email: false }
	});

	useEffect(() => {
		form.resetDirty();
	}, [user, isLoading]);

	const handleFileChange = (e: File) => {
		if (!e) {
			form.setValues({ avatar: '' });
			form.setDirty({ avatar: false });
		}
		const base64 = convertToBase64(e);
		base64?.then((res) => {
			const data = res as string | null;
			if (!data) return;

			form.setValues({ avatar: data });
		});
	};

	const handleNameChange = (e: any) => {
		form.setValues({ name: e.target.value });

		if (e.target.value === '') {
			form.setDirty({ name: false });
		}
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// TODO INVALID
		if (form.values.name.trim() === '') return;

		if (user) {
			update(user.email, form.values);
		}
	};

	const name = form.isDirty('name') ? form.values.name : user?.name;

	if (error) {
		return (
			<Paper p="lg" display="flex">
				<Text ta="center" color="red" fz="lg" weight={700}>
					{error}
				</Text>
			</Paper>
		);
	}

	if (!user || isLoading) {
		return (
			<Paper p="lg" display="flex">
				<Loader mx="auto" />
			</Paper>
		);
	}

	return (
		<Paper
			radius="md"
			p="lg"
			display="flex"
			style={{
				justifyContent: 'center',
				flexDirection: 'column',
				alignItems: 'center'
			}}
		>
			<Group mx="auto">
				<label
					htmlFor="file"
					style={{ cursor: 'pointer', position: 'relative' }}
					className={classes.avatar}
				>
					<Avatar src={user.avatar} size={120} radius={120} />
					<Text ta="center" fz="lg" weight={700} className={classes.avatarText}>
						Upload Image
					</Text>
				</label>
			</Group>
			<FileInput
				mt="md"
				id="file"
				onChange={handleFileChange}
				required
				accept=".jpg,.jpeg,.png"
				styles={{
					root: {
						display: form.isDirty('avatar') ? 'block' : 'none'
					}
				}}
			/>
			<Group mx="auto">
				{!isEditing ? (
					<Text
						ta="center"
						fz="lg"
						weight={500}
						mt="md"
						onDoubleClick={() => setIsEditing(true)}
					>
						{name}
					</Text>
				) : (
					<TextInput
						mt="md"
						mb={5}
						styles={{
							input: {
								textAlign: 'center',
								outline: 'none',
								border: '2px dashed #ccc',
								background: 'transparent',
								fontWeight: 700
							}
						}}
						onChange={handleNameChange}
						onBlur={() => setIsEditing(false)}
						type="text"
						id="name"
						defaultValue={name}
						placeholder="Your name"
						required
					/>
				)}
			</Group>
			<Text ta="center" c="dimmed" fz="sm">
				{user.email}
			</Text>

			<form style={{ display: 'flex' }} onSubmit={handleSubmit}>
				<Button
					type="submit"
					uppercase
					w={200}
					mx="auto"
					mt={10}
					formAction="/upload"
				>
					Save
				</Button>
			</form>
		</Paper>
	);
};

export default Profile;
