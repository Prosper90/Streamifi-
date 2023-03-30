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
        boderget: "rgba(255, 255, 255, 0.54)"
      },
      backgroundColor: {
        home: "#101012",
        topbg: "#18181C",
        buttonbg: "#553CDF",
        covertwo: "rgba(217, 217, 217, 0.11)",
        mirror: "rgba(255, 255, 255, 0.15)"
      },
      shadow: {
        boxshadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
      }
    },
  },
  plugins: [],
}
