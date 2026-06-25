import {
  Assistant,
  type AssistantResponse,
  type LLMMessage,
  type LLMProvider,
} from "../assistant-core/index.js";
import { clientAssistantConfig } from "./config.js";
import {
  createBookingAvailabilityConnector,
  createFaqConnector,
  createTourPackageConnector,
  type BookingAvailability,
  type TourPackage,
  type TravelFaq,
} from "./data/index.js";
import { buildLeadCaptureSummary, formatLeadCaptureSummary, shouldEscalateBooking } from "./features/leadCapture.js";

export const clientConnectors = [
  createTourPackageConnector(),
  createFaqConnector(),
  createBookingAvailabilityConnector(),
];

export function createClientAssistant(
  provider: LLMProvider,
  history: LLMMessage[] = [],
): Assistant {
  return new Assistant(clientAssistantConfig, provider, clientConnectors, history);
}

export function createClientRuntime(provider: LLMProvider, history: LLMMessage[] = []) {
  const assistant = createClientAssistant(provider, history);
  return {
    assistant,
    config: clientAssistantConfig,
    leadCapture: {
      buildSummary(response: AssistantResponse) {
        return buildLeadCaptureSummary(response, clientAssistantConfig.leadFields);
      },
      formatSummary(response: AssistantResponse) {
        return formatLeadCaptureSummary(buildLeadCaptureSummary(response, clientAssistantConfig.leadFields));
      },
      shouldEscalate(response: AssistantResponse) {
        return shouldEscalateBooking(buildLeadCaptureSummary(response, clientAssistantConfig.leadFields));
      },
    },
  };
}

export type {
  BookingAvailability,
  TourPackage,
  TravelFaq,
} from "./data/index.js";
export { clientAssistantConfig, clientAssistantConfig as config };
export { buildLeadCaptureSummary, formatLeadCaptureSummary, shouldEscalateBooking } from "./features/leadCapture.js";
