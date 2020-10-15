import '../styles/globals.css'
import PedidoState from './../context/pedidos/PedidoState';

function MyApp({ Component, pageProps }) {
  return (
    <PedidoState>
      <Component {...pageProps} />
    </PedidoState>
  )
}

export default MyApp
