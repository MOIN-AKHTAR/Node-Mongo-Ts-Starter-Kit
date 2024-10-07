<div align="center">
<h1> STARTER KIT </h1>  
</div>

# Documentation

1- [FIGMA DESIGN](LINK-HERE)

## Tech Stack

**Server:** Node, Express

**Database:** Mongodb

**Additional Services:** S3

## Node Version

**20.11.1**

## Yarn Version

**1.22.22**

## Run Locally

Run local mongodb container

```bash
  docker run -p 27017:27017 --name aiHeadShot -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=root  -v <LOCAL-PATH> -d mongo
```

Clone the project

```bash
  git clone https://github.com/project
```

Go to the project directory

```bash
  cd project
```

Install dependencies

```bash
yarn
```

Run development server

```bash
yarn dev
```

Create production build

```bash
yarn run build
```

Prettify code

```bash
yarn lint:fix
```

## For Apis Docs

```
<BASE URL>/api/v1/docs

ex: http:localhost:3000/api-docs
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
