import { createTheme } from "@mui/material/styles";

import palette from "./palette";
import typography from "./typography";
import shadows from "./shadows";
import components from "./components";

const theme = createTheme({
    palette,
    typography,
    shadows,
    components,

    shape: {
        borderRadius: 10,
    },
});

export default theme;