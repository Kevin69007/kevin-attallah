// server/api/create-order.post.ts

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const body = await readBody(event)
  const { productId, currency, description } = body

  if (!productId || !currency) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Champs obligatoires manquants : productId et currency',
    })
  }

  // Server-side price lookup - never trust client-provided amount
  const product = getProduct(productId)
  if (!product) {
    throw createError({
      statusCode: 400,
      statusMessage: `Produit inconnu : ${productId}`,
    })
  }

  const orderData = JSON.stringify({
    amount: product.price * 100, // Revolut expects cents
    currency: currency.toUpperCase(),
    description: description || product.description,
  })

  try {
    const isSandbox = config.public.revolutSandbox === true || config.public.revolutSandbox === 'true'
    const apiUrl = isSandbox
      ? 'https://sandbox-merchant.revolut.com/api/orders'
      : 'https://merchant.revolut.com/api/orders'

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${config.revolutApiKey}`,
        'Revolut-Api-Version': '2024-09-01',
      },
      body: orderData,
    })

    const data = await response.json()

    if (response.ok) {
      return data
    } else {
      throw createError({
        statusCode: response.status,
        statusMessage: 'Impossible de créer la commande',
        data: { error: 'Impossible de créer la commande', details: data },
      })
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      data: { error: 'Internal Server Error', details: error.message },
    })
  }
})
