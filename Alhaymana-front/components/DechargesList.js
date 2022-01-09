import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const DechargesList = ({ decharges }) => {
  // console.log("4 decharges:", decharges);
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
                <b>Matricule</b>
              </TableCell>
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
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DechargesList;
