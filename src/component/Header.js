import React from 'react'
import '../css/main.css'
import {Link} from 'react-router-dom'
function Header(props) {


    return (
        <div className='video-header-container'>
            <ul className='video-header flex'>
                <Link to='/'>
                <li className='padding-1'>首頁</li>
                </Link>
                <Link to='/favorite'>
                <li className='padding-1'>我的最愛</li>
                </Link>
            </ul>
        </div>
    )
}
export default Header