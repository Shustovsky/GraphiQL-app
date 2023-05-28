import { useTranslation } from 'react-i18next';
import lang from '../../assets/icons/lang.svg';
import FormSelect from '../FormSelector';
import { useEffect, useState } from 'react';

const languageList = [
  { optionValue: 'en', optionName: 'English' },
  { optionValue: 'bl', optionName: 'Belorussian' },
];

export function LangSwitcher(): JSX.Element {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(languageList[0].optionValue);

  useEffect(() => {
    const language = i18n.language;
    onClickLanguageChange(language);
  }, []);

  const onClickLanguageChange = (value: string) => {
    setSelectedLanguage(value);
    i18n.changeLanguage(value); //change the language
  };

  return (
    <div
      className="header__lang ml-2
     flex items-center"
    >
      <img className="h-8" src={lang} alt="" />
      <form className="form ml-2">
        <div className="form__section">
          <FormSelect
            isRequired={false}
            doValidate={false}
            inputValue={selectedLanguage}
            inputId="language"
            inputName="language"
            labelText=""
            onChangeCallback={onClickLanguageChange}
            selectDataSource={languageList}
          ></FormSelect>
        </div>
      </form>
    </div>
  );
}
