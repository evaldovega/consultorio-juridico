import React, { useContext, useEffect, useState } from "react";
import * as PolicyProvider from "./Ctx";

export let POLICIES = [];

function policyExists(policy, policiesAllow = []) {
  if (policy == "") {
    return true;
  }
  const include = policiesAllow.includes(policy);
  return include;
}

export const policyAllow = (policy, policiesAllow = []) => {
  let allow = false;
  if (typeof policy == "object") {
    if (!policy.length) {
      allow = true;
    } else {
      policy.forEach((p) => {
        if (policyExists(p, policiesAllow)) {
          allow = true;
        }
      });
    }
  } else {
    allow = policyExists(policy, policiesAllow);
  }
  return allow;
};

const Policy = ({ policy, children, feedback = "", init = null }) => {
  const { policies } = useContext(PolicyProvider.Context);
  const [allow, setAllow] = useState(false);

  POLICIES = policies;

  useEffect(() => {
    setAllow(policyAllow(policy, POLICIES));
  }, [POLICIES]);

  useEffect(() => {
    if (allow && init) {
      init();
    }
  }, [allow]);

  if (allow) {
    return children;
  }

  return feedback ? feedback : null;
};

export default Policy;
