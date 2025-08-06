export const validationFullname = {
  required: "Fullname is required",
  minLength: {
    value: 3,
    message: "Fullname must be at least 3 characters",
  },
  maxLength: {
    value: 20,
    message: "Fullname must not exceed 20 characters",
  },
  pattern: {
    value: /^[a-zA-Z0-9_-]+$/,
    message:
      "Username can only contain letters, numbers, hyphens, and underscores",
  },
};

export const validationPhoneNum = {
  required: "Phone number is required",
  minLength: {
    value: 10,
    message: "Phone number must be at least 10 digits",
  },
  maxLength: {
    value: 15,
    message: "Phone number must not exceed 15 digits",
  },
  pattern: {
    value: /^[0-9+\-()\s]*$/,
    message:
      "Only digits, spaces, +, -, and parentheses are allowed in phone number",
  },
};

export const validationCurrentJobTitle = {
  required: "Job title is required",
  minLength: {
    value: 2,
    message: "Job title must be at least 2 characters",
  },
  maxLength: {
    value: 50,
    message: "Job title must not exceed 50 characters",
  },
  pattern: {
    value: /^[a-zA-Z\s.'-]+$/,
    message: "Only letters, spaces, periods, apostrophes, and hyphens allowed",
  },
};

export const validationMonthlyIncome = {
  required: "Monthly income is required",
  min: {
    value: 1,
    message: "Monthly income must be greater than 0",
  },
  max: {
    value: 1000000,
    message: "Monthly income must not exceed 1,000,000",
  },
};

export const validationPreferences = {
  required: "Please select a preferred contact method",
};
