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

export const Context = createContext();

export const Provider = ({ children }) => {
  const location = useLocation();

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
    Promise.all([API.get("/auth-user/")])
      .then((response) => {
        console.log(response[0].data);
        //response[0].data.roles
        setPolcies(response[0].data.roles);
        setPersona(response[0].data.id_persona);
        setUsername(response[0].data.username);
        setFullname(response[0].data.fullname);
        setLoading(false);
        setLoadingReal(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fade = () => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    if (location.pathname != "/login") {
      loadPolicies();
    }
  }, []);

  useEffect(() => {
    if (location.pathname == "/login") {
      setPolcies([]);
      setUsername("");
      setPersona("");
      setFullname("");
    }
    if (!policies.length && location.pathname != "/login") {
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
