"use client";

import * as React from "react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import useI18n from "@/hooks/useI18n";
import { ar } from "date-fns/locale";

type RangeDatePickerProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange"
> & {
  value: DateRange | undefined;
  onChange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
};

export function RangeDatePicker({
  className,
  value,
  onChange,
}: RangeDatePickerProps) {
  const { locale, t } = useI18n();

  const onDateRangeChange = (value: any = { from: null, to: null }) => {
    const formattedDateRange: any = {
      from: value?.from ? format(value?.from, "yyyy-MM-dd") : null,
      to: value?.to ? format(value?.to, "yyyy-MM-dd") : null,
    };
    onChange(formattedDateRange);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value?.from ? (
              value.to ? (
                <>
                  {format(value.from, "LLL dd, y", {
                    locale: locale === "ar" ? ar : undefined,
                  })}{" "}
                  -{" "}
                  {format(value.to, "LLL dd, y", {
                    locale: locale === "ar" ? ar : undefined,
                  })}
                </>
              ) : (
                format(value.from, "LLL dd, y", {
                  locale: locale === "ar" ? ar : undefined,
                })
              )
            ) : (
              <span>{t("shared.date-picker.pick-date")}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={value?.from}
            selected={value}
            onSelect={onDateRangeChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
