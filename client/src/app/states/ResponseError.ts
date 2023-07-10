class ResponseError {
  error: string | null;
  setError: (error: any) => void;
  constructor() {
    this.error = null;
    this.setError = (_: any) => {};
  }
  register = setError => {
    this.setError = setError;
  };
}

export default new ResponseError();
