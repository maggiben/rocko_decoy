'use client';

import StepOne from '@/components/pages/non-connected/StepOne';
import StepTwo from '@/components/pages/non-connected/StepTwo';
import Stepper, { Step } from '@/components/Stepper';

const steps: Step[] = [
  { label: 'Loan Summary', component: StepOne },
  { label: 'Collateral Asset', component: StepTwo },
];
export default function NonConnected() {
  return <Stepper steps={steps} type="NON_CONNECTED" />;
}
