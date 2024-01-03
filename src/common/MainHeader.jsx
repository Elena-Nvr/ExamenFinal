import "./MainHeader.css"
import logo from "./../assets/images/ideas-digitales-color.png"
function MainHeader() {
    return (
        <header id="main-header">
            <div className="container">
                <img src={logo} alt="" id="logo"/>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo pariatur maxime fugiat.</p>
            </div>
        </header>
    )
}

export default MainHeader