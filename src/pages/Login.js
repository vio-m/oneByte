import "../styles/Signup.css"
import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from '../contexts/AuthContext'
import { getAuth } from "firebase/auth";
import { getDatabase, onValue, ref, get, child } from 'firebase/database';
import "bootstrap/dist/css/bootstrap.min.css"

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();


    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            navigate("/")
        } catch {
            setError("Failed to log in")
        } finally {
            const user = getAuth().currentUser
            onValue(ref(getDatabase(), `/data/user/${ user.uid }/level`), (snapshot)=> {
                sessionStorage.setItem("level", snapshot.val())
            })
        }
        setLoading(false)
    }

    return (
        <div className="signup">

            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-4" type="submit">Log In</Button>
                    </Form>
                </Card.Body>
            </Card>

            <div className="w-100 text-center mt-2">
                Don`t have an account? <Link to="/signup">Sign Up</Link>
            </div>

        </div>
    )
}