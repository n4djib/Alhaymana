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
import SiteCreate from "../components/Forms/SiteCreate";
import SiteEdit from "../components/Forms/SiteEdit";
import Snack from "../components/UI/Snack";
import ConfirmDialog from "../components/UI/ConfirmDialog";

import useSWR from "swr";
import { fetcher, getSites, deleteSite } from "../utils/apis";
import { API_URL } from "../utils/urls";

const sites = ({ sites }) => {
  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [showSnack, setShowSnack] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const [editedRecord, setEditedRecord] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const { data, error } = useSWR(`${API_URL}/sites`, fetcher, {
    refreshInterval: 1,
  });

  if (data !== undefined) {
    sites = data;
  }

  const editRecord = (site) => {
    setEditedRecord(site);
    setOpenEditPopup(true);
  };

  const handleDeleteRecord = async (id) => {
    try {
      const del = await deleteSite(id);
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
    <div style={{ margin: 30 }}>
      <h3>List des Sites</h3>
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
                  <b>Adresse</b>
                </TableCell>
                <TableCell>
                  <b>Chef Site</b>
                </TableCell>
                <TableCell>
                  <b>GPS Latetude</b>
                </TableCell>
                <TableCell>
                  <b>GPS Longitude</b>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sites.map((site, index) => (
                <TableRow
                  key={site.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" sadressecope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell>{site.nom}</TableCell>
                  <TableCell>{site.adresse}</TableCell>
                  <TableCell>{site.chef_site}</TableCell>
                  <TableCell>{site.gps_latitude}</TableCell>
                  <TableCell>{site.gps_longitude}</TableCell>
                  <TableCell>
                    <EditIcon
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        editRecord(site);
                      }}
                    />
                     
                    <DeleteIcon
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setOpenConfirm(true);
                        setDeleteId(site.id);
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
        title="Mettre à jour le site"
        openPopup={openEditPopup}
        onClose={() => setOpenEditPopup(false)}
        maxWidth="md"
      >
        <SiteEdit
          site={editedRecord}
          snack={(sev, msg, open) => {
            setMessage(msg);
            setSeverity(sev);
            setShowSnack(true);
            setOpenEditPopup(open);
          }}
        />
      </PopupDialog>
      <PopupDialog
        title="Création d'un Site"
        openPopup={openCreatePopup}
        onClose={() => setOpenCreatePopup(false)}
        maxWidth="md"
      >
        <SiteCreate
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
  const sites = await getSites();
  return {
    props: {
      sites,
    },
  };
}

export default sites;
