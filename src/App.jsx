import { useState } from "react";
import { TARJETAS } from './tarjetas.js'

function App(){
    const [indice, setIndice] = useState(0)
    const tarjeta = TARJETAS[indice]
    const esUltima = indice === TARJETAS.length - 1

    return(
    <div className='card'>
        <button className='boton' onClick={() => setIndice(i => i + 1)} disabled={esUltima}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="72" height="72">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
        </button>
        <h1>{tarjeta.titulo}</h1>
        <p>{tarjeta.texto}</p>
        <span className='contador'>{indice + 1} / {TARJETAS.length}</span>
    </div>
    )
}

export default App