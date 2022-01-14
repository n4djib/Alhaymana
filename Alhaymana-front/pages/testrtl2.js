import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

const theme = createTheme({
  // direction: "rtl" // Both here and <body dir="rtl">
});

function testrtl2() {
  return (
    <div style={{ margin: 25 }}>
      <TextField label="Matricule *" />
      <ThemeProvider theme={theme}>
        <TextField label="Name dddd" variant="outlined" />
        <div dir="rtl">
          <TextField label="Name" variant="outlined" />
          <input type="text" label="Name" />
        </div>
      </ThemeProvider>
    </div>
  );
}

export default testrtl2;
