import { useEffect, useState } from "react";
import { Spinner } from "../reusable/Spinner";
import { Link } from "react-router-dom";
import { Alert } from "../reusable/Alert";
import { API_HOST } from "../../environment";

export const LastUserInDb = () => {
  const [lastUser, setlastUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getlastUser = async () => {
      try {
        const endpoint = `${API_HOST}/api/query?q=SELECT name, avatar, email, createdAt FROM users WHERE createdAt = (SELECT MAX(createdAt) FROM users) LIMIT 1`;

        const {
          ok,
          data: [user],
        } = await fetch(endpoint).then((res) => res.json());

        if (ok) {
          const createdAtDate = new Date(user.createdAt);
          const createdAtCutted = createdAtDate.toISOString().split("T")[0];
          setlastUser({
            ...user,
            createdAtCutted
          });
        }

        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        setError(
          error.message
        );
      }
    };

    getlastUser();
  }, [])

  return (
    <div className={`col-lg-6 text-center `}>
      {!loading ?
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h5 className="m-0 font-weight-bold text-gray-800">
              Último usuario registrado
            </h5>
          </div>
          <div className="card-body">
            <h5 className="m-0 font-weight-bold text-gray-800">
              {lastUser.name}
            </h5>
            <div className="text-center">
              <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: "250px" }} src={/http/.test(lastUser.avatar) ? lastUser.avatar : `${API_HOST}/api/users/${lastUser.avatar}`} alt=" Avatar de usuario" />
            </div>
            <p>
              {lastUser.email}
            </p>
            <p>
              Creado en: {lastUser.createdAtCutted}
            </p>
            <Link className="btn btn-outline-primary" to="/usuarios">
              Ver lista de usuarios
            </Link>
          </div>
        </div>
        : <Spinner containerClassName={"m-auto"} />}
      {error && <Alert message={error} />}
    </div>
  );
};

export default LastUserInDb;
