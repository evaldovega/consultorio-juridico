import {
  ROL_ADMIN,
  ROL_ASESOR,
  ROL_ESTUDIANTE,
  ROL_PERSONA,
} from "constants/apiContants";
import React, { useState, createContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import API from "utils/Axios";
import Loading from "./Loading";
import { useHistory } from "react-router-dom";

export const Context = createContext();

export const Provider = ({ children }) => {
  const location = useLocation();
  let history = useHistory();

  const [allPolicies, setAllPolcies] = useState([]);
  const [policies, setPolcies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingReal, setLoadingReal] = useState(true);
  const [username, setUsername] = useState("");
  const [persona, setPersona] = useState("");
  const [fullname, setFullname] = useState("");

  const loadPolicies = () => {
    setLoadingReal(true);
    setLoading(true);
    setUsername("");
    setPersona("");
    setFullname("");
    API.get("/auth-user/")
      .then(({ data }) => {
        setPolcies(data.roles);
        setPersona(data.id_persona);
        setUsername(data.username);
        setFullname(data.fullname);
        setLoading(false);
        setLoadingReal(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setLoadingReal(false);
        history.replace("/login");
      });
  };
  const fade = () => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  /*
  useEffect(() => {
    if (location.pathname != "/login" && location.pathname != "/registrarse") {
      loadPolicies();
    }
  }, []);*/

  useEffect(() => {
    if (
      location.pathname == "/login" ||
      location.pathname == "/registrarse" ||
      location.pathname == "/recuperar-clave" ||
      location.pathname == "/tutoriales"
    ) {
      setPolcies([]);
      setUsername("");
      setPersona("");
      setFullname("");
    }
    if (
      !policies.length &&
      location.pathname != "/login" &&
      location.pathname != "/registrarse" &&
      location.pathname != "/recuperar-clave" &&
      location.pathname != "/tutoriales"
    ) {
      loadPolicies();
    } else {
      setTimeout(() => setLoadingReal(false), 2000);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!loadingReal) {
      fade();
    }
  }, [loadingReal]);

  const ctx = {
    policies: policies,
    allPolicies: allPolicies,
    fullname,
    username,
    persona,
  };

  return (
    <Context.Provider value={ctx}>
      {loading ? <Loading loading={loadingReal} /> : children}
    </Context.Provider>
  );
};
