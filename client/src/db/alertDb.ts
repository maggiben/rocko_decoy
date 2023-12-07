import axios from 'axios';
import { BACKEND_URL } from '@/constants/env';

export const useAlertDB = () => {
  const getSeconds = (frequencyObject: any) => {
    const { repeat } = frequencyObject;

    if (frequencyObject.interval === 'Minute(s)') {
      return repeat * 60;
    }
    if (frequencyObject.interval === 'Hour(s)') {
      return repeat * 60 * 60;
    }
    if (frequencyObject.interval === 'Day(s)') {
      return repeat * 60 * 60 * 24;
    }
  };

  const addAlert = (alertFor: string, loanId: number, alertData: any) => {
    const alertObject = {
      loan_id: loanId,
      alert_type: alertFor === 'collateralBuffer' ? 'Collateral' : alertFor,
      alert_metric: alertData.currentCollateralBuffer.position,
      alert_threshold: alertData.currentCollateralBuffer.percentage,
      alert_email: alertData.alertMethods.email === '' ? 0 : 1,
      alert_phone: alertData.alertMethods.sms === '' ? 0 : 1,
      alert_repeat_secs: getSeconds(alertData.frequency),
      active: 1,
    };

    axios.post(`${BACKEND_URL}/addAlert`, alertObject);
  };

  const updateAlert = (alertId: number, alertData: any, active: number) => {
    const updateObject = {
      id: alertId,
      alert_metric: alertData.currentCollateralBuffer.position,
      alert_threshold: alertData.currentCollateralBuffer.percentage,
      alert_email: alertData.alertMethods.email === '' ? 0 : 1,
      alert_phone: alertData.alertMethods.sms === '' ? 0 : 1,
      alert_repeat_secs: getSeconds(alertData.frequency),
      active,
    };

    axios.post(`${BACKEND_URL}/updateAlert`, updateObject);
  };

  const getAlertData = async (loanId: number) => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/alerts?loanId=${loanId}`,
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const deleteAlert = async (alertId: number) => {
    const deletedObject = {
      id: alertId,
      active: 0,
    };

    await axios.post(`${BACKEND_URL}/deleteAlert`, deletedObject);
  };

  const deleteAlertByType = async (alertType: string) => {
    console.log('alertType', alertType);
    await axios.post(`${BACKEND_URL}/deleteAlertByType`, { alertType });
  };

  return {
    addAlert,
    getAlertData,
    updateAlert,
    deleteAlert,
    deleteAlertByType,
  };
};
