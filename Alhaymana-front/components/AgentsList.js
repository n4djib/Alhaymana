import React, { useState } from "react";
import Link from "next/link";

import AgentCard from "./AgentCard";

import SearchInput from "./FormUI/SearchInput";
// import { APP_URL } from '../utils/urls'

const AgentsList = ({ agents }) => {
  const [searchWord, setSearchWord] = useState("");

  return (
    <div>
      <div>
        <SearchInput
          input={searchWord}
          setInput={setSearchWord}
          placeholder="Filtrer les Agents"
          style={{
            margin: "auto",
            marginBottom: 10,
            background: "rgb(243, 246, 249)",
          }}
        />
      </div>
      <div>
        {agents
          .filter((agent) => {
            const searched_string = [
              agent.nom,
              agent.prenom,
              agent.nom_arab,
              agent.prenom_arab,
            ].join("");
            return (
              searched_string
                .toLowerCase()
                .indexOf(searchWord.toLowerCase()) !== -1
            );
          })
          .map((agent) => (
            <Link key={agent.id} href={`/agents/${agent.id}`}>
              <a>
                <AgentCard key={agent.id} agent={agent} />
              </a>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default AgentsList;
