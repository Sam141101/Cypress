import { signIn } from 'next-auth/react';

export default function Login() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = e.target.elements; // Lấy username và password

    const result = await signIn('credentials', {
      redirect: false,
      username: username.value, // Lấy giá trị từ input username
      password: password.value,   // Lấy giá trị từ input password
    });

    if (!result.ok) {
      console.log('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder='username' name="username" />
      <input placeholder='password'  name="password" type="password" />
      <button type="submit">Login</button>
    </form>
  );
}
