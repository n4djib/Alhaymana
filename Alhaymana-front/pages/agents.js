import React, { useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import useSWR from "swr";

import AgentsList from "../components/AgentsList";
import PopupDialog from "../components/UI/PopupDialog";
import Snack from "../components/UI/Snack";
import ConfirmDialog from "../components/UI/ConfirmDialog";
import AgentCreate from "../components/Forms/AgentCreate";
import { fetcher, getAgents, deleteAgent } from "../utils/apis";
import { API_URL } from "../utils/urls";

import styles from "../styles/Agents.module.css";

const agents = ({ agents }) => {
  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  const [showSnack, setShowSnack] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const { data, error } = useSWR(`${API_URL}/agents`, fetcher, {
    refreshInterval: 1,
  });

  if (data !== undefined) {
    agents = data;
  }

  const handleDeleteAgent = async (id) => {
    try {
      const del = await deleteAgent(id);
      setMessage("deleted");
      setSeverity("success");
    } catch (e) {
      setMessage("error");
      setSeverity("error");
    }
    setOpenConfirm(false);
    setDeleteId(null);
    setShowSnack(true);
  };

  return (
    <div className={styles.Agents}>
      <h2>List des Agents</h2>
      <div>
        <AgentsList
          agents={agents}
          onDelete={(id) => {
            setOpenConfirm(true);
            setDeleteId(id);
          }}
        />
      </div>
      <div>
        <Fab
          color="primary"
          onClick={() => setOpenCreatePopup(true)}
          aria-label="add"
          style={{ margin: 7 }}
        >
          <AddIcon />
        </Fab>
      </div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <PopupDialog
        title="Création d'un Agent"
        openPopup={openCreatePopup}
        onClose={() => setOpenCreatePopup(false)}
        maxWidth="lg"
      >
        <AgentCreate
          snack={(sev, msg, open) => {
            setMessage(msg);
            setSeverity(sev);
            setShowSnack(true);
            setOpenCreatePopup(open);
          }}
        />
      </PopupDialog>
      <ConfirmDialog
        open={openConfirm}
        confirm={() => handleDeleteAgent(deleteId)}
        close={() => {
          setOpenConfirm(false);
          setDeleteId(null);
        }}
      />
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
  // export async function getStaticProps(context) {
  const agents = await getAgents();
  return {
    props: {
      agents,
    },
    // revalidate: 5,
  };
}

export default agents;
