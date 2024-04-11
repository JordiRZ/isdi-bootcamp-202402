//FUNCIONES HECHAS CON EXPRESS JS

import { MongoClient } from "mongodb";
import express from "express";
import logic from "./logic/index.ts";
import { errors } from 'com'
import tracer from 'tracer'
import colors from 'colors'

const logger = tracer.colorConsole({
    filters: {
        debug: colors.green,
        info: colors.blue,
        warn: colors.yellow,
        error: colors.red
    }
})

const { ContentError, SystemError, DuplicityError, NotFoundError, CredentialsError } = errors

const client = new MongoClient('mongodb://localhost:27017');

client.connect()
    .then(connection => {
        const db = connection.db('isdigram');

        const users = db.collection('isdigram');

        logic.users = users

        const api = express();

        const jsonBodyParser = express.json();

        api.use((req, res, next) => {
            res.setHeader("Access-Control-Allow-Origin", "*"); //Permite el acceso cruzado a recursos de un dominio diferente en el navegador del cliente.
            res.setHeader("Access-Control-Allow-Methods", "*"); //indica qué métodos HTTP son permitidos desde el origen solicitante. Este encabezado especifica una lista separada por comas de los métodos HTTP permitidos.
            res.setHeader("Access-Control-Allow-Headers", "*");
            //permite a un servidor especificar qué encabezados HTTP personalizados pueden ser enviados en una solicitud desde un origen cruzado.

            next();
        })

        api.post("/users", jsonBodyParser, (req, res) => {
            try {
                const { name, birthdate, email, username, password, error } = req.body;

                logic.registerUser(name, birthdate, email, username, password, (error) => {
                    if (error) {
                        if (error instanceof SystemError) {
                            logger.error(error.message)
                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof DuplicityError) {
                            logger.warn(error.message)
                            res.status(409).json({ error: error.constructor.name, message: error.message })
                        } else
                            res.status(500).json({ error: error.constructor.name, message: error.message })

                        return;
                    }

                    res.status(201).send();
                });
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError) {
                    logger.warn(error.message)

                    res.status(406).json({ error: error.constructor.name, message: error.message })
                } else {
                    logger.warn(error.message)
                    res.status(500).json({ error: error.constructor.name, message: error.message })
                }
            }
        });

        //LOGIN USER CON EXPRESS JS
        api.post("/users/auth", jsonBodyParser, (req, res) => {
            try {
                const { username, password } = req.body;

                logic.loginUser(username, password, (error, userId) => {
                    if (error) {

                        if (error instanceof SystemError) {
                            logger.error(error.message)
                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof CredentialsError) {
                            logger.warn(error.message)
                            res.status(401).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof NotFoundError) {
                            logger.warn(error.message)
                            res.status(404).json({ error: error.constructor.name, message: error.message })
                        } else
                            res.status(500).json({ error: error.constructor.name, message: error.message })

                        return;
                    }

                    res.json(userId);
                });
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError) {
                    logger.warn(error.message)
                    res.status(406).json({ error: error.constructor.name, message: error.message })
                } else {
                    logger.warn(error.message)
                    res.status(500).json({ error: error.constructor.name, message: error.message })
                }
            }
        });

        //RETRIEVE USER CON EXPRESS JS
        api.get("/users/:targetUserId", (req, res) => {
            try {
                const { authorization: userId } = req.headers;

                const { targetUserId } = req.params;

                logic.retrieveUser(userId, targetUserId, (error, user) => {
                    if (error) {
                        if (error instanceof SystemError) {
                            logger.error(error.message)

                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof NotFoundError) {
                            logger.warn(error.message)

                            res.status(404).json({ error: error.constructor.name, message: error.message })
                        }

                        return
                    }

                    res.json(user)
                })
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError) {
                    logger.warn(error.message)

                    res.status(406).json({ error: error.constructor.name, message: error.message })
                } else {
                    logger.warn(error.message)

                    res.status(500).json({ error: error.constructor.name, message: error.message })
                }
            }
        })

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


        api.listen(8080, () => logger.info("API listening on port 8080"));


    })
    .catch(error => logger.error(error));



//REGISTER USER CON EXPRESS JS

