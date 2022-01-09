// import React from 'react'
import Link from "next/link";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import styles from "../../styles/Home.module.css";

const BoxLink = ({ children, href }) => {
  return (
    <Box
      className={styles.BoxLink}
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1.5,
          width: 150,
          height: 150,
        },
      }}
    >
      <Link href={href}>
        <Paper
          className={styles.BoxLink_Paper}
          elevation={3}
          // className="PaperTask"
          // variant="outlined"
        >
          {children}
        </Paper>
      </Link>
    </Box>
  );
};

export default BoxLink;
