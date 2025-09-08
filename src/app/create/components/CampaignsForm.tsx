"use client";
import { useCampaignForm } from "../context/campaignFormContext";
import BannerUpload from './input-banner-image';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarIcon from "./calender-icon";

function CampaignsForm() {
  const { campaignPayload, setCampaignPayload } = useCampaignForm();

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
            value={campaignPayload.campaignTitle}
            onChange={(e) => setCampaignPayload({ ...campaignPayload, campaignTitle: e.target.value })}
            className="w-full border input-border rounded-md input-bg px-3 py-2 placeholder:text-[#87DDFF] placeholder:text-xs"
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
            <div className="relative flex items-center justify-between w-full border input-border rounded-md input-bg px-3 py-2">
              <DatePicker
                selected={campaignPayload.startDate ? new Date(campaignPayload.startDate) : null}
                onChange={(date) => setCampaignPayload({ ...campaignPayload, startDate: date ? date.toISOString() : undefined })}
                className="w-full placeholder:text-[#87DDFF] placeholder:text-xs"
                placeholderText="Select start date"
              />
              <CalendarIcon />
            </div>
          </div>
          <div className="flex-1">
            <label className="block mb-3 text-sm font-medium text-[#F8F8F8]">
              End Date
            </label>
            <div className="relative flex items-center justify-between w-full border input-border rounded-md input-bg px-3 py-2">
              <DatePicker
                selected={campaignPayload.endDate ? new Date(campaignPayload.endDate) : null}
                onChange={(date) =>
                  setCampaignPayload({
                    ...campaignPayload,
                    endDate: date ? date.toISOString() : undefined,
                  })
                }
                className="w-full placeholder:text-[#87DDFF] placeholder:text-xs "
                placeholderText="Select end date"
              />
              <CalendarIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CampaignsForm;
