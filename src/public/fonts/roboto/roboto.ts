import localFont from "next/font/local";

const roboto = localFont({
  src: [
    {
      path: "./Roboto-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./Roboto-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./Roboto-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./Roboto-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./Roboto-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Roboto-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./Roboto-Thin.ttf",
      weight: "100",
      style: "normal",
    },
  ],
  variable: "--font-roboto",
});

export default roboto;
