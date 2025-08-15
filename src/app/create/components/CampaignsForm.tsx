"use client";
import { useCampaignForm } from "../context/campaignFormContext";
import { CalendarIcon } from "@heroicons/react/24/outline";
import BannerUpload from './input-banner-image';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CampaignsForm() {
  const { payload, setPayload } = useCampaignForm();

  return (
    <div className="max-w-4xl w-full mx-auto text-[#F8F8F8]">
      <div className="border mb-4 input-border cardthreebg rounded-[10px] p-6 space-y-6">
        {/* Campaign Title */}
        <div>
          <label className="block mb-3 text-sm font-medium text-[#F8F8F8]">
            Campaign Title
          </label>
          <input
            type="text"
            value={payload.name}
            onChange={(e) => setPayload({ ...payload, name: e.target.value })}
            className="w-full border input-border rounded-md input-bg px-3 py-2"
            placeholder="Enter campaign title"
            title="campaign-title"
          />
        </div>

        {/* Campaign Banner Upload */}
        <BannerUpload />

        {/* Start & End Dates */}
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex-1">
            <label className="block mb-3 text-sm font-medium text-[#F8F8F8]">
              Start Date
            </label>
            <div className="relative">
              <DatePicker
                selected={payload.startDate}
                onChange={(date) => setPayload({ ...payload, startDate: date })}
                className="w-full border input-border rounded-md input-bg px-3 py-2"
                placeholderText="Select start date"
              />
              <CalendarIcon className="w-5 h-5 absolute right-3 top-3 text-[#F8F8F8]" />
            </div>
          </div>
          <div className="flex-1">
            <label className="block mb-3 text-sm font-medium text-[#F8F8F8]">
              End Date
            </label>
            <div className="relative">
              <DatePicker
                selected={payload.endDate}
                onChange={(date) => setPayload({ ...payload, endDate: date })}
                className="w-full border input-border rounded-md input-bg px-3 py-2"
                placeholderText="Select end date"
              />
              <CalendarIcon className="w-5 h-5 absolute right-3 top-3 text-[#F8F8F8]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CampaignsForm;
