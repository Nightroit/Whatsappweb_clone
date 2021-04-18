import React from 'react'; 
import Header from './Header'; 
import './styles/App.css'
export default ({children}) => {
    return (
        <div>
            <Header/>
            {children}
            {/* Jai Shri Ram */}
        </div>
    )
}