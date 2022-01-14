import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import useSWR from "swr";

import { getDecharges } from "../utils/apis";
import DechargesList from "../components/DechargesList";
import { fetcher } from "../utils/apis";
import { API_URL } from "../utils/urls";

function decharges({ agents }) {
  const { data, error } = useSWR(`${API_URL}/decharges`, fetcher, {
    refreshInterval: 1,
  });

  if (data !== undefined) {
    const decharges = data;
    const ids = [];
    const _agents = [];
    for (let i = 0; i < decharges.length; i++) {
      if (decharges[i].agent)
        if (!ids.includes(decharges[i].agent.id)) {
          _agents.push(decharges[i].agent);
          ids.push(decharges[i].agent.id);
        }
    }

    agents = _agents;
  }

  return (
    <div>
      <TableContainer>
        <Table aria-label="simple table">
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
            {agents &&
              agents.map((agent, index) => (
                <TableRow
                  key={agent.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    {agent.nom} - {agent.prenom}
                  </TableCell>
                  <TableCell>
                    <DechargesList agent={agent} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export async function getServerSideProps(context) {
  const decharges = await getDecharges();

  const ids = [];
  const agents = [];
  for (let i = 0; i < decharges.length; i++) {
    if (decharges[i].agent)
      if (!ids.includes(decharges[i].agent.id)) {
        agents.push(decharges[i].agent);
        ids.push(decharges[i].agent.id);
      }
  }

  return {
    props: {
      agents,
    },
  };
}

export default decharges;
