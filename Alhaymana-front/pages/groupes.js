import React, { useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import PopupDialog from "../components/UI/PopupDialog";
import GroupeForm from "../components/GroupeForm";
import { getGroupes } from "../utils/apis";

const groupes = ({ groupes }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [openCreationForm, setOpenCreationForm] = useState(false);

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
              </TableRow>
            </TableHead>
            <TableBody>
              {groupes.map((groupe, index) => (
                <TableRow
                  key={groupe.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  // onClick={}
                >
                  <TableCell component="th" sadressecope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell>{groupe.nom}</TableCell>
                  <TableCell>{groupe.chef_groupe}</TableCell>
                  <TableCell>
                    {groupe.site ? <span>{groupe.site.nom}</span> : null}
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
          onClick={() => setOpenPopup(true)}
          aria-label="add"
          style={{ margin: 7 }}
        >
          <AddIcon />
        </Fab>
      </div>

      {openPopup && (
        <PopupDialog openPopup={openPopup} onClose={() => setOpenPopup(false)}>
          <GroupeForm closeAction={() => setOpenPopup(false)} />
        </PopupDialog>
      )}
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
