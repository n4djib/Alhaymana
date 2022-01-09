import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { getDecharges } from "../utils/apis";
import { formatDecharges } from "../utils/utilities";
import DechargesList from "../components/DechargesList";

function decharges({ decharges }) {
  const formattedDecharges = formatDecharges(decharges);

  return (
    <div>
      <TableContainer>
        <Table
          // sx={{ minWidth: 650 }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <b>#</b>
              </TableCell>
              <TableCell>
                <b>Agent</b>
              </TableCell>
              <TableCell>
                <b>Decharges</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(formattedDecharges).map((key, index) => {
              const agent = formattedDecharges[key];
              const agent_decharges = formattedDecharges[key].decharges;
              return (
                <TableRow
                  key={key}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    {agent.nom} - {agent.prenom}
                  </TableCell>
                  <TableCell>
                    <DechargesList decharges={agent_decharges} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export async function getServerSideProps(context) {
  const decharges = await getDecharges();
  //   const decharges =

  return {
    props: {
      decharges,
    },
  };
}

export default decharges;
