import React, { useState, useEffect } from "react";
import Fab from "@mui/material/Fab";
// import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import useSWR from "swr";

import PopupDialog from "./UI/PopupDialog";
import Snack from "./UI/Snack";
import ConfirmDialog from "./UI/ConfirmDialog";
import DechargeEdit from "./Forms/DechargeEdit";

import {
  // fetcher,
  // getAgent,
  deleteDecharge,
  getDechargesByAgent,
} from "../utils/apis";
import { formatDecharges } from "../utils/utilities";

const DechargesList = ({ agent }) => {
  const [decharges, setDecharges] = useState(null);
  const [showSnack, setShowSnack] = useState(false);
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [editedRecord, setEditedRecord] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // const { data, error } = useSWR(`${API_URL}/agents/${agent.id}`, fetcher, {
  //   refreshInterval: 1,
  // });

  // if (data !== undefined) {
  //   agent = data;
  // }

  useEffect(async () => {
    const agentDecharges = await getDechargesByAgent(agent.id);
    const formatedDecharges = await formatDecharges(agentDecharges);
    if (formatedDecharges !== {}) {
      if (formatedDecharges[agent.id] !== undefined)
        setDecharges(formatedDecharges[agent.id].decharges);
    }
  }, [agent]);

  const editRecord = (article) => {
    setEditedRecord(article);
    setOpenEditPopup(true);
  };

  const handleDeleteRecord = async (id) => {
    try {
      const del = await deleteDecharge(id);
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
    <div>
      <TableContainer component={Paper} elevation={4}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Code</b>
              </TableCell>
              <TableCell>
                <b>Designation</b>
              </TableCell>
              <TableCell>
                <b>Matricule (Code Interne)</b>
              </TableCell>
              <TableCell>
                <b>Date</b>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {decharges &&
              decharges.map((decharge, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{decharge.code}</TableCell>
                  <TableCell>{decharge.designation}</TableCell>
                  <TableCell>{decharge.matricule}</TableCell>
                  <TableCell>{decharge.date}</TableCell>

                  <TableCell>
                    <EditIcon
                      style={{ cursor: "pointer" }}
                      fontSize="small"
                      onClick={() => editRecord(decharge)}
                    />
                    <DeleteIcon
                      style={{ cursor: "pointer" }}
                      fontSize="small"
                      onClick={() => {
                        setOpenConfirm(true);
                        setDeleteId(decharge.id);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <PopupDialog
        title="Mettre à jour le Decharge"
        openPopup={openEditPopup}
        onClose={() => setOpenEditPopup(false)}
        maxWidth="md"
      >
        <DechargeEdit
          decharge={editedRecord}
          snack={(sev, msg, open) => {
            setMessage(msg);
            setSeverity(sev);
            setShowSnack(true);
            setOpenEditPopup(open);
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

export default DechargesList;
