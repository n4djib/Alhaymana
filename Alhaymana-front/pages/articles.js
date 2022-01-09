import React, { useState, useEffect } from "react";
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
import useSWR from "swr";

import PopupDialog from "../components/UI/PopupDialog";
import ArticleCreate from "../components/Forms/ArticleCreate";
import ArticleEdit from "../components/Forms/ArticleEdit";
import Snack from "../components/UI/Snack";
import ConfirmDialog from "../components/UI/ConfirmDialog";
import { fetcher, getArticles, deleteArticle } from "../utils/apis";
import { API_URL, getThumbnail } from "../utils/urls";

import styles from "../styles/FormElements.module.css";

const articles = ({ articles }) => {
  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [showSnack, setShowSnack] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const [editedRecord, setEditedRecord] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const { data, error } = useSWR(`${API_URL}/articles`, fetcher, {
    refreshInterval: 1,
  });

  if (data !== undefined) {
    articles = data;
  }

  const editRecord = (article) => {
    setEditedRecord(article);
    setOpenEditPopup(true);
  };

  const handleDeleteArticle = async (id) => {
    try {
      const del = await deleteArticle(id);
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
    <div className={styles.list}>
      <h3>List des Articles</h3>
      <div>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>#</b>
                </TableCell>
                <TableCell>
                  <b>Code</b>
                </TableCell>
                <TableCell>
                  <b>Designation</b>
                </TableCell>
                <TableCell>
                  <b>Image</b>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {articles.map((article, index) => (
                <TableRow
                  key={article.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell>{article.code}</TableCell>
                  <TableCell>{article.designation}</TableCell>
                  <TableCell>
                    {article.image ? (
                      <img
                        src={getThumbnail(article.image)}
                        style={{ maxWidth: 50 }}
                      />
                    ) : null}
                  </TableCell>
                  <TableCell>
                    <EditIcon
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        editRecord(article);
                      }}
                    />
                     
                    <DeleteIcon
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setOpenConfirm(true);
                        setDeleteId(article.id);
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
        title="Mis a jour d'article"
        openPopup={openEditPopup}
        onClose={() => setOpenEditPopup(false)}
      >
        <ArticleEdit
          article={editedRecord}
          snack={(sev, msg, open) => {
            setMessage(msg);
            setSeverity(sev);
            setShowSnack(true);
            setOpenEditPopup(open);
          }}
        />
      </PopupDialog>
      <PopupDialog
        title="Creation d'un article"
        openPopup={openCreatePopup}
        onClose={() => setOpenCreatePopup(false)}
      >
        <ArticleCreate
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
        confirm={() => handleDeleteArticle(deleteId)}
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
  const articles = await getArticles();
  return {
    props: {
      articles,
    },
  };
}

export default articles;
