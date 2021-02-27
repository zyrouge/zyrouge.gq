module.exports = {
    purge: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        minWidth: {
            "0": "0",
            "1/4": "25%",
            "1/2": "50%",
            "3/4": "75%",
            "full": "100%"
        },
        maxWidth: {
            "1/4": "25%",
            "1/2": "50%",
            "3/4": "75%"
        },
        extend: {
            fontFamily: {
                sans: ['Poppins', 'sans-serif'],
                mono: ['"Fira Code"', 'monoscope']
            }
        },
    },
    variants: {
        extend: {
            backgroundColor: ["checked"],
            borderColor: ["checked"]
        },
    },
    plugins: []
}