export class ProviderError extends Error {
  constructor(
    public readonly providerName: string,
    message: string,
    public readonly cause?: unknown,
  ) {
    super(`${providerName}: ${message}`);
    this.name = "ProviderError";
  }
}

export class ProviderResponseError extends ProviderError {
  constructor(
    providerName: string,
    public readonly status: number,
    message: string,
    public readonly responseBody: string,
    cause?: unknown,
  ) {
    super(providerName, message, cause);
    this.name = "ProviderResponseError";
  }
}
