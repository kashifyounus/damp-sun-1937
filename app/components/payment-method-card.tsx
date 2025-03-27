import React from "react";
import { BackgroundGradient } from "./acertinity/ui/background-gradient";
import { AccountDetails } from "Constant";

const PaymentMethodCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
      {AccountDetails.map((account, index) => (
        <div key={index} className="border-2 border-gray-200 dark:border-neutral-800 rounded-[22px] p-2 bg-white dark:bg-zinc-900">
          <div className="border-2 border-gray-200 dark:border-neutral-800 rounded-[22px] p-2 bg-white dark:bg-zinc-900">
            <img
              src={account.imgSrc}
              alt="accountImg"
              height="100"
              width="100"
              className="object-contain mx-auto"
            />
          </div>
          <div>
            <p className="md:text-xl text-center text-black dark:text-neutral-200">
              Title: {account.accountTitle} <br />
              Bank Name: {account.bankName} <br />
              Branch Code: {account.branchCode} <br />
              Account Number: {account.accountNumber} <br />
              IBAN: {account.IBAN} <br />
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaymentMethodCard;
