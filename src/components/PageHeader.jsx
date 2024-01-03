/* eslint-disable react/prop-types */
import "./PageHeader.css"
function PageHeader(props) {
    return (
        <header id="page-header">
            <div className="container">
                <h1>{props.titulo}</h1>
            </div>
        </header>
    )
}

export default PageHeader