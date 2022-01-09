import React, { useState, useEffect } from "react";
// import { useRouter } from "next/router";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useSWR from "swr";

import PopupDialog from "../../components/UI/PopupDialog";
import Snack from "../../components/UI/Snack";
import DechargesList from "../../components/DechargesList";
import AgentEdit from "../../components/Forms/AgentEdit";
import { getThumbnail } from "../../utils/urls";
import { formatDecharges } from "../../utils/utilities";
import { fetcher, getAgent, getDechargesByAgent } from "../../utils/apis";
import { API_URL } from "../../utils/urls";

const agent = ({ agent }) => {
  const [decharges, setDecharges] = useState(null);
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [showSnack, setShowSnack] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const { data, error } = useSWR(`${API_URL}/agents/${agent.id}`, fetcher, {
    refreshInterval: 1,
  });

  if (data !== undefined) {
    agent = data;
  }

  useEffect(async () => {
    const agentDecharges = await getDechargesByAgent(agent.id);
    const formatedDecharges = await formatDecharges(agentDecharges);
    if (formatedDecharges !== {}) {
      if (formatedDecharges[agent.id] !== undefined) {
        setDecharges(formatedDecharges[agent.id].decharges);
      }
    }
  }, []);

  return (
    <div style={{ margin: 45 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }}>
          <TableBody>
            <TR label="Matricule" value={agent.matricule} />
            <TR label="Nom" value={agent.nom} />
            <TR label="Prenom" value={agent.prenom} />
            <TR label="اللقب بالعربي" value={agent.nom_arab} />
            <TR label="الاسم بالعربي" value={agent.prenom_arab} />
            <TableRow>
              <TableCell>Photo</TableCell>
              <TableCell style={{ padding: 3 }}>
                <img src={getThumbnail(agent.photo)} />
              </TableCell>
            </TableRow>
            <TR label="Date Naissance" value={agent.date_naissance} />
            <TR label="Lieu Naissance" value={agent.lieu_naissance} />
            <TR label="CIN" value={agent.cin} />
            <TR label="CIN Delivrer par" value={agent.cin_delivrer_par} />
            <TR label="CIN Delivrer le" value={agent.cin_delivrer_le} />
            <TR label="CNAS" value={agent.cnas} />
            <TR label="Num Acte Naissance" value={agent.num_acte_naissance} />
            <TR label="Telephone" value={agent.telephone} />
            <TR label="Adresse" value={agent.adresse} />
            <TR label="Email" value={agent.email} />
            <TR label="Prenom Pere" value={agent.prenom_pere} />
            <TR label="Nom et Prenom Mere" value={agent.nom_prenom_mere} />
            <TR label="Situation Familiale" value={agent.situation_familiale} />
            <TR label="Sexe" value={agent.sexe} />
            <TR label="Groupe Sanguin" value={agent.groupe_sanguin} />
            <TableRow>
              <TableCell colSpan={2}>
                Decharges
                <div style={{ paddingLeft: 100 }}>
                  <DechargesList
                    decharges={decharges}
                    style={{ paddingLeft: 100 }}
                  />
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <Fab
          color="primary"
          onClick={() => setOpenEditPopup(true)}
          aria-label="add"
          style={{ margin: 7 }}
        >
          <EditIcon />
        </Fab>
      </div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <PopupDialog
        title="Mis a jour Agent"
        openPopup={openEditPopup}
        onClose={() => setOpenEditPopup(false)}
      >
        <AgentEdit
          agent={agent}
          snack={(sev, msg, open) => {
            setMessage(msg);
            setSeverity(sev);
            setShowSnack(true);
            setOpenEditPopup(open);
          }}
        />
      </PopupDialog>
      <Snack
        open={showSnack}
        onClose={setShowSnack}
        message={message}
        severity={severity}
      />
    </div>
  );
};

export async function getServerSideProps(context) {
  const {
    query: { id },
  } = context;
  const agent = await getAgent(id);

  return {
    props: {
      agent,
    },
  };
}

// export async function getStaticProps(context) {
//   const { params } = context;
//   const agent = await getAgent(params.id);
//   return {
//     props: {
//       agent,
//     },
//     revalidate: 5,
//   };
// }

// export async function getStaticPaths() {
//   const agents = await getAgents();

//   const paths = agents.map((agent) => ({ params: { id: String(agent.id) } }));

//   return {
//     paths,
//     fallback: false,
//   };
// }

const TR = ({ label, value }) => (
  <TableRow>
    <TableCell>{label}</TableCell>
    <TableCell
    // style={{ paddingLeft: 60 }}
    >
      {value}
    </TableCell>
  </TableRow>
);

export default agent;
