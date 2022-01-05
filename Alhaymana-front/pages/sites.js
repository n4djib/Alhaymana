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
import SiteForm from "../components/SiteForm";
import Snack from "../components/UI/Snack";
import ConfirmDialog from "../components/UI/ConfirmDialog";

import useSWR from "swr";
import { fetcher, getSites, deleteSite } from "../utils/apis";
import { API_URL, getThumbnail } from "../utils/urls";

const sites = ({ sites }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [showSnack, setShowSnack] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const { data, error } = useSWR(`${API_URL}/sites`, fetcher, {
    refreshInterval: 1,
  });

  if (data !== undefined) {
    sites = data;
  }

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
                  // onClick={}
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
                        console.log("edit " + site.id);
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
          onClick={() => setOpenPopup(true)}
          aria-label="add"
          style={{ margin: 7 }}
        >
          <AddIcon />
        </Fab>
      </div>
      <PopupDialog
        title="Creation d'un Site"
        openPopup={openPopup}
        onClose={() => setOpenPopup(false)}
      >
        <SiteForm
          snackOnSuccess={(sev, msg) => {
            setMessage(msg);
            setSeverity(sev);
            setOpenPopup(false);
            setShowSnack(true);
          }}
        />
      </PopupDialog>
      <Snack
        open={showSnack}
        onClose={setShowSnack}
        message={message}
        severity={severity}
      />
      <ConfirmDialog
        open={openConfirm}
        confirm={async () => {
          try {
            const del = await deleteSite(deleteId);
            setMessage("deleted");
            setSeverity("success");
          } catch (e) {
            setMessage("error");
            setSeverity("error");
          }
          setOpenConfirm(false);
          setDeleteId(null);
          setShowSnack(true);
        }}
        close={() => {
          setOpenConfirm(false);
          setDeleteId(null);
        }}
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
