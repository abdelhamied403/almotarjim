import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { HiGlobe } from "react-icons/hi";
import useI18n from "@/hooks/useI18n";
import locales from "@/i18n/locales";

const LanguageDropdown = () => {
  const { language, changeLocale } = useI18n();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex gap-2">
          <span>{language.locale}</span>
          <HiGlobe />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {Object.values(locales).map(({ locale, code }) => (
          <DropdownMenuItem
            key={code}
            onClick={() => {
              changeLocale(code);
              location.reload();
            }}
          >
            {locale}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageDropdown;
