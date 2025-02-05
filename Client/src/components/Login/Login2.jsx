import React, { useEffect, useState } from "react";
import Navbar from "../navbar/navbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { addProduct, removeCart } from "../../Redux/Actions/Actions";
import { gapi } from "gapi-script";
import LoginGoogle from "./LoginGoogle/LoginGoogle";
import { useNavigate } from "react-router-dom";

const clientId =
  "650713409200-ugee25co9jjpjkp8ufhob0odo9vdn5a9.apps.googleusercontent.com";

export const Login2 = () => {
  // const [user, userState] = useState({})
  const [user, userState] = useState({});
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [mensaje, setMensaje] = useState();
  const [loading, setLoading] = useState(false);

  // async function handleSubmit(e) {
  //   e.preventDefault()
  //   let email = user?.email
  //   let password = user?.password
  //   console.log(user?.email, user?.password)
  //   await axios('/users/login', {
  //     method: 'POST',
  //     crossDomain: true,
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json',
  //       'Access-Control-Allow-Origin': '*'
  //     },
  //     body: JSON.stringify({
  //       email,
  //       password
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data, 'login')
  //       window.localStorage.setItem('token', data.data);
  //       window.localStorage.setItem('isLogged', true);
  //       window.localStorage.setItem('id', data.id);
  //       window.localStorage.setItem('email', email)
  //       if (data.status === 'ok') {

  //         setTimeout(() => {
  //           swal({
  //             title: "Login successful",
  //             icon: "success",
  //             button: "Ok",
  //           });
  //           window.location.href = '/userDetail'
  //         }, 2000)
  //       } else {
  //         alert('invalid email or password ')

  //       }
  //     })
  // }

  // function handleChange(e) {
  //   userState({ ...user, [e.target.name]: e.target.value })
  //   // console.log(user)
  //   // console.log(user)
  // }

  const navigate = useNavigate();
  const { email, password } = inputs;

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      const Usuario = {
        email,
        password,
      };
      setLoading(true);
      await axios
        .post("/users/login", Usuario)
        .then((res) => {
          const { data } = res;
          setMensaje(data.mensaje);
          console.log(data.isActive);

          if (data.isActive === false) {
            swal({
              title: "Sorry. Your User is Banned",
              icon: "error",
              button: "Ok",
            });
            navigate("/login");
          } else {
            setMensaje("");
            console.log(data, "login");
            localStorage.setItem("token", data.data);
            localStorage.setItem("isLogged", true);
            localStorage.setItem("id", data.id);
            localStorage.setItem("email", email);
            // funcion para guardar carrito en la db
            const localCart = window.sessionStorage.getItem("localCart");
            const id = window.localStorage.getItem("id");
            console.log(localCart);
            if (localCart) {
              const newCart = {
                user_id: id,
                products_id: JSON.parse(localCart),
              };
              dispatch(addProduct(newCart));
              dispatch(removeCart);
              window.sessionStorage.removeItem("localCart");
            }
            setTimeout(() => {
              swal({
                title: "Login successful",
                icon: "success",
                button: "Ok",
              });
              navigate("/userDetail");
            }, 2000);
          }
        })
        .catch((error) => {
          console.error(error);
          setMensaje("Correo u contraseña incorreta");
            setMensaje("");
            swal({
              title: "email or password invalid",
              icon: "error",
              button: "Ok",
            });
        });
      setInputs({ email: "", password: "" });
      setLoading(false);
    }
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  return (
    <div>
      <Navbar />
      <form>
        <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl my-40">
          <div
            className="hidden bg-cover lg:block lg:w-1/2"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1606660265514-358ebbadc80d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1575&q=80')`,
            }}
          ></div>

          <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
            <h2 className="text-2xl font-semibold text-center text-gray-700 dark:text-white">
              CompuDevs
            </h2>

            <p className="text-xl text-center text-gray-600 dark:text-gray-200">
              Bienvenido de vuelta!
            </p>

            {/* <a
              href="#"
              className="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <div className="px-4 py-2">
                <svg className="w-6 h-6" viewBox="0 0 40 40">
                  <path
                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                    fill="#FFC107"
                  />
                  <path
                    d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                    fill="#FF3D00"
                  />
                  <path
                    d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                    fill="#4CAF50"
                  />
                  <path
                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                    fill="#1976D2"
                  />
                </svg>
              </div>

              <span className="w-5/6 px-4 py-3 font-bold text-center">
                Ingresa con Google
              </span>
            </a> */}

            <div>
              <span className="w-5/6 px-4 py-3 font-bold text-center">
                <LoginGoogle />
              </span>
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

              <a
                href="#"
                className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
              >
                o inicia sesion con tu correo electronico
              </a>

              <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
            </div>

            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                for="LoggingEmailAddress"
              >
                Correo electronico
              </label>
              <input
                id="LoggingEmailAddress"
                name="email"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="mt-4">
              <div className="flex justify-between">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                  for="loggingPassword"
                >
                  Contraseña
                </label>
                <a
                  href="/forgotPassword"
                  className="text-xs text-gray-500 dark:text-gray-300 hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <input
                id="loggingPassword"
                name="password"
                autoComplete="off"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="mt-8">
              <button
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                type="submit"
                onClick={(e) => handleSubmit(e)}
              >
                Inicia sesión
              </button>
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

              <a
                href="/register"
                className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
              >
                o crea tu cuenta
              </a>

              <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
