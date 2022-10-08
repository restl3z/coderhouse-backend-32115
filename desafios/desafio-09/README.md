## Creación del entorno

- Crear un directorio local para contener la base de datos

```
mkdir {dir}
```

- Crea y ejecuta el contenedor

```
docker run \
    --name {container-name} \
    -v {dir}:/data/db \
    -e MONGO_INITDB_ROOT_USERNAME={username} \
    -e MONGO_INITDB_ROOT_PASSWORD={password} \
    -p {host-port}:27017 \
    -d mongo
```

- Acceder al contenedor

```
docker exec -it {container-name} bash
```

- Autenticar

```
mongosh -u {username} -p
```

---

## Consigna y Resolución

- Utilizando Mongo Shell, crear una base de datos llamada ecommerce que contenga dos colecciones: mensajes y productos.

  ```
  use ecommerce
  db.createCollection("productos")
  db.createCollection("mensajes")
  ```

- Agregar 10 documentos con valores distintos a las colecciones mensajes y productos. El formato de los documentos debe estar en correspondencia con el que venimos utilizando en el entregable con base de datos MariaDB.

  ```
  db.productos.insertMany([
      {
          "title": "Magic Scroll",
          "price": 120,
          "thumbnail": "https://pics.freeicons.io/uploads/icons/png/14939573091556862159-512.png",
          "id": 1
      },
      {
          "title": "Treasure Map",
          "price": 500,
          "thumbnail": "https://pics.freeicons.io/uploads/icons/png/15230348491556862142-512.png",
          "id": 2
      },
      {
          "title": "Battle Sword",
          "price": 2300,
          "thumbnail": "https://pics.freeicons.io/uploads/icons/png/18487158821556862159-512.png",
          "id": 3
      },
      {
          "title": "Fire Spell",
          "price": 1800,
          "thumbnail": "https://pics.freeicons.io/uploads/icons/png/11726442951556862158-512.png",
          "id": 4
      },
      {
          "title": "Battle Helmet",
          "price": 2000,
          "thumbnail": "https://pics.freeicons.io/uploads/icons/png/7740633271556862154-512.png",
          "id": 5
      },
      {
          "title": "Ranger Bow",
          "price": 4000,
          "thumbnail": "https://pics.freeicons.io/uploads/icons/png/14574180441644560211-512.png",
          "id": 6
      },
      {
          "title": "Supreme Bow",
          "price": 4000,
          "thumbnail": "https://pics.freeicons.io/premium/bow-arrow-idea-creative-weapon-icon-518495-256.png",
          "id": 7
      },
      {
          "title": "Spear",
          "price": 4000,
          "thumbnail": "https://pics.freeicons.io/premium/spear-cultures-lance-miscellaneous-spears-icon-119613-256.png",
          "id": 8
      },
      {
          "title": "Speed Boots",
          "price": 4000,
          "thumbnail": "https://pics.freeicons.io/premium/boot-of-hermes-god-mythology-winged-fly-greek-icon-519677-256.png",
          "id": 9
      },
      {
          "title": "Dagger",
          "price": 4000,
          "thumbnail": "https://pics.freeicons.io/uploads/icons/png/12871470641639202809-512.png",
          "id": 10
      }
  ])
  ```

  ```
  db.mensajes.insertMany([
      {
          "username": "username1",
          "content": "Holaaa"
      },
      {
          "username": "username2",
          "content": "Cómo están?"
      },
      {
          "username": "username3",
          "content": "Buenas"
      },
      {
          "username": "username1",
          "content": "Todo bien, uds?"
      },
      {
          "username": "username2",
          "content": "Bien"
      },
      {
          "username": "username4",
          "content": "Joya"
      },
      {
          "username": "username3",
          "content": "Codeando"
      },
      {
          "username": "username2",
          "content": "Bien ahí"
      },
      {
          "username": "username1",
          "content": "Esooo"
      },
      {
          "username": "username1",
          "content": "En la misma"
      }
  ])
  ```

- Deﬁnir las claves de los documentos en relación a los campos de las tablas de esa base. En el caso de los productos, poner valores al campo precio entre los 100 y 5000 pesos (eligiendo valores intermedios, ej: 120, 580, 900, 1280, 1700, 2300, 2860, 3350, 4320, 4990).

- Listar todos los documentos en cada colección.

  ```
  db.productos.find()
  db.mensajes.find()
  ```

- Mostrar la cantidad de documentos almacenados en cada una de ellas.

  ```
  db.productos.countDocuments()
  db.mensajes.countDocuments()
  ```

- Realizar un CRUD sobre la colección de productos:

  - Agregar un producto más en la colección de productos.
    ```
    db.productos.insertOne(
        {
            "title": "Magic Staff",
            "price": 3600,
            "thumbnail": "https://www.clipartmax.com/png/middle/232-2327275_magic-medieval-spell-staff-wood-icon-magic-staff-clipart.png",
            "id": 11
        })
    ```
  - Realizar una consulta por nombre de producto especíﬁco:
    - Listar los productos con precio menor a 1000 pesos.
      ```
      db.productos.find({price: {$lt:1000}})
      ```
    - Listar los productos con precio entre los 1000 a 3000 pesos.
      ```
      db.productos.find({price: {$lt:3000, $gt:1000}})
      ```
    - Listar los productos con precio mayor a 3000 pesos.
      ```
      db.productos.find({price: {$gt:3000}})
      ```
    - Realizar una consulta que traiga sólo el nombre del tercer producto más barato.
      ```
      db.productos.find({}, {title: 1}).sort( {"price": 1}).skip(2).limit(1)
      ```
  - Hacer una actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100.
    ```
    db.productos.updateMany({}, { $set : { "stock" : 100 } })
    ```
  - Cambiar el stock a cero de los productos con precios mayores a 4000 pesos.
    ```
    db.productos.updateMany({ price: {$gt : 4000 } }, { $set : { "stock" : 0 } })
    ```
  - Borrar los productos con precio menor a 1000 pesos.
    ```
    db.productos.deleteMany( { price : {$lt : 1000} } )
    ```

- Crear un usuario 'pepe' clave: 'asd456' que sólo pueda leer la base de datos ecommerce. Veriﬁcar que pepe no pueda cambiar la información.

  ```
  db.createUser(
  {
      user: "pepe",
      pwd:  "asd456",
      roles: [ { role: "read", db: "ecommerce" } ]
  })
  ```

  ```
  root@ec295f816a48:/# mongosh -u pepe --authenticationDatabase "ecommerce" -p
  Enter password: ******
  Current Mongosh Log ID: 6341ea93ad0ea5065bbc1da9
  Connecting to:          mongodb://<credentials>@127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&authSource=ecommerce&appName=mongosh+1.6.0
  Using MongoDB:          6.0.2
  Using Mongosh:          1.6.0
  For mongosh info see: https://docs.mongodb.com/mongodb-shell/
  ```
