import { ROL_ADMIN, ROL_ASESOR, ROL_ESTUDIANTE, ROL_PERSONA } from "constants/apiContants";
import React, { useState, createContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import API from "utils/Axios";
import Loading from "./Loading";

export const Context = createContext();

export const Provider = ({ children }) => {
  const location=useLocation()
  console.log(location)

  const [allPolicies, setAllPolcies] = useState([ROL_ESTUDIANTE,ROL_ASESOR,ROL_PERSONA,ROL_ADMIN]);
  const [policies, setPolcies] = useState([ROL_ASESOR]);
  const [loading, setLoading] = useState(true);
  const [loadingReal, setLoadingReal] = useState(true);

  const loadPolicies=()=>{
    setLoadingReal(true)
    setLoading(true)
    Promise.all([API.get("/auth-user")])
      .then((response) => {
        //setPolcies(response[0].data.roles);
        //setLoading(false);
        setLoadingReal(false)
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const fade=()=>{
    setTimeout(()=>{
      setLoading(false)
    },2000)
  }

  useEffect(()=>{
    console.log('page changed')
    if(location.pathname=='/login'){
      //setPolcies([])
    }
    if(!policies.length && location.pathname!='/login'){
      loadPolicies();
    }else{
      setLoadingReal(false)
    }
  },[location.pathname])

  useEffect(() => {
    if(!loadingReal){
      fade()
    }
  }, [loadingReal]);

  const ctx = {
    policies: policies,
    allPolicies: allPolicies,
  };

  return (
    <Context.Provider value={ctx}>
      {loading ? <Loading loading={loadingReal}/> : children}
    </Context.Provider>
  );
};
