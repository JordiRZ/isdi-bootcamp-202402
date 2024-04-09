//FUNCIONES HECHAS CON EXPRESS JS

import express from "express";
import logic from "./logic/index.ts";

const api = express();

const jsonBodyParser = express.json();

api.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); //Permite el acceso cruzado a recursos de un dominio diferente en el navegador del cliente.
    res.setHeader("Access-Control-Allow-Methods", "*"); //indica qué métodos HTTP son permitidos desde el origen solicitante. Este encabezado especifica una lista separada por comas de los métodos HTTP permitidos.
    res.setHeader("Access-Control-Allow-Headers", "*");
    //permite a un servidor especificar qué encabezados HTTP personalizados pueden ser enviados en una solicitud desde un origen cruzado.

    next();
});

//REGISTER USER CON EXPRESS JS

api.post("/users", jsonBodyParser, (req, res) => {
    try {
        const { name, birthdate, email, username, password } = req.body;

        logic.registerUser(name, birthdate, email, username, password, (error) => {
            if (error) {
                res
                    .status(400)
                    .json({ error: error.constructor.name, message: error.message });

                return;
            }

            res.status(201).send();
        });
    } catch (error) {
        res
            .status(400)
            .json({ error: error.constructor.name, message: error.message });
    }
});

//LOGIN USER CON EXPRESS JS
api.post("/users/auth", jsonBodyParser, (req, res) => {
    try {
        const { username, password } = req.body;

        logic.loginUser(username, password, (error, userId) => {
            if (error) {
                res
                    .status(400)
                    .json({ error: error.constructor.name, message: error.message });

                return;
            }

            res.json(userId);
        });
    } catch (error) {
        res
            .status(400)
            .json({ error: error.constructor.name, message: error.message });
    }
});

//RETRIEVE USER CON EXPRESS JS
api.get("/users/:userId", (req, res) => {
    try {
        const { userId } = req.params;

        logic.retrieveUser(userId, (error, user) => {
            if (error) {
                res
                    .status(400)
                    .json({ error: error.constructor.name, message: error.message });

                return;
            }

            res.json(user);
        });
    } catch (error) {
        res
            .status(400)
            .json({ error: error.constructor.name, message: error.message });
    }
});

//RETRIEVE POSTS CON EXRESS
api.get("/posts", (req, res) => {
    try {
        const { authorization: userId } = req.headers;

        logic.retrievePosts(userId, (error, posts) => {
            if (error) {
                res
                    .status(400)
                    .json({ error: error.constructor.name, message: error.message });

                return;
            }

            res.json(posts);
        });
    } catch (error) {
        res
            .status(400)
            .json({ error: error.constructor.name, message: error.message });
    }
});

// LOGOUT USER CON EXPRESS JS
api.patch("/users/:userId", jsonBodyParser, (req, res) => {
    try {
        logic.logoutUser(req.params.userId, (error, user) => {
            if (error) {
                res
                    .status(500)
                    .json({ error: error.constructor.name, message: error.message });
                //error.constructor.name sirve para que nos refleje que tipo de error saldria

                return;
            }

            if (user) {
                res.status(202).json(user);
            } else {
                res.status(404).json(null);
            }
        });
    } catch (error) {
        res.status(500).json(null);
    }
});

api.post('/posts', jsonBodyParser, (req, res) => {
    try {
        const { authorization: userId } = req.headers

        const { image, text } = req.body

        logic.createPost(userId, image, text, error => {
            if (error) {
                res.status(400).json({ error: error.constructor.name, message: error.message })

                return
            }

            res.status(201).send()
        })

    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })
    }
})

api.listen(8080, () => console.log("API listening on port 8080"));