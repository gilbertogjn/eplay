import Button from '../Button'
import { CartContainer, Overlay, Prices, Quantity, Sidebar } from './styles'

const Cart = () => (
  <CartContainer>
    <Overlay />
    <Sidebar>
      <ul>
        <li>
          <h3>Nome do Jogo</h3>
        </li>
      </ul>
      <Quantity>2 jogo(s) no carrinho</Quantity>
      <Prices>
        Total de R$ 250,00 <span>Em até 6x sem juros</span>
      </Prices>
      <Button type="button" title="Clique aqui para continuar com a compra">
        Continuar com a compra
      </Button>
    </Sidebar>
  </CartContainer>
)

export default Cart
