import { Link } from 'react-router-dom'

import { HeaderBar, Links, LinkItem, CartButton } from './styles'

import logo from '../../assets/images/logo.svg'
import cart from '../../assets/images/carrinho.svg'

import { open } from '../../store/reducers/cart'
import { useDispatch } from 'react-redux'

const Header = () => {
  const dispatch = useDispatch()

  const openCart = () => {
    dispatch(open())
  }

  return (
    <HeaderBar>
      <div>
        <Link to="/">
          <img src={logo} alt="EPLAY" />
        </Link>
        <nav>
          <Links>
            <LinkItem>
              <Link to="/categories">Categorias</Link>
            </LinkItem>
            <LinkItem>
              <a href="#">Novidades</a>
            </LinkItem>
            <LinkItem>
              <a href="#">Promoções</a>
            </LinkItem>
          </Links>
        </nav>
      </div>
      <div>
        <CartButton onClick={openCart}>
          0 - produto(s)
          <img src={cart} alt="cart" />
        </CartButton>
      </div>
    </HeaderBar>
  )
}

export default Header
