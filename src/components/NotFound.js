/* display 404 error page when question is not found */
import { Component } from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'
// 404 page
export class NotFound extends Component {
    render() {
        return (

            <div id="notfound">
                <div class="notfound-bg"></div>
                <div class="notfound">
                    <div class="notfound-404">
                        <h1>404</h1>
                    </div>
                    <h2>we are sorry, but the page you requested was not found</h2>
                    <Link to="/home" className="home-btn">Go Home</Link>
                </div>
            </div>
        );
    }
}
