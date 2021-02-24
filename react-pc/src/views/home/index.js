import React from 'react'
import RootRouter from '../../router/index'
import { NavLink,HashRouter as Router} from 'react-router-dom'
export default function Home(){
    
        return(
            <>
                <Router>
                    <NavLink to='/login'>登录</NavLink>
                    <NavLink to='/about'>关于</NavLink>
                </Router>

                <RootRouter/>
            </>
        )
}