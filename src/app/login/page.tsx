import LoginForm from '@/components/loginForm'
import React from 'react'

const LoginPage = () => {
    return (
        <div
            className='w-screen h-screen'
            style={{
                backgroundImage: `url('/background/login-bg.webp')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <LoginForm />
        </div>
    )
}

export default LoginPage