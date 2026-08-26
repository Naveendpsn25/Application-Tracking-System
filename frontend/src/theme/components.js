const components = {
    MuiButton: {
        defaultProps: {
            variant: "contained",
            disableElevation: true,
        },
        styleOverrides: {
            root: {
                borderRadius: 10,
                textTransform: "none",
                fontWeight: 600,
            },
        },
    },

    MuiTextField: {
        defaultProps: {
            variant: "outlined",
            fullWidth: true,
        },
    },
};

export default components;