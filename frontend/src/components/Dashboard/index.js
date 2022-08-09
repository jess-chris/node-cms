import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';


export default function Dashboard() {

  // const navigate = useNavigate();
  // const [sid, setSid] = useState(false);

  // useEffect(() => {

  //   (async () => {
  //     const checkSession = await Cookies.get('session');
  //     if (checkSession) setSid(true);
  //   })();

  // }, []);

  // if (!sid) navigate('/node-cms/login');

  return (
    <>

      <h1>Admin zone</h1>

    </>
  );


};