import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import DatePicker from "@mui/lab/DatePicker";
import { styled } from "@mui/material/styles";
// import { styled } from '@mui/system';

const StyledBox = styled(Box)(({ theme }) => ({
  padding: 10,
  paddingTop: 20,
}));

const StyledGridItem = styled(Grid)(({ theme }) => ({
  padding: 7,
}));

const grid = () => {
  return (
    <Box sx={{ flexGrow: 1 }} style={{ padding: 10, paddingTop: 20 }}>
      <Grid container>
        <StyledGridItem item xs={12} sm={12} md={3}>
          <TextField
            name="matricule"
            label="Matricule *"
            fullWidth
            autoComplete="off"
          />
        </StyledGridItem>
        <StyledGridItem item xs={12} sm={6} md={4}>
          <TextField name="nom" label="Nom *" fullWidth autoComplete="off" />
        </StyledGridItem>
        <StyledGridItem item xs={12} sm={6} md={5}>
          <TextField
            name="prenom"
            label="Prenom *"
            fullWidth
            autoComplete="off"
          />
        </StyledGridItem>

        <StyledGridItem item xs={12} sm={6} md={6}>
          <TextField
            name="nom_arab"
            label="اللقب بالعربي"
            dir="rtl"
            fullWidth
            autoComplete="off"
          />
        </StyledGridItem>
        <StyledGridItem item xs={12} sm={6} md={6}>
          <TextField
            name="prenom_arab"
            label="الاسم بالعربي"
            dir="rtl"
            fullWidth
            autoComplete="off"
          />
        </StyledGridItem>

        <StyledGridItem item xs={12}>
          <div>sssss</div>
        </StyledGridItem>

        {/* <StyledGridItem item xs={12} sm={5} md={3}>
          <DatePicker name="date_naissance" label="Date Naissance" />
        </StyledGridItem> */}
        <StyledGridItem item xs={12} sm={7} md={9}>
          <TextField name="lieu_naissance" label="Lieu Naissance" fullWidth />
        </StyledGridItem>

        <StyledGridItem item xs={12} sm={4} md={4}>
          <TextField name="cin" label="CIN *" fullWidth />
        </StyledGridItem>
        <StyledGridItem item xs={12} sm={4} md={4}>
          <TextField
            name="cin_delivrer_par"
            label="CIN Delivrer par"
            fullWidth
          />
        </StyledGridItem>
        {/* <StyledGridItem item xs={12} sm={4} md={4}>
          <DatePicker name="cin_delivrer_le" label="CIN Delivrer le" />
        </StyledGridItem> */}
      </Grid>
    </Box>
  );
};

export default grid;
