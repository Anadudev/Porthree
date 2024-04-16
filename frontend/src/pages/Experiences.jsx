import React from 'react'
import { useLoaderData } from "react-router-dom";
import GetUser, { GetRelation } from '../data/GetUser';

const Experiences = () => {
  const userId = useLoaderData();
  const [user, setUser] = useState(second);
  useEffect(() => {
    async function getData() {

    }
  }, [userId])

  console.log(userId);
  return (
    <div>Experiences</div>
  )
}

export default Experiences;