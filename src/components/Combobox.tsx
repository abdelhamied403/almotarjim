import { HiChevronUpDown } from "react-icons/hi2";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { HiCheck } from "react-icons/hi";
import { useState } from "react";

type Option = {
  label: string;
  value: string;
};
export type ComboboxProps = {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  placeholder: string;
  noItemsTemplate: string;
};
const Combobox = ({
  value,
  options,
  onChange,
  placeholder,
  noItemsTemplate,
}: ComboboxProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (value: string) => {
    setIsOpen(false);
    onChange(value);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between"
        >
          {value || placeholder}
          <HiChevronUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder={placeholder} className="h-9" />
          <CommandEmpty>{noItemsTemplate}</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                className="flex justify-between items-center"
                key={option.value}
                onSelect={handleChange}
              >
                <span>{option.label}</span>
                {value === option.value && <HiCheck />}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Combobox;
