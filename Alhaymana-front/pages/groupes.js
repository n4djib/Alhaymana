import React, { useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import PopupDialog from "../components/UI/PopupDialog";
import GroupeCreate from "../components/Forms/GroupeCreate";
import GroupeEdit from "../components/Forms/GroupeEdit";
import Snack from "../components/UI/Snack";
import ConfirmDialog from "../components/UI/ConfirmDialog";

import useSWR from "swr";
import { fetcher, getGroupes, deleteGroupe } from "../utils/apis";
import { API_URL } from "../utils/urls";

const groupes = ({ groupes }) => {
  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [showSnack, setShowSnack] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const [editedRecord, setEditedRecord] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const { data, error } = useSWR(`${API_URL}/groupes`, fetcher, {
    refreshInterval: 1,
  });

  if (data !== undefined) {
    groupes = data;
  }

  const editRecord = (groupe) => {
    setEditedRecord(groupe);
    setOpenEditPopup(true);
  };

  return (
    <div style={{ margin: 30 }}>
      <div>List des Groupes</div>

      <div>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>#</b>
                </TableCell>
                <TableCell>
                  <b>Nom</b>
                </TableCell>
                <TableCell>
                  <b>Chef Groupe</b>
                </TableCell>
                <TableCell>
                  <b>Site</b>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {groupes.map((groupe, index) => (
                <TableRow
                  key={groupe.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" sadressecope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell>{groupe.nom}</TableCell>
                  <TableCell>{groupe.chef_groupe}</TableCell>
                  <TableCell>
                    {groupe.site && <span>{groupe.site.nom}</span>}
                  </TableCell>
                  <TableCell>
                    <EditIcon
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        editRecord(groupe);
                      }}
                    />
                     
                    <DeleteIcon
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setOpenConfirm(true);
                        setDeleteId(groupe.id);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
        title="Mettre à jour le Groupe"
        openPopup={openEditPopup}
        onClose={() => setOpenEditPopup(false)}
        maxWidth="md"
      >
        <GroupeEdit
          groupe={editedRecord}
          snack={(sev, msg, open) => {
            setMessage(msg);
            setSeverity(sev);
            setShowSnack(true);
            setOpenEditPopup(open);
          }}
        />
      </PopupDialog>
      <PopupDialog
        title="Création d'un Groupe fffffffff"
        openPopup={openCreatePopup}
        onClose={() => setOpenCreatePopup(false)}
        maxWidth="md"
      >
        <GroupeCreate
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
        confirm={() => handleDeleteRecord(deleteId)}
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
  const groupes = await getGroupes();
  return {
    props: {
      groupes,
    },
  };
}

export default groupes;
