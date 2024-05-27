import { Card, Input, Button, Typography, Spinner } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from "../../../feature/action/authAction";
import { useState } from "react";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const { error, isLoading, loggedIn, user } = useSelector(state => state.auth);
  console.log(user)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
    if (loggedIn !== false) {
      navigate(`/al-info`);
    }
  }


  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">Ro'yxatdan o'tish</Typography>
      <Typography color="gray" className="mt-1 font-normal">Ma'lumotlarni kiriting.</Typography>
      <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">Foydalanuvchi nomi</Typography>
          <Input size="lg" placeholder="name@mail.com" className="!border-t-blue-gray-200 focus:!border-t-gray-900" labelProps={{ className: "before:content-none after:content-none" }} name="username" value={formData.username} onChange={handleChange} />
          <Typography variant="h6" color="blue-gray" className="-mb-3">Elektron pochta</Typography>
          <Input size="lg" placeholder="name@mail.com" className="!border-t-blue-gray-200 focus:!border-t-gray-900" labelProps={{ className: "before:content-none after:content-none" }} name="email" value={formData.email} onChange={handleChange} />
          <Typography variant="h6" color="blue-gray" className="-mb-3">Parol</Typography>
          <Input type="password" size="lg" placeholder="********" className="!border-t-blue-gray-200 focus:!border-t-gray-900" labelProps={{ className: "before:content-none after:content-none" }} name="password" value={formData.password} onChange={handleChange} />
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <Button type="submit" className="mt-6" fullWidth>{isLoading ? <Spinner /> : 'Ro\'yxatdan o\'tish'}</Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Allaqachon akkaunti bormi?{" "}
          <Link to="/login" className="font-medium text-gray-900">Kirish</Link>
        </Typography>
      </form>
    </Card>
  );
}

export default Register;
