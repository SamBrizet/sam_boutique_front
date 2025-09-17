import React, { useState, useEffect } from 'react';
import { login } from '../api/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState('');
   const [user, setUser] = useState(null);

   const token = useSelector(state => state.auth.token);
   
   const dispatch = useDispatch();
   const navigate = useNavigate();
   

   useEffect(() => {
      if (token) {
         navigate('/admin/dashboard');
      }
   }, [token, navigate]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const data = await login(email, password);
         setUser(data);
         dispatch(setAuth({ token: data.token, username: data.user.username }));
         setError('');
         navigate('/admin/dashboard');
      } catch (err) {
         setError('Credenciales incorrectas');
      }
   };

   return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
         <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Iniciar sesión</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
               <input
                  type="email"
                  placeholder="Correo"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
               />
               <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
               />
               <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors font-semibold"
               >
                  Entrar
               </button>
            </form>
            {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
            {user && (
               <pre className="mt-4 bg-gray-100 p-2 rounded text-xs overflow-x-auto">{JSON.stringify(user, null, 2)}</pre>
            )}
         </div>
      </div>
   );
};

export default Login;