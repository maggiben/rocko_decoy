import configJson from "./config.json";
import { BACKEND_URL } from "./constants/env";

export function getConfig() {
  const audience =
    configJson.audience && configJson.audience !== "YOUR_API_IDENTIFIER"
      ? configJson.audience
      : null;

  return {
    projectId: configJson.projectId,
    domain: configJson.domain,
    clientId: configJson.clientId,
    ...(audience ? { audience } : null),
  };
}

export const url = BACKEND_URL || 'http://localhost:5000'
