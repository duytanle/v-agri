/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: "jit",
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "primary-color": "var(--primary-color)",
                "secondary-color": "var(--secondary-color)",
                "hover-priColor": "var(--hover-priColor)",
                "hover-secColor": "var(--hover-secColor)",
            },
        },
    },
    variants: {
        extend: {
            borderRadius: ["first", "last"],
            textColor: ["first", "last"],
        },
    },
    plugins: [],
};
