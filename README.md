
# Proyecto Final

_Curso: Backend de Coderhouse_

_Profesor: Andrés Manzano_

_Tutor: Christian Sosa_


## Autor

- [@nadirhierro](https://www.github.com/nadirhierro)


## Descarga

- [Descargar Zip](https://github.com/nadirhierro/backend_proyectoFinal/archive/refs/heads/master.zip)

  ó

- Clonar repositorio
```bash
  git clone https://github.com/nadirhierro/proyectoFinal.git
```

## Instalación

- Instalar paquetes

```bash
  npm i
```
    
## Inicio del servidor

```bash
  npm run start
```
## Args

Este servidor acepta los argumentos

`port` - default: 8080

`host` - default: localhost

`mode` - FORK ó CLUSTER. FORK por default

`container_type` - file, memory ó mongodb. mongodb por default

`admin_mail` - email que se usará como admin_mail

`admin_phone` - wapp que se usará como admin_phone

## API 

### Products

#### Obtener todos los productos

```http
  GET /api/products
```

#### Obtener producto por id

```http
  GET /api/products/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id`      | `ObjectId` | **Required**. El id del producto |

#### Obtener productos por categoría - sólo usuarios

```http
  GET /api/products/category/:categoryid
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `categoryid`| `string` | **Required**. La categoría de los productos |

#### Crear nuevo producto  - sólo admins

```http
  POST /api/products/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `product`| `object` | **Required**. Objeto producto       |
| `product.code`| `number` | **Required**. Código del producto|
| `product.category`| `string` | **Required**. Categoría del producto       |
| `product.subcategory`| `string` | **Required**. Subcategoría del producto       |
| `product.brand`| `string` | **Required**. Marca del producto       |
| `product.name`| `string` | **Required**. Nombre del producto       |
| `product.price`| `number` | **Required**. Precio del producto       |
| `product.featured`| `string` | **Required**. Producto destacado       |
| `product.thumbnail`| `string` | **Required**. Thumbnail del producto       |
| `product.stock`| `number` | **Required**. Stock del producto       |

#### Cambiar producto - sólo admins

```http
  PUT /api/products/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `ObjectId` | **Required**. El id del producto |
| `product`| `object` | **Required**. Objeto producto       |
| `product.code`| `number` | **Not Required**. Código del producto|
| `product.category`| `string` | **Not Required**. Categoría del producto       |
| `product.subcategory`| `string` | **Not Required**. Subcategoría del producto       |
| `product.brand`| `string` | **Not Required**. Marca del producto       |
| `product.name`| `string` | **Not Required**. Nombre del producto       |
| `product.price`| `number` | **Not Required**. Precio del producto       |
| `product.featured`| `string` | **Not Required**. Producto destacado       |
| `product.thumbnail`| `string` | **Not Required**. Thumbnail del producto       |
| `product.stock`| `number` | **Not Required**. Stock del producto       |

#### Eliminar producto por id

```http
  DELETE /api/products/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id`      | `ObjectId` | **Required**. El id del producto |


#### Eliminar todos los productos

```http
  DELETE /api/products/
```

### Carts

#### Obtener todos los carritos

```http
  GET /api/carts
```

#### Obtener producto por id

```http
  GET /api/carts/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id`      | `ObjectId` | **Required**. El id del carrito |

#### Usuario obtiene carrito - sólo usuarios

```http
  GET /api/carts/user/get
```

#### Crear nuevo carrito  - sólo admins

```http
  POST /api/carts/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`| `email` | **Required**. Email del carrito       |
| `address`| `string` | **Required**. Dirección de envío       |
| `products`| `Array` | **Required**. Array de productos       |
| `product._id`| `ObjectId` | **Required**. Id del producto|
| `product.name`| `string` | **Required**. Nombre del producto       |
| `product.price`| `number` | **Required**. Precio del producto       |
| `product.thumbnail`| `string` | **Required**. Thumbnail del producto       |
| `product.quantity`| `number` | **Required**. Cantidad del producto       |

#### Usuario crea carrito vacío - sólo usuarios

```http
  POST /api/carts/user
```

#### Cambiar carrito - sólo usuarios

```http
  PUT /api/carts/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `ObjectId` | **Required**. El id del carrito |
| `email`| `email` | **Not Required**. Email del carrito       |
| `address`| `string` | **Not Required**. Dirección de envío       |
| `products`| `Array` | **Not Required**. Array de productos       |
| `product._id`| `ObjectId` | **Required**. Id del producto|
| `product.name`| `string` | **Required**. Nombre del producto       |
| `product.price`| `number` | **Required**. Precio del producto       |
| `product.thumbnail`| `string` | **Required**. Thumbnail del producto       |
| `product.quantity`| `number` | **Required**. Cantidad del producto       |


#### Agregar producto al carrito - sólo usuarios

```http
  PUT /api/carts/:cartid/products/:productid
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `cartid`      | `ObjectId` | **Required**. El id del carrito |
| `productid`      | `ObjectId` | **Required**. El id del producto |

#### Eliminar producto al carrito - sólo usuarios

```http
  DELETE /api/carts/:cartid/products/:productid
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `cartid`      | `ObjectId` | **Required**. El id del carrito |
| `productid`      | `ObjectId` | **Required**. El id del producto |

#### Eliminar carrito - sólo usuarios

```http
  DELETE /api/carts/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `ObjectId` | **Required**. El id del carrito |

#### Eliminar todos los carrito - sólo admins

```http
  DELETE /api/carts/
```


### Messages

#### Obtener todos los mensajes

```http
  GET /api/messages
```

#### Obtener todos los mensajes del usuarios - sólo admins

```http
  GET /api/messages/:email
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `email` | **Required**. Email del usuario |

#### Usuario crea mensaje - sólo usuarios

```http
  POST /api/messages/user
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `message`      | `string` | **Required**. Mensaje del usuario |

#### Admin crea mensaje - sólo admins

```http
  POST /api/messages/user
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `message`      | `object` | **Required**. Objeto mensaje |
| `message.email`      | `email` | **Required**. Email del usuario al que se le responde |
| `message.message`      | `string` | **Required**. Mensaje del admin |


### Orders

#### Obtener todas las órdenes

```http
  GET /api/orders
```

#### Crear orden - sólo usuarios

```http
  POST /api/orders
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `order`| `object` | **Required**. Objeto orden       |
| `order.email`| `email` | **Required**. Email del carrito       |
| `order.address`| `string` | **Required**. Dirección de envío       |
| `order.products`| `Array` | **Required**. Array de productos       |
| `product`| `object` | **Required**. Array de productos       |
| `product._id`| `ObjectId` | **Required**. Id del producto|
| `product.name`| `string` | **Required**. Nombre del producto       |
| `product.price`| `number` | **Required**. Precio del producto       |
| `product.thumbnail`| `string` | **Required**. Thumbnail del producto       |
| `product.quantity`| `number` | **Required**. Cantidad del producto       |
