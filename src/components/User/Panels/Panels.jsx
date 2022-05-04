import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AdminPanel from './AdminPanel'
import ProviderPanel from './ProviderPanel'
import UserPanel from './UserPanel'

const Panels = () => {
  const dataUser = useSelector(state => state.login.login)
  let actualUser = '';  // 'admin' // user // provider // admin
  if (dataUser.isProvider) actualUser = 'provider'
  if (dataUser.isAdmin) actualUser = 'admin';
  if (!dataUser.isAdmin && !dataUser.isProvider) actualUser = 'user';

  const [typeUser, setTypeUser] = useState()

  useEffect(() => {
    setTypeUser(actualUser);
  });

  return (
    <>
      {
        typeUser === 'admin' ? (<AdminPanel name={dataUser.name} email={dataUser.email} />) :
          typeUser === 'provider' ? (<ProviderPanel name={dataUser.name} email={dataUser.email} />) :
            typeUser === 'user' ? (<UserPanel name={dataUser.name} email={dataUser.email} user_id={dataUser.id} />) : null
      }
    </>
  )
}

export default Panels