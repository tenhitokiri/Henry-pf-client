import React, {useState, useEffect} from 'react';
import AdminPanel from './AdminPanel'
import ProviderPanel from './ProviderPanel'
import UserPanel from './UserPanel'

const Panels = () => {
    const actualUser = 'admin' // user // provider // admin
    const [typeUser, setTypeUser] = useState()

    useEffect(() => {
        setTypeUser(actualUser);
      });

    return (
        <>
            {
              typeUser === 'admin' ? (<AdminPanel />) :
              typeUser === 'provider' ? (<ProviderPanel />) :
              typeUser === 'user' ? (<UserPanel />) : null
            }
        </>
    )
}

export default Panels