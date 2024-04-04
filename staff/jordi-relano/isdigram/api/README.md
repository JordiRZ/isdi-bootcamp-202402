# API

## endpoints

- register user

```sh
curl -X POST -H "Content-Type: application/json" -d '{"name":"Pepito Grillo","birthdate":"2000-01-01","email":"pepito@grillo.com","username":"pepitogrillo","password":"123123123"}' http://localhost:8080/users -v
```

- login user

```sh
curl -X POST -H "Content-Type: application/json" -d '{"username":"pepitogrillo","password":"1Z"}' http://localhost:8080/users/auth -v
```


- retrieve user

```sh
curl -X GET -H "Content-Type: application/json" -d '{"userId":"bcstiqre3zk"}' http://localhost:8080/user/:userId -v
```

- logout user

```sh
curl -X GET -H "Content-Type: application/json" -d '{"userId":"bcstiqre3zk"}' http://localhost:8080/logout -v
```

