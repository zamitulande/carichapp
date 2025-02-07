import { createTheme } from "@mui/material";
import { red} from "@mui/material/colors";


export const getTheme = createTheme({
    palette:{
          primary: {
            main: '#2260ff'
          },
          secondary: {
            main: '#D0E8FF' 
          },
          hover: {
            main: '#A8D0FF' 
          },
          notify:{
            main: '#008000'
          },
          error: {
            main: red.A400
          }
    }
})