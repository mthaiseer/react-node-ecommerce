import React from 'react';
import Menu from './Menu'
import '../style.css'

const Layout = ({
    title =  "Title",
    description  = "Description",
    className,
    children
})=>{

    return(
        <div>
            <Menu/>
            <div className="jumbotron">
                <h2>{title}</h2>
                <p className="muted">{description}</p>
            </div>
            <div className={className}> 
                {children}
            </div>
        </div>
    )

}

export default Layout;