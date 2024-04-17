import { logger, showFeedback } from '../utils';

import logic from '../logic';


function Register(props) {

    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value
        const birthdate = form.birthdate.value
        const email = form.email.value
        const username = form.username.value
        const password = form.password.value

        try {
            logic.registerUser(name, birthdate, email, username, password)
                .then(() => {
                    form.reset()

                    props.onUserRegistered()
                })
                .catch(showFeedback)






        } catch (error) {
            showFeedback(error)
        }
    }


    const handleLoginClick = event => {
        event.preventDefault();

        props.onLoginClick();
    }


    logger.debug('Register -> render');
    return <>
        <main className='container ml-auto mr-auto flex flex-wrap items-start mt-8'>
            <div class="w-full pl-2 pr-2 mb-4 mt-4">
                <h1 className='text-3xl font-extrabold text-center'>Register</h1>


                <form className='bg-white px-8 pt-10 pb-8 mb-4' onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <div className='grid grid-flow-row sm:grid-flow-col gap-3'>
                            <div class="sm:col-span-4 justify-center">

                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="name">Name</label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="text" id="name" />

                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="birthdate">Age</label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="date" id="birthdate" />

                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email">E-mail</label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="email" id="email" />

                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="username">Username</label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id="username" />

                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">Password</label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="password" id="password" />
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center justify-between">

                        <button className="className='bg-blue-500 hover:bg-blue-700 text-black font-extrabold py-2 px-4 rounded focus:outline-none focus:shadow-outline'" type="submit">Click to Register</button>



                    </div>
                </form>


                <a href="" className='font-bold' onClick={handleLoginClick}>Go directly to Login</a>
            </div>
        </main >
    </>
}


export default Register