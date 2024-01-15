import Field from "@/components/Field";
import { RangeDatePicker } from "@/components/RangeDatePicker";
import useI18n from "@/hooks/useI18n";
import { useState } from "react";

const Reports = () => {
  const { t } = useI18n();
  const [period, setPeriod] = useState<any>();

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1>{t("admin.dashboard.welcomeToAlmotarjim")}</h1>
        <p>{t("admin.dashboard.description")}</p>
      </div>
      <div className="flex gap-4">
        <Field label={t("shared.date-picker.pick-date")}>
          <RangeDatePicker value={period} onChange={setPeriod} />
        </Field>
      </div>
    </div>
  );
};

export default Reports;
