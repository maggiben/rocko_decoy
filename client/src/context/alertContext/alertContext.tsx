"use client";
import {
  ADD_ALERT,
  UPDATE_ALERT_METHOD,
  UPDATE_ALERT_TYPE,
  UPDATE_FREQUENCY,
  UPDATE_INTEREST_RATE,
} from "@/constant/constant";
import {
  AlertContextValues,
  AprAlertAction,
  AprAlertType,
  BufferAlertAction,
  BufferAlertType,
} from "@/types/type";
import { FC, ReactNode, createContext, useContext, useReducer } from "react";

const aprAlertInitialState: AprAlertType[] = [];
const bufferAlertInitialState: BufferAlertType[] = [];

function aprAlertReducer(
  state: AprAlertType[],
  action: AprAlertAction
): AprAlertType[] {
  switch (action.type) {
    case ADD_ALERT:
      // Clone the state to ensure immutability and push the new alert
      return [...state, action.alert];

    case UPDATE_ALERT_METHOD:
      // Find the index of the item to update
      const indexToUpdateMethod = state.findIndex(
        (item) => item.alertMethods[action.method]
      );
      if (indexToUpdateMethod !== -1) {
        // Clone the state to ensure immutability
        const newState = [...state];
        newState[indexToUpdateMethod] = {
          ...newState[indexToUpdateMethod],
          alertMethods: {
            ...newState[indexToUpdateMethod].alertMethods,
            [action.method]: action.value,
          },
        };
        return newState;
      }
      return state;

    case UPDATE_ALERT_TYPE:
      // Find the index of the item to update
      const indexToUpdateType = state.findIndex(
        (item) => item.alertType === action.value
      );
      if (indexToUpdateType !== -1) {
        // Clone the state to ensure immutability
        const newState = [...state];
        newState[indexToUpdateType] = {
          ...newState[indexToUpdateType],
          alertType: action.value,
        };
        return newState;
      }
      return state;

    case UPDATE_INTEREST_RATE:
      // Find the index of the item to update
      const indexToUpdateRate = state.findIndex((item) => {
        return (
          item.currentInterestRate.position === action.position ||
          item.currentInterestRate.percentage === action.percentage
        );
      });
      if (indexToUpdateRate !== -1) {
        // Clone the state to ensure immutability
        const newState = [...state];
        newState[indexToUpdateRate] = {
          ...newState[indexToUpdateRate],
          currentInterestRate: {
            ...newState[indexToUpdateRate].currentInterestRate,
            ...action,
          },
        };
        return newState;
      }
      return state;

    case UPDATE_FREQUENCY:
      // Find the index of the item to update
      const indexToUpdateFrequency = state.findIndex((item) => {
        return (
          item.frequency.repeat === action.repeat ||
          item.frequency.interval === action.interval
        );
      });
      if (indexToUpdateFrequency !== -1) {
        // Clone the state to ensure immutability
        const newState = [...state];
        newState[indexToUpdateFrequency] = {
          ...newState[indexToUpdateFrequency],
          frequency: {
            ...newState[indexToUpdateFrequency].frequency,
            ...action,
          },
        };
        return newState;
      }
      return state;

    default:
      return state;
  }
}

function bufferAlertReducer(
  state: BufferAlertType[],
  action: BufferAlertAction
): BufferAlertType[] {
  switch (action.type) {
    case ADD_ALERT:
      // Clone the state to ensure immutability and push the new alert
      return [...state, action.alert];

    default:
      return state;
  }
}

interface AlertProviderProps {
  children: ReactNode;
}

const AlertContext = createContext<AlertContextValues | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error("useAlertContext must be used within a AlertProvider");
  }
  return context;
};

const AlertProvider: FC<AlertProviderProps> = ({ children }) => {
  const [aprAlertState, aprAlertDispatch] = useReducer(
    aprAlertReducer,
    aprAlertInitialState
  );

  const [bufferAlertState, bufferAlertDispatch] = useReducer(
    bufferAlertReducer,
    bufferAlertInitialState
  );

  return (
    <>
      <AlertContext.Provider
        value={{
          aprAlertDispatch,
          aprAlertState,
          bufferAlertState,
          bufferAlertDispatch,
        }}
      >
        {children}
      </AlertContext.Provider>
    </>
  );
};

export default AlertProvider;
