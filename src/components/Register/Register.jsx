import { useState } from "react";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen ">
      
     
      <div className="flex flex-col justify-center items-center text-center p-6">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          
          <h1 className="text-3xl font-bold mb-4">Entrar</h1>
          <p className="mb-4 text-gray-600">
            Si ya tienes una cuenta, inicia sesión con tu email
          </p>

          <label htmlFor="email" className="block text-left mb-1">
            Email
          </label>
          <input
            className="w-full border h-10 rounded px-2 mb-3"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password" className="block text-left mb-1">
            Contraseña
          </label>
          <input
            className="w-full border h-10 rounded px-2 mb-4"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="w-full bg-black text-white h-10 rounded hover:bg-gray-800 transition">
            Entrar
          </button>
        </div>
      </div>

     
      <div className="flex flex-col justify-center items-center text-center p-6 bg-gray-100">
        <div className="w-full max-w-md">
          
          <h2 className="text-xl mb-2">No tengo cuenta</h2>
          <p className="text-3xl font-bold mb-4">Quiero registrarme</p>

          <p className="text-gray-600 mb-6">
            Al crear una cuenta podrás comprar más rápido, ver tus pedidos
            y consultar tu historial.
          </p>

          <button className="w-full bg-gray-400 h-10 rounded hover:bg-gray-500 transition">
            Registrarme
          </button>
        </div>
      </div>

    </div>
  );
}

export default Register;