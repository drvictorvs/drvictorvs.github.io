
import DarkBG from "./images/theme-dark.jpg";
import LightBG from "./images/theme-light.jpg";
class Theme {
  constructor(name, primary, zeroary, secondary, color, imgColors, background, overlay, gradient, card, bgImg, filter, filterShadow, filterShadowHover) {
    this.name = name;
    this.primary = primary;
    this.zeroary = zeroary;
    this.secondary = secondary;
    this.color = color;
    this.imgColors = imgColors;
    this.background = background;
    this.overlay = overlay;
    this.gradient = gradient;
    this.card = card;
    this.bgImg = bgImg;
    this.filter = filter;
    this.filterShadow = filterShadow;
    this.filterShadowHover = filterShadowHover;
  }
}

export const lightTheme = new Theme(
  "light",
  "#FFBFAA",
  "#FFD9CC",
  "#FF8F6A",
  "#45413C",
  "#45413C",
  "#F5F2E8",
  "rgba(255, 255, 255, 0.6)",
  "linear-gradient(to left, #FFBFAA, #FF5722)",
  {
    bg: "transparent",
    fg: "#404040",
    shadow: "0 3px 10px rgb(0 0 0 / 0.2)",
    footer: "transparent",
    link: "#45413C",
    linkHover: "#FFD9CC"
  },
  LightBG,
  "invert(53%) sepia(85%) saturate(3345%) hue-rotate(341deg) brightness(96%) contrast(113%)",
  "drop-shadow(1px 1px 0px #45413C)",
  "drop-shadow(1px 1px 0px #FF5722)"
);

export const darkTheme = new Theme(
  "dark",
  "#FF5722",
  "#FF5722",
  "#F03D00",
  "#FBFDFF",
  "#797B7B",
  "#27272A",
  "rgba(0, 0, 0, 0.6)",
  "linear-gradient(to right, #FF5722, #FFBFAA)",
  {
    bg: "#404040",
    fg: "#FBFDFF",
    shadow: "0 3px 10px rgb(255 255 255 / 0.2)",
    footer: "#303030",
    link: "#FBFDFF",
    linkHover: "#FF5722"
  },
  DarkBG,
  "invert(89%) sepia(88%) saturate(4248%) hue-rotate(293deg) brightness(98%) contrast(135%)",
  "drop-shadow(1px 1px 0px #45413C)",
  "drop-shadow(1px 1px 0px #FF5722)"
);
