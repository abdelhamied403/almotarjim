import useI18n from "@/hooks/useI18n";
import { FaAddressBook } from "react-icons/fa";

import location from "../../assets/location.png";

const Contact = () => {
  const { t } = useI18n();

  return (
    <section id="contact" className="h-screen">
      <div className="flex flex-col gap-16">
        <h1 className="text-3xl font-bold text-center">
          {t("register.title")}
        </h1>
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-5">
            <h1>{t("user.contact.title")}</h1>
            <p className="font-normal text-gray-600 text-base">
              {t("user.contact.content")}
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <img
                  src={location}
                  alt="almotarjim-address"
                  className="w-20 h-20"
                />
                <div>
                  <h1>{t("user.contact.address")}</h1>
                  <p className="font-normal text-gray-600 text-base">
                    Riyadh, Saudi Arabia
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <FaAddressBook />
                <div>
                  <h1>{t("user.contact.phone")}</h1>
                  <p className="font-normal text-gray-600 text-base">
                    920033074+
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <FaAddressBook />
                <div>
                  <h1>{t("user.contact.email")}</h1>
                  <p className="font-normal text-gray-600 text-base">
                    help@almotarjim.tech
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
