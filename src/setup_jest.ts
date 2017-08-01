const originalConsoleError = console.error

// Look into removing this on the next React update to 0.16.
console.error = (message?: any, ...optionalParams: any[]) => {
  if (
    typeof message === "string" &&
    (message.includes("Accessing PropTypes via the main React package") ||
      message.includes("React.createClass is no longer supported."))
  ) {
    // NOOP
  } else {
    originalConsoleError(message)
  }
}
