import { useState, useEffect, useRef } from "react";
import { TARJETAS } from './tarjetas.js'
import musica from './no.mp3'

// Segundo del MP3 por el que empieza la musica (3:10)
const INICIO_MUSICA = 190

function App(){
    // useState: guarda datos que DESCRIBEN la vista. Si cambia, React repinta.
    const [indice, setIndice] = useState(0)
    const tarjeta = TARJETAS[indice]
    const esUltima = indice === TARJETAS.length - 1

    // useRef: guarda algo VIVO del mundo exterior (el elemento <audio>).
    // Se escribe en .current sin que React se entere ni repinte nada.
    // Nace en null porque el <audio> todavia no existe hasta que se pinte.
    const audioref = useRef(null)

    // useEffect: codigo que corre DESPUES de que React ya pintó la pantalla.
    // Es el momento en que el <audio> ya está en el DOM y se puede controlar.
    useEffect(() => {
        // Solo nos interesa en la ultima tarjeta: en las demas, salir.
        if(!esUltima) return

        // .current ya tiene el <audio> real. Si sigue en null, aun no se pintó.
        const audio = audioref.current
        if(!audio) return

        audio.volume = 1.0

        const empezar = () => {
            // Para saltar a un segundo exacto el navegador necesita
            // saber la duracion del archivo, que esta en la cabecera del MP3.
            audio.currentTime = INICIO_MUSICA

            // play() devuelve una Promesa: el navegador puede rechazarla
            // (politica de autoplay). El catch evita un error rojo en consola.
            audio.play().catch(() => {})
        }

        // readyState >= 1 = "ya lei la cabecera del MP3": saltar ahora.
        if(audio.readyState >= 1) empezar()
        // Si no, esperar a que la lea y saltar en ese momento.
        // once:true = ejecutar una sola vez y luego borrar el oyente.
        else audio.addEventListener('loadedmetadata', empezar, { once: true })

    // El array de dependencias es el detonante: si "esUltima" cambia,
    // React vuelve a ejecutar este efecto. [] seria solo al abrir la pagina.
    }, [esUltima])

    return(
    <div className='card'>
        {/*
        ref={audioref} = el puente: React mete el nodo real del DOM
        dentro de la caja audioref.current al insertar el elemento.

        src={musica} = el import de arriba no da una ruta, da la URL
        final que Vite genero al compilar (con hash y base correcta).

        preload="auto" = empezar a descargar el archivo ya.
        Como pesa 9.4 MB, en movil conviene "none" para no gastarlo antes
        de que el usuario llegue a la ultima tarjeta.
        */}
        <audio ref={audioref} src={musica} preload="auto"/>

        {/*
        El boton solo avanza de tarjeta: setIndice con i+1 usa el valor
        anterior del estado, sin depender de la variable "indice" de este render.
        Al terminar, disabled deja el boton inactivo.
        */}
        <button className='boton' onClick={() => setIndice(i => i + 1)} disabled={esUltima}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="72" height="72">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
        </button>
        <h1>{tarjeta.titulo}</h1>
        <p>{tarjeta.texto}</p>
    </div>
    )
}

export default App
