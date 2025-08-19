import toast from "react-hot-toast";

export const showSuccessToast = (message) => {
  toast.success(message, {
    style: {
      border: "1px solid #4BB543",
      padding: "16px",
      color: "#4BB543",
      whiteSpace: "nowrap",
    },
    iconTheme: {
      primary: "#4BB543",
      secondary: "#FFFAEE",
    },
  });
};

export const showErrorToast = (message) => {
  toast.error(message, {
    style: {
      border: "1px solid #ff0033",
      padding: "16px",
      color: "#ff0033",
      whiteSpace: "nowrap",
    },
    iconTheme: {
      primary: "#ff0033",
      secondary: "#FFFAEE",
    },
  });
};
