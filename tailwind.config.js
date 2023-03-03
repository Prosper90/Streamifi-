/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*js',
    './components/**/*js'
],
  theme: {
    extend: {
      fontFamily: {
        streamfont: "Space Grotesk,Ubuntu,  ,sans"
      },
      color: {
        streamwhite: "#FFFFFF",
      },
      backgroundColor: {
        home: "#101012",
        topbg: "#18181C",
        buttonbg: "#553CDF",
      },
      shadow: {
        fomoshadow: "0 0 2px #690069, 0 0 25px #c0c, 0 0 5px #f0f",
        fomotextshadow: "0 0 10px #38f000, 0 0 10px #008020"
      }
    },
  },
  plugins: [],
}
