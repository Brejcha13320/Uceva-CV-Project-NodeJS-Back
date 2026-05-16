# Clean Architecture en NodeJS

```
src
├── domain
│   ├── models
│   │   ├── user.entity.ts
│   │   └── product.entity.ts
│   └── repositories
│       ├── user.repository.ts
│       └── product.repository.ts
│
├── application
│   └── use-cases
│       ├── get-all-users.usecase.ts
│       └── get-all-products.usecase.ts
│
├── infrastructure
│   ├── controllers
│   │   ├── user.controller.ts
│   │   └── product.controller.ts
│   ├── repositories
│   │   ├── user.repository.impl.ts
│   │   └── product.repository.impl.ts
│   ├── datasources
│   │   ├── user.datasource.ts
│   │   └── product.datasource.ts
│   └── web
│       ├── config/
│       ├── errors/
│       ├── interfaces/
│       ├── controllers/
│       ├── routes/
│       └── server.ts
│
└── app.ts
```

## Paso 1 - Crear Modelos

```
src//domain/models/
├── user.model.ts
└── product.model.ts
```

## Paso 2 - Crear Repositorios

```
src/domain/repositories/
├── user.repository.ts
└── product.repository.ts
```

## Paso 3 - Crear Casos de Uso

```
src/application/usecases/
├── get-all-users.usecase.ts
└── get-all-products.usecase.ts
```

## Paso 4 - Crear Datasources

```
src/infrastructure/datasource/
├── user.datasource.ts
└── product.datasource.ts
```

## Paso 5 - Crear Repositorios Implementadores

```
src/infrastructure/repositories/
├── user.repository.impl.ts
└── product.repository.impl.ts
```

## Paso 6 - Implementar Web (Express – Framework Externo)

```
src/infrastructure/web/
├── config/
├── errors/
├── interfaces/
├── controllers/
├── routes/
└── server.ts
```

# Funcionamiento del Backend

## Ejecutar Backend
```
npm run start
```

## Urls Consumo
```
http://localhost:3000/api/docs
http://localhost:3000/api/users/{countUsers}
http://localhost:3000/api/products/{countProducts}
```