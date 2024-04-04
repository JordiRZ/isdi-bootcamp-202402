import express from 'express'
import logic from './logic/index.ts'

const api = express();

const jsonBodyParser = express.json();

api.post('/users', jsonBodyParser, (req, res) => {
    try {
        const { name, birthdate, email, username, password } = req.body

        logic.registerUser(name, birthdate, email, username, password, error => {
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

api.post('/users/auth', jsonBodyParser, (req, res) => {
    try {
        const { username, password } = req.body

        logic.loginUser(username, password, error => {
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

api.get('/users/:userId', jsonBodyParser, (req, res) => {
    logic.retrieveUser(req.params.userId, (error, user) => {
        if (error) {
            res.status(400).json({ error: error.constructor.name, message: error.message })

            return
        }

        if (!user) {
            res.status(404)
        } else {
            res.status(201).send(`
            <!DOCTYPE html>
                <html lang="en">
                
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>API</title>
                </head>
                
                <body>
                    <h1>Hello${user.username}</h1>
                </body>
                
                </html>`)


        }



    })
}

)

api.get('/retrieve', jsonBodyParser, (req, res) => {
    try {
        const { userId } = req.body

        logic.logoutUser(userId, error => {
            if (error) {
                res.status(400).json({ error: error.constructor.name, message: error.message })

                return
            }

            res.status(200).send('it works properly')

        })
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })
    }
})


api.listen(8080, () => console.log('API listening on port 8080'))