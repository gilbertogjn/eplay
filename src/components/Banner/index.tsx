import Tag from '../Tag'
import Button from '../Button'

import { formatPrices } from '../ProductsList'
import { useGetFeaturedGameQuery } from '../../services/api'

import { Image, Title, Prices } from './styles'

const Banner = () => {
  const { data: game } = useGetFeaturedGameQuery()

  if (!game) {
    return <h3>Carregando...</h3>
  }

  return (
    <Image style={{ backgroundImage: `url(${game.media.cover})` }}>
      <div className="container">
        <Tag size="big">Destaque do Dia</Tag>
        <div>
          <Title>{game.name}</Title>
          <Prices>
            De <span>{formatPrices(game.prices.old)}</span>
            <br />
            por apenas {formatPrices(game.prices.current)}
          </Prices>
        </div>
        <Button
          type="link"
          to={`/product/${game.id}`}
          title="Clique aqui para aproveitar esta oferta"
        >
          Aproeitar
        </Button>
      </div>
    </Image>
  )
}

export default Banner
