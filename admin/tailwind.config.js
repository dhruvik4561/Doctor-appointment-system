/** @type {import ('tailwindcss').Config} */
export default{
    Content:[
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme:{
        extend: {
            colors :{
                'primary':"#5f6FFF"
            },
            animation: {
                fadeIn: 'fadeIn 0.5s ease-in-out',
              },
              keyframes: {
                fadeIn: {
                  '0%': { opacity: '0' },
                  '100%': { opacity: '1' },
                },
              },
            
        },
    },
    plugins: [],
}