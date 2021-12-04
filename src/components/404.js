/* component when page not found */
import { Component } from 'react';
import { Link } from 'react-router-dom';

// 404 page
export class NotFound extends Component {
    render() {
        return (
            <div
                style={{
                    color: '#e63946',
                    fontFamily: 'Montserrat',
                    textAlign: 'center',
                    position: 'absolute',
                    left: '50%',
                    top: '40%',
                    transform: 'translate(-50%,-50%)',
                }}
            >
                <h1
                    style={{
                        marginTop: '0px',
                        fontSize: '100px',
                        marginBottom: '0px',
                    }}
                >
                    Oops!
                </h1>
                
                <h6 style={{ fontSize: '20px', marginTop: '10px' }}>
                    404 - Page was not found.
                </h6>
                <Link className="btn btn-danger btn-lg"
  
                    to="/home"

                >
                    View Home Page
                </Link>
            </div>
        );
    }
}
