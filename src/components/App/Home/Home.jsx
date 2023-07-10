import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  recCodeToTemp,
  realtimeDbHandlers,
  getUserData,
} from "../../../utils/homeUtils";
import useGetRecomendation from "../../../utils/useGetRecomendation";
import { BsThermometerSnow } from "react-icons/bs";
import { IoHappyOutline } from "react-icons/io5";
import { WiHot } from "react-icons/wi";
import ProfileCard from "./ProfileCard";
import AdminPanel from "./AdminPanel";
import useSetTitle from "../../../utils/useSetTitle";
import mqttService from "../../../utils/mqttUtils";
import Swal from 'sweetalert2';

function Home() {
  useSetTitle("Home");

  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [lastVoteTime, setLastVoteTime] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      fetchTemperature();
    }, 5000); // Actualiza la temperatura cada 5 segundos
  
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
  
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  const fetchTemperature = async () => {
    try {
      const response = await fetch('http://200.126.13.206:5000/api/v1/ac/temp');
      if (response.ok) {
        const data = await response.json();
        setTemperature(data.Message);
        setLoading(false);
        console.log('Temperatura:', data.Message);
      } else {
        console.log('Error fetching temperature. Status:', response.status);
        const responseBody = await response.text();
        console.log('Response body:', responseBody);

      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  
  const [setRec,] = realtimeDbHandlers();
  const { publish, topic } = mqttService;
  const done = useGetRecomendation(setRec);


  
  const registerVote = async (nivel) => {
    try {
      const response = await fetch('http://200.126.14.234:8080/api/v1/votacionComfortRL/votacionComfort', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nivel })
      });

      if (response.ok) {
        Swal.fire(
          '¡Gracias!',
          'Tu voto fue registrado',
          'success'
        )
        setLastVoteTime(new Date());
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Hubo un error al registrar tu voto',
        })     }
    } catch (error) {
      console.error('Error:', error);
    }
  };
// Calcula si han pasado menos de un minuto desde la última votación
  const oneMinuteAgo = new Date(new Date().getTime() - 60000);
  const lessThanAMinuteAgo = lastVoteTime && lastVoteTime > oneMinuteAgo;

  return (
    // Contenedor completo
    <div className="flex-grow flex flex-col md:flex-row md:flex p-8 ">
      {/* Parte Home con funcionalidades */}
      <div className="md:p-6 md:mr-6 md:w-2/3 md:border-r-2 md:border-r-gray-400 flex flex-col justify-center items-center">
        <div className="bg-gray-800 rounded-2xl px-8 py-6 shadow-lg my-10 w-5/6 h-11/12 text-gray-50">
          <h1>
            <Link to={"/about"} className="underline">
              Acerca del proyecto
            </Link>
          </h1>
          <div className="flex flex-col justify-center items-center mt-4">
            <h1>Temperatura del aire:</h1>
            <h1 className="font-semibold text-xl">
            {loading ? "Cargando..." : ` ${temperature}°C`}
            </h1>
          </div>
          {userRole === "admin" ? (
            <AdminPanel
              displayTemperature={displayTemperature}
              temperature={temperature}
              recCodeToTemp={recCodeToTemp}
              setRec={setRec}
              publish={publish}
              topic={topic}
            />
          ) : (
            <></>
          )}
          {/*---------------------------- Botones para votar ----------------------------*/}
          <div className="inline-block text-center w-full mb-4 text-black">
            <h1 className="mt-5 text-gray-50">
              Cuentanos, ¿qué sientes en este momento?
            </h1>
            <div className="float-left px-[2px] sm:px-4 w-1/3 ">
              <div className="flex flex-col items-center">
                <BsThermometerSnow className="p-4" color="#60a5fa" size={80} />
              </div>
              <button
                className="w-full rounded bg-emerald-400 h-[28px]"
                onClick={() => {
                  registerVote("frio");
                }}
                disabled={lessThanAMinuteAgo}  // Deshabilita el botón si han pasado menos de un minuto
              >
                Frio
              </button>
            </div>
            <div className="float-left px-[2px] sm:px-4 w-1/3">
              <div className="flex flex-col items-center">
                <IoHappyOutline className="p-4" color="#FFF" size={80} />
              </div>
              <button
                className="w-full rounded bg-emerald-400 h-[28px]"
                onClick={() => {
                  registerVote("neutral");
                }}
                disabled={lessThanAMinuteAgo}  // Deshabilita el botón si han pasado menos de un minuto
              >
                Neutral
              </button>
            </div>
            <div className="float-left px-[2px]  sm:px-4 w-1/3 ">
              <div className="flex flex-col items-center">
                <WiHot className="p-4" color="#fbbf24" size={80} />
              </div>
              <button
                className="w-full rounded bg-emerald-400 h-[28px]"
                onClick={() => {
                  registerVote("calor");
                }}
                disabled={lessThanAMinuteAgo}  // Deshabilita el botón si han pasado menos de un minuto
              >
                Calor
              </button>
            </div>
          </div>
          <h1 className="mt-5 text-gray-50">
          {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
          </h1>
        </div>
      </div>
{/*---------------------------- Profile segment ----------------------------*/}
<div className="md:w-1/3 md:border-opacity-0 border-t-2 border-t-gray-400 flex flex-col justify-center items-center">
  <ProfileCard role={userRole} username={userName} />
</div>
</div>
);
}

export default Home;










  /*
  Ideas o cosas necesarias para mejorar el UI/UX
  -Poner un timer que avise cuanto falta para el siguiente cambio de estado
  -Mejorar el feedback cuando se presiona un boton de comfort
  -Hacer que lo botones se blooquen cuando vote cualquier instancia del usuario estudiante. Desbloquear cuando llegue la recomendación. Es decir cada 15 minutos.
  */