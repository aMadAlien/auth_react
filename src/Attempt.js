import { useRef, useState, useEffect } from "react";
import {faCheck, faTimes, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "./api/axios";
import { Link } from "react-router-dom";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';


const Attempt = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        const result = USER_REGEX.test(user);
        setValidName(result)
    }, [user]);

    useEffect(() => {
        setErrMsg('');
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const updateData = await axios.post('/users',
                JSON.stringify({"name": user, "passrord": pwd}), 
                {
                    headers: { 'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            setSuccess(true);
        } catch (e) {
            if (!e?.response) {
                setErrMsg('No Server Response');
            } else if (e.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed');
                // console.log(e);
            }
            // errRef.current.focus();
        }
    }  
    return (
        <section>
            {success ? (<h1>Success!</h1>) : (<h1>Failed!</h1>)}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">
                        Username:
                    </label>
                    <input
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        required
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                    />

                    <button>Sign In</button>
                </form>
        </section>
    )
}

export default Attempt;