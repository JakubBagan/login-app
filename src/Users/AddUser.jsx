import React, {useState} from 'react'; 
import Button from '../UI/Button';
import Card from '../UI/Card';
import classes from './AddUser.module.css' ;
import ErrorModal from '../UI/ErrorModal' ;

const AddUser = () => {
    const [enteredName, setEnteredName] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");
    const [enteredMail, setEnteredMail] = useState("");
    const [enteredAge, setEnteredAge] = useState("");
    const [errorModal, setErrorModal] = useState(null);

    async function sendDataHandler(){

        const my_object={
            name: enteredName,
            age: enteredAge,
            password: enteredPassword,
            mail: enteredMail
        }

        console.log(my_object);
        
        const res = await fetch('https://login-c63cf-default-rtdb.firebaseio.com/test.json',
        {
        method: 'POST',
        body: JSON.stringify(my_object),
        headers:{
            'Content-Type': 'application.json'
        }

        }) ;
        const data = await res.json() ;
        console.log(data) ;
    }

    function nameChangeHandler(event){
        setEnteredName(event.target.value) ;
        
    }

    function ageChangeHandler(event){
        setEnteredAge(event.target.value) ;
    }

    function passwordChangeHandler(event){
        setEnteredPassword(event.target.value) ;
    }

    function mailChangeHandler(event){
        setEnteredMail(event.target.value) ;
    }

    function addUserHandler(event){
        event.preventDefault();

        if (+enteredAge < 1){
            setErrorModal({
                title:"Błędnie podany wiek",
                msg:"Wiek musi być > 0"
            })
        }
        else if(enteredName === ""){
            setErrorModal({
                title: "Zła nazwa użytkownika",
                msg: "Podaj nazwe użytkownika"
            })
        }
        else if(enteredMail === ""){
            setErrorModal({
                title: "Zły mail",
                msg: "Podaj adres e-mail"
            })
        }
        else if(enteredPassword === ""){
            setErrorModal({
                title: "Złe hasło",
                msg: "Podaj hasło"
            })
        }
        else {
            sendDataHandler()
            setEnteredName('');
            setEnteredAge('');
            setEnteredMail('');
            setEnteredPassword('');
        }
    }

    function errorHandler(event){
        setErrorModal(null)
    }

    return(
        <>
        {errorModal && <ErrorModal 
                        title={errorModal.title} 
                        msg={errorModal.msg} 
                        onConfirm={errorHandler}
                        /> }
    <Card className={classes.input} >
        <form onSubmit={addUserHandler}>
            <label htmlFor="username"> UserName</label>
            <input  id="username" 
                    type="text" 
                    onChange={nameChangeHandler}
                    value={enteredName}
                    />

            <label htmlFor="age"> Age (years) </label>
            <input id="age" type="Number"
                    onChange={ageChangeHandler}
                    value={enteredAge}
            />
            <label htmlFor="mail"> Mail</label>
            <input id="mail" type="email"
                    onChange={mailChangeHandler}
                    value={enteredMail}
            />
            <label htmlFor="password"> Password </label>
            <input id="password" type="password"
                    onChange={passwordChangeHandler}
                    value={enteredPassword}
            />

            <Button type="submit"> Add PrincePolo</Button>
        </form>
    </Card>
    </>
    );
}

export default AddUser;
