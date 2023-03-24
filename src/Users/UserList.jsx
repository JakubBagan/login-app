import React, {useState, useEffect, useCallback} from 'react';
import Card from '../UI/Card';

export default function UserList(){

    const [userData, setUserData] = useState([])

    const getDataHandler = useCallback( async () => {
        const res = await fetch('https://login-c63cf-default-rtdb.firebaseio.com/test.json')
        
        const data = await res.json()
  
        const loadedData = []
        for(const key in data){
          loadedData.push({
            key: key,
            name : data[key].name,
            mail : data[key].mail,
            age : data[key].age
          })
        }

        setUserData(loadedData)
    }
    )
  
    useEffect( () => {
      getDataHandler()
     }, [getDataHandler])
    return (
        <>
            <Card >
                {/*
                <ul>
                    {
                        userData.map(user => {
                            return <li key={user.key}>
                                {user.name}
                                {user.age} months old
                                {user.mail}
                            </li> ;
                        })
                    }
                </ul>
                */}
                <table>
                    <tr>
                    <th>
                        Login
                    </th>
                    <th>
                        Age
                    </th>
                    <th>
                        E-mail
                    </th>
                    </tr>
                        {
                            userData.map(user => {
                                return <tr key={user.key}>
                                    <td>{user.name}</td>
                                    <td>{user.age} months old</td>
                                    <td>{user.mail}</td>
                                </tr> ;
                            })
                        }
                    
                </table>
            </Card>
        
        </>
    )
}