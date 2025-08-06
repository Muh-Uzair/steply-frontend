// DIVIDER
export const validationFullname = {
  required: "Full name is required",
  minLength: {
    value: 3,
    message: "Full name must be at least 3 characters",
  },
  maxLength: {
    value: 50,
    message: "Full name must not exceed 50 characters",
  },
  pattern: {
    value: /^[a-zA-Z0-9 _-]+$/, // <-- notice the added space after 9
    message:
      "Full name can only contain letters, numbers, spaces, hyphens, and underscores",
  },
};

export const validationPassword = {
  required: "Password is required",
  minLength: {
    value: 6,
    message: "Password must be at least 6 characters",
  },
};

export const validationGender = {
  required: "Please select your gender",
};

export const validationDob = {
  required: "Please select your date of birth",
};

// DIVIDER
export const validationPhoneNum = {
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

export const validationAddress = {
  minLength: {
    value: 3,
    message: "Full name must be at least 3 characters",
  },
  maxLength: {
    value: 50,
    message: "Full name must not exceed 50 characters",
  },
};

// DIVIDER
export const validationCurrentJobTitle = {
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

export const validationEmploymentStatus = {};

export const validationCompanyName = {
  minLength: {
    value: 3,
    message: "Company name must be at least 3 characters",
  },
  maxLength: {
    value: 50,
    message: "Company name must not exceed 50 characters",
  },
};

export const validationYoe = {
  max: {
    value: 100,
    message: "Experience must not exceed 100 years",
  },
};

// DIVIDER
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

// DIVIDER
export const validationPreferences = {
  required: "Please select a preferred contact method",
};
