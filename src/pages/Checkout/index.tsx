import { useState } from 'react'
import Button from '../../components/Button'
import Card from '../../components/Card'
import { InputGroup, Row, TabButton } from './styles'

import boleto from '../../assets/images/boleto.png'
import card from '../../assets/images/cartao.png'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { usePurchaseMutation } from '../../services/api'

const Checkout = () => {
  const [payWithCard, setPayWithCard] = useState(false)
  const [purchase, { isLoading, isError, data }] = usePurchaseMutation()

  const form = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      cpf: '',
      deliveryEmail: '',
      confirmDeliveryEmail: '',
      cardOwner: '',
      cpfCardOwner: '',
      cardDisplayName: '',
      cardNumber: '',
      expiresMonth: '',
      expiresYear: '',
      cardCode: '',
      installments: 1
    },
    validationSchema: Yup.object({
      fullname: Yup.string()
        .min(5, 'O nome precisa ter pelo menos 5 caracteres')
        .required('O campo é obrigatório'),
      email: Yup.string()
        .email('E-mail inválido')
        .required('O campo é obrigatório'),
      cpf: Yup.string()
        .min(14, 'O campo precisar ter 14 caracteres')
        .max(14, 'O campo precisar ter 14 caracteres')
        .email('E-mail inválido')
        .required('O campo é obrigatório'),
      deliveryEmail: Yup.string()
        .email('E-mail inválido')
        .required('O campo é obrigatório'),
      confirmDeliveryEmail: Yup.string()
        .oneOf([Yup.ref('deliveryEmail')], 'Os email são diferentes')
        .required('O campo é obrigatório'),

      cardOwner: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema
      ),
      cpfCardOwner: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema
      ),
      cardDisplayName: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema
      ),
      expiresMonth: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema
      ),
      expiresYear: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema
      ),
      cardCode: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema
      ),
      installments: Yup.string()
        .min(5, 'O campo precisa ter pelo menos 5 caracteres')
        .required('O campo é obrigatório')
    }),
    onSubmit: (values) => {
      purchase({
        billing: {
          document: values.cpf,
          email: values.email,
          name: values.fullName
        },
        delivery: {
          email: values.deliveryEmail
        },
        payment: {
          installments: 1,
          card: {
            active: payWithCard,
            code: Number(values.cardCode),
            name: values.cardDisplayName,
            number: values.cardNumber,
            owner: {
              document: values.cpfCardOwner,
              name: values.cardOwner
            },
            expires: {
              month: 1,
              year: 2024
            }
          }
        },
        products: [
          {
            id: 1,
            price: 10
          }
        ]
      })
    }
  })

  const getErrorMessage = (fieldName: string, message?: string) => {
    const isTouched = fieldName in form.touched
    const isInvalid = fieldName in form.errors

    if (isTouched && isInvalid) return message
    return ''
  }

  return (
    <form onSubmit={form.handleSubmit} className="container">
      <Card title="Dados de cobrança">
        <>
          <Row>
            <InputGroup>
              <label htmlFor="fullName">Nome completo</label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                value={form.values.fullName}
                onChange={form.handleChange}
              />
              <small>{getErrorMessage('fullname', form.errors.fullName)}</small>
            </InputGroup>
            <InputGroup>
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.values.email}
                onChange={form.handleChange}
              />
              <small>{getErrorMessage('email', form.errors.fullName)}</small>
            </InputGroup>
            <InputGroup>
              <label htmlFor="cpf">CPF</label>
              <input
                id="cpf"
                type="text"
                name="cpf"
                value={form.values.cpf}
                onChange={form.handleChange}
              />
              <small>{getErrorMessage('cpf', form.errors.fullName)}</small>
            </InputGroup>
          </Row>
          <h3 className="margin-top">Dados de entrega - conteúdo digital</h3>
          <Row>
            <InputGroup>
              <label htmlFor="deliveryEmail">E-mail</label>
              <input
                type="email"
                id="deliveryEmail"
                name="deliveryEmail"
                value={form.values.deliveryEmail}
                onChange={form.handleChange}
              />
              <small>
                {getErrorMessage('deliveryEmail', form.errors.fullName)}
              </small>
            </InputGroup>
            <InputGroup>
              <label htmlFor="confirmDeliveryEmail">Confirme o e-mail</label>
              <input
                type="email"
                id="confirmDeliveryEmail"
                name="confirmDeliveryEmail"
                value={form.values.confirmDeliveryEmail}
                onChange={form.handleChange}
              />
              <small>
                {getErrorMessage('confirmDeliveryEmail', form.errors.fullName)}
              </small>
            </InputGroup>
          </Row>
        </>
      </Card>
      <Card title="Pagamento">
        <>
          <TabButton
            active={!payWithCard}
            onClick={() => setPayWithCard(false)}
          >
            <img src={boleto} alt="Boleto" />
            Boleto Bancário
          </TabButton>
          <TabButton active={payWithCard} onClick={() => setPayWithCard(true)}>
            <img src={card} alt="Cartão de crédito" />
            Cartão de crédito
          </TabButton>
          <div className="margin-top">
            {payWithCard ? (
              <>
                <Row>
                  <InputGroup>
                    <label htmlFor="cardOwner">Nome do titular do cartão</label>
                    <input
                      type="text"
                      id="cardOwner"
                      name="deliveryEmail"
                      value={form.values.confirmDeliveryEmail}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                    />
                    <small>
                      {getErrorMessage('cardOwner', form.errors.fullName)}
                    </small>
                  </InputGroup>
                  <InputGroup>
                    <label htmlFor="cpfCardOwner">
                      CPF do titular do cartão
                    </label>
                    <input
                      type="text"
                      id="cpfCardOwner"
                      name="cpfCardOwner"
                      value={form.values.cpfCardOwner}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                    />
                    {getErrorMessage('cpfCardOwner', form.errors.fullName)}
                  </InputGroup>
                  <InputGroup>
                    <label htmlFor="cardDisplayName">Nome no cartão</label>
                    <input
                      type="text"
                      id="cardDisplayName"
                      name="cardDisplayName"
                      value={form.values.cardDisplayName}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                    />
                    {getErrorMessage('cardDisplayName', form.errors.fullName)}
                  </InputGroup>
                  <InputGroup>
                    <label htmlFor="cardNumber">Número do cartão</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={form.values.cardNumber}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                    />
                    {getErrorMessage('cardNumber', form.errors.fullName)}
                  </InputGroup>
                  <InputGroup maxWidth="123px">
                    <label htmlFor="expiresMonth">Mês do vencimento</label>
                    <input
                      type="text"
                      id="expiresMonth"
                      name="expiresMonth"
                      value={form.values.expiresMonth}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                    />
                    {getErrorMessage('expiresMonth', form.errors.fullName)}
                  </InputGroup>
                  <InputGroup maxWidth="123px">
                    <label htmlFor="expiresYear">Ano de vencimento</label>
                    <input
                      type="text"
                      id="expiresYear"
                      name="expiresYear"
                      value={form.values.expiresYear}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                    />
                    {getErrorMessage('expiresYear', form.errors.fullName)}
                  </InputGroup>
                  <InputGroup maxWidth="48px">
                    <label htmlFor="cardCode">CVV</label>
                    <input
                      type="text"
                      id="cardCode"
                      name="cardCode"
                      value={form.values.cardCode}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                    />
                    {getErrorMessage('cardCode', form.errors.fullName)}
                  </InputGroup>
                </Row>
                <Row marginTop="24px">
                  <InputGroup maxWidth="150px">
                    <label htmlFor="installments">Parcelamento</label>
                    <select
                      id="installments"
                      name="installments"
                      value={form.values.installments}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                    >
                      <option>1x de R$ 200,00</option>
                      <option>1x de R$ 200,00</option>
                      <option>1x de R$ 200,00</option>
                    </select>
                  </InputGroup>
                </Row>
              </>
            ) : (
              <p>
                Ao optar por essa forma de pagamento, é importante lembrar que a
                confirmação pode levar até 3 dias úteis, devido aos prazos
                estabelecidos pelas instituições financeiras. Portanto, a
                liberação do código de ativação do jogo adquirido ocorrerá
                somente após a aprovação do pagamento do boleto.
              </p>
            )}
          </div>
        </>
      </Card>
      <Button
        type="button"
        onClick={form.handleSubmit}
        title="Clique aqui para finalizar a compra"
      >
        Finalizar compra
      </Button>
    </form>
  )
}

export default Checkout
